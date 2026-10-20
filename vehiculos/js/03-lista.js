/* VEHÍCULOS · 03-lista.js
   Contador, filtros y tarjetas de la lista */

/* ---------- Encabezado: cuántos hay ---------- */
document.getElementById('cuenta').textContent=VEHICULOS.length+' disponibles';

/* ---------- Filtros por tipo ---------- */
const PLURAL={"Automóvil":"Automóviles","Camioneta":"Camionetas","Campero":"Camperos"};
const tipos=["Todos",...new Set(VEHICULOS.map(v=>v.tipo))];
let filtro="Todos";
const filtrosEl=document.getElementById('filtros');
function pintarFiltros(){
  filtrosEl.innerHTML=tipos.map(t=>`<button class="chip" data-t="${t}" aria-pressed="${t===filtro}">${PLURAL[t]||t}</button>`).join('');
}
filtrosEl.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;filtro=b.dataset.t;pintarFiltros();pintar()});

/* ---------- Tarjetas ---------- */
const grid=document.getElementById('grid');
function pintar(){
  const lista=VEHICULOS.filter(v=>filtro==="Todos"||v.tipo===filtro);
  grid.innerHTML=lista.map(v=>`
    <button class="tarjeta" data-id="${v.id}" aria-label="Ver ficha de ${v.nombre}">
      <div class="t-foto"><img src="img/${v.id}-1.jpg" alt="${v.nombre}" loading="lazy"><span class="t-tipo">${v.tipo}</span><span class="t-ver">Ver ficha →</span></div>
      <div class="t-fila"><span class="t-nombre">${v.nombre}</span><span class="t-precio">${corto(v.precio)}</span></div>
      <div class="t-meta"><span>${IC.cal}${v.ficha.Modelo}</span><span>${IC.km}${v.ficha.Kilometraje}</span><span>${IC.gota}${v.ficha.Combustible}</span></div>
    </button>`).join('');
  if(D) gsap.from('.tarjeta',{y:26,opacity:0,duration:.6,ease:'power3.out',stagger:.07,clearProps:'all'});
}
grid.addEventListener('click',e=>{const t=e.target.closest('.tarjeta');if(t)abrir(t.dataset.id,t.querySelector('img'))});
