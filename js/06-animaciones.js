/* =====================================================================
   06-ANIMACIONES.JS · Scroll suave (Lenis) y animaciones al bajar (GSAP)
   ---------------------------------------------------------------------
   Las dos librerías están guardadas en js/vendor/ (no se descargan de
   internet). IMPORTANTE: si por cualquier razón no cargan, la página
   sigue funcionando completa, solo sin los movimientos.
   También se apaga todo si la persona pidió "menos movimiento".
   ===================================================================== */
(function () {
  var I = window.Inicio;
  var $ = function (s) { return document.querySelector(s); };
  var reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hayGsap = !!(window.gsap && window.ScrollTrigger);
  var lenis = null;

  if (hayGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Scroll suave de la rueda del mouse (en celular se usa el scroll normal) ---------- */
  if (!reducir && window.Lenis) {
    try {
      lenis = new Lenis({ lerp: 0.09 });
      if (hayGsap) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        var cuadro = function (t) { lenis.raf(t); requestAnimationFrame(cuadro); };
        requestAnimationFrame(cuadro);
      }
    } catch (e) { lenis = null; }
  }

  /* Ir a una parte de la página con movimiento suave (lo usan los enlaces #) */
  I.irA = function (el) {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -8, duration: 1.3 });
    else el.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
  };

  /* Mientras la ventana de registro está abierta, la página de atrás no se mueve */
  document.addEventListener("inicio:puerta-abierta", function () { if (lenis) lenis.stop(); });
  document.addEventListener("inicio:puerta-cerrada", function () { if (lenis) lenis.start(); });

  if (!hayGsap || reducir) return;

  /* ---------- Portada: la foto baja más lento que la página ---------- */
  var portada = $("#inicio");
  gsap.to("#portadaMedia", {
    y: function () { return portada.offsetHeight * 0.12; }, ease: "none",
    scrollTrigger: { trigger: portada, start: "top top", end: "bottom top", scrub: true }
  });

  /* ---------- Tarjetas: cada una se encoge y oscurece cuando la siguiente la cubre ---------- */
  var animTarjetas = [];
  function armarTarjetas() {
    animTarjetas.forEach(function (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
    animTarjetas = [];
    /* solo las que se ven (quien no se registró tiene tarjetas ocultas) */
    var tarjetas = [].slice.call(document.querySelectorAll(".tarjeta")).filter(function (c) {
      return c.getClientRects().length > 0;
    });
    tarjetas.forEach(function (c, i) {
      c.style.transform = ""; c.style.removeProperty("--dim");
      var siguiente = tarjetas[i + 1];
      if (!siguiente) return;
      var idx = +siguiente.style.getPropertyValue("--i") || (i + 1);
      animTarjetas.push(gsap.to(c, {
        scale: 0.94, "--dim": 0.55, ease: "none",
        scrollTrigger: { trigger: siguiente, start: "top 88%", end: "top " + (14 + idx * 14) + "px", scrub: true }
      }));
    });
  }
  armarTarjetas();

  /* ---------- Cifras: cuentan al entrar ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var fin = +el.dataset.count, o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: function () {
        el.textContent = "0";
        gsap.to(o, { v: fin, duration: 1.6, ease: "power2.out", onUpdate: function () { el.textContent = Math.round(o.v); } });
      }
    });
  });

  /* ---------- Pasos: la línea se llena y cada número se enciende ---------- */
  gsap.fromTo("#rielRelleno", { scaleY: 0 }, {
    scaleY: 1, ease: "none",
    scrollTrigger: { trigger: ".pasos-lista", start: "top 65%", end: "bottom 65%", scrub: true }
  });
  document.querySelectorAll(".paso").forEach(function (p) {
    ScrollTrigger.create({
      trigger: p, start: "top 65%",
      onEnter: function () { p.classList.add("encendido"); },
      onLeaveBack: function () { p.classList.remove("encendido"); }
    });
  });

  /* ---------- Al registrarse aparecen más tarjetas: se recalcula todo ---------- */
  document.addEventListener("inicio:desbloqueado", function () {
    armarTarjetas();
    ScrollTrigger.refresh();
  });
})();
