/* PROPIEDADES · 04-ficha.js
   Botón de WhatsApp y contenido de la ficha técnica */

/* ---------- Contacto: asesor fijo o rotación ---------- */
function asesorFijo(p){
  if(!p.asesor||!window.AE) return null;
  return AE.asesores.find(a=>a.nombre===p.asesor)||null;
}
function textoWA(p){
  return "Hola, estoy interesado en "+p.nombre+" ("+p.precio+") desde la página de Alianza Empresarial.";
}
function botonContacto(p){
  const fijo=asesorFijo(p);
  const etiqueta=p.tipo==='Casa'?'Preguntar por esta casa':p.tipo==='Lote'?'Preguntar por este lote':'Preguntar por este apartamento';
  if(fijo){
    /* Sin data-ae: asesores.js no lo toca, va siempre a este asesor. */
    const href="https://wa.me/"+fijo.numero+"?text="+encodeURIComponent(textoWA(p));
    return `<div class="atiende">Te atiende <b>${fijo.nombre}</b></div>
            <a class="cta" href="${href}" target="_blank" rel="noopener">${IC.wa}${etiqueta}</a>`;
  }
  /* Sin asesor fijo: rota entre todos, con el nombre de la propiedad en el mensaje. */
  return `<a class="cta" data-ae="wa" data-ae-texto="${textoWA(p).replace(/"/g,'&quot;')}" href="https://wa.me/573227414391" target="_blank" rel="noopener">${IC.wa}${etiqueta}</a>`;
}

/* ---------- Ficha ---------- */
function escala(p){
  if(!(p.lote&&p.constr)) return '';
  const S=120, ladoC=Math.min(1,Math.sqrt(p.constr/p.lote))*S;
  const pct=Math.round(p.constr/p.lote*100);
  return `<section class="bloque"><h3>Lote y construcción</h3><div class="escala">
    <svg viewBox="0 0 128 128" role="img" aria-label="Comparación del área construida con el área del lote">
      <rect x="4" y="4" width="${S}" height="${S}" fill="var(--papel-2)" stroke="var(--verde)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <rect class="ec" x="4" y="${4+S-ladoC}" width="${ladoC}" height="${ladoC}" fill="var(--verde)"/>
    </svg>
    <ul><li><i style="background:var(--papel-2);border:1.5px dashed var(--verde)"></i>Lote · ${fmt(p.lote)} m²</li>
    <li><i style="background:var(--verde)"></i>Construido · ${fmt(p.constr)} m²</li>
    <li class="nota">El área construida es el ${pct}% del área del lote y suma todos los pisos. Es una comparación, no un plano.</li></ul>
  </div></section>`;
}
function cifras(p){
  const c=[];
  if(p.lote) c.push([p.lote,'m²','Lote',IC.area]);
  if(p.constr) c.push([p.constr,'m²',p.lote?'Construidos':'Área',IC.casa]);
  if(p.hab) c.push([p.hab,'','Habitaciones',IC.cama]);
  if(p.ban) c.push([p.ban,'',p.ban>1?'Baños':'Baño',IC.bano]);
  if(!c.length) return '';
  return `<div class="cifras">${c.map(([n,u,k,ic])=>`<div class="cifra"><span class="n"><b data-n="${n}">${fmt(n)}</b>${u?`<small>${u}</small>`:''}</span><span class="k">${ic}${k}</span></div>`).join('')}</div>`;
}
function lista(titulo,items){
  if(!items||!items.length) return '';
  return `<section class="bloque"><h3>${titulo}</h3><ul class="incluye">${items.map(i=>`<li>${IC.check}<span>${i}</span></li>`).join('')}</ul></section>`;
}
function pintarFicha(p){
  let imgs='';
  for(let i=1;i<=p.fotos;i++) imgs+=`<img src="img/${p.id}-${i}.jpg" alt="${p.nombre}, foto ${i} de ${p.fotos}">`;
  gal.innerHTML=imgs;
  document.getElementById('dcont').textContent=`1 / ${p.fotos}`;
  document.getElementById('dpista').hidden=p.fotos<2;
  document.getElementById('hin').innerHTML=`
    <div>
      <div class="h-eti">${p.tipo} · ${p.ciudad} · ${p.negocio||'Venta'}</div>
      <h2 class="h-nombre">${p.nombre}</h2>
      <p class="h-ubi">${p.ubicacion}</p>
      <div class="h-precio"><b>${p.precio}</b><span>${p.precioNota||'precio de venta'}</span></div>
    </div>
    ${cifras(p)}
    ${p.escritura?`<div class="sello">${IC.sello}<div><b>Escritura pública individual</b><span>El inmueble queda a tu nombre</span></div></div>`:''}
    ${escala(p)}
    <section class="bloque"><h3>Ficha técnica</h3><dl class="ficha">${p.ficha.map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></section>
    ${lista('Incluye',p.caracts)}
    ${lista('Cerca de',p.cerca)}
    ${p.tour?`<a class="tour" href="${p.tour}" target="_blank" rel="noopener">${IC.cubo}Ver tour virtual 360°</a>`:''}`;
  barra.innerHTML=botonContacto(p);
}
