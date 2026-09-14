import puppeteer from 'puppeteer-core'
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe'

async function run(reduced){
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',defaultViewport:{width:1440,height:1000,deviceScaleFactor:1}})
  const p=await b.newPage()
  if(reduced) await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}])
  await p.goto('http://127.0.0.1:5180/',{waitUntil:'networkidle0'})
  await p.evaluate(()=>document.fonts.ready)
  await new Promise(r=>setTimeout(r,400))
  const before=await p.evaluate(()=>({total:document.querySelectorAll('.reveal').length,visibles:document.querySelectorAll('.reveal[data-revealed='true']').length}))
  await p.evaluate(async()=>{const s=window.innerHeight/2;for(let y=0;y<document.body.scrollHeight;y+=s){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}window.scrollTo(0,0)})
  await new Promise(r=>setTimeout(r,800))
  const after=await p.evaluate(()=>({visibles:document.querySelectorAll('.reveal[data-revealed='true']').length}))

  // survol d'un lien de nav
  const link=await p.$('.link-underline')
  const t0=await p.evaluate(el=>getComputedStyle(el,'::after').transform,link)
  await link.hover(); await new Promise(r=>setTimeout(r,500))
  const t1=await p.evaluate(el=>getComputedStyle(el,'::after').transform,link)

  // survol d'une ligne restaurant -> zoom de la vignette
  const row=await p.$('section:nth-of-type(3) .group')
  await row.hover(); await new Promise(r=>setTimeout(r,600))
  const thumb=await p.evaluate(()=>{const img=document.querySelectorAll('#root > div > :nth-child(3) img')[0];return getComputedStyle(img).transform})
  await b.close()
  return {reduced,reveal:{...before,apresScroll:after.visibles},soulignement:{repos:t0,survol:t1},vignetteSurvol:thumb}
}
console.log(JSON.stringify(await run(false),null,1))
console.log(JSON.stringify(await run(true),null,1))
