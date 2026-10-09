/* =====================================================================
   ASESORES.JS — Alianza Empresarial
   ---------------------------------------------------------------------
   UN SOLO ARCHIVO para todo el sitio. Hace dos cosas:

   1) ROTA los asesores: cada botón de WhatsApp / llamada de la página
      se asigna al azar a uno de los asesores de la lista.
   2) ESCRIBE el mensaje de WhatsApp según la página donde está el
      cliente, para que el asesor sepa de dónde llega el lead.

   CÓMO SE USA EN UNA PÁGINA
   - En el <head>:   <script src="asesores.js"></script>
                     (en subcarpetas:  ../asesores.js)
   - En cada botón:  <a data-ae="wa" href="...">   → WhatsApp
                     <a data-ae="tel" href="...">  → Llamada
     Opcionales:
       data-ae-texto="..."  → mensaje propio (si no, usa el de la página)
       data-ae-grupo="x"    → los botones con el mismo grupo en una página
                              van al MISMO asesor (ej: WhatsApp + Llamar
                              del mismo bloque)

   PARA CAMBIAR UN NÚMERO, SACAR O AÑADIR UN ASESOR: solo se edita la
   lista ASESORES de abajo. Se actualiza todo el sitio.
   ===================================================================== */
(function () {
  "use strict";

  /* -------------------------------------------------------------------
     1. LISTA DE ASESORES EN LA ROTACIÓN
        Número con 57 adelante, sin +, sin espacios ni guiones.
        Para sacar a alguien de la rotación, borra su línea.
     ------------------------------------------------------------------- */
  var ASESORES = [
    { nombre: "Ana María Suache",   numero: "573134079398" },
    { nombre: "Juan Camilo Vargas", numero: "573004448969" },
    { nombre: "Erika Sánchez",      numero: "573118168303" },
    { nombre: "Daniel López",       numero: "573227414391" },
    { nombre: "Harold Díaz",        numero: "573123963199" }
  ];

  /* -------------------------------------------------------------------
     2. MENSAJE SEGÚN LA PÁGINA
        La clave es la carpeta de la página (ej: /lemont/ → "lemont").
        La portada no tiene carpeta, por eso usa PORTADA.
        Formato:  Hola, estoy interesado en <X> desde la página de
                  Alianza Empresarial.
     ------------------------------------------------------------------- */
  var SUFIJO = " desde la página de Alianza Empresarial.";
  function mensaje(interes) {
    return "Hola, estoy interesado en " + interes + SUFIJO;
  }

  var PORTADA = mensaje("los lotes campestres");

  var PAGINAS = {
    "lemont":                      mensaje("Le Mont Reserve"),
    "santorini":                   mensaje("Condominio Santorini Reservado"),
    "colina-campestre-reservado":  mensaje("Colina Campestre Reservado"),
    "hacienda-inglesa":            mensaje("Hacienda Inglesa Club Campestre"),
    "chiguiros":                   mensaje("Los Chigüiros Club Campestre"),
    "propiedades":                 mensaje("las propiedades"),
    "vehiculos":                   mensaje("los vehículos"),
    "socios":                      mensaje("construir mi casa o aportar mi terreno")
  };

  /* -------------------------------------------------------------------
     De aquí para abajo no hace falta tocar nada.
     ------------------------------------------------------------------- */

  /* ---- Detectar la página según la carpeta ---- */
  function textoDePagina() {
    var ruta = (location.pathname || "/").toLowerCase();
    for (var clave in PAGINAS) {
      if (PAGINAS.hasOwnProperty(clave) &&
          (ruta.indexOf("/" + clave + "/") !== -1 ||
           ruta.slice(-(clave.length + 1)) === "/" + clave)) {
        return PAGINAS[clave];
      }
    }
    return PORTADA;
  }

  /* ---- Mazo barajado: no se repite un asesor hasta que salgan todos ---- */
  var mazo = [];
  var ultimo = -1;

  function barajar(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function siguienteAsesor() {
    if (!ASESORES.length) return null;
    if (!mazo.length) {
      mazo = [];
      for (var i = 0; i < ASESORES.length; i++) mazo.push(i);
      barajar(mazo);
      /* Evita que el último de la ronda anterior sea el primero de la nueva */
      if (mazo.length > 1 && mazo[mazo.length - 1] === ultimo) {
        var t = mazo[0]; mazo[0] = mazo[mazo.length - 1]; mazo[mazo.length - 1] = t;
      }
    }
    ultimo = mazo.pop();
    return ASESORES[ultimo];
  }

  /* ---- Grupos: botones que comparten asesor dentro de la misma página ---- */
  var grupos = {};
  function asesorDe(grupo) {
    if (!grupo) return siguienteAsesor();
    if (!grupos[grupo]) grupos[grupo] = siguienteAsesor();
    return grupos[grupo];
  }

  /* ---- Constructores de enlaces ---- */
  function enlaceWA(asesor, texto) {
    return "https://wa.me/" + asesor.numero + "?text=" + encodeURIComponent(texto);
  }
  function enlaceTel(asesor) {
    return "tel:+" + asesor.numero;
  }

  /* ---- Botones marcados con data-ae ---- */
  function preparar(el) {
    var tipo = el.getAttribute("data-ae");
    var asesor = asesorDe(el.getAttribute("data-ae-grupo"));
    if (!asesor) return;
    if (tipo === "tel") {
      el.setAttribute("href", enlaceTel(asesor));
    } else {
      var texto = el.getAttribute("data-ae-texto") || textoDePagina();
      el.setAttribute("href", enlaceWA(asesor, texto));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
    el.setAttribute("data-ae-asesor", asesor.nombre);
    el.setAttribute("data-ae-listo", "1");
  }

  function procesar(raiz) {
    var lista = (raiz || document).querySelectorAll("[data-ae]:not([data-ae-listo])");
    for (var i = 0; i < lista.length; i++) preparar(lista[i]);
  }

  /* ---- API pública para botones que se crean con JavaScript ---- */
  window.AE = {
    asesores: ASESORES,
    /* Enlace de WhatsApp con un asesor al azar. texto es opcional. */
    wa: function (texto, grupo) {
      var a = asesorDe(grupo);
      return a ? enlaceWA(a, texto || textoDePagina()) : "#";
    },
    tel: function (grupo) {
      var a = asesorDe(grupo);
      return a ? enlaceTel(a) : "#";
    },
    texto: textoDePagina,
    refrescar: procesar
  };

  /* ---- Arranque ---- */
  function iniciar() {
    procesar(document);
    /* Si la página agrega botones después, también los toma */
    if (window.MutationObserver) {
      new MutationObserver(function () { procesar(document); })
        .observe(document.documentElement, { childList: true, subtree: true });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
