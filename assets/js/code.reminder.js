(() => {
  const CLAVE_PROGRESO = "codeReminderProgreso";

  function leerProgreso() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_PROGRESO)) || {};
    } catch (error) {
      console.error("No se pudo leer el progreso:", error);
      return {};
    }
  }

  function leccionesCompletadas(progreso, modulo) {
    const guardadas = Array.isArray(progreso[modulo.id])
      ? progreso[modulo.id]
      : [];

    return [...new Set(guardadas)]
      .map(Number)
      .filter((id) => id >= 1 && id <= modulo.cantidad);
  }

  function moduloDesbloqueado(modulo, modulos, progreso) {
    if (modulo.id === 1) {
      return true;
    }

    const anterior = modulos.find(
      (item) => item.id === modulo.id - 1
    );

    if (!anterior) {
      return false;
    }

    return (
      leccionesCompletadas(progreso, anterior).length >=
      anterior.cantidad
    );
  }

  function actualizarProgresoGeneral(modulos, progreso) {
    const total = modulos.reduce(
      (acumulador, modulo) =>
        acumulador + modulo.cantidad,
      0
    );

    const completadas = modulos.reduce(
      (acumulador, modulo) =>
        acumulador +
        leccionesCompletadas(progreso, modulo).length,
      0
    );

    const porcentaje =
      total === 0
        ? 0
        : Math.round((completadas / total) * 100);

    document.getElementById("porcentajeCode").textContent =
      porcentaje + "%";

    document.getElementById("leccionesCompletadas").textContent =
      completadas + " de " + total + " lecciones completadas";

    document.getElementById("progresoCode").style.width =
      porcentaje + "%";
  }

  function mostrarModulos() {
    const data = window.CODE_REMINDER_DATA;
    const contenedor =
      document.getElementById("contenedorModulos");

    if (!data || !Array.isArray(data.modules)) {
      contenedor.innerHTML =
        "<p>No se pudieron cargar los módulos.</p>";
      return;
    }

    const modulos = data.modules;
    const progreso = leerProgreso();

    actualizarProgresoGeneral(modulos, progreso);
    contenedor.innerHTML = "";

    modulos.forEach((modulo) => {
      const completadas =
        leccionesCompletadas(progreso, modulo).length;

      const porcentaje = Math.round(
        (completadas / modulo.cantidad) * 100
      );

      const desbloqueado =
        moduloDesbloqueado(modulo, modulos, progreso);

      let textoBoton = "Bloqueado 🔒";

      if (desbloqueado) {
        if (completadas === 0) {
          textoBoton = "Comenzar";
        } else if (completadas >= modulo.cantidad) {
          textoBoton = "Completado ✅";
        } else {
          textoBoton = "Continuar";
        }
      }

      const tarjeta = document.createElement("article");
      tarjeta.className = "code-modulo-card";

      if (!desbloqueado) {
        tarjeta.classList.add("modulo-bloqueado");
      }

      tarjeta.innerHTML = `
        <div class="code-modulo-icono">${modulo.icono}</div>

        <div class="code-modulo-numero">
          MÓDULO ${modulo.id}
        </div>

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

    contenedor
      .querySelectorAll(".btn-code-modulo")
      .forEach((boton) => {
        boton.addEventListener("click", () => {
          if (boton.disabled) {
            return;
          }

          const moduloId = Number(
            boton.dataset.modulo
          );

          window.location.href =
            `code.leccion.html?modulo=${moduloId}&leccion=1`;
        });
      });
  }

  mostrarModulos();
})();
