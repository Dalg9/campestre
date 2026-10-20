/* PROPIEDADES · 03-lista.js
   Contador, filtros y tarjetas de la lista */

/* ---------- Encabezado: cuántas hay ---------- */
document.getElementById('cuenta').textContent=PROPIEDADES.length+' disponibles';

/* ---------- Filtros por tipo ---------- */
const TIPOS=[["Todas","Todas"],["Casa","Casas"],["Lote","Lotes"],["Apto","Apartamentos"]];
const tiposUsados=TIPOS.filter(([t])=>t==="Todas"||PROPIEDADES.some(p=>p.tipo===t));
let filtro="Todas";
const filtrosEl=document.getElementById('filtros');
function pintarFiltros(){
  filtrosEl.innerHTML=tiposUsados.map(([t,n])=>`<button class="chip" data-t="${t}" aria-pressed="${t===filtro}">${n}</button>`).join('');
}
filtrosEl.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;filtro=b.dataset.t;pintarFiltros();pintar()});

/* ---------- Tarjetas ---------- */
function meta(p){
  const m=[];
  if(p.lote) m.push(`<span>${IC.area}${fmt(Math.round(p.lote))} m² lote</span>`);
  else if(p.constr) m.push(`<span>${IC.area}${fmt(p.constr)} m²</span>`);
  if(p.hab) m.push(`<span>${IC.cama}${p.hab} hab.</span>`);
  if(p.ban) m.push(`<span>${IC.bano}${p.ban} ${p.ban>1?'baños':'baño'}</span>`);
  if(p.uso) m.push(`<span>${IC.uso}${p.uso}</span>`);
  return m.join('');
}
const grid=document.getElementById('grid');
function pintar(){
  const lista=PROPIEDADES.filter(p=>filtro==="Todas"||p.tipo===filtro);
  grid.innerHTML=lista.map(p=>`
    <button class="tarjeta" data-id="${p.id}" aria-label="Ver ficha de ${p.nombre}">
      <div class="t-foto"><img src="img/${p.id}-1.jpg" alt="${p.nombre}" loading="lazy"><span class="t-tipo">${p.tipo}</span><span class="t-ver">Ver ficha →</span></div>
      <div class="t-fila"><span class="t-nombre">${p.nombre}</span><span class="t-precio">${p.precioCorto}</span></div>
      <div class="t-ubi">${p.ciudad}</div>
      <div class="t-meta">${meta(p)}</div>
    </button>`).join('');
  if(D) gsap.from('.tarjeta',{y:26,opacity:0,duration:.6,ease:'power3.out',stagger:.07,clearProps:'all'});
}
grid.addEventListener('click',e=>{const t=e.target.closest('.tarjeta');if(t)abrir(t.dataset.id,t.querySelector('img'))});
