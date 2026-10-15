/* =====================================================================
   05-DOCK.JS · Barra flotante de abajo y su panel "Más"
   ---------------------------------------------------------------------
   - El botón "Más" abre/cierra el panel con las otras secciones del sitio.
   - Se cierra con Escape, tocando afuera o al ir a otra parte de la página.
   - La barra se aparta sola cuando el formulario está a la vista.
   ===================================================================== */
(function () {
  var I = window.Inicio;
  var dock = document.getElementById("dock");
  var panel = document.getElementById("panel");
  var botonMas = document.getElementById("botonMas");
  if (!dock || !panel || !botonMas) return;

  var reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function abrir() {
    panel.hidden = false;
    /* dos "cuadros" de espera para que el navegador anime la entrada */
    requestAnimationFrame(function () { requestAnimationFrame(function () { panel.classList.remove("cerrado"); }); });
    botonMas.setAttribute("aria-expanded", "true");
  }
  function cerrar() {
    if (panel.hidden) return;
    panel.classList.add("cerrado");
    botonMas.setAttribute("aria-expanded", "false");
    setTimeout(function () { if (panel.classList.contains("cerrado")) panel.hidden = true; }, reducir ? 0 : 260);
  }

  botonMas.addEventListener("click", function () { panel.hidden ? abrir() : cerrar(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) { cerrar(); botonMas.focus(); }
  });
  document.addEventListener("pointerdown", function (e) {
    if (!panel.hidden && !e.target.closest(".dock-in")) cerrar();
  });

  /* Se aparta cuando el formulario está visible (para no estorbar) */
  var caja = document.getElementById("formCaja");
  if (caja && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      var visible = entradas[0].isIntersecting;
      dock.classList.toggle("aparte", visible);
      if (visible) cerrar();
    }, { threshold: 0.35 }).observe(caja);
  }

  I.dock = { cerrar: cerrar };
})();
