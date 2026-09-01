// ____________________________________________________________________________
// script.js — Lógica de registro.html. Guarda al usuario en el arreglo
// "usuariosDB" definido en db.js (simulando el alta en una base de datos).
// ____________________________________________________________________________

document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("Nombre");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const registroForm = document.getElementById("registroForm");

  const btnAbrirModal = document.getElementById("btnAbrirModal");
  const modalElement = document.getElementById("exampleModal");
  const modal = new bootstrap.Modal(modalElement);

  const usuarioInput = document.getElementById("nombredeusuario");
  const feedbackUsuario = document.getElementById("feedbackUsuario");
  const btnFinalizarRegistro = document.getElementById("btnFinalizarRegistro");

  const dropdownBtn2 = document.getElementById("dropdownMenu2");
  const dropdownBtn = document.getElementById("dropdownMenu");

  const reqs = {
    largo: document.getElementById("reqLargo"),
    mayus: document.getElementById("reqMayus"),
    minus: document.getElementById("reqMinus"),
    numero: document.getElementById("reqNumero"),
  };

  // ---- Validación de contraseña en tiempo real (se mantiene igual) ----
  passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;

    const cumpleLargo = val.length >= 8;
    const cumpleMayus = /[A-Z]/.test(val);
    const cumpleMinus = /[a-z]/.test(val);
    const cumpleNumero = /\d/.test(val);

    const actualizarRequisito = (elemento, condicion, texto) => {
      if (condicion) {
        elemento.className = "text-success fw-bold";
        elemento.textContent = `✔️ ${texto}`;
      } else {
        elemento.className = "text-danger";
        elemento.textContent = `❌ ${texto}`;
      }
    };

    actualizarRequisito(reqs.largo, cumpleLargo, "Mínimo 8 caracteres");
    actualizarRequisito(reqs.mayus, cumpleMayus, "Al menos una mayúscula");
    actualizarRequisito(reqs.minus, cumpleMinus, "Al menos una minúscula");
    actualizarRequisito(reqs.numero, cumpleNumero, "Al menos un número");

    if (val.length > 0 && cumpleLargo && cumpleMayus && cumpleMinus && cumpleNumero) {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
    } else if (val.length > 0) {
      passwordInput.classList.remove("is-valid");
      passwordInput.classList.add("is-invalid");
    } else {
      passwordInput.classList.remove("is-valid", "is-invalid");
    }
  });

  // ---- Validación de email (Gmail) ----
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const regexGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (regexGmail.test(email)) {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
    } else {
      emailInput.classList.remove("is-valid");
      emailInput.classList.add("is-invalid");
    }
  });

  // ---- Paso 1: abrir el modal solo si los datos básicos son válidos ----
  btnAbrirModal.addEventListener("click", () => {
    if (!nombreInput.value.trim()) {
      alert("Por favor, ingresa tu nombre completo.");
      return;
    }
    if (!emailInput.classList.contains("is-valid")) {
      alert("Ingresa un correo electrónico válido (@gmail.com).");
      return;
    }
    if (!passwordInput.classList.contains("is-valid")) {
      alert("La contraseña no cumple con todos los requisitos de seguridad.");
      return;
    }
    if (existeEmail(emailInput.value.trim())) {
      alert("Ya existe una cuenta registrada con ese correo electrónico.");
      return;
    }

    modal.show();
  });

  // ---- Paso 2: disponibilidad del nombre de usuario en tiempo real ----
  usuarioInput.addEventListener("input", () => {
    const valor = usuarioInput.value.trim();

    if (!valor) {
      feedbackUsuario.textContent = "";
      return;
    }
    if (existeNombreUsuario(valor)) {
      feedbackUsuario.textContent = "❌ Ese nombre de usuario ya está en uso";
      feedbackUsuario.className = "text-danger d-block mt-1";
    } else {
      feedbackUsuario.textContent = "✔️ Nombre de usuario disponible";
      feedbackUsuario.className = "text-success d-block mt-1";
    }
  });

  // ---- Selección de carrera ----
  document
    .querySelectorAll('[aria-labelledby="dropdownMenu2"] .dropdown-item')
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownBtn2.textContent = item.textContent;
        dropdownBtn2.dataset.valor = item.textContent;
      });
    });

  // ---- Selección de ocupación ----
  document
    .querySelectorAll('[aria-labelledby="dropdownMenu"] .dropdown-item')
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownBtn.textContent = item.textContent;
        dropdownBtn.dataset.valor = item.textContent;
      });
    });

  // ---- Paso 3: finalizar registro y guardarlo en el arreglo usuariosDB ----
  btnFinalizarRegistro.addEventListener("click", () => {
    const nombreUsuario = usuarioInput.value.trim();
    const carrera = dropdownBtn2.dataset.valor || "No especificada";
    const ocupacion = dropdownBtn.dataset.valor || "No especificada";

    if (!nombreUsuario) {
      alert("Ingresa un nombre de usuario.");
      return;
    }
    if (existeNombreUsuario(nombreUsuario)) {
      alert("Ese nombre de usuario ya está en uso, elige otro.");
      return;
    }
    if (ocupacion === "Estudiante" && carrera === "No especificada") {
      alert("Selecciona la carrera que estás cursando.");
      return;
    }

    const nuevoUsuario = {
      nombreCompleto: nombreInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      nombreUsuario,
      carrera,
      ocupacion,
      fechaRegistro: new Date().toISOString(),
    };

    registrarUsuario(nuevoUsuario);

    modal.hide();
    alert("¡Registro exitoso! Ahora podés iniciar sesión con tu nombre de usuario y contraseña.");
    window.location.href = "./login.html";
  });

  // El formulario ya no envía datos a ningún backend: todo pasa por el arreglo
  registroForm.addEventListener("submit", (e) => e.preventDefault());
});
