(() => {
  const CLAVE_PROGRESO = "codeReminderProgreso";

  // Por ahora usamos 5 lecciones de prueba.
  // Más adelante vamos a cargar todas las lecciones en code.data.js.
  const leccionesFundamentos = [
    {
      id: 1,
      titulo: "console.log()",
      categoria: "FUNDAMENTOS",
      descripcion:
        "Sirve para mostrar información en la consola del navegador. Es muy útil para comprobar valores mientras programamos.",
      sintaxis:
        "console.log(valor);",
      parametros:
        "Dentro de los paréntesis se coloca el valor que queremos mostrar. Puede ser texto, números, variables, arrays u objetos.",
      ejemplo:
        'console.log("Hola mundo");',
      explicacion:
        'Este código muestra "Hola mundo" en la consola del navegador.',
      pregunta:
        'Completá el código para mostrar "Hola" en la consola.',
      codigo:
        'console.____("Hola");',
      respuesta:
        "log",
      pista:
        "Es un método de tres letras."
    },

    {
      id: 2,
      titulo: "let",
      categoria: "FUNDAMENTOS",
      descripcion:
        "let permite declarar una variable cuyo valor puede cambiar durante la ejecución del programa.",
      sintaxis:
        "let nombre = valor;",
      parametros:
        "Después de let se escribe el nombre de la variable y, si queremos, se le asigna un valor usando =.",
      ejemplo:
`let puntos = 10;

puntos = 20;`,
      explicacion:
        "La variable puntos empieza valiendo 10 y después cambia a 20.",
      pregunta:
        "Completá el código para declarar una variable que pueda cambiar.",
      codigo:
        "____ puntos = 10;",
      respuesta:
        "let",
      pista:
        "Tiene tres letras y empieza con l."
    },

    {
      id: 3,
      titulo: "const",
      categoria: "FUNDAMENTOS",
      descripcion:
        "const permite declarar una variable que no puede ser reasignada después de crearla.",
      sintaxis:
        "const nombre = valor;",
      parametros:
        "Después de const se escribe el nombre y se asigna un valor inicial.",
      ejemplo:
        'const aplicacion = "Quizzter";',
      explicacion:
        'La constante aplicacion guarda el texto "Quizzter".',
      pregunta:
        "Completá el código para declarar una constante.",
      codigo:
        '____ nombre = "Quizzter";',
      respuesta:
        "const",
      pista:
        "Empieza con c."
    },

    {
      id: 4,
      titulo: "Asignación =",
      categoria: "FUNDAMENTOS",
      descripcion:
        "El operador = se utiliza para asignar un valor a una variable.",
      sintaxis:
        "variable = valor;",
      parametros:
        "A la izquierda se coloca la variable y a la derecha el valor que queremos guardar.",
      ejemplo:
`let nivel;

nivel = 5;`,
      explicacion:
        "El número 5 queda guardado dentro de la variable nivel.",
      pregunta:
        "¿Qué símbolo falta para guardar 100 en puntos?",
      codigo:
        "let puntos ___ 100;",
      respuesta:
        "=",
      pista:
        "Es el símbolo utilizado para asignar valores."
    },

    {
      id: 5,
      titulo: "Multiplicación *",
      categoria: "FUNDAMENTOS",
      descripcion:
        "El operador * permite multiplicar números en JavaScript.",
      sintaxis:
        "valor1 * valor2",
      parametros:
        "Se coloca un valor a cada lado del operador.",
      ejemplo:
        "let resultado = 5 * 4;",
      explicacion:
        "5 multiplicado por 4 produce 20.",
      pregunta:
        "¿Qué operador utiliza JavaScript para multiplicar?",
      codigo:
        "let resultado = 5 ___ 4;",
      respuesta:
        "*",
      pista:
        "JavaScript no utiliza la letra x."
    }
  ];

  const parametrosURL =
    new URLSearchParams(window.location.search);

  const moduloActual =
    Number(parametrosURL.get("modulo")) || 1;

  let numeroActual =
    Number(parametrosURL.get("leccion")) || 1;

  // En esta parte solo está preparado el módulo 1.
  if (moduloActual !== 1) {
    window.location.href = "code.reminder.html";
    return;
  }

  if (
    numeroActual < 1 ||
    numeroActual > leccionesFundamentos.length
  ) {
    numeroActual = 1;
  }

  let indiceActual = numeroActual - 1;

  const numeroLeccion =
    document.getElementById("numeroLeccion");

  const progresoLeccion =
    document.getElementById("progresoLeccion");

  const categoriaLeccion =
    document.getElementById("categoriaLeccion");

  const tituloLeccion =
    document.getElementById("tituloLeccion");

  const descripcionLeccion =
    document.getElementById("descripcionLeccion");

  const sintaxisLeccion =
    document.getElementById("sintaxisLeccion");

  const parametrosLeccion =
    document.getElementById("parametrosLeccion");

  const ejemploLeccion =
    document.getElementById("ejemploLeccion");

  const explicacionEjemplo =
    document.getElementById("explicacionEjemplo");

  const preguntaPractica =
    document.getElementById("preguntaPractica");

  const codigoPractica =
    document.getElementById("codigoPractica");

  const respuestaPractica =
    document.getElementById("respuestaPractica");

  const btnComprobarPractica =
    document.getElementById("btnComprobarPractica");

  const resultadoPractica =
    document.getElementById("resultadoPractica");

  const btnSiguienteLeccion =
    document.getElementById("btnSiguienteLeccion");

  function leerProgreso() {
    try {
      return JSON.parse(
        localStorage.getItem(CLAVE_PROGRESO)
      ) || {};
    } catch (error) {
      console.error(
        "No se pudo leer el progreso:",
        error
      );

      return {};
    }
  }

  function guardarProgreso(progreso) {
    localStorage.setItem(
      CLAVE_PROGRESO,
      JSON.stringify(progreso)
    );
  }

  function guardarLeccionCompletada(idLeccion) {
    const progreso = leerProgreso();

    if (!Array.isArray(progreso[moduloActual])) {
      progreso[moduloActual] = [];
    }

    if (
      !progreso[moduloActual].includes(idLeccion)
    ) {
      progreso[moduloActual].push(idLeccion);
    }

    guardarProgreso(progreso);
  }

  function cargarLeccion() {
    const leccion =
      leccionesFundamentos[indiceActual];

    numeroLeccion.textContent =
      `Lección ${leccion.id} de ${leccionesFundamentos.length}`;

    progresoLeccion.style.width =
      (leccion.id / leccionesFundamentos.length) *
        100 +
      "%";

    categoriaLeccion.textContent =
      leccion.categoria;

    tituloLeccion.textContent =
      leccion.titulo;

    descripcionLeccion.textContent =
      leccion.descripcion;

    sintaxisLeccion.textContent =
      leccion.sintaxis;

    parametrosLeccion.textContent =
      leccion.parametros;

    ejemploLeccion.textContent =
      leccion.ejemplo;

    explicacionEjemplo.textContent =
      leccion.explicacion;

    preguntaPractica.textContent =
      leccion.pregunta;

    codigoPractica.textContent =
      leccion.codigo;

    respuestaPractica.value = "";
    respuestaPractica.disabled = false;

    btnComprobarPractica.disabled = false;

    resultadoPractica.innerHTML = "";

    btnSiguienteLeccion.classList.add(
      "oculto"
    );

    if (
      indiceActual ===
      leccionesFundamentos.length - 1
    ) {
      btnSiguienteLeccion.textContent =
        "Finalizar módulo";
    } else {
      btnSiguienteLeccion.textContent =
        "Siguiente lección →";
    }
  }

  function comprobarRespuesta() {
    const leccion =
      leccionesFundamentos[indiceActual];

    const respuestaUsuario =
      respuestaPractica.value
        .trim()
        .toLowerCase();

    const respuestaCorrecta =
      leccion.respuesta
        .trim()
        .toLowerCase();

    if (!respuestaUsuario) {
      resultadoPractica.innerHTML = `
        <div class="code-error">
          Escribí una respuesta primero.
        </div>
      `;

      return;
    }

    if (
      respuestaUsuario === respuestaCorrecta
    ) {
      resultadoPractica.innerHTML = `
        <div class="code-correcto">
          <strong>✅ ¡Correcto!</strong>

          <p>${leccion.explicacion}</p>
        </div>
      `;

      guardarLeccionCompletada(leccion.id);

      respuestaPractica.disabled = true;
      btnComprobarPractica.disabled = true;

      btnSiguienteLeccion.classList.remove(
        "oculto"
      );
    } else {
      resultadoPractica.innerHTML = `
        <div class="code-error">
          <strong>❌ Todavía no.</strong>

          <p>💡 ${leccion.pista}</p>
        </div>
      `;

      respuestaPractica.focus();
    }
  }

  btnComprobarPractica.addEventListener(
    "click",
    comprobarRespuesta
  );

  respuestaPractica.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Enter") {
        comprobarRespuesta();
      }
    }
  );

  btnSiguienteLeccion.addEventListener(
    "click",
    function () {
      if (
        indiceActual <
        leccionesFundamentos.length - 1
      ) {
        const siguiente = numeroActual + 1;

        window.location.href =
          `code.leccion.html?modulo=1&leccion=${siguiente}`;
      } else {
        window.location.href =
          "code.reminder.html";
      }
    }
  );

  cargarLeccion();
})();
