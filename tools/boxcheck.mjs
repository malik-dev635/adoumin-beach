import puppeteer from 'puppeteer-core'
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',defaultViewport:{width:1440,height:1000,deviceScaleFactor:1}})
const page=await browser.newPage()
await page.goto('http://127.0.0.1:5180/',{waitUntil:'networkidle0'})
await page.evaluate(()=>document.fonts.ready)
await new Promise(r=>setTimeout(r,600))
const res=await page.evaluate(()=>{
  const root=document.getElementById('root').firstElementChild
  const sec=[...root.children]
  const box=(el)=>{const r=el.getBoundingClientRect();return [Math.round(r.x),Math.round(r.width),Math.round(r.height)]}
  const exp=sec[1]
  const rows=[...exp.children].slice(1)
  return {
    bentoRow1: [...rows[0].children].map(box),
    bentoRow2: [...rows[1].children].map(box),
    carousel: [...sec[3].children[1].children].map(box),
    faqList: box(sec[5].children[1]),
    carteBody: [...sec[6].children[1].children].map(box),
    footerTop: box(sec[8].children[1]),
  }
})
console.log(JSON.stringify(res,null,1))
await browser.close()
