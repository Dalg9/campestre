/* =====================================================================
   01-CONFIG.JS · Ajustes generales y conexión con Google Sheets
   ---------------------------------------------------------------------
   Todos los archivos de js/ cuelgan de un solo objeto llamado "Inicio".
   (No se llama "AE" a propósito: ese nombre ya lo usa asesores.js para
   rotar los WhatsApp, y no queremos pisarlo.)

   Lo que puedes querer cambiar sin tocar nada más:
     - SCRIPT_URL        → la dirección del Apps Script que guarda en el Sheet.
     - PROYECTO_VISIBLE  → el único proyecto que ve quien aún no se registra.
   ===================================================================== */
window.Inicio = window.Inicio || {};

Inicio.config = {
  /* Misma conexión que ya funciona en el sitio actual. NO la cambies a menos
     que generes un nuevo despliegue del Apps Script. */
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyIIM5CYtlCWjCRAK32pQEV0cc1XJsmAjwX53rFCNC_nwmjIvEVpmci2a2UfphtLL6j/exec",

  /* Muro suave: nombre EXACTO del proyecto que se muestra antes del registro */
  PROYECTO_VISIBLE: "Condominio Santorini Reservado",

  /* Nombres de lo que se guarda en el navegador (los mismos del sitio actual,
     así quien ya se registró no tiene que volver a hacerlo, y Diana sigue
     funcionando porque lee 'ae_registro') */
  CLAVE_REGISTRO: "ae_registro",
  CLAVE_DATOS: "ae_datos",
  CLAVE_VISITA: "ae_visita"
};

/* ---------------------------------------------------------------------
   Enviar datos a la hoja de cálculo.
   - 'no-cors' hace que el navegador no pueda leer la respuesta (Google no
     lo permite desde otro dominio), pero el dato SÍ llega al Sheet.
   - Devuelve una promesa: si no hay internet, falla; si hay, funciona.
   --------------------------------------------------------------------- */
Inicio.enviarALaHoja = function (datos) {
  return fetch(Inicio.config.SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    keepalive: true,
    body: JSON.stringify(datos)
  });
};

/* Fecha en el formato que ya usa el Sheet */
Inicio.fechaActual = function () {
  return new Date().toLocaleString("es-CO");
};

/* De dónde llegó la persona (QR, campaña, etc.), leído de la dirección:
   alianzaempresarial.co/?origen=volante-banco  →  "volante-banco"  */
Inicio.origen = function () {
  var p = new URLSearchParams(location.search);
  return p.get("origen") || p.get("utm_term") || p.get("utm_campaign") || "directo";
};
