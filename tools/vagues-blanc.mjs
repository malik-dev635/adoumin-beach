import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'
/** Version blanche du motif seigaiha (lignes noires -> blanches, fond transparent), pour Canva. */
const src = path.resolve('public/asset/images/vagues.webp').split(path.sep).join('/')
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
await p.goto('file:///' + src)
const dataUrl = await p.evaluate(async () => {
  const img = document.querySelector('img'); await img.decode()
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight
  const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0)
  ctx.globalCompositeOperation = 'source-in'; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, c.width, c.height)
  return c.toDataURL('image/png')
})
fs.writeFileSync('public/captures/vagues-blanc.png', Buffer.from(dataUrl.split(',')[1], 'base64'))
console.log('ok', Math.round(fs.statSync('public/captures/vagues-blanc.png').size / 1024) + ' Ko')
await b.close()
