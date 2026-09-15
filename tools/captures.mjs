import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Captures pour le carrousel Canva : pages completes, sections, mockups laptop / telephone.
 * Sortie : <dossier> (par defaut public/captures). Le serveur de dev doit tourner sur :5180.
 */
const OUT = process.argv[2] || 'public/captures'
fs.mkdirSync(OUT, { recursive: true })
const BASE = 'http://127.0.0.1:5180'
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })

/** Ouvre une page, fait defiler pour declencher les entrees au scroll, attend la fin des animations. */
async function open(pathname, w, h) {
  const p = await b.newPage()
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await p.goto(BASE + pathname, { waitUntil: 'networkidle0', timeout: 90000 })
  await new Promise((r) => setTimeout(r, 3500))
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 1800))
  return p
}

// ---- pages completes
for (const [pathname, name, w, h] of [
  ['/lay2', 'lay2-desktop-full', 1440, 900],
  ['/lay3', 'lay3-desktop-full', 1440, 900],
  ['/lay3', 'lay3-mobile-full', 390, 844],
  ['/', 'lay1-desktop-full', 1440, 900],
]) {
  const p = await open(pathname, w, h)
  // la capture pleine page redimensionne la fenetre, ce qui relance les animations d'entree :
  // on les fige a leur etat final avant de capturer
  await p.addStyleTag({ content: '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}' })
  await new Promise((r) => setTimeout(r, 400))
  await p.screenshot({ path: path.join(OUT, name + '.png'), fullPage: true })
  console.log('ok', name)
  await p.close()
}

// ---- sections (1440 x 850, ratio des cartes inclinees du carrousel)
const SECTIONS = [
  ['/', 0, 'sec-lay1-hero'],
  ['/', 1, 'sec-lay1-experience'],
  ['/', 4, 'sec-lay1-testimonials'],
  ['/lay2', 5, 'sec-lay2-gallery'],
  ['/lay2', 3, 'sec-lay2-restaurant'],
  ['/lay2', 10, 'sec-lay2-footer'],
  ['/lay3', 0, 'sec-lay3-hero'],
]
for (const [pathname, idx, name] of SECTIONS) {
  const p = await open(pathname, 1440, 850)
  const top = await p.evaluate((i) => {
    const s = document.getElementById('root').firstElementChild.children[i]
    s.scrollIntoView({ block: 'start' })
    return window.scrollY
  }, idx)
  await new Promise((r) => setTimeout(r, 1500))
  await p.screenshot({ path: path.join(OUT, name + '.png'), clip: { x: 0, y: top, width: 1440, height: 850 } })
  console.log('ok', name)
  await p.close()
}

// ---- viewports du hero Lay1 pour les mockups
{
  const p = await open('/', 1440, 900)
  await p.screenshot({ path: path.join(OUT, 'tmp-lay1-1440.png') })
  await p.close()
  const m = await open('/', 390, 844)
  await m.screenshot({ path: path.join(OUT, 'tmp-lay1-390.png') })
  await m.close()
}

// ---- mockups : cadres CSS autour des captures, fond transparent
const b64 = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(OUT, f)).toString('base64')
const laptop = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:transparent}
  .wrap{width:1600px;padding:40px;box-sizing:border-box}
  .lid{width:1520px;margin:0 auto;background:#0f1722;border-radius:28px 28px 0 0;padding:26px 26px 0;box-sizing:border-box;box-shadow:0 30px 80px rgba(14,30,61,.35)}
  .cam{width:8px;height:8px;border-radius:50%;background:#2a3542;margin:0 auto 12px}
  .screen{width:1468px;height:917px;border-radius:12px 12px 0 0;overflow:hidden;background:#000}
  .screen img{width:100%;display:block}
  .base{width:1600px;height:34px;background:linear-gradient(#cfd6de,#9aa5b1);border-radius:0 0 22px 22px;position:relative}
  .base::after{content:'';position:absolute;left:50%;top:0;width:260px;height:10px;transform:translateX(-50%);background:#8b96a2;border-radius:0 0 8px 8px}
</style><div class="wrap"><div class="lid"><div class="cam"></div><div class="screen"><img src="${b64('tmp-lay1-1440.png')}"></div></div><div class="base"></div></div>`
const phone = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:transparent}
  .ph{width:470px;height:964px;margin:40px;background:#0f1722;border-radius:64px;padding:18px;box-sizing:border-box;box-shadow:0 30px 80px rgba(14,30,61,.35);position:relative}
  .scr{width:434px;height:928px;border-radius:48px;overflow:hidden;background:#000;position:relative}
  .scr img{width:434px;display:block}
  .notch{position:absolute;top:34px;left:50%;transform:translateX(-50%);width:120px;height:34px;background:#0f1722;border-radius:20px}
</style><div class="ph"><div class="scr"><img src="${b64('tmp-lay1-390.png')}"></div><div class="notch"></div></div>`

for (const [html, name, w, h] of [
  [laptop, 'mock-lay1-laptop', 1600, 1080],
  [phone, 'mock-lay1-phone', 550, 1044],
]) {
  const p = await b.newPage()
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await p.setContent(html, { waitUntil: 'load' })
  await p.screenshot({ path: path.join(OUT, name + '.png'), omitBackground: true })
  console.log('ok', name)
  await p.close()
}
for (const f of ['tmp-lay1-1440.png', 'tmp-lay1-390.png']) fs.unlinkSync(path.join(OUT, f))

await b.close()
