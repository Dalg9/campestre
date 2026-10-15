/* =====================================================================
   03-ACCESO.JS · Muro suave y ventana de registro (la "puerta")
   ---------------------------------------------------------------------
   Qué hace:
   1) Si la persona NO se ha registrado: tapa el contenido de abajo y,
      al tocar "Quiero información" / "Me interesa", abre la puerta.
   2) La puerta pide nombre, teléfono y correo, los manda al Sheet y
      guarda 'ae_registro' = 'ok' en el navegador.
   3) Al registrarse, destapa todo. Diana (al final de index.html) detecta
      'ae_registro' y se activa sola.

   Avisa a los demás archivos con "eventos" (mensajes internos):
     inicio:puerta-abierta · inicio:puerta-cerrada · inicio:desbloqueado
   ===================================================================== */
(function () {
  var I = window.Inicio, C = I.config;
  var raiz = document.documentElement;
  var puerta = document.getElementById("puerta");
  var interior = document.querySelector(".bloqueo-inner");
  var registradoAhora = false;   // por si el navegador no deja usar localStorage
  var focoPrevio = null;

  function tieneAcceso() {
    if (registradoAhora) return true;
    try { return localStorage.getItem(C.CLAVE_REGISTRO) === "ok"; } catch (e) { return false; }
  }

  /* Al tapar el contenido también se desactiva para teclado y lectores de pantalla */
  function aplicarEstado() {
    var ok = tieneAcceso();
    raiz.classList.toggle("acceso-total", ok);
    raiz.classList.toggle("visitante", !ok);
    if (interior) {
      interior.inert = !ok;
      if (ok) interior.removeAttribute("aria-hidden"); else interior.setAttribute("aria-hidden", "true");
    }
  }

  function avisar(nombre) { document.dispatchEvent(new CustomEvent(nombre)); }

  function abrirPuerta() {
    if (!puerta) return;
    focoPrevio = document.activeElement;
    puerta.classList.add("abierta");
    puerta.setAttribute("aria-hidden", "false");
    raiz.classList.add("bloqueado");
    avisar("inicio:puerta-abierta");
    setTimeout(function () { var f = document.getElementById("p-nombre"); if (f) f.focus(); }, 250);
  }

  function cerrarPuerta() {
    if (!puerta || !puerta.classList.contains("abierta")) return;
    puerta.classList.remove("abierta");
    puerta.setAttribute("aria-hidden", "true");
    raiz.classList.remove("bloqueado");
    avisar("inicio:puerta-cerrada");
    if (focoPrevio && focoPrevio.focus) focoPrevio.focus();
  }

  function desbloquear(datosPersona) {
    registradoAhora = true;
    try {
      localStorage.setItem(C.CLAVE_REGISTRO, "ok");
      localStorage.setItem(C.CLAVE_DATOS, JSON.stringify(datosPersona));
    } catch (e) {}
    aplicarEstado();
    puerta.classList.remove("abierta");
    puerta.setAttribute("aria-hidden", "true");
    raiz.classList.remove("bloqueado");
    avisar("inicio:puerta-cerrada");   // devuelve el scroll a la página
    avisar("inicio:desbloqueado");
  }

  /* ---------- Quién puede pasar ---------- */
  /* Si no se ha registrado, estos botones abren la puerta en vez de ir al formulario.
     Se escucha en la fase de "captura" (true) para actuar antes que los demás. */
  document.addEventListener("click", function (e) {
    if (tieneAcceso()) return;
    var destino = e.target.closest('a[href="#formulario"], [data-interes]');
    if (!destino) return;
    e.preventDefault();
    e.stopPropagation();
    abrirPuerta();
  }, true);

  /* Solo se cierra por clic en el fondo si el clic EMPEZÓ en el fondo
     (evita cerrarla al soltar el mouse fuera después de seleccionar texto) */
  var empezoEnFondo = false;
  document.addEventListener("pointerdown", function (e) { empezoEnFondo = (e.target === puerta); });

  /* Cualquier elemento con data-abrir-puerta abre la ventana (como en el sitio actual) */
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-abrir-puerta]")) { e.preventDefault(); abrirPuerta(); }
    if (e.target.closest("#puerta-cerrar")) { e.preventDefault(); cerrarPuerta(); }
    if (e.target === puerta && empezoEnFondo) cerrarPuerta();   // clic fuera de la caja
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") cerrarPuerta();
    /* Mantiene el Tab dentro de la ventana mientras está abierta */
    if (e.key === "Tab" && puerta && puerta.classList.contains("abierta")) {
      var f = puerta.querySelectorAll("button, input, a[href]");
      if (!f.length) return;
      var primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });

  /* ---------- Enviar el registro ---------- */
  if (puerta) {
    var boton = document.getElementById("puerta-btn");
    var mensaje = document.getElementById("puerta-msg");
    var val = function (id) { return document.getElementById(id).value.trim(); };
    var decir = function (texto, tipo) { mensaje.className = tipo; mensaje.textContent = texto; };

    boton.addEventListener("click", function () {
      var nombre = val("p-nombre"), telefono = val("p-telefono"), correo = val("p-correo");
      var digitos = telefono.replace(/\D/g, "");

      if (nombre.length < 3) return decir("Escribe tu nombre completo.", "error");
      if (digitos.length < 7) return decir("Escribe un teléfono válido.", "error");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) return decir("Escribe un correo válido.", "error");
      if (!document.getElementById("p-autorizo").checked) return decir("Debes autorizar el tratamiento de datos.", "error");

      boton.disabled = true;
      boton.textContent = "Enviando...";
      /* Aunque falle el envío (sin señal, por ejemplo) igual lo dejamos entrar:
         no queremos perder al cliente. */
      I.enviarALaHoja({
        nombre: nombre, telefono: telefono, correo: correo,
        proyecto: "Registro de entrada", origen: I.origen(), fecha: I.fechaActual()
      }).catch(function () {}).then(function () {
        decir("¡Listo! Bienvenido.", "ok");
        setTimeout(function () {
          desbloquear({ nombre: nombre, telefono: telefono, correo: correo });
        }, 500);
      });
    });

    /* Enter en cualquier campo = mismo botón */
    puerta.querySelectorAll(".puerta-campos input").forEach(function (campo) {
      campo.addEventListener("keydown", function (e) { if (e.key === "Enter") boton.click(); });
    });
  }

  I.acceso = { tiene: tieneAcceso, abrirPuerta: abrirPuerta, cerrarPuerta: cerrarPuerta };
  aplicarEstado();
})();
