const ticketEl=document.getElementById('tickets');
const visitEl=document.getElementById('visits');
const coinBtn=document.getElementById('coinBtn');
const filters=[...document.querySelectorAll('.filter')];
const cabinets=[...document.querySelectorAll('.cabinet[data-kind]')];
const launchLog=document.getElementById('launchLog');

const safeInt=(key)=>{
  const value=parseInt(localStorage.getItem(key)||'0',10);
  return Number.isFinite(value)?value:0;
};

let tickets=safeInt('mbArcadeTickets');
let visits=safeInt('mbArcadeVisits')+1;
localStorage.setItem('mbArcadeVisits',String(visits));
if(visitEl) visitEl.textContent=String(visits);
if(ticketEl) ticketEl.textContent=String(tickets);

function pulse(){
  if(!document.body.animate) return;
  document.body.animate([
    {filter:'brightness(1)'},
    {filter:'brightness(1.18) saturate(1.2)'},
    {filter:'brightness(1)'}
  ],{duration:220,easing:'ease-out'});
}

coinBtn?.addEventListener('click',()=>{
  tickets+=5;
  localStorage.setItem('mbArcadeTickets',String(tickets));
  if(ticketEl) ticketEl.textContent=String(tickets);
  coinBtn.textContent='+5 tickets';
  pulse();
  setTimeout(()=>coinBtn.textContent='Insert coin',700);
});

filters.forEach(button=>{
  button.addEventListener('click',()=>{
    const filter=button.dataset.filter||'all';
    filters.forEach(item=>item.classList.toggle('active',item===button));
    cabinets.forEach(card=>{
      const show=filter==='all'||card.dataset.kind===filter;
      card.classList.toggle('hidden',!show);
    });
    if(launchLog) launchLog.textContent=`Showing ${filter==='all'?'all cabinets':filter+' cabinets'}.`;
  });
});

document.querySelectorAll('.launch-link').forEach(link=>{
  link.addEventListener('click',()=>{
    const card=link.closest('.cabinet');
    const title=card?.querySelector('h3')?.textContent?.trim()||'cabinet';
    localStorage.setItem('mbArcadeLastLaunch',title);
    if(launchLog) launchLog.textContent=`Launching ${title}.`;
  });
});

const lastLaunch=localStorage.getItem('mbArcadeLastLaunch');
if(lastLaunch&&launchLog) launchLog.textContent=`Last launched: ${lastLaunch}.`;

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  });
}

console.log('MATTBEARCADE focus build v1.2.0 loaded');
