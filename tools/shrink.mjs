import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'

/** Reduit une image via Chrome headless : node tools/shrink.mjs <source> <sortie.(webp|jpg|png)> <largeur> <qualite 0-1> */
const [src, out, width, quality] = process.argv.slice(2)
const mime = out.endsWith('.jpg') || out.endsWith('.jpeg') ? 'image/jpeg' : out.endsWith('.png') ? 'image/png' : 'image/webp'
const fileUrl = 'file:///' + path.resolve(src).split(path.sep).join('/')

const b = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--allow-file-access-from-files'],
})
const p = await b.newPage()
await p.goto(fileUrl)
const dataUrl = await p.evaluate(
  async (w, q, m) => {
    const img = document.querySelector('img')
    await img.decode()
    const c = document.createElement('canvas')
    c.width = w
    c.height = Math.round((img.naturalHeight * w) / img.naturalWidth)
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
    return c.toDataURL(m, q)
  },
  Number(width),
  Number(quality),
  mime,
)
fs.writeFileSync(out, Buffer.from(dataUrl.split(',')[1], 'base64'))
console.log(out, Math.round(fs.statSync(out).size / 1024) + ' Ko')
await b.close()
