/* =====================================================================
   ACCESO-TEMPRANO.JS · Decide si la persona ve todo o el "muro suave"
   ---------------------------------------------------------------------
   Se carga en el <head>, ANTES de que se dibuje la página, para que no
   haya un parpadeo (que por un instante se vea todo y luego se tape).

   Hace una sola cosa: mira si la persona ya se registró antes
   (localStorage 'ae_registro' = 'ok') y pone una clase en <html>:
     - 'acceso-total' → ya se registró, ve todo.
     - 'visitante'    → aún no, ve el muro suave.
   El resto de la lógica (ventana de registro, etc.) está en js/03-acceso.js
   ===================================================================== */
(function () {
  var registrado = false;
  try { registrado = localStorage.getItem('ae_registro') === 'ok'; } catch (e) {}
  document.documentElement.classList.add(registrado ? 'acceso-total' : 'visitante');
})();
