// ____________________________________________________________________________
// login.js — Validación de credenciales contra el arreglo "usuariosDB" (db.js)
// ____________________________________________________________________________

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("main form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("loginError");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombreUsuario = usernameInput.value.trim();
    const password = passwordInput.value;

    const usuarioEncontrado = validarLogin(nombreUsuario, password);

    if (usuarioEncontrado) {
      iniciarSesion(usuarioEncontrado);
      window.location.href = "./index.html";
    } else {
      errorMsg.classList.remove("d-none");
      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  // Oculta el mensaje de error apenas el usuario vuelve a escribir
  [usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => errorMsg.classList.add("d-none"));
  });
});

// ---- Login con Google (se mantiene, pero también queda registrado en el arreglo) ----
function decodificarJWT(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function manejarLoginGoogle(respuesta) {
  const tokenSeguro = respuesta.credential;
  const datosUsuario = decodificarJWT(tokenSeguro);

  // Si ya existe en el arreglo (por email), inicia sesión directo.
  // Si no existe, se crea un registro básico simulando el alta en la BD.
  let usuario = usuariosDB.find((u) => u.email === datosUsuario.email);

  if (!usuario) {
    usuario = {
      nombreCompleto: datosUsuario.name || "Usuario de Google",
      email: datosUsuario.email,
      password: null, // el login por Google no usa contraseña propia
      nombreUsuario: datosUsuario.email.split("@")[0],
      carrera: "No especificada",
      ocupacion: "No especificada",
      fechaRegistro: new Date().toISOString(),
    };
    registrarUsuario(usuario);
  }

  iniciarSesion(usuario);
  window.location.href = "./index.html";
}
