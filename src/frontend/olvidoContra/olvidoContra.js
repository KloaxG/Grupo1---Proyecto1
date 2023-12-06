window.onload;

const password = document.getElementById(password - prov);
const password2 = document.getElementById(password - nue);
const password3 = document.getElementById(conf - password);
const form = document.getElementById(form);
const parrafo = document.getElementById(warnings);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const warnings = '';
    const entrar = false;
    const regexPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (!regexPassword.test(password.value)) {
        warnings += `Contraseña Invalida <br>`;
        entrar = true;
    }
    if (password.value.length < 8) {
        warnings += `Contraseña Invalida <br>`;
        entrar = true;
    }
    if (entrar) {
        parrafo.innerHTML = warnings;
    }
});
