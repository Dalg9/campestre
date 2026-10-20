/* VEHÍCULOS · 05-animaciones.js
   Abrir y cerrar la ficha, modo foto, barra superior */

/* ---------- Abrir y cerrar: la foto crece desde la tarjeta ---------- */
const det=document.getElementById('detalle'), hoja=document.getElementById('hoja'), dfoto=document.getElementById('dfoto'), gal=document.getElementById('dgal'), barra=document.getElementById('barra');
const ancho=()=>matchMedia('(min-width:900px)').matches;
let origen=null, fotoModo=false, previo=null;
gal.addEventListener('scroll',()=>{const i=Math.round(gal.scrollLeft/gal.clientWidth);document.getElementById('dcont').textContent=`${i+1} / ${gal.children.length}`});
function rect(el){const r=el.getBoundingClientRect();return{left:r.left,top:r.top,width:r.width,height:r.height}}
function entradaHoja(){return ancho()?{xPercent:100}:{yPercent:110}}

function abrir(id,img){
  const v=VEHICULOS.find(x=>x.id===id); if(!v) return;
  origen=img; fotoModo=false; previo=document.activeElement;
  pintarFicha(v); gal.scrollLeft=0; hoja.scrollTop=0;
  document.body.style.overflow='hidden';
  det.classList.add('on'); det.setAttribute('aria-hidden','false');
  gsap.set([dfoto,hoja,barra],{clearProps:'all'});
  gsap.set(dfoto,{height:ancho()?'100%':'46%'});
  const destino=rect(dfoto);
  const vol=document.createElement('img'); vol.className='volador'; vol.src=gal.children[0].src; document.body.appendChild(vol);
  gsap.set(vol,{...rect(img),borderRadius:22});
  gsap.set(dfoto,{opacity:0}); gsap.set(hoja,entradaHoja()); gsap.set(barra,{yPercent:120});
  gsap.set(det,{backgroundColor:'rgba(11,30,21,0)'});
  gsap.timeline({defaults:{ease:'power4.inOut'}})
    .to(det,{backgroundColor:'rgba(11,30,21,1)',duration:.45*D},0)
    .to(vol,{...destino,borderRadius:0,duration:.7*D},0)
    .add(()=>{gsap.set(dfoto,{opacity:1});vol.remove()})
    .to(hoja,{xPercent:0,yPercent:0,duration:.65*D,ease:'power4.out'},'-=.05')
    .to(barra,{yPercent:0,duration:.5*D,ease:'power3.out'},'<.15')
    .from('#hin > *',{y:22,opacity:0,duration:.55*D,stagger:.06,ease:'power3.out',clearProps:'all'},'<.05')
    .from('.cifra',{y:14,opacity:0,duration:.45*D,stagger:.06,ease:'back.out(1.6)',clearProps:'all'},'<.2');
  setTimeout(()=>document.getElementById('bcerrar').focus({preventScroll:true}),60);
}
function cerrar(){
  if(!origen) return;
  const vol=document.createElement('img'); vol.className='volador'; vol.src=gal.children[0].src; document.body.appendChild(vol);
  gsap.set(vol,{...rect(dfoto),borderRadius:0});
  const volver=origen.isConnected;
  gsap.timeline({defaults:{ease:'power3.inOut'}})
    .to(hoja,{...entradaHoja(),duration:.4*D,ease:'power3.in'},0)
    .to(barra,{yPercent:120,duration:.3*D,ease:'power3.in'},0)
    .add(()=>gsap.set(dfoto,{opacity:0}),0)
    .to(vol,volver?{...rect(origen),borderRadius:22,duration:.6*D}:{opacity:0,duration:.3*D},.2)
    .to(det,{backgroundColor:'rgba(11,30,21,0)',duration:.4*D},.3)
    .add(()=>{
      vol.remove(); det.classList.remove('on'); det.setAttribute('aria-hidden','true');
      document.body.style.overflow=''; origen=null;
      if(previo&&previo.isConnected) previo.focus({preventScroll:true});
    });
}
function alternarFoto(){
  if(ancho()) return;
  fotoModo=!fotoModo;
  gsap.to(dfoto,{height:fotoModo?'100%':'46%',duration:.6*D,ease:'power4.inOut'});
  gsap.to(hoja,{y:fotoModo?(det.clientHeight-hoja.offsetTop-128):0,duration:.6*D,ease:'power4.inOut'});
  gsap.to(barra,{opacity:fotoModo?0:1,pointerEvents:fotoModo?'none':'auto',duration:.3*D});
  document.getElementById('bampliar').setAttribute('aria-label',fotoModo?'Volver a la ficha':'Ver solo las fotos');
}
document.getElementById('bcerrar').onclick=cerrar;
document.getElementById('bampliar').onclick=alternarFoto;
dfoto.addEventListener('click',e=>{if(e.target.tagName==='IMG')alternarFoto()});
hoja.addEventListener('click',()=>{if(fotoModo)alternarFoto()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&origen)cerrar()});

/* ---------- Barra superior y progreso ---------- */
const topbar=document.getElementById('topbar'), prog=document.getElementById('prog');
addEventListener('scroll',()=>{
  const y=scrollY,max=document.body.scrollHeight-innerHeight;
  topbar.classList.toggle('solid',y>40);
  prog.style.width=(max>0?y/max*100:0)+'%';
},{passive:true});

if(D) gsap.from('.sec-hero > *',{y:22,opacity:0,duration:.7,ease:'power3.out',stagger:.09,clearProps:'all'});
