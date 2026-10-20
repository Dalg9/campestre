/* VEHÍCULOS · 01-datos.js
   LOS DATOS. Aquí se agregan, editan o quitan publicaciones. */

/* ============================================================
   DATOS — para agregar un vehículo, copia un bloque y edítalo.
   Las fotos van en img/ con el nombre <id>-1.jpg, <id>-2.jpg...
   (la -1 es la portada).
   Fuente: ficha técnica de cada vehículo (marca, línea, modelo,
   tipo, color, cilindrada, combustible, kilometraje, valor).
   NUNCA se publica la tarjeta de propiedad ni otro dato sensible.
   Opcional: asesor → nombre EXACTO de asesores.js para que el
   WhatsApp de ese vehículo vaya siempre a esa persona.
   ============================================================ */
const VEHICULOS = [
  {
    id:"bmw", tipo:"Automóvil", nombre:"BMW 740i", precio:"$70.000.000", fotos:4,
    ficha:{"Marca":"BMW","Línea":"740i","Modelo":"2008","Tipo":"Automóvil","Color":"Gris Titán Metalizado","Cilindrada":"4.0","Combustible":"Gasolina","Kilometraje":"130.564 km"}
  },
  {
    id:"foton", tipo:"Camioneta", nombre:"Foton BJ2037Y3MDV", precio:"$88.000.000", fotos:3,
    ficha:{"Marca":"Foton","Línea":"BJ2037Y3MDV","Modelo":"2020","Tipo":"Camioneta","Color":"Gris","Cilindrada":"2.776","Combustible":"Diésel","Kilometraje":"120.184 km"}
  },
  {
    id:"kia-sportage", tipo:"Camioneta", nombre:"Kia New Sportage LX", precio:"$45.000.000", fotos:4,
    ficha:{"Marca":"Kia","Línea":"New Sportage LX","Modelo":"2011","Tipo":"Camioneta","Color":"Gris","Cilindrada":"1.975","Combustible":"Gasolina","Kilometraje":"190.604 km"}
  },
  {
    id:"nissan", tipo:"Camioneta", nombre:"Nissan D22 / NP300", precio:"$60.000.000", fotos:3,
    ficha:{"Marca":"Nissan","Línea":"D22 / NP300","Modelo":"2013","Tipo":"Camioneta","Color":"Negro","Cilindrada":"2.488","Combustible":"Diésel","Kilometraje":"157.698 km"}
  },
  {
    id:"renault-clio", tipo:"Automóvil", nombre:"Renault Clio", precio:"$12.000.000", fotos:3,
    ficha:{"Marca":"Renault","Línea":"Clio","Modelo":"1997","Tipo":"Automóvil","Color":"Rojo Dínamo Perlado","Cilindrada":"1.400","Combustible":"Gasolina","Kilometraje":"273.531 km"}
  },
  {
    id:"ssangyong", tipo:"Campero", nombre:"SsangYong Rexton", precio:"$175.000.000", fotos:4,
    ficha:{"Marca":"SsangYong","Línea":"Rexton","Modelo":"2024","Tipo":"Campero","Color":"Gris Elemental","Cilindrada":"2.157","Combustible":"Diésel","Kilometraje":"18.355 km"}
  },
  {
    id:"volkswagen-jetta", tipo:"Automóvil", nombre:"Volkswagen Jetta Trendline", precio:"$36.000.000", fotos:3,
    ficha:{"Marca":"Volkswagen","Línea":"Jetta Trendline","Modelo":"2015","Tipo":"Automóvil","Color":"Negro Profundo Perlado","Cilindrada":"1.984","Combustible":"Gasolina","Kilometraje":"86.690 km"}
  },
  {
    id:"volkswagen-saveiro", tipo:"Camioneta", nombre:"Volkswagen Saveiro", precio:"$42.000.000", fotos:3,
    ficha:{"Marca":"Volkswagen","Línea":"Saveiro","Modelo":"2019","Tipo":"Camioneta","Color":"Plata Sirius Metálico","Cilindrada":"1.6","Combustible":"Gasolina","Kilometraje":"61.079 km"}
  }
];
