/* =====================================================================
   ANALYTICS.JS · Origen detallado + Google Analytics 4
   ---------------------------------------------------------------------
   IMPORTANTE: este archivo se carga SIN "defer" (ver la línea de cada
   página), para que corra antes que los demás scripts del sitio.

   Qué hace, en cinco bloques:
   0) Arma el "origen" completo a partir de las etiquetas UTM del enlace:
        ?utm_source=qr&utm_medium=impreso&utm_campaign=ecopetrol&utm_content=daniel
      queda guardado como  qr|impreso|ecopetrol|daniel
      Lo hace agregando ?origen=... a la dirección. Las páginas del sitio ya
      saben leer "origen", así que el Sheet lo recibe sin tocarlas.
      Si el enlace ya trae ?origen=..., se respeta tal cual.
   1) Carga Google Analytics con tu ID de medición.
   2) Solo mide en el sitio real (no en tu computador ni en vistas previas).
   3) Anota ese origen en cada evento.
   4) Cuenta tres acciones: registro de entrada, formulario enviado y
      clic en WhatsApp.

   Nunca se envía a Google el nombre, teléfono ni correo de nadie.
   ===================================================================== */
(function () {
  "use strict";

  /* Tu ID de medición de Google Analytics 4 */
  var ID_MEDICION = "G-FZ0E61HXNK";

  var sitiosPermitidos = ["alianzaempresarial.co", "www.alianzaempresarial.co"];
  var enSitioReal = sitiosPermitidos.indexOf(location.hostname) !== -1;

  /* ---------- 0) Armar el origen completo desde las UTM ---------- */
  var p = new URLSearchParams(location.search);
  try {
    if (!p.get("origen")) {
      var partes = ["utm_source", "utm_medium", "utm_campaign", "utm_content"]
        .map(function (k) { return (p.get(k) || "").trim(); })
        .filter(Boolean);
      if (partes.length) {
        p.set("origen", partes.join("|"));
        /* replaceState cambia la dirección visible sin recargar y sin crear
           un paso nuevo en el historial. Las etiquetas UTM se conservan. */
        history.replaceState(null, "", location.pathname + "?" + p.toString() + location.hash);
      }
    }
  } catch (e) {}

  /* Misma regla que usa el sitio para el Sheet */
  var origen = p.get("origen") || p.get("utm_term") || p.get("utm_campaign") || "directo";

  if (!enSitioReal) return;

  /* ---------- 1) Cargar la librería de Google (asíncrona) ---------- */
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID_MEDICION;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag("js", new Date());
  gtag("config", ID_MEDICION, { origen: origen });

  /* Enviar un evento llevando siempre el origen */
  function evento(nombre, extra) {
    var datos = { origen: origen, pagina: location.pathname };
    for (var k in (extra || {})) datos[k] = extra[k];
    gtag("event", nombre, datos);
  }

  /* ---------- 4a) Registro de entrada (puerta de la página principal) ---------- */
  document.addEventListener("inicio:desbloqueado", function () {
    evento("generate_lead", { metodo: "registro_entrada" });
  });

  /* ---------- 4b) Formulario "Da el primer paso": aparece el mensaje de gracias ---------- */
  function vigilarGracias() {
    var gracias = document.getElementById("gracias");
    if (!gracias) return;
    new MutationObserver(function () {
      if (!gracias.hidden) evento("generate_lead", { metodo: "formulario" });
    }).observe(gracias, { attributes: true, attributeFilter: ["hidden"] });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", vigilarGracias);
  } else {
    vigilarGracias();
  }

  /* ---------- 4c) Clic en cualquier botón de WhatsApp ----------
     Solo se anotan los últimos 4 dígitos del número del asesor. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    if (!a) return;
    var m = (a.getAttribute("href") || "").match(/(\d{4})(?:\?|$)/);
    evento("click_whatsapp", { asesor_fin: m ? m[1] : "n/d" });
  });
})();
