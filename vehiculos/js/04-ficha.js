/* VEHÍCULOS · 04-ficha.js
   Botón de WhatsApp y contenido de la ficha técnica */

/* ---------- Contacto ---------- */
function botonContacto(v){
  const texto="Hola, estoy interesado en el "+v.nombre+" ("+v.precio+") desde la página de Alianza Empresarial.";
  const fijo=v.asesor&&window.AE?AE.asesores.find(a=>a.nombre===v.asesor):null;
  if(fijo) return `<a class="cta" href="https://wa.me/${fijo.numero}?text=${encodeURIComponent(texto)}" target="_blank" rel="noopener">${IC.wa}Preguntar por este vehículo</a>`;
  return `<a class="cta" data-ae="wa" data-ae-texto="${texto.replace(/"/g,'&quot;')}" href="https://wa.me/573227414391" target="_blank" rel="noopener">${IC.wa}Preguntar por este vehículo</a>`;
}

/* ---------- Ficha corta: 4 cifras + 4 datos ---------- */
function pintarFicha(v){
  const f=v.ficha;
  let imgs='';
  for(let i=1;i<=v.fotos;i++) imgs+=`<img src="img/${v.id}-${i}.jpg" alt="${v.nombre}, foto ${i} de ${v.fotos}">`;
  gal.innerHTML=imgs;
  document.getElementById('dcont').textContent=`1 / ${v.fotos}`;
  document.getElementById('dpista').hidden=v.fotos<2;
  const km=f.Kilometraje.replace(/\s*km$/,'');
  const cifras=[[f.Modelo,'','Modelo',IC.cal],[km,'km','Recorrido',IC.km],[f.Combustible,'','Combustible',IC.gota],[f.Cilindrada,'','Cilindrada',IC.motor]];
  const datos=[["Marca",f.Marca],["Línea",f["Línea"]],["Tipo",f.Tipo],["Color",f.Color]];
  document.getElementById('hin').innerHTML=`
    <div>
      <div class="h-eti">${v.tipo} · Modelo ${f.Modelo} · Se vende</div>
      <h2 class="h-nombre">${v.nombre}</h2>
      <div class="h-precio"><b>${v.precio}</b><span>precio de venta</span></div>
    </div>
    <div class="cifras">${cifras.map(([n,u,k,ic])=>`<div class="cifra"><span class="n">${n}${u?`<small>${u}</small>`:''}</span><span class="k">${ic}${k}</span></div>`).join('')}</div>
    <section class="bloque"><h3>Ficha técnica</h3><dl class="ficha">${datos.map(([k,val])=>`<div><dt>${k}</dt><dd>${val}</dd></div>`).join('')}</dl></section>
    <div class="aviso">${IC.pago}<div><b>Opciones de pago y permuta</b><span>Pregúntale al asesor qué se puede recibir</span></div></div>`;
  barra.innerHTML=botonContacto(v);
}
