// ____________________________________________________________________________
// db.js — Simulación de base de datos con ARREGLOS
// ____________________________________________________________________________
// Este archivo reemplaza (por ahora) a un backend real. Los "usuarios" viven
// en un arreglo de objetos JS (usuariosDB). Para que ese arreglo no se pierda
// al pasar de registro.html -> login.html -> index.html, se respalda de forma
// automática en localStorage. Sigue siendo un arreglo: se lee al cargar la
// página y se vuelve a guardar cada vez que cambia.
//
// IMPORTANTE: este archivo debe cargarse ANTES de script.js, login.js e index.js
// en cada HTML, ya que ellos usan las funciones definidas aquí.

const CLAVE_DB_USUARIOS = "quizzter_usuariosDB";
const CLAVE_SESION_ACTIVA = "quizzter_sesionActiva";

// ---- Carga inicial del arreglo (simula el "SELECT * FROM usuarios") ----
function cargarUsuarios() {
  const datosGuardados = localStorage.getItem(CLAVE_DB_USUARIOS);
  return datosGuardados ? JSON.parse(datosGuardados) : [];
}

// Arreglo "en vivo" que actúa como la tabla de usuarios
let usuariosDB = cargarUsuarios();

// ---- Persistencia del arreglo (simula el "guardar cambios en la BD") ----
function guardarUsuarios() {
  localStorage.setItem(CLAVE_DB_USUARIOS, JSON.stringify(usuariosDB));
}

// ---- Utilidades de consulta sobre el arreglo ----
function existeEmail(email) {
  return usuariosDB.some(
    (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
  );
}

function existeNombreUsuario(nombreUsuario) {
  return usuariosDB.some(
    (usuario) =>
      usuario.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase()
  );
}

// ---- Alta de un nuevo usuario en el arreglo ----
function registrarUsuario(usuario) {
  usuariosDB.push(usuario);
  guardarUsuarios();
  return usuario;
}

// ---- Validación de credenciales para el login ----
function validarLogin(nombreUsuario, password) {
  const usuarioEncontrado = usuariosDB.find(
    (usuario) =>
      usuario.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase() &&
      usuario.password === password
  );
  return usuarioEncontrado || null;
}

// ---- Manejo de sesión activa (quién está logueado ahora mismo) ----
function iniciarSesion(usuario) {
  const usuarioSinPassword = { ...usuario };
  delete usuarioSinPassword.password;
  sessionStorage.setItem(CLAVE_SESION_ACTIVA, JSON.stringify(usuarioSinPassword));
}

function obtenerSesion() {
  const sesion = sessionStorage.getItem(CLAVE_SESION_ACTIVA);
  return sesion ? JSON.parse(sesion) : null;
}

function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION_ACTIVA);
}
