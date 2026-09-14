import puppeteer from 'puppeteer-core'
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT='C:/Users/HP840G~1/AppData/Local/Temp/claude/C--Users-Hp-840-G5-Downloads-adoumin-beach-resort/08520d32-1ad0-4640-8bab-8da6c5240d78/scratchpad/interact'
const fs=await import('node:fs'); fs.mkdirSync(OUT,{recursive:true})
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',defaultViewport:{width:1440,height:1000,deviceScaleFactor:1}})
const p=await b.newPage()
const errors=[]
p.on('pageerror',e=>errors.push(String(e)))
p.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
await p.goto('http://127.0.0.1:5180/',{waitUntil:'networkidle0'})
await p.evaluate(()=>document.fonts.ready)

// FAQ : ouvrir la 1re question
const faqBtn=await p.$$('section:nth-of-type(6) button')
await faqBtn[0].click()
await new Promise(r=>setTimeout(r,300))
const faqOpen=await p.evaluate(()=>{
  const s=document.getElementById('root').firstElementChild.children[5]
  return {expanded:s.querySelector('button[aria-expanded="true"]')?.textContent.trim().slice(0,40),
          answer:s.querySelector('button[aria-expanded="true"]')?.parentElement.querySelector('p')?.textContent.slice(0,60)}
})
await (await p.$('#root > div > :nth-child(6)')).screenshot({path:`${OUT}/faq-ouvert.png`})

// Carrousel : slide suivante
const before=await p.evaluate(()=>document.getElementById('root').firstElementChild.children[3].querySelector('h3').textContent)
await (await p.$('button[aria-label="Espace suivant"]')).click()
await new Promise(r=>setTimeout(r,300))
const after=await p.evaluate(()=>document.getElementById('root').firstElementChild.children[3].querySelector('h3').textContent)
await (await p.$('#root > div > :nth-child(4)')).screenshot({path:`${OUT}/carrousel-slide2.png`})

// Temoignages : suivant
const tBefore=await p.evaluate(()=>document.getElementById('root').firstElementChild.children[4].querySelectorAll('span')[document.getElementById('root').firstElementChild.children[4].querySelectorAll('span').length-2].textContent)
await (await p.$('button[aria-label="Témoignage suivant"]')).click()
await new Promise(r=>setTimeout(r,300))
const tAfter=await p.evaluate(()=>document.getElementById('root').firstElementChild.children[4].querySelectorAll('span')[document.getElementById('root').firstElementChild.children[4].querySelectorAll('span').length-2].textContent)

console.log(JSON.stringify({faqOpen,carrousel:{before,after},temoignage:{tBefore,tAfter},errors},null,1))
await b.close()
