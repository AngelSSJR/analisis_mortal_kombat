// ACTIVIDAD - ANÁLISIS DE DATOS CON JAVASCRIPT
// Tema: Análisis de sesiones de Mortal Kombat y rendimiento
// Estudiante: Angel

// ============================================================================
// 1. ESTRUCTURA DE DATOS PRINCIPAL
// ============================================================================

//cost sesionesjuego creo la constante para que no cambie el valor, esta lista contiene un array de ojetos de registros
//cada {} es un objeto que representa las sesiones del juego. Las propiedades (clave: valor) describen esa sesion
const sesionesJuego = [
  { id: 1, fecha: "2026-04-15", duracion: 120, eventos: ["calentamiento", "pausa_media", "victoria"], descanso: 480, rendimiento: true },
  { id: 2, fecha: "2026-04-16", duracion: 90, eventos: ["calentamiento", "juego_casual"], descanso: 420, rendimiento: true },
  { id: 3, fecha: "2026-04-17", duracion: 180, eventos: ["sin_calentamiento", "frustración", "sin_pausa"], descanso: 300, rendimiento: false },
  { id: 4, fecha: "2026-04-18", duracion: 60, eventos: ["calentamiento", "pausa_media"], descanso: 480, rendimiento: true },
  { id: 5, fecha: "2026-04-19", duracion: 150, eventos: ["sin_calentamiento", "frustración"], descanso: 360, rendimiento: false },
  { id: 6, fecha: "2026-04-20", duracion: 100, eventos: ["calentamiento", "victoria", "pausa_media"], descanso: 510, rendimiento: true },
  { id: 7, fecha: "2026-04-21", duracion: 200, eventos: ["sin_calentamiento", "frustración", "sin_pausa"], descanso: 330, rendimiento: false },
  { id: 8, fecha: "2026-04-22", duracion: 75, eventos: ["calentamiento", "pausa_media"], descanso: 480, rendimiento: true },
  { id: 9, fecha: "2026-04-23", duracion: 140, eventos: ["calentamiento", "victoria", "pausa_media"], descanso: 450, rendimiento: true },
  { id: 10, fecha: "2026-04-24", duracion: 170, eventos: ["sin_calentamiento", "frustración"], descanso: 360, rendimiento: false },
  { id: 11, fecha: "2026-04-25", duracion: 110, eventos: ["calentamiento", "pausa_media"], descanso: 480, rendimiento: true }
];

// ============================================================================
// 2. FUNCIONES
// ============================================================================

// Función 1: Agregar registros:
// esta funcion toma 6 parametros como datos de entrada. el .push es necesario para agregar un elemento al final del array
function agregarRegistro(id, fecha, duracion, eventos, descanso, rendimiento) {
  sesionesJuego.push({ id, fecha, duracion, eventos, descanso, rendimiento });
  //con este console.log confirma la entrada del objeto
  console.log(`Registro agregado: ${fecha}`);
}

// Función 2: Obtener eventos únicos
// new Set le agrege esto para que no tener datos duplicados
function obtenerEventosUnicos() {
  const eventos = new Set();
  for (const sesion of sesionesJuego) {
    for (const evento of sesion.eventos) {
      // .add agrega un elemnto al set pero tambien el se encarga de ignorar los datos duplicados es decir que si el dato ya estaba el .add lo ignora y no crea duplicado
      eventos.add(evento);
    }
  }
  return Array.from(eventos);
}

// Función 3: Análisis por evento

function analisePorEvento() {
  const analisis = {};
  const eventos = obtenerEventosUnicos();
  
  // Inicializar contadores
  for (const evento of eventos) {
    analisis[evento] = { total: 0, exitos: 0, porcentaje: 0 };
  }
  
  // Conteo
  for (const sesion of sesionesJuego) {
    for (const evento of sesion.eventos) {
      analisis[evento].total += 1;
      if (sesion.rendimiento === true) {
        analisis[evento].exitos += 1;
      }
    }
  }
  
  // Calcular porcentajes
  for (const evento in analisis) {
    analisis[evento].porcentaje = Math.round((analisis[evento].exitos / analisis[evento].total) * 100);
  }
  
  return analisis;
}

// Función 4: Eventos positivos
function eventosPositivos() {
  const analisis = analisePorEvento();
  return Object.entries(analisis)
    .map(([evento, datos]) => ({ evento, ...datos }))
    .sort((a, b) => b.porcentaje - a.porcentaje);
}

// Función 5: Eventos Negativos
function eventosNegativos() {
  const analisis = analisePorEvento();
  return Object.entries(analisis)
    .map(([evento, datos]) => ({ evento, fracaso: 100 - datos.porcentaje, ...datos }))
    .sort((a, b) => b.fracaso - a.fracaso);
}

// Función 6: Relación sueño-rendimiento
function analisisSueno() {
  let buenSueno = { total: 0, exitos: 0 };
  let suenioMedio = { total: 0, exitos: 0 };
  let pocoSueno = { total: 0, exitos: 0 };
  
  for (const sesion of sesionesJuego) {
    if (sesion.descanso >= 480) {
      buenSueno.total += 1;
      if (sesion.rendimiento) buenSueno.exitos += 1;
    } else if (sesion.descanso >= 360) {
      suenioMedio.total += 1;
      if (sesion.rendimiento) suenioMedio.exitos += 1;
    } else {
      pocoSueno.total += 1;
      if (sesion.rendimiento) pocoSueno.exitos += 1;
    }
  }
  // Math.round se coloca para que redondee el numero
  return {
    buenSueno: Math.round((buenSueno.exitos / buenSueno.total) * 100),
    suenioMedio: Math.round((suenioMedio.exitos / suenioMedio.total) * 100),
    pocoSueno: pocoSueno.total > 0 ? Math.round((pocoSueno.exitos / pocoSueno.total) * 100) : 0
  };
}

// ============================================================================
// 3. SALIDA DE RESULTADOS
// ============================================================================

console.log(" ╔══════════════════════════════════════════════════════╗");
console.log(" ║      ANÁLISIS: MORTAL KOMBAT Y RENDIMIENTO           ║");
console.log(" ╚══════════════════════════════════════════════════════╝\n");

// Estadísticas generales
const exitosas = sesionesJuego.filter(s => s.rendimiento === true).length;
// se colocaa el .length para saber el tamaño del array
console.log(`Sesiones analizadas: ${sesionesJuego.length}`);
console.log(`Sesiones exitosas: ${exitosas} (${Math.round((exitosas/sesionesJuego.length)*100)}%)`);
console.log(`Sesiones fallidas: ${sesionesJuego.length - exitosas}\n`);

// Eventos únicos
const eventos = obtenerEventosUnicos();
console.log(`Eventos identificados: ${eventos.length}`);
console.log(`${eventos.join(", ")}\n`);

// Eventos positivos 
console.log("EVENTOS CON MAYOR IMPACTO POSITIVO");
console.log("─".repeat(50));
eventosPositivos().slice(0, 5).forEach((e, i) => {
  console.log(`${i + 1}. ${e.evento}: ${e.porcentaje}% (${e.exitos}/${e.total})`);
});
console.log();

// Eventos negativos
console.log("EVENTOS CON MAYOR IMPACTO NEGATIVO");
console.log("─".repeat(50)); //.repeat colocamos esto para que muestre en pantalla el caracter del gion 50 veces
eventosNegativos().slice(0, 5).forEach((e, i) => {
  console.log(`${i + 1}. ${e.evento}: ${e.fracaso}% de fracaso`);
});
console.log();

// Análisis de sueño
const sueno = analisisSueno();
console.log("RELACIÓN SUEÑO Y RENDIMIENTO");
console.log("─".repeat(50));
console.log(`Buen sueño (8+ horas): ${sueno.buenSueno}% de éxito`);
console.log(`Sueño medio (6-7 horas): ${sueno.suenioMedio}% de éxito`);
console.log(`Poco sueño (<6 horas): ${sueno.pocoSueno}% de éxito\n`);

// Conclusiones
const top = eventosPositivos()[0];
const worst = eventosNegativos()[0];
console.log("CONCLUSIONES");
console.log("─".repeat(50));
console.log(`Mejor evento: ${top.evento.toUpperCase()} (${top.porcentaje}% de éxito)`);
console.log(`Peor evento: ${worst.evento.toUpperCase()} (${worst.fracaso}% de fracaso)`);
console.log(`El sueño es crítico: 8+ horas = ${sueno.buenSueno}% de éxito\n`);

// Ejemplo: agregar un registro nuevo
console.log("Agregando nueva sesión...");
agregarRegistro(12, "2026-04-26", 95, ["calentamiento", "victoria", "pausa_media"], 480, true);
console.log(`Total de sesiones: ${sesionesJuego.length}\n`);




