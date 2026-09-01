// ____________________________________________________________________________
// SESIÓN — requiere db.js cargado antes en el HTML (usa obtenerSesion/cerrarSesion)
// ____________________________________________________________________________

// Si no hay sesión activa, no dejamos ver el quiz: se manda al usuario a login
if (!obtenerSesion()) {
  window.location.href = "login.html";
}

// ____________________________________________________________________________
// CONFIGURACIÓN
// ____________________________________________________________________________

// Cuántas preguntas al azar se muestran por partida (si el nivel tiene menos, se muestran todas)
const CANTIDAD_PREGUNTAS_POR_QUIZ = 10;

// ____________________________________________________________________________
// BASE DE DATOS DE PREGUNTAS, ORGANIZADA POR MATERIA Y NIVEL DE DIFICULTAD
// ____________________________________________________________________________

const datosQuiz = {
  tlp: {
    facil: [
      {
        question: "¿Qué propiedad de CSS se usa para activar Flexbox?",
        options: ["display: flex", "position: absolute", "float: left", "align-items: center"],
        correct: 0
      },
      {
        question: "¿Qué etiqueta HTML se utiliza para enlazar una hoja de estilos CSS?",
        options: ["<script>", "<style>", "<link>", "<href>"],
        correct: 2
      },
      {
        question: "En HTML, ¿para qué sirve la etiqueta <footer>?",
        options: ["Para el encabezado", "Para la barra de navegación", "Para el contenido principal", "Para el pie de página"],
        correct: 3
      },
      {
        question: "En Git, ¿qué comando se utiliza para inicializar un nuevo repositorio local?",
        options: ["git init", "git push", "git commit", "git start"],
        correct: 0
      },
      {
        question: "¿Qué comando de Git se usa para añadir archivos al 'staging area' antes de un commit?",
        options: ["git status", "git add", "git upload", "git save"],
        correct: 1
      },
      {
        question: "¿Cuál es la extensión de archivo común para una hoja de estilos de CSS?",
        options: [".css", ".txt", ".js", ".html"],
        correct: 0
      },
      {
        question: "¿Cuál de estas es una etiqueta HTML para crear un Hipervínculo?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        correct: 0
      },
      {
        question: "¿Qué etiqueta HTML se usa para crear una lista no ordenada?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        correct: 1
      },
      {
        question: "¿Qué etiqueta se utiliza para insertar una imagen en HTML?",
        options: ["<image>", "<pic>", "<img>", "<src>"],
        correct: 2
      },
      {
        question: "¿Qué significa la sigla HTML?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "HyperLink Text Machine", "Home Tool Markup Language"],
        correct: 0
      },
      {
        question: "¿Cuál de estas etiquetas representa el título de mayor jerarquía?",
        options: ["<h6>", "<title>", "<h1>", "<head>"],
        correct: 2
      },
      {
        question: "¿Qué símbolo se usa para comentar una línea en JavaScript?",
        options: ["#", "//", "<!-- -->", "/* */"],
        correct: 1
      }
    ],
    medio: [
      {
        question: "¿Qué es una variable en programación?",
        options: ["Un tipo de lenguaje de bajo nivel", "Una función que ejecuta código repetidamente", "Un espacio en memoria para almacenar un dato que puede cambiar", "Un valor que nunca cambia durante la ejecución"],
        correct: 2
      },
      {
        question: "¿Cuál es la función principal de HTML en el desarrollo web?",
        options: ["Definir la estructura y el contenido del documento", "Gestionar la base de datos del servidor", "Dar estilo y colores a la página", "Crear animaciones e interactividad compleja"],
        correct: 0
      },
      {
        question: "En lógica de programación, ¿qué estructura se usa para decidir entre dos caminos basándose en una condición?",
        options: ["While", "Array", "For", "If/Else"],
        correct: 3
      },
      {
        question: "¿Qué tipo de dato representa solo dos valores: verdadero o falso?",
        options: ["Float", "String", "Boolean", "Integer"],
        correct: 2
      },
      {
        question: "En Git, ¿para qué sirve el comando 'git log'?",
        options: ["Para editar el código fuente", "Para borrar el historial", "Para ver el historial de commits realizados", "Para crear una cuenta en Github"],
        correct: 2
      },
      {
        question: "¿Qué lenguaje se utiliza principalmente para añadir interactividad en el lado del cliente (navegador)?",
        options: ["JavaScript", "Java", "Python", "SQL"],
        correct: 0
      },
      {
        question: "En CSS, ¿qué símbolo se usa para seleccionar un elemento por su ID?",
        options: ["El punto (.)", "El asterisco (*)", "El numeral (#)", "La arroba (@)"],
        correct: 2
      },
      {
        question: "¿Qué es un array (arreglo) en programación?",
        options: ["Una colección ordenada de elementos", "Un tipo de bucle", "Una función matemática", "Un archivo de configuración"],
        correct: 0
      },
      {
        question: "¿Qué hace el método push() sobre un array en JavaScript?",
        options: ["Elimina el primer elemento", "Agrega un elemento al final del array", "Ordena el array alfabéticamente", "Cuenta los elementos del array"],
        correct: 1
      },
      {
        question: "¿Qué comando de Git se usa para crear una nueva rama (branch)?",
        options: ["git branch nombre", "git new nombre", "git create nombre", "git rama nombre"],
        correct: 0
      },
      {
        question: "¿Qué es una función en programación?",
        options: ["Un bloque de código reutilizable que realiza una tarea específica", "Una variable que nunca cambia", "Un archivo de estilos", "Un tipo de base de datos"],
        correct: 0
      },
      {
        question: "En JavaScript, ¿qué diferencia principal hay entre '==' y '==='?",
        options: ["No hay ninguna diferencia", "'===' compara valor y tipo de dato, '==' solo el valor", "'==' es más rápido siempre", "'===' solo funciona con números"],
        correct: 1
      }
    ],
    dificil: [
      {
        question: "¿Qué operador lógico devuelve verdadero solo si AMBAS condiciones son verdaderas?",
        options: ["OR (||)", "XOR", "AND (&&)", "NOT (!)"],
        correct: 2
      },
      {
        question: "¿Cuál es la diferencia principal entre Git y GitHub?",
        options: ["Son exactamente lo mismo", "Git es el sistema de control de versiones local; GitHub aloja esos repositorios en la nube", "GitHub es un lenguaje de programación y Git es un editor de texto", "Git es para diseño web y GitHub para bases de datos"],
        correct: 1
      },
      {
        question: "¿Cómo se llama el proceso de repetir un bloque de código mientras se cumple una condición?",
        options: ["Variable", "Encapsulamiento", "Iteración o Bucle", "Compilación"],
        correct: 2
      },
      {
        question: "¿Qué significa que un lenguaje sea de 'Alto nivel'?",
        options: ["Que solo corre en computadoras muy potentes", "Que es un lenguaje que ya no se usa", "Que es muy difícil de aprender", "Que se parece más al lenguaje humano que al de máquina"],
        correct: 3
      },
      {
        question: "En un algoritmo, ¿qué es el 'pseudocódigo'?",
        options: ["El código final que entiende la computadora", "Un virus informático", "Un lenguaje exclusivo de bases de datos", "Una forma de escribir lógica usando lenguaje natural estructurado"],
        correct: 3
      },
      {
        question: "¿Qué comando de Git se usa para traer los cambios desde un repositorio remoto al local?",
        options: ["git add", "git remote", "git push", "git pull"],
        correct: 3
      },
      {
        question: "¿Qué es la recursividad en programación?",
        options: ["Un bucle infinito por error", "Una función que se llama a sí misma para resolver un problema", "Un tipo de variable global", "Una forma de comentar el código"],
        correct: 1
      },
      {
        question: "¿Qué es un 'merge conflict' en Git?",
        options: ["Un error de sintaxis en el código", "Cuando dos ramas modifican la misma línea de un archivo de forma distinta y Git no puede combinarlas solo", "Un tipo de commit especial", "Un problema de conexión a internet"],
        correct: 1
      },
      {
        question: "¿Para qué se utiliza la notación 'Big O' en programación?",
        options: ["Para nombrar variables", "Para medir la complejidad/eficiencia de un algoritmo", "Para definir el tipo de dato", "Para versionar el código"],
        correct: 1
      },
      {
        question: "En JavaScript, ¿cuál es la principal diferencia entre 'let' y 'var'?",
        options: ["No hay diferencia real", "'let' tiene alcance de bloque, 'var' tiene alcance de función", "'var' es más moderno que 'let'", "'let' no permite reasignar valores"],
        correct: 1
      },
      {
        question: "¿Qué es una API?",
        options: ["Un lenguaje de programación", "Un conjunto de reglas que permite que dos programas se comuniquen entre sí", "Un tipo de base de datos", "Un editor de código"],
        correct: 1
      },
      {
        question: "¿Qué hace el comando 'git merge'?",
        options: ["Elimina una rama", "Combina los cambios de una rama con otra", "Sube el código a GitHub", "Crea un nuevo repositorio"],
        correct: 1
      }
    ]
  },
  matematicas: {
    facil: [
      {
        question: "¿Qué es una función matemática?",
        options: ["Una relación que asigna a cada elemento de un conjunto exactamente un elemento de otro conjunto", "Un conjunto de números primos", "Una ecuación sin solución", "Una figura geométrica"],
        correct: 0
      },
      {
        question: "Si f(x) = x + 3, ¿cuánto vale f(2)?",
        options: ["3", "5", "6", "2"],
        correct: 1
      },
      {
        question: "Si f(x) = 2x, ¿cuánto vale f(0)?",
        options: ["0", "2", "1", "No existe"],
        correct: 0
      },
      {
        question: "¿Qué es una matriz en matemáticas?",
        options: ["Un arreglo rectangular de números ordenados en filas y columnas", "Un tipo de ecuación", "Un conjunto de vectores sin orden", "Una operación entre fracciones"],
        correct: 0
      },
      {
        question: "¿Cuántas filas y columnas tiene una matriz de 2x3?",
        options: ["3 filas y 2 columnas", "2 filas y 3 columnas", "5 filas y 5 columnas", "2 filas y 2 columnas"],
        correct: 1
      },
      {
        question: "¿Cómo se llama una matriz donde el número de filas es igual al número de columnas?",
        options: ["Matriz nula", "Matriz identidad", "Matriz cuadrada", "Matriz fila"],
        correct: 2
      },
      {
        question: "¿Qué símbolo representa la unión de conjuntos?",
        options: ["∩", "∪", "∈", "⊂"],
        correct: 1
      },
      {
        question: "¿Qué símbolo representa la intersección de conjuntos?",
        options: ["∪", "∈", "∩", "∅"],
        correct: 2
      },
      {
        question: "Si A = {1, 2, 3} y B = {3, 4, 5}, ¿cuál es A ∩ B?",
        options: ["{1,2,3,4,5}", "{3}", "{1,2}", "{}"],
        correct: 1
      },
      {
        question: "¿Qué es una proposición lógica?",
        options: ["Un enunciado que puede ser verdadero o falso, pero no ambas cosas a la vez", "Cualquier oración del idioma", "Una pregunta sin respuesta", "Un número entero"],
        correct: 0
      },
      {
        question: "¿Cuál es la negación de la proposición 'Hoy llueve'?",
        options: ["Hoy hace frío", "Hoy no llueve", "Mañana llueve", "Hoy llueve mucho"],
        correct: 1
      },
      {
        question: "¿Qué símbolo representa la conjunción lógica (Y)?",
        options: ["∨", "¬", "∧", "→"],
        correct: 2
      }
    ],
    medio: [
      {
        question: "Si f(x) = x² - 1, ¿cuánto vale f(3)?",
        options: ["6", "8", "9", "10"],
        correct: 1
      },
      {
        question: "¿Cuál es el dominio de la función f(x) = 1/x?",
        options: ["Todos los números reales", "Todos los reales excepto 0", "Solo los números positivos", "Solo los números negativos"],
        correct: 1
      },
      {
        question: "Si f(x) = 3x + 2 y g(x) = x - 1, ¿cuánto vale f(g(2))?",
        options: ["5", "7", "8", "3"],
        correct: 0
      },
      {
        question: "Al sumar las matrices A=[[1,2],[3,4]] y B=[[5,6],[7,8]], ¿cuál es el resultado?",
        options: ["[[6,8],[10,12]]", "[[5,12],[21,32]]", "[[4,4],[4,4]]", "[[1,2],[3,4]]"],
        correct: 0
      },
      {
        question: "¿Cuál es la matriz identidad de 2x2?",
        options: ["[[0,0],[0,0]]", "[[1,1],[1,1]]", "[[1,0],[0,1]]", "[[2,0],[0,2]]"],
        correct: 2
      },
      {
        question: "Para poder multiplicar una matriz A (de tamaño m x n) por una matriz B (de tamaño p x q), ¿qué condición se debe cumplir?",
        options: ["m debe ser igual a q", "n debe ser igual a p", "m debe ser igual a p", "No hay ninguna condición"],
        correct: 1
      },
      {
        question: "Si A = {1,2,3,4} y B = {2,4,6}, ¿cuál es A ∪ B?",
        options: ["{2,4}", "{1,2,3,4,6}", "{1,3}", "{6}"],
        correct: 1
      },
      {
        question: "¿Qué representa el conjunto vacío (∅)?",
        options: ["Un conjunto con infinitos elementos", "Un conjunto que no tiene ningún elemento", "El conjunto de todos los números", "Un error matemático"],
        correct: 1
      },
      {
        question: "Si A ⊂ B, ¿qué significa esta relación?",
        options: ["A y B son iguales", "A no tiene relación con B", "Todos los elementos de A también están en B", "B está contenido en A"],
        correct: 2
      },
      {
        question: "Si p es verdadero (V) y q es falso (F), ¿cuál es el valor de p ∧ q?",
        options: ["Verdadero", "Falso", "Depende del contexto", "No se puede saber"],
        correct: 1
      },
      {
        question: "¿Qué representa el símbolo → en lógica proposicional?",
        options: ["Negación", "Disyunción", "Conjunción", "Implicación (condicional)"],
        correct: 3
      },
      {
        question: "Si p es verdadero y q es falso, ¿cuál es el valor de p ∨ q?",
        options: ["Verdadero", "Falso", "Indefinido", "Ambas cosas"],
        correct: 0
      }
    ],
    dificil: [
      {
        question: "¿Cuál es la función inversa de f(x) = 2x + 3?",
        options: ["f⁻¹(x) = (x-3)/2", "f⁻¹(x) = 2x-3", "f⁻¹(x) = (x+3)/2", "f⁻¹(x) = x/2 - 3"],
        correct: 0
      },
      {
        question: "¿Por qué f(x) = x² NO es una función inyectiva en todo su dominio?",
        options: ["Porque no está definida para x=0", "Porque f(2) = f(-2) = 4, dos entradas distintas dan la misma salida", "Porque no tiene imagen", "Porque no es continua"],
        correct: 1
      },
      {
        question: "¿Qué tipo de función es f(x) = eˣ?",
        options: ["Función lineal", "Función cuadrática", "Función exponencial", "Función logarítmica"],
        correct: 2
      },
      {
        question: "¿Cómo se calcula el determinante de una matriz 2x2 [[a,b],[c,d]]?",
        options: ["a+d-b-c", "ad - bc", "ac - bd", "a×b×c×d"],
        correct: 1
      },
      {
        question: "¿Qué es la matriz inversa de A?",
        options: ["La misma matriz A transpuesta", "Una matriz A⁻¹ tal que A × A⁻¹ = matriz identidad", "Una matriz con todos sus valores negativos", "Una matriz llena de ceros"],
        correct: 1
      },
      {
        question: "Si el determinante de una matriz es igual a 0, ¿qué se puede afirmar de ella?",
        options: ["Es una matriz identidad", "Tiene infinitas inversas", "No tiene matriz inversa (es singular)", "Es una matriz cuadrada perfecta"],
        correct: 2
      },
      {
        question: "Dado el universo U = {1,2,...,10} y A = {2,4,6,8}, ¿cuál es el complemento de A?",
        options: ["{1,3,5,7,9,10}", "{2,4,6,8}", "{}", "{1,2,...,10}"],
        correct: 0
      },
      {
        question: "Según la Ley de De Morgan, ¿a qué es igual (A ∪ B)'?",
        options: ["A' ∪ B'", "A ∩ B", "A' ∩ B'", "A ∪ B"],
        correct: 2
      },
      {
        question: "¿Cuántos subconjuntos tiene un conjunto de 4 elementos?",
        options: ["8", "12", "16", "4"],
        correct: 2
      },
      {
        question: "En la proposición p → q, si p es falso, ¿cuál es el valor de verdad de toda la proposición?",
        options: ["Siempre falso", "Siempre verdadero, sin importar el valor de q", "Depende de q únicamente", "Indeterminado"],
        correct: 1
      },
      {
        question: "¿Qué es una tautología en lógica proposicional?",
        options: ["Una proposición que siempre es falsa", "Una proposición que siempre es verdadera, sin importar los valores de sus variables", "Una proposición sin sentido", "Una proposición que depende del contexto"],
        correct: 1
      },
      {
        question: "¿Cuál es la contrapositiva de la proposición 'si p entonces q'?",
        options: ["Si q entonces p", "Si no p entonces no q", "Si no q entonces no p", "Si p entonces no q"],
        correct: 2
      }
    ]
  }
};

// ____________________________________________________________________________
// UTILIDADES DE ALEATORIEDAD
// ____________________________________________________________________________

// Mezcla un array sin modificar el original (algoritmo Fisher-Yates)
function mezclarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// ____________________________________________________________________________
// ESTADO GENERAL
// ____________________________________________________________________________

let materiaSeleccionada = null;
let nivelSeleccionado = null;
let preguntasActuales = [];
let indicePreguntaActual = 0;
let puntaje = 0;

const nombresMaterias = {
  tlp: "TLP - Taller de Lenguajes de Programación",
  matematicas: "Matemáticas"
};

// Referencias a las secciones
const seccionMaterias = document.getElementById('seccion-materias');
const seccionNivel = document.getElementById('seccion-nivel');
const contenedorQuiz = document.getElementById('contenedor-quiz');
const textoMateriaElegida = document.getElementById('texto-materia-elegida');
const btnVolverMaterias = document.getElementById('btn-volver-materias');

// Referencias del quiz
const textoPregunta = document.getElementById('texto-pregunta');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const numeroPreguntaActual = document.getElementById('numero-pregunta-actual');
const totalPreguntas = document.getElementById('total-preguntas');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnCerrarSesion = document.getElementById('btn-cerrarSesion');

// ____________________________________________________________________________
// PASO 1: SELECCIÓN DE MATERIA
// ____________________________________________________________________________

document.querySelectorAll('.tarjeta-materia:not(.tarjeta-bloqueada)').forEach((tarjeta) => {
  tarjeta.addEventListener('click', () => {
    materiaSeleccionada = tarjeta.dataset.materia;
    textoMateriaElegida.innerText = nombresMaterias[materiaSeleccionada];

    seccionMaterias.style.display = 'none';
    seccionNivel.style.display = 'block';
  });
});

// ____________________________________________________________________________
// PASO 2: SELECCIÓN DE NIVEL DE DIFICULTAD
// ____________________________________________________________________________

document.querySelectorAll('.tarjeta-nivel').forEach((tarjeta) => {
  tarjeta.addEventListener('click', () => {
    nivelSeleccionado = tarjeta.dataset.nivel;

    // Tomamos el banco completo de preguntas de ese nivel, lo mezclamos
    // y nos quedamos con una cantidad limitada al azar
    const bancoDePreguntas = datosQuiz[materiaSeleccionada][nivelSeleccionado];
    preguntasActuales = mezclarArray(bancoDePreguntas).slice(0, Math.min(CANTIDAD_PREGUNTAS_POR_QUIZ, bancoDePreguntas.length));

    // Reiniciamos el estado del quiz
    indicePreguntaActual = 0;
    puntaje = 0;

    seccionNivel.style.display = 'none';
    contenedorQuiz.style.display = 'block';
    document.querySelector('.encabezado-quiz').style.display = 'block';

    totalPreguntas.innerText = preguntasActuales.length;
    cargarPregunta();
  });
});

btnVolverMaterias.addEventListener('click', () => {
  seccionNivel.style.display = 'none';
  seccionMaterias.style.display = 'block';
});

// ____________________________________________________________________________
// PASO 3: LÓGICA DEL QUIZ
// ____________________________________________________________________________

// Función para renderizar la pregunta en pantalla
function cargarPregunta() {
  limpiarEstado();
  let preguntaActual = preguntasActuales[indicePreguntaActual];

  numeroPreguntaActual.innerText = indicePreguntaActual + 1;
  textoPregunta.innerText = preguntaActual.question;

  // Armamos las opciones con referencia a si son correctas o no, y las mezclamos
  const opcionesConEstado = preguntaActual.options.map((opcion, indice) => ({
    texto: opcion,
    esCorrecta: indice === preguntaActual.correct
  }));
  const opcionesMezcladas = mezclarArray(opcionesConEstado);

  // Creamos los botones de respuesta ya en orden aleatorio
  opcionesMezcladas.forEach((item) => {
    const boton = document.createElement('button');
    boton.innerText = item.texto;
    boton.dataset.correcta = item.esCorrecta;
    boton.addEventListener('click', () => seleccionarRespuesta(boton));
    contenedorOpciones.appendChild(boton);
  });
}

// Limpia la pantalla para la siguiente tanda
function limpiarEstado() {
  btnSiguiente.style.display = 'none';
  contenedorOpciones.innerHTML = '';
}

// Ejecución cuando el usuario toca una opción
function seleccionarRespuesta(botonSeleccionado) {
  const todosLosBotones = contenedorOpciones.querySelectorAll('button');

  // Bloqueamos todos los botones para que no cambie el voto
  todosLosBotones.forEach(btn => btn.disabled = true);

  const esCorrecta = botonSeleccionado.dataset.correcta === 'true';

  if (esCorrecta) {
    botonSeleccionado.classList.add('correcto');
    puntaje++;
  } else {
    botonSeleccionado.classList.add('incorrecto');
    // Te marca en verde la que era correcta para aprender del error
    const botonCorrecto = [...todosLosBotones].find(btn => btn.dataset.correcta === 'true');
    if (botonCorrecto) botonCorrecto.classList.add('correcto');
  }

  // Mostramos el botón siguiente
  btnSiguiente.style.display = 'block';
}

// Evento del botón "Siguiente"
btnSiguiente.addEventListener('click', () => {
  indicePreguntaActual++;
  if (indicePreguntaActual < preguntasActuales.length) {
    cargarPregunta();
  } else {
    mostrarResultados();
  }
});

function mostrarResultados() {
  limpiarEstado();
  document.querySelector('.encabezado-quiz').style.display = 'none';
  textoPregunta.innerHTML = `<span style="display:block; text-align:center; font-size: 26px;">¡Quiz Terminado! 🎉</span>`;
  contenedorOpciones.innerHTML = `
    <p style="font-size: 18px; color: #667570; text-align: center; margin: 10px 0;">Puntaje final: <strong style="color:#198754; font-size:22px;">${puntaje}</strong> de ${preguntasActuales.length}</p>
    <button id="btn-reintentar" style="margin-top: 10px;">Elegir otra materia o nivel</button>
  `;

  document.getElementById('btn-reintentar').addEventListener('click', () => {
    contenedorQuiz.style.display = 'none';
    seccionMaterias.style.display = 'block';
  });
}

// ____________________________________________________________________________
// CERRAR SESIÓN
// ____________________________________________________________________________

if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener('click', () => {
    const confirmar = confirm('¿Seguro que quieres cerrar sesión?');
    if (confirmar) {
      cerrarSesion();
      window.location.href = 'login.html';
    }
  });
}
