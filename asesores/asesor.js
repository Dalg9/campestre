/* =====================================================================
   ASESOR.JS · Comportamiento compartido por las 5 páginas de asesores
   ---------------------------------------------------------------------
   Hace tres cosas pequeñas:

   1) NÚMERO DE WHATSAPP: toma el número del asesor de ../asesores.js
      (el archivo único del sitio). Así, si cambias un número ahí, esta
      página se actualiza sola. El número que está escrito en el HTML de
      cada página es solo un RESPALDO por si asesores.js no cargara.

   2) PROYECTOS: dibuja la tira de proyectos con la lista PROYECTOS de
      abajo (una sola lista para las 5 páginas).

   3) BARRA INFERIOR: la oculta mientras se ven los botones de arriba.

   IMPORTANTE: estas páginas NO usan los atributos data-ae de asesores.js,
   porque aquí cada página debe llevar SIEMPRE a su propio asesor y no
   rotar entre todos.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Lista de proyectos de la tira ----------
     Para agregar o quitar uno, edita esta lista.
     img  → foto pequeña en asesores/img/
     url  → carpeta del proyecto (desde asesores/ se sube con ../)  */
  var PROYECTOS = [
    { nom: "Le Mont Reserve",                img: "img/p-lemont.webp",     url: "../lemont/" },
    { nom: "Condominio Santorini Reservado", img: "img/p-santorini.webp",  url: "../santorini/" },
    { nom: "Los Chíguiros Club Campestre",   img: "img/p-chiguiros.webp",  url: "../chiguiros/" },
    { nom: "Hacienda Inglesa",               img: "img/p-hacienda.webp",   url: "../hacienda-inglesa/" },
    { nom: "Colina Campestre Reservado",     img: "img/p-colina.webp",     url: "../colina-campestre-reservado/" }
  ];

  var $ = function (s) { return document.querySelector(s); };
  var body = document.body;

  /* ---------- 1) Número y mensaje de WhatsApp ---------- */
  /* "Ana María Suache" → "ana-maria-suache" (sin tildes ni espacios) para compararlo con el nombre de la página */
  function limpio(t) {
    return String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, "-");
  }

  function numeroDeAsesores(slug) {
    var lista = (window.AE && window.AE.asesores) || [];
    for (var i = 0; i < lista.length; i++) {
      if (slug.indexOf(limpio(lista[i].nombre)) === 0) return lista[i].numero;
    }
    return null;
  }

  function conPuntos(n) {                       /* 573134079398 → +57 313 407 9398 */
    return "+" + n.slice(0, 2) + " " + n.slice(2, 5) + " " + n.slice(5, 8) + " " + n.slice(8);
  }

  var slug = body.getAttribute("data-slug") || "";
  var corto = body.getAttribute("data-corto") || "";
  var numero = numeroDeAsesores(slug);

  if (numero) {
    var texto = "Hola " + corto + ", estoy interesado en los lotes campestres desde la página de Alianza Empresarial.";
    var wa = "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
    var tel = "tel:+" + numero;
    document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = wa; });
    document.querySelectorAll("[data-tel]").forEach(function (a) { a.href = tel; });
    document.querySelectorAll("[data-num]").forEach(function (e) { e.textContent = conPuntos(numero); });
  }

  /* ---------- 2) Tira de proyectos ---------- */
  var rail = $("#rail"), seccion = $("#proyectos");
  if (rail && seccion) {
    rail.innerHTML = PROYECTOS.map(function (p) {
      return '<a class="pj" role="listitem" href="' + p.url + '">' +
        '<div class="pj-img"><img src="' + p.img + '" alt="" width="560" height="420" loading="lazy"></div>' +
        '<h3>' + p.nom + '</h3><span>Ver proyecto →</span></a>';
    }).join("");
    seccion.hidden = false;      /* la sección está oculta hasta que la tira existe */
  }

  /* ---------- 3) Barra inferior ---------- */
  var dock = $("#dock"), cta = $("#ctaRow");
  if (dock && cta && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      dock.classList.toggle("away", en[0].isIntersecting);
    }, { threshold: 0.6 }).observe(cta);
  }
})();
