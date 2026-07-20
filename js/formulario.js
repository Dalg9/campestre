// 1) Cuando conectemos Google Sheets, pegaremos la dirección aquí.
    //    Mientras esté vacío (""), el formulario funciona en modo prueba.
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVMHUvLCnoQ8jiQR03529SpXmNdX3Xn9RyB5HswJvylLQaxOzt4tR9XuRd1NK6y8gR/exec";

    // 2) Captura de dónde vino la persona (etiqueta del QR).
    //    Lee la URL: si trae ?origen=... o ?utm_term=... lo guarda en el campo oculto.
    (function detectarOrigen() {
      const params = new URLSearchParams(window.location.search);
      const origen = params.get("origen") || params.get("utm_term") || params.get("utm_campaign") || "directo";
      document.getElementById("origen").value = origen;
    })();

    // 3) Qué pasa cuando la persona presiona "Enviar".
    const form = document.getElementById("lead-form");
    const mensaje = document.getElementById("mensaje");
    const boton = document.getElementById("btn-enviar");

    form.addEventListener("submit", async function (evento) {
      evento.preventDefault(); // evita que la página se recargue

      // Recoge lo que escribió la persona
      const datos = {
        nombre:   form.nombre.value.trim(),
        telefono: form.telefono.value.trim(),
        correo:   form.correo.value.trim(),
        proyecto: form.proyecto.value,
        origen:   form.origen.value,
        fecha:    new Date().toLocaleString("es-CO")
      };

      boton.disabled = true;
      boton.textContent = "Enviando...";

      // MODO PRUEBA: si todavía no hay dirección de Google Sheets
      if (SCRIPT_URL === "") {
        console.log("Datos capturados (modo prueba):", datos);
        mostrarExito();
        return;
      }

      // MODO REAL: envía los datos a Google Sheets
      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });
        mostrarExito();
      } catch (error) {
        mensaje.className = "mensaje mensaje--error";
        mensaje.textContent = "Hubo un problema al enviar. Intenta de nuevo.";
        boton.disabled = false;
        boton.textContent = "Enviar mis datos";
      }
    });

    function mostrarExito() {
      form.reset();
      mensaje.className = "mensaje mensaje--ok";
      mensaje.textContent = "¡Gracias! Recibimos tus datos y te contactaremos pronto.";
      boton.disabled = false;
      boton.textContent = "Enviar mis datos";
    }
