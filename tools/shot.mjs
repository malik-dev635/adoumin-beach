import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT = process.argv[2] || 'C:/Users/HP840G~1/AppData/Local/Temp/claude/C--Users-Hp-840-G5-Downloads-adoumin-beach-resort/08520d32-1ad0-4640-8bab-8da6c5240d78/scratchpad/render'
const WIDTH = Number(process.argv[3] || 1440)
const VARIANT = process.argv[4] || 'lay1'
// hauteurs des sections lues dans le .pen (bounds MCP)
const LAYOUTS = {
  lay1: { path: '/', sections: ['Hero', 'Experience', 'Restaurant List', 'Spaces Carousel', 'Testimonials', 'FAQ', 'Carte', 'Final CTA', 'Footer'], pen: [820, 1114, 964, 750, 862, 676, 754, 600, 643] },
  lay2: { path: '/lay2', sections: ['Hero', 'Intro', 'Experience', 'Restaurant', 'Events', 'Gallery', 'Reviews', 'FAQ', 'Infos', 'Carte', 'CTA + Footer'], pen: [900, 489, 753, 840, 840, 1057, 562, 626, 512, 845, 1103] },
}
const { path: PATH, sections: SECTIONS, pen: PEN } = LAYOUTS[VARIANT]

fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [`--window-size=${WIDTH},1000`, '--hide-scrollbars', '--force-device-scale-factor=1'],
  defaultViewport: { width: WIDTH, height: 1000, deviceScaleFactor: 1 },
})
const page = await browser.newPage()
await page.goto('http://127.0.0.1:5180' + PATH, { waitUntil: 'domcontentloaded', timeout: 60000 })
await new Promise((r) => setTimeout(r, 2500))
await page.evaluate(() => document.fonts.ready)

// deroule toute la page pour declencher les entrees au scroll (.reveal)
await page.evaluate(async () => {
  const step = window.innerHeight / 2
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 60))
  }
  window.scrollTo(0, 0)
})
await new Promise((r) => setTimeout(r, 1400))

const measures = await page.evaluate(() => {
  const root = document.getElementById('root').firstElementChild
  return {
    vw: window.innerWidth,
    rootW: Math.round(root.getBoundingClientRect().width),
    total: Math.round(root.getBoundingClientRect().height),
    sections: [...root.children].map((el) => {
      const r = el.getBoundingClientRect()
      return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top + window.scrollY) }
    }),
  }
})

const rows = measures.sections.map((s, i) => ({
  section: SECTIONS[i],
  rendu: s.h,
  pen: PEN[i],
  delta: s.h - PEN[i],
}))
console.log(JSON.stringify({ vw: measures.vw, rootW: measures.rootW, total: measures.total, penTotal: PEN.reduce((a, b) => a + b, 0), rows }, null, 1))

// une image par section
const els = await page.$$('#root > div > *')
for (let i = 0; i < els.length; i++) {
  await els[i].screenshot({ path: `${OUT}/${String(i + 1).padStart(2, '0')}-${SECTIONS[i].replace(/\s/g, '-')}.png` })
}
await browser.close()
