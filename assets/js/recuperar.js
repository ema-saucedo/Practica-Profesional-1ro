document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('recuperarForm');
    const seccionFormulario = document.querySelector('main');
    const seccionExito = document.getElementById('finalFeliz');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        seccionFormulario.classList.add('d-none');

        seccionExito.classList.remove('d-none');
    });
});

const emailInput = document.getElementById('email');

emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();

    const regexGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (regexGmail.test(email)) {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    } else {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
    }
});