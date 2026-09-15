import puppeteer from 'puppeteer-core'
const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:'new'})
const sizes=[[360,740],[390,844],[768,1024],[1024,768],[1366,768]]
console.log('variante  ecran      hero   deborde  texte<12px  touche<40px')
for(const path of ['/','/lay2','/lay3']){
  for(const [w,h] of sizes){
    const p=await b.newPage(); await p.setViewport({width:w,height:h,deviceScaleFactor:1})
    await p.goto('http://127.0.0.1:5180'+path,{waitUntil:'domcontentloaded',timeout:60000}); await new Promise(r=>setTimeout(r,1800))
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}window.scrollTo(0,0)})
    const r=await p.evaluate(()=>{
      const hero=document.getElementById('root').firstElementChild.children[0].getBoundingClientRect().height
      const deborde=document.documentElement.scrollWidth>document.documentElement.clientWidth
      const petits=[...document.querySelectorAll('p,a,span,li,button')].filter(e=>e.textContent.trim().length>2&&parseFloat(getComputedStyle(e).fontSize)<12&&e.offsetParent).length
      const touches=[...document.querySelectorAll('a,button')].filter(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e,'::after');const ext=cs.content!=='none'&&cs.position==='absolute'?14:0;return e.offsetParent&&r.width>0&&(r.height+ext<32||r.width+ext<32)}).length
      return {hero:Math.round(hero),deborde,petits,touches}
    })
    console.log(path.padEnd(9),`${w}x${h}`.padEnd(10),String(r.hero).padEnd(6),(r.hero<=h?'tient':'✗').padEnd(6),(r.deborde?'✗ OUI':'non').padEnd(8),String(r.petits).padEnd(11),String(r.touches))
    await p.close()
  }
}
await b.close()
