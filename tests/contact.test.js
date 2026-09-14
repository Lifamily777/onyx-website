import test from 'node:test'
import assert from 'node:assert/strict'
import { handleContact } from '../server/contact.js'

const origin = 'https://codex-onyx-rc2.onyxww.pages.dev'
const now = Date.now()
let ip = 0
const payload = () => ({ name: 'Preview QA', email: 'qa@example.com', language: 'en', situation: 'family', message: 'Synthetic test', website: '', startedAt: now - 5000, submissionId: crypto.randomUUID() })
function context(data = payload(), options = {}) {
 const url = options.url || origin + '/api/contact'
 return { env: { RESEND_API_KEY: 'test-only-placeholder' }, request: new Request(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: new URL(url).origin, 'CF-Connecting-IP': `test-${ip++}`, ...options.headers }, body: JSON.stringify(data) }), ...options.context }
}
const never = () => { throw new Error('Provider must not be called') }
test('provider accepts fixed recipient/sender and validated Reply-To; retries reuse key', async () => {
 const data = payload(); const calls = []
 const provider = async (url, options) => { calls.push({ url, ...options }); return Response.json({ id: 'accepted-id' }) }
 for (let i = 0; i < 2; i++) {
  const response = await handleContact(context(data), provider, now)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { accepted: true, code: 'accepted' })
 }
 const body = JSON.parse(calls[0].body)
 assert.equal(calls[0].url, 'https://api.resend.com/emails')
 assert.equal(body.from, 'ONYX <hello@onyxww.com>')
 assert.deepEqual(body.to, ['tiantian.qian7@gmail.com'])
 assert.equal(body.reply_to, 'qa@example.com')
 assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key'])
 assert.equal(calls[0].body, calls[1].body)
})
test('unapproved hosts fail closed even with a secret', async () => {
 for (const host of ['onyxww.com.evil.example', 'evil.onyxww.com', 'wwwonyxww.com', 'onyxww.pages.dev', 'main.onyxww.pages.dev', 'abcd1234.onyx-website-dqb.pages.dev', 'evil.onyxww.pages.dev']) {
  assert.equal((await handleContact(context(undefined, { url: `https://${host}/api/contact` }), never, now)).status, 503)
 }
})
test('missing secret, wrong method and cross-origin requests never call Resend', async () => {
 const missing = context(); missing.env = {}
 assert.equal((await handleContact(missing, never, now)).status, 503)
 assert.equal((await handleContact({ env: {}, request: new Request(origin + '/api/contact') }, never, now)).status, 405)
 assert.equal((await handleContact(context(undefined, { headers: { Origin: 'https://other.example' } }), never, now)).status, 403)
 assert.equal((await handleContact(context(undefined, { headers: { 'Content-Type': 'text/plain' } }), never, now)).status, 403)
})
test('server rejects invalid data, header injection, overlong data, honeypots and overrides', async () => {
 for (const patch of [{ name: '' }, { name: 'A\nB' }, { email: 'a@example.com\r\nBcc:x@example.com' }, { email: 'not-email' }, { message: 'a'.repeat(3001) }, { language: 'fr' }, { situation: 'unknown' }, { website: 'spam' }, { startedAt: now }, { startedAt: now - 24 * 3600000 }, { submissionId: 'not-uuid' }, { to: 'attacker@example.com' }]) {
  assert.equal((await handleContact(context({ ...payload(), ...patch }), never, now)).status, 400)
 }
 assert.equal((await handleContact(context({ ...payload(), message: 'a'.repeat(17000) }), never, now)).status, 400)
})
test('provider rejection, malformed acceptance and network failure never report success', async () => {
 for (const provider of [async () => Response.json({ message: 'private provider details' }, { status: 403 }), async () => Response.json({}), async () => new Response('not JSON'), async () => { throw new Error('private error') }]) {
  const result = await handleContact(context(), provider, now)
  assert.equal(result.status, 502)
  assert.deepEqual(await result.json(), { accepted: false, code: 'provider' })
 }
})
test('basic per-IP throttle blocks the sixth attempt and expires', async () => {
 const provider = async () => Response.json({ id: 'ok' })
 const make = () => context(undefined, { headers: { 'CF-Connecting-IP': 'rate-test' } })
 for (let i = 0; i < 5; i++) assert.equal((await handleContact(make(), provider, now)).status, 200)
 assert.equal((await handleContact(make(), never, now)).status, 429)
 assert.equal((await handleContact(make(), provider, now + 600001)).status, 200)
})
test('Chinese message is preserved in plain-text email', async () => {
 const data = { ...payload(), name: '测试', language: 'zh', message: '仅测试，请忽略。' }
 const response = await handleContact(context(data), async (_, options) => {
  assert.ok(JSON.parse(options.body).text.includes('仅测试，请忽略。'))
  return Response.json({ id: 'accepted' })
 }, now)
 assert.equal(response.status, 200)
})

const allowedHosts = ['codex-onyx-rc2.onyxww.pages.dev', 'ad9c0477.onyxww.pages.dev', 'onyxww.com', 'www.onyxww.com']
for (const host of allowedHosts) {
 test(`approved host ${host} reaches provider and accepts confirmation`, async () => {
  let called = false
  const response = await handleContact(context(undefined, { url: `https://${host}/api/contact` }), async () => {
   called = true
   return Response.json({ id: 'accepted-id' })
  }, now)
  assert.equal(called, true)
  assert.equal(response.status, 200)
  assert.equal((await response.json()).accepted, true)
 })
 test(`approved host ${host} fails safely with missing or rejected secret`, async () => {
  const make = () => context(undefined, { url: `https://${host}/api/contact` })
  const missing = make(); missing.env = {}
  assert.equal((await handleContact(missing, never, now)).status, 503)
  const invalid = make(); invalid.env = { RESEND_API_KEY: 'invalid-test-only' }
  const response = await handleContact(invalid, async () => Response.json({ message: 'Invalid API key' }, { status: 401 }), now)
  assert.equal(response.status, 502)
  assert.deepEqual(await response.json(), { accepted: false, code: 'provider' })
 })
}
