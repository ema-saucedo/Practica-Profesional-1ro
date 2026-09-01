// ____________________________________________________________________________
// index.js — Requiere db.js cargado antes en el HTML (usa obtenerSesion/cerrarSesion)
// ____________________________________________________________________________

// Si no hay sesión activa en el arreglo/almacenamiento, vuelve al login
document.addEventListener("DOMContentLoaded", () => {
  const sesion = obtenerSesion();
  if (!sesion) {
    window.location.href = "login.html";
  }
});

const btnCerrarSesion = document.getElementById("btn-cerrarSesion");

if (btnCerrarSesion) {
  btnCerrarSesion.addEventListener("click", () => {
    const confirmar = confirm("¿Seguro que quieres cerrar sesión?");
    if (confirmar) {
      cerrarSesion();
      window.location.href = "login.html";
    }
  });
}
