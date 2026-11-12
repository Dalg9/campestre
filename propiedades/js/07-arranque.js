/* PROPIEDADES · 07-arranque.js
   Arranca la página (siempre se carga de último) */

pintarFiltros(); pintar();

/* ---------- Enlace directo a una propiedad (para el código QR) ----------
   .../propiedades/#casa-quinta-llanerita      abre la ficha de esa propiedad
   .../propiedades/#casa-quinta-llanerita/360  abre directo su tour 360°
   El id es el mismo de 01-datos.js. Si no existe, se ve la lista normal. */
function abrirDesdeEnlace(){
  const [id,extra]=decodeURIComponent(location.hash.slice(1)).split('/');
  if(!id) return;
  const img=document.querySelector('.tarjeta[data-id="'+id.replace(/"/g,'')+'"] img');
  if(!img) return;
  abrir(id,img);
  if(extra==='360') setTimeout(()=>abrirTour(id),D?1200:200);
}
setTimeout(abrirDesdeEnlace,D?800:50);
