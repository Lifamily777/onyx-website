import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { buildCapitalProfile, profileSections } from './schema.js'
import { profileDisclosure } from './copy.js'

const PAGE = [595.28, 841.89]
const MARGIN = 46
const INK = rgb(0.08, 0.13, 0.18)
const MUTED = rgb(0.30, 0.35, 0.39)
const GOLD = rgb(0.57, 0.44, 0.24)
const clean = text => text.replace(/[–—−]/g, '-')

// Shared by the local browser export and deterministic PDF verification.
export async function createProfilePdf({ answers, locale = 'en', generatedAt = new Date(), fontBytes }) {
 const zh = locale === 'zh'
 const language = zh ? 'zh' : 'en'
 const text = value => clean(value[language] || value.en)
 const profile = buildCapitalProfile(answers)
 const doc = await PDFDocument.create()
 doc.registerFontkit(fontkit)
 const font = await doc.embedFont(fontBytes)
 doc.setTitle(zh ? 'ONYX 客户资本概况' : 'ONYX Client Capital Profile')
 doc.setAuthor('ONYX Wealth & Wellness')
 doc.setCreationDate(generatedAt)
 doc.setModificationDate(generatedAt)
 let page, y
 const width = PAGE[0] - MARGIN * 2
 function lines(value, size, maxWidth = width) {
  const result = []
  // Word wrapping for Latin text and character wrapping for Chinese, including long mixed labels.
  const tokens = clean(value).match(/[\u3400-\u9fff]|[^\u3400-\u9fff\s]+|\s+/gu) || ['']
  let line = ''
  for (const token of tokens) {
   if (font.widthOfTextAtSize(line + token, size) <= maxWidth) { line += token; continue }
   if (line.trim()) result.push(line.trim())
   line = ''
   for (const char of token.trimStart()) {
    if (font.widthOfTextAtSize(line + char, size) > maxWidth) { result.push(line); line = '' }
    line += char
   }
  }
  if (line.trim()) result.push(line.trim())
  return result.length ? result : ['']
 }
 function newPage() {
  page = doc.addPage(PAGE)
  y = PAGE[1] - MARGIN
  page.drawText('ONYX', { x: MARGIN, y, size: 21, font, color: INK })
  page.drawText('WEALTH & WELLNESS', { x: MARGIN + 90, y: y + 3, size: 8, font, color: GOLD })
  y -= 18
  page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE[0] - MARGIN, y }, thickness: 1, color: GOLD })
  y -= 30
 }
 function ensure(height) { if (y - height < 64) newPage() }
 function draw(value, size = 10, color = INK, gap = 8) {
  const wrapped = lines(value, size)
  for (const line of wrapped) {
   ensure(size * 1.5)
   page.drawText(line, { x: MARGIN, y, size, font, color })
   y -= size * 1.5
  }
  y -= gap
 }
 newPage()
 draw(zh ? 'ONYX 客户资本概况' : 'ONYX Client Capital Profile', 20)
 const date = `${generatedAt.getFullYear()}-${String(generatedAt.getMonth() + 1).padStart(2, '0')}-${String(generatedAt.getDate()).padStart(2, '0')}`
 draw((zh ? '生成日期：' : 'Generated: ') + date, 9, MUTED)
 draw(zh ? '个人记录快照。未回答不代表没有；此文件不包含评分或产品推荐。' : 'A snapshot for your personal records. Unanswered does not mean absent. No scores or product recommendations are included.', 9, MUTED, 18)
 for (const group of profileSections) {
  const fields = group.fields.map(field => {
   const ids = Array.isArray(profile[field.id]) ? profile[field.id] : [profile[field.id]]
   const values = ids.filter(Boolean).map(id => text(field.options.find(option => option.id === id).label))
   return { label: text(field.label), answer: values.join(zh ? '、' : '; ') }
  }).filter(field => field.answer)
  ensure(85)
  draw(text(group.title), 13, GOLD, 8)
  if (!fields.length) draw(zh ? '未提供资料（不代表没有）。' : 'No answers supplied (not a negative answer).', 10, MUTED)
  for (const field of fields) {
   ensure((lines(field.label, 10).length + lines(field.answer, 11).length) * 17 + 18)
   draw(field.label, 10, MUTED, 2)
   draw(field.answer, 11, INK, 10)
  }
  y -= 12
 }
 ensure(130)
 draw(zh ? '教育与探索声明' : 'Educational discovery disclaimer', 12, GOLD)
 draw(text(profileDisclosure), 9, MUTED)
 const pages = doc.getPages()
 pages.forEach((p, index) => p.drawText(`ONYX  |  ${date}  |  ${index + 1} / ${pages.length}`, { x: MARGIN, y: 32, size: 8, font, color: MUTED }))
 return doc.save()
}

export async function downloadProfilePdf(answers, locale) {
 // Only a static, same-origin font is fetched; answers remain in the browser.
 const response = await fetch('/assets/fonts/ONYXProfileSans.ttf')
 if (!response.ok) throw new Error('PDF font unavailable')
 const generatedAt = new Date()
 const bytes = await createProfilePdf({ answers, locale, generatedAt, fontBytes: await response.arrayBuffer() })
 const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
 const link = document.createElement('a')
 link.href = url
 link.download = `ONYX-Profile-${locale}-${generatedAt.toISOString().slice(0, 10)}.pdf`
 document.body.appendChild(link)
 link.click()
 link.remove()
 // Download initiation is not proof the file was saved. The UI asks the user to confirm.
 window.setTimeout(() => URL.revokeObjectURL(url), 60000)
}
