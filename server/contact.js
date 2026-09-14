const MAX_BYTES = 16000
const WINDOW = 10 * 60 * 1000
const buckets = new Map()
const json = (status, code) => Response.json({ accepted: status === 200, code }, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } })

// Best-effort per-isolate throttling, not a distributed rate limit. No persistent store.
function allow(ip, now) {
  for (const [key, value] of buckets) if (value.until <= now) buckets.delete(key)
  if (!buckets.has(ip)) {
    if (buckets.size >= 1000) return false
    buckets.set(ip, { count: 0, until: now + WINDOW })
  }
  return ++buckets.get(ip).count <= 5
}

async function readBody(request) {
  if (Number(request.headers.get('content-length')) > MAX_BYTES) throw new Error('size')
  const reader = request.body?.getReader()
  if (!reader) throw new Error('body')
  const chunks = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_BYTES) { await reader.cancel(); throw new Error('size') }
    chunks.push(value)
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
  return JSON.parse(new TextDecoder().decode(bytes))
}

export async function handleContact({ request, env }, fetchEmail = fetch, now = Date.now()) {
  const url = new URL(request.url)
  if (request.method !== 'POST') return json(405, 'method')
  // Allow the existing Preview hosts and the two approved production domains.
  if (!/^(?:([a-f0-9]{8}|codex-onyx-rc2)\.onyxww\.pages\.dev|onyxww\.com|www\.onyxww\.com)$/.test(url.hostname) || !env.RESEND_API_KEY) return json(503, 'unavailable')
  if (request.headers.get('origin') !== url.origin || request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json(403, 'request')
  if (!allow(request.headers.get('CF-Connecting-IP') || 'unknown', now)) return json(429, 'rate')
  let data
  try { data = await readBody(request) } catch { return json(400, 'invalid') }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json(400, 'invalid')
  const allowed = ['name', 'email', 'language', 'situation', 'message', 'website', 'startedAt', 'submissionId']
  if (Object.keys(data).some(key => !allowed.includes(key))) return json(400, 'invalid')
  const { name, email, language, situation, message, website, startedAt, submissionId } = data
  if (typeof name !== 'string' || !name.trim() || name.length > 100 || /[\r\n\x00-\x1f]/.test(name)
    || typeof email !== 'string' || email.length > 254 || !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(email)
    || !['en', 'zh', 'both'].includes(language) || !['business', 'family', 'wellness', 'planning'].includes(situation)
    || typeof message !== 'string' || message.length > 3000 || /\x00/.test(message)
    || website !== '' || !Number.isFinite(startedAt) || now - startedAt < 2000 || now - startedAt > 23 * 60 * 60 * 1000
    || typeof submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(submissionId)) return json(400, 'invalid')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  try {
    const response = await fetchEmail('https://api.resend.com/emails', {
      method: 'POST', signal: controller.signal,
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `onyx-contact/${submissionId}` },
      body: JSON.stringify({
        from: 'ONYX <hello@onyxww.com>', to: ['tiantian.qian7@gmail.com'], reply_to: email,
        subject: `ONYX Contact / 联系留言 — ${submissionId}`,
        text: `Name / 姓名: ${name.trim()}\nEmail / 邮箱: ${email}\nLanguage / 语言: ${language}\nSituation / 情况: ${situation}\n\nMessage / 留言:\n${message}\n\nReference / 编号: ${submissionId}`,
      }),
    })
    const result = await response.json()
    if (!response.ok || typeof result?.id !== 'string' || !result.id) return json(502, 'provider')
    return json(200, 'accepted')
  } catch { return json(502, 'provider') } finally { clearTimeout(timeout) }
}
