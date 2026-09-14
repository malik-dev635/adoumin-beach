import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

/** Capture la section Carte (carte Leaflet) a une largeur donnee, apres chargement des tuiles. */
const W = Number(process.argv[2] || 1440)
const OUT = process.argv[3] || 'C:/Users/Hp 840 G5/Downloads/adoumin-beach-resort/tools/out'
fs.mkdirSync(OUT, { recursive: true })

const b = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  defaultViewport: { width: W, height: 1000, deviceScaleFactor: 1 },
})
const p = await b.newPage()
const errors = []
p.on('pageerror', (e) => errors.push(String(e)))
p.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url())) errors.push(r.status() + ' ' + r.url().slice(0, 80)) })
await p.goto('http://127.0.0.1:5180/', { waitUntil: 'domcontentloaded', timeout: 60000 })
await new Promise((r) => setTimeout(r, 1500))
await p.evaluate(async () => {
  const s = window.innerHeight / 2
  for (let y = 0; y < document.body.scrollHeight; y += s) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) }
})
const sec = await p.$('#root > div > :nth-child(7)')
await p.evaluate((el) => el.scrollIntoView({ block: 'start' }), sec)
await new Promise((r) => setTimeout(r, 3500))
const info = await p.evaluate(() => {
  const m = document.querySelector('.leaflet-container')
  return {
    carte: m ? { w: Math.round(m.clientWidth), h: Math.round(m.clientHeight) } : null,
    tuilesChargees: document.querySelectorAll('.leaflet-tile-loaded').length,
    marqueur: !!document.querySelector('.adoumin-marker'),
  }
})
await sec.screenshot({ path: `${OUT}/carte-${W}.png` })
console.log(JSON.stringify({ ...info, erreurs: errors }))
await b.close()
