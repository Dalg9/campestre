/* =====================================================================
   02-DATOS.JS · Proyectos y asesores
   ---------------------------------------------------------------------
   AQUÍ SE EDITA EL CONTENIDO. Para agregar, quitar o cambiar un proyecto
   basta con tocar esta lista: las tarjetas y la lista del formulario se
   arman solas (lo hace js/04-contenido.js).

   Solo se promocionan lotes con ESCRITURA INDIVIDUAL.

   Campos de cada proyecto:
     nom        → nombre (también es lo que llega a la columna "proyecto" del Sheet)
     foto       → imagen en img/inicio/
     alt        → descripción de la foto (para personas con lector de pantalla)
     donde      → ubicación en una línea
     cifra      → el número grande de la tarjeta
     cifraTxt   → lo que se cuenta con ese número
     datos      → dos datos cortos
     amen       → amenidades en una frase
     url        → carpeta de la página propia del proyecto
     destacado  → true muestra la etiqueta "Destacado"
   ===================================================================== */
window.Inicio = window.Inicio || {};

Inicio.proyectos = [
  { nom: "Le Mont Reserve", foto: "img/inicio/lemont.webp", destacado: true, url: "lemont/",
    alt: "Vista desde un lote de Le Mont Reserve hacia las montañas, con nubes en el horizonte",
    donde: "Parcelación en Restrepo – Medina, Meta",
    cifra: "116", cifraTxt: "lotes campestres",
    datos: ["Mirador panorámico y senderos", "Zonas de hamacas y fogata"],
    amen: "Mirador, senderos, gimnasio y parque infantil" },

  { nom: "Condominio Santorini Reservado", foto: "img/inicio/santorini.webp", url: "santorini/",
    alt: "Vista aérea de la zona social de Santorini Reservado con la glorieta de ingreso y el salón social",
    donde: "Condominio en la vereda Los Medios, Restrepo",
    cifra: "59", cifraTxt: "parcelas de 515, 1.100 y 2.200 m²",
    datos: ["Ingreso por vía pavimentada", "Salón social de 90 m²"],
    amen: "Fútbol 5, parques infantiles y fuente hídrica" },

  { nom: "Los Chíguiros Club Campestre", foto: "img/inicio/chiguiros.webp", url: "chiguiros/",
    alt: "Vista aérea de las vías y lotes en construcción de Los Chíguiros",
    donde: "Club campestre en la vía a Puerto López, Villavicencio",
    cifra: "6", cifraTxt: "zonas sociales, con laguna y sendero ecológico",
    datos: ["Etapa Flor Morado con escritura individual", "Club con piscina de 100 m²"],
    amen: "Laguna, tenis, piscina y squash" },

  { nom: "Hacienda Inglesa", foto: "img/inicio/hacienda.webp", url: "hacienda-inglesa/",
    alt: "Piscina del club de Hacienda Inglesa rodeada de palmas",
    donde: "Club campestre en el km 24 de la vía a Puerto López",
    cifra: "86", cifraTxt: "lotes campestres y 4 comerciales",
    datos: ["A solo 15 minutos de Villavicencio", "Club con piscina y salón de eventos"],
    amen: "Piscina, cancha múltiple, cabañas y sendero" },

  { nom: "Colina Campestre Reservado", foto: "img/inicio/colina.webp", url: "colina-campestre-reservado/",
    alt: "Vista aérea de los lotes de Colina Campestre Reservado rodeados de pasto y árboles",
    donde: "Parcelación cerrada en Restrepo, Meta",
    cifra: "33", cifraTxt: "lotes desde 500 m²",
    datos: ["Lotes con escritura individual", "Piscina, senderos y zonas deportivas"],
    amen: "Piscina, portería, sendero y cancha" }
];

/* Asesores: "slug" es el nombre de su página en asesores/<slug>.html
   y de su foto en img/inicio/asesor-<slug>.webp
   (Los WhatsApp NO van aquí: se manejan en asesores.js) */
Inicio.asesores = [
  { slug: "ana-maria-suache",   n: "Ana María",   a: "Suache" },
  { slug: "juan-camilo-vargas", n: "Juan Camilo", a: "Vargas" },
  { slug: "erika-sanchez",      n: "Erika",       a: "Sánchez" },
  { slug: "daniel-lopez-gomez", n: "Daniel",      a: "López" },
  { slug: "harold-diaz",        n: "Harold",      a: "Díaz" }
];
