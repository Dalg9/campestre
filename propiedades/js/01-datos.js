/* PROPIEDADES · 01-datos.js
   LOS DATOS. Aquí se agregan, editan o quitan publicaciones. */

/* ============================================================
   DATOS — para agregar una propiedad, copia un bloque y edítalo.
   Las fotos van en img/ con el nombre <id>-1.jpg, <id>-2.jpg...
   (la -1 es la portada). Todos los campos son opcionales salvo los
   básicos: solo se muestra lo que la propiedad tenga.
     lote, constr   áreas en m² (con los dos se dibuja la comparación)
     hab, ban       habitaciones y baños
     negocio        "Venta" o "Venta o permuta"
     escritura      true → muestra el sello de escritura individual
     asesor         nombre EXACTO como está en asesores.js. Si lo pones,
                    el WhatsApp de esa propiedad va SIEMPRE a ese asesor.
                    Si no lo pones, rota entre todos como el resto del sitio.
     precioNota     texto bajo el precio (por defecto "precio de venta")
     cerca          lista de lugares cercanos
     tour           enlace del tour 360° (Kuula)
   ============================================================ */
const PROPIEDADES = [
  {
    id:"casa-caudal", tipo:"Casa", ciudad:"Villavicencio",
    nombre:"Casa Esquinera", precioCorto:"$1.020M", precio:"$1.020.000.000",
    ubicacion:"Calle 47A No 29B-07, Barrio El Caudal · Villavicencio, Meta",
    negocio:"Venta o permuta", escritura:true,
    fotos:3, lote:145.47, constr:145.4, hab:3, ban:3,
    ficha:[["Tipo","Casa esquinera"],["Área lote","145,47 m²"],["Área construida","145,4 m²"],["Habitaciones","3"],["Baños","3"],["Parqueadero","3 carros"]],
    caracts:["Parqueadero 3 carros","Amplio depósito","Cocina integral","Sala, comedor","Baño auxiliar"]
  },
  {
    id:"casa-pompeya", tipo:"Casa", ciudad:"Villavicencio",
    nombre:"Casa Pompeya", precioCorto:"$380M", precio:"$380.000.000",
    ubicacion:"Vereda Pompeya Bajo, Condominio Santa Isabel · Villavicencio, Meta",
    negocio:"Venta o permuta", escritura:true,
    fotos:2, lote:500, constr:121, hab:3, ban:1,
    ficha:[["Tipo","Casa en condominio"],["Área lote","500 m²"],["Área construida","121 m²"],["Habitaciones","3"],["Baños","1"]],
    caracts:["Parqueadero","Parque infantil","Zona BBQ","Cocina integral","Sala comedor","Zonas verdes"]
  },
  {
    id:"lote-trapiche", tipo:"Lote", ciudad:"Restrepo",
    nombre:"Lote Comercial Trapiche", precioCorto:"$340M", precio:"$340.000.000",
    ubicacion:"Vereda Choapal, sobre vía nacional Villavicencio–Restrepo · Restrepo, Meta",
    negocio:"Venta o permuta", escritura:true,
    fotos:1, lote:683.4, uso:"Comercial",
    ficha:[["Tipo","Lote"],["Área lote","683,4 m²"],["Uso","Comercial"]],
    caracts:["Sobre vía nacional","Uso comercial","Escritura pública individual"]
  },
  {
    id:"apto-timiza", tipo:"Apto", ciudad:"Bogotá",
    nombre:"Apartamento Timiza", precioCorto:"$230M", precio:"$230.000.000",
    ubicacion:"Calle 42D sur #72h-87, Bloque 5-2, Apto 202 · Bogotá D.C.",
    negocio:"Venta o permuta", escritura:true,
    fotos:2, constr:52, hab:3, ban:1,
    ficha:[["Tipo","Apartamento"],["Área","52 m²"],["Habitaciones","3"],["Baños","1"]],
    caracts:["Cocina integral","Sala comedor","3 habitaciones"]
  },
  /* ---- Propiedades de Ana María Suache (su WhatsApp va solo a ella) ---- */
  {
    id:"casa-rosa-blanca", tipo:"Casa", ciudad:"Villavicencio",
    nombre:"Casa Rosa Blanca Oriental", precioCorto:"$370M", precio:"$370.000.000",
    ubicacion:"Barrio Rosa Blanca Oriental · Villavicencio, Meta",
    negocio:"Venta", asesor:"Ana María Suache", escritura:true,
    fotos:6, hab:2, ban:3,
    ficha:[["Tipo","Casa, 2 pisos"],["Estado","Usada, remodelada"],["Habitaciones","2, con baño privado"],["Baños","3 (incluye medio baño)"],["Parqueadero","1"],["Estrato","3"]],
    caracts:["Cocina moderna","Balcón","Terraza","Baño en habitación principal","Espacio para vestier","Clósets","Zona de lavado independiente","Gas domiciliario","Acceso pavimentado"],
    cerca:["Centro Comercial Viva Villavicencio, a 10 min caminando","Parque del barrio, a 1 min","Colegios"]
  },
  {
    id:"casa-campestre-barcelona", tipo:"Casa", ciudad:"Villavicencio",
    nombre:"Casa Campestre Vereda Barcelona", precioCorto:"$420M", precio:"$420.000.000",
    ubicacion:"Vereda Barcelona · Villavicencio, Meta",
    negocio:"Venta", asesor:"Ana María Suache", escritura:true,
    fotos:10, lote:680, constr:190, hab:3, ban:2,
    ficha:[["Tipo","Casa campestre, 1 piso"],["Estado","Usada"],["Área lote","680 m²"],["Área construida","190 m²"],["Habitaciones","3, la principal con baño privado"],["Baños","2"],["Parqueadero","Sí, en terreno amplio"]],
    caracts:["Cocina amplia","Comedor","Sala familiar","Baño en habitación principal","Depósito","Cochera","Jardín","Zona campestre","Dos vías de acceso"],
    cerca:["A unos 15 minutos de Villavicencio","Universidad de los Llanos","Colegios y universidades","Transporte público","Tiendas de barrio"]
  },
  {
    id:"apto-ciudad-jardin", tipo:"Apto", ciudad:"Villavicencio",
    nombre:"Apartamento Ciudad Jardín", precioCorto:"$135M", precio:"$135.000.000", precioNota:"precio de venta, negociable",
    ubicacion:"Barrio Ciudad Jardín · Villavicencio, Meta",
    negocio:"Venta", asesor:"Ana María Suache", escritura:true,
    fotos:3, hab:3, ban:1,
    ficha:[["Tipo","Apartamento, primer piso"],["Estado","Usado"],["Habitaciones","3, una con balcón propio"],["Baños","1"],["Piso","1, sin escaleras"]],
    caracts:["Primer piso, sin escaleras","Sala con salida a balcón","Habitación con balcón propio","Zona residencial consolidada"],
    cerca:["Tiendas Ara y D1, a menos de 1 minuto","Megacolegio Luis Carlos Galán, a 5 minutos","Centro Comercial Viva Villavicencio, a 5 km"]
  }
];
