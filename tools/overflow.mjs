import puppeteer from 'puppeteer-core'
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe'
const W=Number(process.argv[2]||1440)
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',defaultViewport:{width:W,height:1000,deviceScaleFactor:1}})
const p=await b.newPage()
await p.goto('http://127.0.0.1:5180/',{waitUntil:'networkidle0'})
await p.evaluate(()=>document.fonts.ready)
await new Promise(r=>setTimeout(r,500))
console.log(JSON.stringify(await p.evaluate((W)=>{
  const out=[]
  document.querySelectorAll('*').forEach(el=>{
    const r=el.getBoundingClientRect()
    if(r.width===0||r.height===0)return
    if(r.right>W+0.5||r.left<-0.5){
      out.push({tag:el.tagName.toLowerCase(),cls:(el.className.baseVal??el.className??'').toString().slice(0,60),left:Math.round(r.left),right:Math.round(r.right)})
    }
  })
  return {docW:document.documentElement.clientWidth,scrollW:document.documentElement.scrollWidth,bodyScrollW:document.body.scrollWidth,depassements:out.slice(0,14)}
},W),null,1))
await b.close()
