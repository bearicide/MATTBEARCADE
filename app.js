const machines=[...document.querySelectorAll('.machine')];
const panelKind=document.getElementById('panelKind');
const panelName=document.getElementById('panelName');
const panelDesc=document.getElementById('panelDesc');
const panelLaunch=document.getElementById('panelLaunch');
const launchLog=document.getElementById('launchLog');
const lastLaunch=document.getElementById('lastLaunch');
const coinBtn=document.getElementById('coinBtn');

const setText=(el,value)=>{if(el)el.textContent=value};
const cleanKind=value=>(value||'system').toUpperCase();

function selectMachine(button){
  machines.forEach(item=>item.classList.toggle('active',item===button));
  const name=button.dataset.name||'Station';
  const kind=cleanKind(button.dataset.kind);
  const desc=button.dataset.desc||'Connected MATTBEAR machine.';
  const url=button.dataset.url||'#';
  setText(panelKind,kind);
  setText(panelName,name);
  setText(panelDesc,desc);
  if(panelLaunch){
    panelLaunch.href=url;
    panelLaunch.dataset.machine=name;
  }
  setText(launchLog,`${name} selected.`);
}

machines.forEach(button=>{
  button.addEventListener('click',()=>selectMachine(button));
});

document.querySelectorAll('[data-machine]').forEach(link=>{
  link.addEventListener('click',()=>{
    const name=link.dataset.machine||'Station';
    localStorage.setItem('mbArcadeLastLaunch',name);
    setText(lastLaunch,name);
    setText(launchLog,`Launching ${name}.`);
  });
});

panelLaunch?.addEventListener('click',()=>{
  const name=panelLaunch.dataset.machine||panelName?.textContent||'Station';
  localStorage.setItem('mbArcadeLastLaunch',name);
  setText(lastLaunch,name);
  setText(launchLog,`Launching ${name}.`);
});

coinBtn?.addEventListener('click',()=>{
  const active=document.querySelector('.machine.active');
  const name=active?.dataset.name||'console';
  setText(launchLog,`${name} pinged. Console is awake.`);
  document.body.animate?.([
    {filter:'brightness(1)'},
    {filter:'brightness(1.14) saturate(1.12)'},
    {filter:'brightness(1)'}
  ],{duration:220,easing:'ease-out'});
});

const saved=localStorage.getItem('mbArcadeLastLaunch');
if(saved)setText(lastLaunch,saved);

if(machines[0])selectMachine(machines[0]);

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  });
}

console.log('MATTBEARCADE console launcher v2 loaded');
