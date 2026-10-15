/* =====================================================================
   08-MAIN.JS · Pegamento final: enlaces internos y botón "Me interesa"
   ---------------------------------------------------------------------
   Se carga de último a propósito: cuando llega aquí, todo lo demás
   (datos, tarjetas, acceso, dock, animaciones) ya está listo.
   ===================================================================== */
(function () {
  var I = window.Inicio;

  /* Enlaces que van a otra parte de la MISMA página (#proyectos, #pasos…)
     se mueven con scroll suave. Los enlaces a otras páginas no se tocan. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    var destino = id && document.getElementById(id);
    if (!destino) return;
    e.preventDefault();
    if (I.dock) I.dock.cerrar();
    I.irA(destino);
  });

  /* "Me interesa": deja elegido el proyecto en el formulario y baja a él.
     (Si la persona aún no se registra, js/03-acceso.js ya abrió la ventana
     de registro y este código no llega a ejecutarse.) */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-interes]");
    if (!b) return;
    var lista = document.getElementById("proyecto");
    if (lista) lista.value = b.dataset.interes;
    I.irA(document.getElementById("formulario"));
  });
})();
