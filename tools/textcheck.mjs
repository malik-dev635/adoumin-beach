import puppeteer from 'puppeteer-core'

/** Compare la largeur rendue de textes cles avec les bounds lus dans le .pen (via MCP). */
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const TARGETS = [
  ['Vivez Abidjan', 584],
  ["les pieds dans l'eau", 767],
  ["Un cadre d'exception", 480],
  ['face à la lagune', 342],
  ['Saveurs', 166],
  ['Salle de réception', 256],
  ['Votre table', 284],
  ['avec vue vous attend', 520],
  ['Réserver', 59],
  ['La piscine au coucher du soleil', 237],
  ['Restaurant face à la lagune', 269],
  ['Adoumin', 1062],
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 1000, deviceScaleFactor: 1 },
})
const page = await browser.newPage()
await page.goto('http://127.0.0.1:5180/', { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => document.fonts.ready)
await new Promise((r) => setTimeout(r, 800))

const rows = await page.evaluate((targets) => {
  const measure = (text) => {
    const els = [...document.querySelectorAll('span,h1,h2,h3,p,button,a')].filter(
      (e) => e.textContent.trim() === text && e.children.length === 0,
    )
    if (!els.length) return null
    const el = els[0]
    const range = document.createRange()
    range.selectNodeContents(el)
    const r = range.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return {
      w: Math.round(r.width),
      h: Math.round(r.height),
      font: cs.fontFamily.split(',')[0].replace(/"/g, ''),
      size: cs.fontSize,
      weight: cs.fontWeight,
    }
  }
  return targets.map(([text, penW]) => {
    const m = measure(text)
    return m
      ? { text, pen: penW, rendu: m.w, delta: m.w - penW, pct: +(((m.w - penW) / penW) * 100).toFixed(1), font: m.font, size: m.size, weight: m.weight }
      : { text, pen: penW, rendu: null, note: 'introuvable' }
  })
}, TARGETS)

console.table(rows)
await browser.close()
