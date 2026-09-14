import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
const OUT='C:/Users/HP840G~1/AppData/Local/Temp/claude/C--Users-Hp-840-G5-Downloads-adoumin-beach-resort/08520d32-1ad0-4640-8bab-8da6c5240d78/scratchpad/nav'
fs.mkdirSync(OUT,{recursive:true})
const W=Number(process.argv[2]||390)
const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:'new',defaultViewport:{width:W,height:760,deviceScaleFactor:1}})
const p=await b.newPage()
await p.goto('http://127.0.0.1:5180/',{waitUntil:'networkidle0'})
await p.evaluate(()=>document.fonts.ready)
await new Promise(r=>setTimeout(r,800))
await p.screenshot({path:`${OUT}/${W}-ferme.png`})
const btn=await p.$('button[aria-label="Ouvrir le menu"]')
if(!btn){console.log('pas de bouton menu a',W);await b.close();process.exit(0)}
await btn.click()
await new Promise(r=>setTimeout(r,600))
await p.screenshot({path:`${OUT}/${W}-ouvert.png`})
console.log(JSON.stringify(await p.evaluate(()=>{
  const panneau=document.querySelector('nav')?.parentElement
  const r=panneau.getBoundingClientRect()
  return {hauteurPanneau:Math.round(r.height),opacite:getComputedStyle(panneau).opacity,liens:[...panneau.querySelectorAll('a')].map(a=>a.textContent.trim())}
})))
await b.close()
