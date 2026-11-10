/* PROPIEDADES · 06-tour360.js
   Visor de tour 360° (Pannellum). Se abre desde la ficha de las propiedades
   que tengan el campo "tour360" en 01-datos.js.
   Este archivo debe cargarse DESPUÉS de 05-animaciones.js (el orden importa
   para que la tecla Escape cierre primero el tour y no la ficha). */

const PNLM='vendor/pannellum/';
const EDITAR=new URLSearchParams(location.search).has('editar');
const v360=document.getElementById('v360'), v360pano=document.getElementById('v360pano'),
      v360escenas=document.getElementById('v360escenas'), v360pista=document.getElementById('v360pista'),
      v360prop=document.getElementById('v360prop'), v360esc=document.getElementById('v360esc');
let pnlmCarga=null, visor=null, tourProp=null, escenaAct=null, previo360=null,
    tDestruir=null, tPista=null, relojEditor=null;
window.tourAbierto=false;

const ICF='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V6M6 11.5l6-6 6 6"/></svg>';
const rutaEscena=(p,e)=>`img/360/${p.id}-${e.id}.jpg`;
const escenaDe=(p,id)=>p.tour360.escenas.find(e=>e.id===id);

/* ---------- Pannellum se descarga solo la primera vez que se abre un tour ---------- */
function cargarPannellum(){
  if(pnlmCarga) return pnlmCarga;
  pnlmCarga=new Promise((ok,mal)=>{
    const c=document.createElement('link'); c.rel='stylesheet'; c.href=PNLM+'pannellum.css'; document.head.appendChild(c);
    const s=document.createElement('script'); s.src=PNLM+'pannellum.js'; s.onload=ok;
    s.onerror=()=>{pnlmCarga=null;c.remove();s.remove();mal(new Error('visor'))};
    document.head.appendChild(s);
  });
  return pnlmCarga;
}

/* ---------- Flechas para pasar de un espacio a otro ---------- */
function crearFlecha(div,a){
  const b=document.createElement('span'); b.className='f-btn'; b.innerHTML=ICF;
  const t=document.createElement('span'); t.className='f-txt'; t.textContent=a.texto;
  div.append(b,t);
  div.setAttribute('role','button'); div.setAttribute('tabindex','0'); div.setAttribute('aria-label','Ir a '+a.texto);
  let x0=0,y0=0;
  const ir=ev=>{
    ev.preventDefault();
    if(div._ido||!visor) return;
    div._ido=true; setTimeout(()=>{div._ido=false},900);
    visor.loadScene(a.a,'same',a.mira===undefined?'same':a.mira,'same');
  };
  div.addEventListener('click',ir);
  div.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  div.addEventListener('touchend',e=>{
    const t=e.changedTouches[0];
    if(Math.abs(t.clientX-x0)<12&&Math.abs(t.clientY-y0)<12) ir(e);   /* si arrastró, no cuenta como toque */
  });
  div.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')ir(e)});
}
function escenasPannellum(p){
  const out={};
  p.tour360.escenas.forEach(e=>{
    out[e.id]={
      type:'equirectangular', panorama:rutaEscena(p,e),
      yaw:e.yaw||0, pitch:e.pitch||0,
      hotSpots:(e.flechas||[]).map(f=>{
        const dest=escenaDe(p,f.a);
        return {type:'custom',cssClass:'flecha',pitch:f.pitch,yaw:f.yaw,
                createTooltipFunc:crearFlecha,
                createTooltipArgs:{a:f.a,texto:f.texto||(dest?dest.titulo:f.a),mira:f.mira}};
      })
    };
  });
  return out;
}
/* La foto de las escenas vecinas se pide por adelantado para que el paso sea rápido */
function precargar(p,id){
  const e=escenaDe(p,id); if(!e) return;
  (e.flechas||[]).forEach(f=>{const d=escenaDe(p,f.a); if(d) new Image().src=rutaEscena(p,d)});
}

/* ---------- Lista de espacios (abajo) y título (arriba) ---------- */
function pintarEscenas(p,activa){
  v360escenas.hidden=p.tour360.escenas.length<2;
  v360escenas.replaceChildren(...p.tour360.escenas.map(e=>{
    const b=document.createElement('button'); b.type='button'; b.className='v-chip';
    b.dataset.id=e.id; b.textContent=e.titulo; b.setAttribute('aria-pressed',e.id===activa);
    return b;
  }));
}
function marcarEscena(p,id){
  escenaAct=id;
  const e=escenaDe(p,id); v360esc.textContent=e?e.titulo:'';
  v360escenas.querySelectorAll('.v-chip').forEach(b=>{
    const on=b.dataset.id===id; b.setAttribute('aria-pressed',on);
    if(on) b.scrollIntoView({inline:'center',block:'nearest',behavior:D?'smooth':'auto'});
  });
  if(EDITAR) llenarSelector(p);
}
v360escenas.addEventListener('click',e=>{
  const b=e.target.closest('.v-chip');
  if(b&&visor&&b.dataset.id!==escenaAct) visor.loadScene(b.dataset.id);
});
function mostrarPista(texto){
  v360pista.textContent=texto; v360pista.classList.add('on');
  clearTimeout(tPista); tPista=setTimeout(()=>v360pista.classList.remove('on'),6500);
}
v360pano.addEventListener('pointerdown',()=>v360pista.classList.remove('on'));

/* ---------- Abrir y cerrar ---------- */
async function abrirTour(id){
  const p=PROPIEDADES.find(x=>x.id===id);
  if(!p||!p.tour360||!p.tour360.escenas||!p.tour360.escenas.length) return;
  clearTimeout(tDestruir);
  if(visor){visor.destroy();visor=null}
  v360pano.innerHTML='';
  tourProp=p; window.tourAbierto=true; previo360=document.activeElement;
  const T=p.tour360, inicio=T.inicio||T.escenas[0].id;
  v360prop.textContent=p.nombre; v360esc.textContent=(escenaDe(p,inicio)||{}).titulo||'';
  pintarEscenas(p,inicio);
  v360.classList.add('on'); v360.setAttribute('aria-hidden','false'); det.inert=true;
  document.getElementById('v360cerrar').focus({preventScroll:true});
  mostrarPista(T.escenas.length>1?'Arrastra para mirar · toca las flechas':'Arrastra para mirar alrededor');
  try{ await cargarPannellum(); }
  catch(err){ mostrarPista('No se pudo cargar el tour. Revisa tu conexión e inténtalo de nuevo.'); clearTimeout(tPista); return; }
  if(!window.tourAbierto||tourProp!==p) return;      /* lo cerraron mientras cargaba */
  escenaAct=inicio;
  visor=pannellum.viewer('v360pano',{
    default:{
      firstScene:inicio, sceneFadeDuration:700, autoLoad:true, compass:false, showFullscreenCtrl:false,
      hfov:100, minHfov:50, maxHfov:120, backgroundColor:[0.043,0.118,0.082],
      strings:{
        loadingLabel:'Cargando…',
        noPanoramaError:'Falta la foto 360° de este espacio.',
        fileAccessError:'No se pudo abrir la foto 360° de este espacio.',
        malformedURLError:'La dirección de la foto 360° no es válida.',
        genericWebGLError:'Este navegador no puede mostrar fotos 360°. Prueba con otro.',
        textureSizeError:'La foto 360° es demasiado grande para este dispositivo.',
        unknownError:'No se pudo cargar el tour. Inténtalo de nuevo.'
      }
    },
    scenes:escenasPannellum(p)
  });
  visor.on('load',()=>precargar(p,visor.getScene()));
  visor.on('scenechange',sid=>marcarEscena(p,sid));
  if(EDITAR) iniciarEditor(p);
}
function cerrarTour(){
  if(!window.tourAbierto) return;
  window.tourAbierto=false; clearInterval(relojEditor); clearTimeout(tPista);
  v360.classList.remove('on'); v360.setAttribute('aria-hidden','true'); det.inert=false;
  document.getElementById('v360editor').hidden=true; v360.classList.remove('editando');
  if(previo360&&previo360.isConnected) previo360.focus({preventScroll:true});
  tDestruir=setTimeout(()=>{ if(visor){visor.destroy();visor=null} v360pano.innerHTML=''; },400);
}
document.getElementById('v360cerrar').onclick=cerrarTour;
addEventListener('keydown',e=>{if(e.key==='Escape'&&window.tourAbierto) cerrarTour()});
document.getElementById('hin').addEventListener('click',e=>{const b=e.target.closest('[data-tour360]'); if(b) abrirTour(b.dataset.tour360)});
document.getElementById('b360').addEventListener('click',e=>abrirTour(e.currentTarget.dataset.id));

/* ---------- Modo editor: para ubicar las flechas (se activa con ?editar al final de la dirección) ----------
   Mira hacia donde quieres la flecha, deja la cruz verde encima de ese punto y toca "Copiar flecha". */
const ed=document.getElementById('v360editor'), edLectura=document.getElementById('v360lectura'),
      edSel=document.getElementById('v360sel'), edCopiar=document.getElementById('v360copiar'), edMsg=document.getElementById('v360msg');
function llenarSelector(p){
  edSel.replaceChildren(...p.tour360.escenas.filter(e=>e.id!==escenaAct).map(e=>{
    const o=document.createElement('option'); o.value=e.id; o.textContent='Flecha hacia: '+e.titulo; return o;
  }));
}
function iniciarEditor(p){
  ed.hidden=false; v360.classList.add('editando'); edMsg.textContent=''; llenarSelector(p);
  clearInterval(relojEditor);
  relojEditor=setInterval(()=>{
    if(visor&&visor.isLoaded()) edLectura.textContent=`Espacio "${escenaAct}" · yaw ${visor.getYaw().toFixed(1)} · pitch ${visor.getPitch().toFixed(1)}`;
  },120);
}
edCopiar.onclick=async()=>{
  if(!visor||!visor.isLoaded()) return;
  const t=`{a:"${edSel.value}", yaw:${visor.getYaw().toFixed(1)}, pitch:${visor.getPitch().toFixed(1)}}`;
  try{ await navigator.clipboard.writeText(t); edMsg.textContent='Copiado: '+t; }
  catch(err){ edMsg.textContent='Copia a mano: '+t; }
};
