(() => {
  const VERSION_CODE_REMINDER = "20260825-1";

  function cargarDatosCodeReminder() {
    if (window.CODE_REMINDER_DATA) {
      return Promise.resolve(window.CODE_REMINDER_DATA);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `assets/js/code-data.js?v=${VERSION_CODE_REMINDER}`;
      script.onload = () => resolve(window.CODE_REMINDER_DATA);
      script.onerror = () => reject(new Error("No se pudo cargar code-data.js"));
      document.head.appendChild(script);
    });
  }

  function obtenerUsuarioActual() {
    const usuario = obtenerSesion();

    if (!usuario) {
      window.location.href = "login.html";
      return null;
    }

    return usuario;
  }

  function obtenerClaveProgreso(usuario) {
    return "codeReminderProgreso_" + usuario.id;
  }

  function leerProgreso(usuario) {
    const clave = obtenerClaveProgreso(usuario);

    try {
      let progreso = JSON.parse(localStorage.getItem(clave)) || {};

      // Compatibilidad con la versión vieja, donde Fundamentos era un array directo.
      if (Array.isArray(progreso)) {
        progreso = { 1: progreso };
        localStorage.setItem(clave, JSON.stringify(progreso));
      }

      return progreso;
    } catch (error) {
      console.error("No se pudo leer el progreso de Code Reminder:", error);
      return {};
    }
  }

  function progresoValidoModulo(progreso, modulo) {
    const guardado = Array.isArray(progreso[modulo.id])
      ? progreso[modulo.id]
      : [];

    return [...new Set(guardado)]
      .filter((id) => Number.isInteger(Number(id)))
      .map(Number)
      .filter((id) => id >= 1 && id <= modulo.cantidad);
  }

  function moduloDesbloqueado(modulo, modulos, progreso) {
    if (modulo.id === 1) return true;

    const anterior = modulos.find((m) => m.id === modulo.id - 1);
    if (!anterior) return false;

    return progresoValidoModulo(progreso, anterior).length >= anterior.cantidad;
  }

  function actualizarProgresoGeneral(modulos, progreso) {
    const total = modulos.reduce((acc, modulo) => acc + modulo.cantidad, 0);
    const completadas = modulos.reduce(
      (acc, modulo) => acc + progresoValidoModulo(progreso, modulo).length,
      0
    );

    const porcentaje = total === 0
      ? 0
      : Math.round((completadas / total) * 100);

    const porcentajeCode = document.getElementById("porcentajeCode");
    const leccionesCompletadas = document.getElementById("leccionesCompletadas");
    const progresoCode = document.getElementById("progresoCode");

    if (porcentajeCode) porcentajeCode.textContent = `${porcentaje}%`;
    if (leccionesCompletadas) {
      leccionesCompletadas.textContent =
        `${completadas} de ${total} lecciones completadas`;
    }
    if (progresoCode) progresoCode.style.width = `${porcentaje}%`;
  }

  function mostrarModulos(data, usuario) {
    const contenedor = document.getElementById("contenedorModulos");
    if (!contenedor) return;

    const modulos = data.modules;
    const progreso = leerProgreso(usuario);

    actualizarProgresoGeneral(modulos, progreso);
    contenedor.innerHTML = "";

    modulos.forEach((modulo) => {
      const completadas = progresoValidoModulo(progreso, modulo).length;
      const porcentaje = Math.round((completadas / modulo.cantidad) * 100);
      const desbloqueado = moduloDesbloqueado(modulo, modulos, progreso);

      let textoBoton = "Bloqueado 🔒";
      if (desbloqueado) {
        if (completadas === 0) textoBoton = "Comenzar";
        else if (completadas >= modulo.cantidad) textoBoton = "Completado ✅";
        else textoBoton = "Continuar";
      }

      const tarjeta = document.createElement("article");
      tarjeta.className = "code-modulo-card";
      if (!desbloqueado) tarjeta.classList.add("modulo-bloqueado");

      tarjeta.innerHTML = `
        <div class="code-modulo-icono">${modulo.icono}</div>
        <div class="code-modulo-numero">MÓDULO ${modulo.id}</div>
        <h3>${modulo.nombre}</h3>
        <p>${modulo.descripcion}</p>

        <div class="code-modulo-progreso">
          <span>${completadas} / ${modulo.cantidad}</span>
          <span>${porcentaje}%</span>
        </div>

        <div class="barra-modulo">
          <div style="width: ${porcentaje}%"></div>
        </div>

        <button
          class="btn-code-modulo"
          data-modulo="${modulo.id}"
          ${desbloqueado ? "" : "disabled"}
        >
          ${textoBoton}
        </button>
      `;

      contenedor.appendChild(tarjeta);
    });

    contenedor.querySelectorAll(".btn-code-modulo").forEach((boton) => {
      boton.addEventListener("click", () => {
        if (boton.disabled) return;
        irAModulo(Number(boton.dataset.modulo), data, usuario);
      });
    });
  }

  function irAModulo(idModulo, data, usuario) {
    const modulo = data.modules.find((m) => m.id === idModulo);
    if (!modulo) return;

    const progreso = leerProgreso(usuario);
    if (!moduloDesbloqueado(modulo, data.modules, progreso)) return;

    const completadas = progresoValidoModulo(progreso, modulo);
    let siguiente = 1;

    for (let i = 1; i <= modulo.cantidad; i++) {
      if (!completadas.includes(i)) {
        siguiente = i;
        break;
      }
    }

    if (completadas.length >= modulo.cantidad) {
      siguiente = 1;
    }

    window.location.href =
      `code-leccion.html?modulo=${modulo.id}&leccion=${siguiente}`;
  }

  function configurarCerrarSesion() {
    const boton = document.getElementById("btn-cerrarSesion");
    if (!boton) return;

    boton.addEventListener("click", () => {
      if (!confirm("¿Seguro que quieres cerrar sesión?")) return;

      cerrarSesion();
      window.location.href = "login.html";
    });
  }

  async function iniciar() {
    const usuario = obtenerUsuarioActual();
    if (!usuario) return;

    configurarCerrarSesion();

    try {
      const data = await cargarDatosCodeReminder();

      if (!data || !Array.isArray(data.modules) || !data.lessonsByModule) {
        throw new Error("Los datos de Code Reminder tienen un formato inválido.");
      }

      mostrarModulos(data, usuario);
    } catch (error) {
      console.error(error);

      const contenedor = document.getElementById("contenedorModulos");
      if (contenedor) {
        contenedor.innerHTML = `
          <article class="code-modulo-card">
            <h3>No se pudieron cargar las lecciones</h3>
            <p>Recargá la página con Ctrl + F5.</p>
          </article>
        `;
      }
    }
  }

  iniciar();
})();
