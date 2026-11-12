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
     tour           enlace externo de un tour 360° (Kuula). Abre en otra pestaña.
     tour360        recorrido 360° PROPIO, dentro de la página (visor Pannellum).
                    Cada espacio es una foto 360° en img/360/<id>-<espacio>.jpg
                    (por ejemplo img/360/casa-caudal-sala.jpg). Ejemplo:
                      tour360:{
                        inicio:"sala",
                        escenas:[
                          {id:"sala",   titulo:"Sala",   flechas:[{a:"cocina", yaw:40,   pitch:-5}]},
                          {id:"cocina", titulo:"Cocina", flechas:[{a:"sala",   yaw:-140, pitch:-5}]}
                        ]
                      }
                    "a" es el id del espacio al que lleva la flecha. yaw y pitch
                    dicen DÓNDE se dibuja: se sacan con el modo editor (ver LEEME.txt).
                    Si un espacio no tiene flechas igual se puede abrir desde la
                    lista de espacios que aparece abajo en el visor.
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
    tour360:{inicio:"calle", escenas:[
      {id:"calle", titulo:"Calle y fachada", yaw:-172, flechas:[{a:"garaje", yaw:-172, pitch:-16, mira:95}]},
      {id:"garaje", titulo:"Garaje", flechas:[{a:"calle", yaw:-85, pitch:-8, mira:8}, {a:"entrada", yaw:115, pitch:-8, mira:-136}]},
      {id:"entrada", titulo:"Entrada", flechas:[{a:"garaje", yaw:44, pitch:-6, mira:-65}, {a:"sala", yaw:-135, pitch:-6, mira:28}, {a:"escaleras", yaw:-26, pitch:-10, mira:112}]},
      {id:"sala", titulo:"Sala y comedor", flechas:[{a:"entrada", yaw:-152, pitch:-8, mira:45}, {a:"cocina", yaw:167, pitch:-10, mira:72}]},
      {id:"cocina", titulo:"Cocina", flechas:[{a:"sala", yaw:-108, pitch:-18, mira:-13}, {a:"entrada", yaw:144, pitch:-10}]},
      {id:"escaleras", titulo:"Escaleras", flechas:[{a:"entrada", yaw:-68, pitch:-43, mira:154}, {a:"alcoba", yaw:-30, pitch:-6, mira:171}, {a:"cuarto-ropa", yaw:38, pitch:-6, mira:-27}]},
      {id:"alcoba", titulo:"Alcoba principal", flechas:[{a:"escaleras", yaw:-9, pitch:-10, mira:150}, {a:"balcon", yaw:-162, pitch:-6, mira:140}, {a:"vestier", yaw:120, pitch:-8, mira:-20}]},
      {id:"balcon", titulo:"Balcón", flechas:[{a:"alcoba", yaw:-40, pitch:-11, mira:18}]},
      {id:"vestier", titulo:"Vestier", flechas:[{a:"alcoba", yaw:-144, pitch:-6}]},
      {id:"cuarto-ropa", titulo:"Cuarto de ropa", flechas:[{a:"bano", yaw:-169, pitch:-10, mira:-166}, {a:"escaleras", yaw:153, pitch:-6}]},
      {id:"bano", titulo:"Baño", flechas:[{a:"cuarto-ropa", yaw:14, pitch:-6, mira:11}]}
    ]},
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
    tour360:{inicio:"porton", escenas:[
      {id:"porton", titulo:"Portón de entrada", yaw:180, flechas:[{a:"patio", yaw:-178, pitch:-14, mira:-90}, {a:"costado", yaw:80, pitch:-17, mira:95}]},
      {id:"patio", titulo:"Patio frontal", flechas:[{a:"porton", yaw:90, pitch:-8, mira:2}, {a:"porche", yaw:-155, pitch:-8, mira:-175}, {a:"arbol", yaw:-55, pitch:-24, mira:-120}]},
      {id:"arbol", titulo:"Árbol del patio", flechas:[{a:"patio", yaw:60, pitch:-20, mira:125}]},
      {id:"porche", titulo:"Porche", flechas:[{a:"sala", yaw:-154, pitch:-10, mira:180}, {a:"patio", yaw:5, pitch:-22, mira:25}]},
      {id:"sala", titulo:"Sala", flechas:[{a:"porche", yaw:0, pitch:-10, mira:26}, {a:"comedor", yaw:62, pitch:-8, mira:50}, {a:"bano-social", yaw:-169, pitch:-8, mira:-25}, {a:"habitacion-1", yaw:-124, pitch:-12, mira:-92}, {a:"alcoba-principal", yaw:-140, pitch:3, mira:10}, {a:"lavanderia", yaw:153, pitch:-8, mira:-25}]},
      {id:"comedor", titulo:"Comedor", flechas:[{a:"sala", yaw:-130, pitch:-12, mira:-118}, {a:"cocina", yaw:165, pitch:-12, mira:174}]},
      {id:"cocina", titulo:"Cocina", flechas:[{a:"comedor", yaw:-6, pitch:-10, mira:-15}]},
      {id:"bano-social", titulo:"Baño social", flechas:[{a:"sala", yaw:155, pitch:-10, mira:11}]},
      {id:"habitacion-1", titulo:"Habitación 1", flechas:[{a:"sala", yaw:88, pitch:-8, mira:54}]},
      {id:"alcoba-principal", titulo:"Alcoba principal", flechas:[{a:"sala", yaw:-170, pitch:-6, mira:42}, {a:"bano-principal", yaw:-99, pitch:-6, mira:-118}]},
      {id:"bano-principal", titulo:"Baño de la alcoba", flechas:[{a:"alcoba-principal", yaw:62, pitch:-12, mira:81}]},
      {id:"habitacion-3", titulo:"Habitación 3", flechas:[{a:"lavanderia", yaw:154, pitch:-8, mira:-25}]},
      {id:"lavanderia", titulo:"Zona de ropas", yaw:-25, flechas:[{a:"sala", yaw:-34, pitch:-16, mira:-27}, {a:"habitacion-3", yaw:-16, pitch:-4, mira:-26}, {a:"jardin", yaw:138, pitch:-8, mira:8}]},
      {id:"costado", titulo:"Costado de la casa", flechas:[{a:"porton", yaw:-85, pitch:-8, mira:-100}, {a:"patio-trasero", yaw:120, pitch:-10, mira:30}]},
      {id:"patio-trasero", titulo:"Patio trasero", flechas:[{a:"costado", yaw:-150, pitch:-14, mira:-60}, {a:"pozo", yaw:18, pitch:-14, mira:60}]},
      {id:"pozo", titulo:"Pozo y caseta", flechas:[{a:"patio-trasero", yaw:-120, pitch:-12, mira:-162}, {a:"jardin-2", yaw:118, pitch:-14, mira:75}]},
      {id:"jardin-2", titulo:"Jardín del pozo", flechas:[{a:"pozo", yaw:-105, pitch:-12, mira:-62}, {a:"jardin", yaw:90, pitch:-16, mira:150}]},
      {id:"jardin", titulo:"Jardín trasero", flechas:[{a:"jardin-2", yaw:-30, pitch:-16, mira:-90}, {a:"jardin-3", yaw:100, pitch:-16, mira:79}, {a:"lavanderia", yaw:-172, pitch:-6, mira:-42}]},
      {id:"jardin-3", titulo:"Jardín lateral", flechas:[{a:"jardin", yaw:-101, pitch:-20, mira:-80}]}
    ]},
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
    tour360:{inicio:"fachada", escenas:[
      {id:"fachada", titulo:"Fachada y jardín", yaw:70, flechas:[{a:"zaguan", yaw:-178, pitch:-10, mira:-80}, {a:"sala", yaw:56, pitch:-2, mira:34}]},
      {id:"zaguan", titulo:"Escaleras y pasillo", flechas:[{a:"sala-2", yaw:-160, pitch:-8, mira:-162}, {a:"fachada", yaw:100, pitch:-10, mira:2}]},
      {id:"sala-2", titulo:"Sala, hacia los cuartos", flechas:[{a:"zaguan", yaw:18, pitch:-8, mira:20}, {a:"sala", yaw:-62, pitch:-10, mira:-82}, {a:"habitacion-1", yaw:-170, pitch:4, mira:76}, {a:"habitacion-2", yaw:170, pitch:4, mira:-142}, {a:"habitacion-3", yaw:180, pitch:-18, mira:18}]},
      {id:"sala", titulo:"Sala y comedor", flechas:[{a:"fachada", yaw:-146, pitch:-8, mira:-124}, {a:"cocina", yaw:-100, pitch:-8, mira:165}, {a:"sala-2", yaw:98, pitch:-8, mira:118}]},
      {id:"cocina", titulo:"Cocina", flechas:[{a:"sala", yaw:-15, pitch:-6, mira:80}]},
      {id:"habitacion-1", titulo:"Habitación 1", flechas:[{a:"sala-2", yaw:-104, pitch:-8, mira:10}]},
      {id:"habitacion-2", titulo:"Habitación 2", flechas:[{a:"sala-2", yaw:38, pitch:-8, mira:-10}]},
      {id:"habitacion-3", titulo:"Habitación 3 con balcón", flechas:[{a:"sala-2", yaw:-162, pitch:-14, mira:0}, {a:"bano", yaw:-176, pitch:0, mira:-50}, {a:"balcon", yaw:-90, pitch:-6, mira:30}]},
      {id:"bano", titulo:"Baño", flechas:[{a:"habitacion-3", yaw:130, pitch:-6, mira:4}]},
      {id:"balcon", titulo:"Balcón", flechas:[{a:"habitacion-3", yaw:-150, pitch:-6, mira:90}]}
    ]},
    ficha:[["Tipo","Apartamento, primer piso"],["Estado","Usado"],["Habitaciones","3, una con balcón propio"],["Baños","1"],["Piso","1, sin escaleras"]],
    caracts:["Primer piso, sin escaleras","Sala con salida a balcón","Habitación con balcón propio","Zona residencial consolidada"],
    cerca:["Tiendas Ara y D1, a menos de 1 minuto","Megacolegio Luis Carlos Galán, a 5 minutos","Centro Comercial Viva Villavicencio, a 5 km"]
  },
  {
    id:"casa-quinta-llanerita", tipo:"Casa", ciudad:"Villavicencio",
    nombre:"Casa Quinta La Llanerita", precioCorto:"$600M", precio:"$600.000.000",
    ubicacion:"Vereda La Llanerita · Villavicencio, Meta",
    negocio:"Venta",
    fotos:16, hab:3, ban:3,
    tour360:{inicio:"patio", escenas:[
      {id:"patio", titulo:"Patio frontal", yaw:-40, flechas:[{a:"patio-2", yaw:-20, pitch:-22, mira:-48}, {a:"huerto", yaw:85, pitch:-8, mira:-80}, {a:"porche", yaw:-5, pitch:-3, mira:-85}, {a:"corredor", yaw:-80, pitch:-6, mira:160}]},
      {id:"patio-2", titulo:"Patio y piscina", flechas:[{a:"patio", yaw:132, pitch:-14, mira:160}, {a:"piscina", yaw:-48, pitch:-12, mira:170}, {a:"zona-social", yaw:-112, pitch:-6, mira:-60}]},
      {id:"piscina", titulo:"Piscina", flechas:[{a:"patio-2", yaw:-10, pitch:-12, mira:132}]},
      {id:"huerto", titulo:"Huerto de frutales", flechas:[{a:"patio", yaw:100, pitch:-8, mira:-95}]},
      {id:"porche", titulo:"Porche", flechas:[{a:"patio", yaw:95, pitch:-10, mira:175}, {a:"alcoba-principal", yaw:-178, pitch:-3, mira:-43}]},
      {id:"alcoba-principal", titulo:"Alcoba principal", flechas:[{a:"porche", yaw:137, pitch:-3, mira:2}, {a:"bano-principal", yaw:172, pitch:-8, mira:167}]},
      {id:"bano-principal", titulo:"Baño de la alcoba principal", flechas:[{a:"alcoba-principal", yaw:-13, pitch:-10, mira:-8}]},
      {id:"corredor", titulo:"Corredor", flechas:[{a:"patio", yaw:-20, pitch:-14, mira:100}, {a:"habitacion-azul", yaw:166, pitch:-3, mira:-30}, {a:"habitacion-camas", yaw:-172, pitch:-12, mira:42}]},
      {id:"habitacion-azul", titulo:"Habitación azul", flechas:[{a:"corredor", yaw:150, pitch:-3, mira:-14}, {a:"bano", yaw:75, pitch:-8, mira:72}]},
      {id:"bano", titulo:"Baño", flechas:[{a:"habitacion-azul", yaw:-108, pitch:-8, mira:-105}]},
      {id:"habitacion-camas", titulo:"Habitación de dos camas", flechas:[{a:"corredor", yaw:-138, pitch:-8, mira:8}]},
      {id:"zona-social", titulo:"Zona social", flechas:[{a:"patio-2", yaw:120, pitch:-10, mira:68}, {a:"cocina", yaw:165, pitch:-15, mira:30}]},
      {id:"cocina", titulo:"Cocina", flechas:[{a:"zona-social", yaw:-150, pitch:-12, mira:-15}]}
    ]},
    ficha:[["Tipo","Casa quinta"],["Habitaciones","3"],["Baños","3"],["Cocina","Sí"],["Sala comedor","Sí"]],
    caracts:["Cocina","Sala comedor","3 habitaciones","3 baños"]
  }
];
