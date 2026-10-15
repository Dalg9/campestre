/* =====================================================================
   04-CONTENIDO.JS · Dibuja las tarjetas, la lista del formulario y los asesores
   ---------------------------------------------------------------------
   Lee las listas de js/02-datos.js y crea el HTML. Por eso, para cambiar
   un proyecto NO hay que tocar index.html: solo 02-datos.js.
   ===================================================================== */
(function () {
  var I = window.Inicio;
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- Tarjetas de proyecto ---------- */
  var pila = $("#pila");
  if (pila) {
    pila.innerHTML = I.proyectos.map(function (p, i) {
      /* data-muro="oculta": las tarjetas que NO ve quien aún no se registra */
      var muro = p.nom === I.config.PROYECTO_VISIBLE ? "visible" : "oculta";
      return '' +
      '<article class="tarjeta" style="--i:' + i + '" data-muro="' + muro + '">' +
        '<div class="tarjeta-foto">' +
          '<img src="' + p.foto + '" alt="' + p.alt + '" loading="' + (i === 0 ? "eager" : "lazy") + '">' +
          (p.destacado ? '<span class="tarjeta-etiqueta">Destacado</span>' : '') +
        '</div>' +
        '<div class="tarjeta-cuerpo">' +
          '<h3>' + p.nom + '</h3>' +
          '<p class="tarjeta-donde">' + p.donde + '</p>' +
          '<p class="tarjeta-cifra"><b>' + p.cifra + '</b>' + p.cifraTxt + '</p>' +
          '<ul class="tarjeta-datos">' + p.datos.map(function (d) { return '<li>' + d + '</li>'; }).join("") + '</ul>' +
          '<p class="tarjeta-amen">' + p.amen + '</p>' +
          '<div class="tarjeta-cta">' +
            '<button class="boton" type="button" data-interes="' + p.nom + '">Me interesa</button>' +
            '<a class="enlace-sub" href="' + p.url + '">Ver proyecto</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  /* ---------- Lista "Proyecto de interés" del formulario ---------- */
  var lista = $("#proyecto");
  if (lista) {
    lista.insertAdjacentHTML("beforeend",
      I.proyectos.map(function (p) { return '<option>' + p.nom + '</option>'; }).join("") +
      '<option>Otro</option>');
  }

  /* ---------- Asesores ---------- */
  var equipo = $("#equipo-lista");
  if (equipo) {
    equipo.innerHTML = I.asesores.map(function (x) {
      return '' +
      '<li class="asesor">' +
        '<div class="asesor-caja">' +
          '<button class="asesor-foto" type="button" aria-expanded="false" aria-label="' + x.n + ' ' + x.a + ': ver opciones">' +
            '<img src="img/inicio/asesor-' + x.slug + '.webp" width="420" height="420" alt="" loading="lazy">' +
          '</button>' +
          '<a class="asesor-ver" href="asesores/' + x.slug + '.html" aria-label="Ver perfil de ' + x.n + ' ' + x.a + '">Ver perfil</a>' +
        '</div>' +
        '<p class="asesor-nombre"><b>' + x.n + '</b>' + x.a + '</p>' +
      '</li>';
    }).join("");

    /* En el celular no hay mouse: un toque sube la foto y muestra "Ver perfil" */
    var cerrarOtros = function (excepto) {
      document.querySelectorAll(".asesor.arriba").forEach(function (li) {
        if (li === excepto) return;
        li.classList.remove("arriba");
        li.querySelector(".asesor-foto").setAttribute("aria-expanded", "false");
      });
    };
    equipo.querySelectorAll(".asesor-foto").forEach(function (boton) {
      boton.addEventListener("click", function () {
        var li = boton.closest(".asesor"), abierto = li.classList.contains("arriba");
        cerrarOtros(li);
        li.classList.toggle("arriba", !abierto);
        boton.setAttribute("aria-expanded", String(!abierto));
      });
    });
    document.addEventListener("pointerdown", function (e) { if (!e.target.closest(".asesor")) cerrarOtros(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarOtros(); });
  }
})();
