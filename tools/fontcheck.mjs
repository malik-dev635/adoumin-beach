import puppeteer from 'puppeteer-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 1000, deviceScaleFactor: 1 },
})
const page = await browser.newPage()
await page.goto('http://127.0.0.1:5180/', { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => document.fonts.ready)

const res = await page.evaluate(() => {
  const loaded = [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.status}`)
  const probe = (family, weight) => document.fonts.check(`${weight} 92px ${family}`)
  const h1 = document.querySelector('h1')
  const w = (el) => Math.round(el.getBoundingClientRect().width)
  return {
    loaded,
    futura500: probe('Futura', 500),
    avenir400: probe('"Avenir Next W1G"', 400),
    jost: probe('Jost', 400),
    mulish: probe('Mulish', 400),
    h1Font: getComputedStyle(h1).fontFamily,
    h1Width: w(h1),
  }
})
console.log(JSON.stringify(res, null, 1))
await browser.close()
