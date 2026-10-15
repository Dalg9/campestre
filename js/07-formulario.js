/* =====================================================================
   07-FORMULARIO.JS · Formulario "Da el primer paso" → Google Sheets
   ---------------------------------------------------------------------
   También aquí:
   - El "ping" de visita: cada vez que alguien abre la página (una vez por
     sesión) se anota una visita en el Sheet.
   - Se guarda de dónde llegó la persona (campo oculto "origen").
   - Si la persona ya se registró, se prellenan sus datos.
   Se envían los mismos campos de siempre: nombre, telefono, correo,
   proyecto, origen y fecha.
   ===================================================================== */
(function () {
  var I = window.Inicio, C = I.config;
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- Ping de visita (igual que en el sitio actual) ---------- */
  try {
    if (!sessionStorage.getItem(C.CLAVE_VISITA)) {
      sessionStorage.setItem(C.CLAVE_VISITA, "1");
      I.enviarALaHoja({
        tipo: "visita",
        origen: new URLSearchParams(location.search).get("utm") || "directo",
        pagina: location.pathname,
        referer: document.referrer || "",
        fecha: I.fechaActual()
      }).catch(function () {});
    }
  } catch (e) {}

  var form = $("#lead-form");
  if (!form) return;

  $("#origen").value = I.origen();

  /* ---------- Prellenar con los datos del registro de entrada ---------- */
  try {
    var d = JSON.parse(localStorage.getItem(C.CLAVE_DATOS) || "null");
    if (d) {
      form.nombre.value = d.nombre || "";
      form.telefono.value = d.telefono || "";
      form.correo.value = d.correo || "";
    }
  } catch (e) {}
  /* Si se registra en esta misma visita, también se prellena */
  document.addEventListener("inicio:desbloqueado", function () {
    try {
      var r = JSON.parse(localStorage.getItem(C.CLAVE_DATOS) || "null");
      if (r && !form.nombre.value) { form.nombre.value = r.nombre || ""; form.telefono.value = r.telefono || ""; form.correo.value = r.correo || ""; }
    } catch (e) {}
  });

  /* ---------- Validación: un mensaje de error debajo de cada campo ---------- */
  function marcar(id, texto) {
    var campo = document.getElementById(id), caja = document.getElementById("e-" + id);
    caja.textContent = texto || "";
    if (campo.type !== "checkbox") campo.setAttribute("aria-invalid", texto ? "true" : "false");
    return !texto;
  }
  ["nombre", "telefono", "correo"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () { marcar(id, ""); });
  });

  var boton = $("#btn-enviar"), mensaje = $("#mensaje"), gracias = $("#gracias");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = form.nombre.value.trim(), telefono = form.telefono.value.trim(), correo = form.correo.value.trim();
    var digitos = telefono.replace(/\D/g, "");

    var todoBien = [
      marcar("nombre", nombre.length >= 3 ? "" : "Escribe tu nombre completo."),
      marcar("telefono", digitos.length >= 7 ? "" : "Escribe un teléfono válido, con indicativo si es fijo."),
      marcar("correo", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo) ? "" : "Escribe un correo válido, por ejemplo nombre@correo.com."),
      marcar("autorizo", $("#autorizo").checked ? "" : "Marca la autorización para poder enviarte la información.")
    ].every(Boolean);

    if (!todoBien) {
      var malo = form.querySelector('[aria-invalid="true"]');
      (malo || $("#autorizo")).focus();
      return;
    }

    boton.disabled = true;
    boton.textContent = "Enviando...";
    mensaje.className = "mensaje"; mensaje.textContent = "";

    I.enviarALaHoja({
      nombre: nombre, telefono: telefono, correo: correo,
      proyecto: form.proyecto.value, origen: form.origen.value, fecha: I.fechaActual()
    }).then(function () {
      $("#gracias-titulo").textContent = "Gracias, " + nombre.split(/\s+/)[0];
      form.hidden = true;
      gracias.hidden = false;
      $("#otra-persona").focus();
    }).catch(function () {
      mensaje.className = "mensaje mensaje--error";
      mensaje.textContent = "Hubo un problema al enviar. Revisa tu conexión e intenta de nuevo.";
    }).then(function () {
      boton.disabled = false;
      boton.textContent = "Enviar mis datos";
    });
  });

  $("#otra-persona").addEventListener("click", function () {
    form.reset(); form.hidden = false; gracias.hidden = true; form.nombre.focus();
    $("#origen").value = I.origen();
  });
})();
