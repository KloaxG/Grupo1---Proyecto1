const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    if (!checkUsuario() || !checkPW()) {
        return;
    }

    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    const formData = {
        correo,
        password,
    };

    fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('Success:', data);
            localStorage.setItem('usuario', JSON.stringify(data._id));
            let timerInterval;
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                html: 'Iniciando sesión',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
                        const content = Swal.getContent();
                        if (content) {
                            const b = content.querySelector('b');
                            if (b) {
                                b.textContent = Swal.getTimerLeft();
                            }
                        }
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href =
                        '../configUsuario/configUsuario.html';
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            fireMixin(
                'error',
                'Credenciales incorrectas. Verifica tu usuario y contraseña.'
            );
        });
});

function fireMixin(icono, msj) {
    const mixin = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    mixin.fire({
        icon: icono,
        title: msj,
    });
}

function checkUsuario() {
    const inputUser = document.getElementById('correo');
    const user = inputUser.value;
    const regExCorreo = new RegExp(
        '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
    );

    if (user == '') {
        fireMixin(
            'error',
            'Por favor ingrese su dirección de correo electrónico.'
        );
        return false;
    } else {
        return true;
    }
}

function checkPW() {
    const inputPW = document.getElementById('password');
    const PW = inputPW.value;

    if (PW == '') {
        fireMixin('error', 'Por favor ingrese su contraseña.');
        return false;
    } else {
        return true;
    }
}

function checkInfo() {
    if (checkUsuario() && checkPW()) {
        return true;
    }
}

// Olvido contraseña

async function recuperarContra() {
    const resultado = await Swal.fire({
        title: 'Ingrese su correo electronico',
        input: 'email',
        showConfirmButton: true,
        confirmButtonText: 'Enviar correo de recuperacion',
        confirmButtonColor: '#29c3e5',
    });

    const regExCorreo = new RegExp(
        '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
    );

    if (resultado.isConfirmed && regExCorreo.test(resultado.value))
        fetch('http://localhost:3000/api/users/recuperarContrasenna', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo: resultado.value }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                Swal.fire({
                    icon: 'success',
                    title: 'Se le envió un correo de recuperación. Revise su bandeja de entrada.',
                    showConfirmButton: true,
                    confirmButtonColor: '#29c3e5',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Por favor, ingrese un correo válido.',
                    showConfirmButton: true,
                    confirmButtonColor: '#29c3e5',
                });
            });
}
const olvido = document.getElementById('recuperar');
olvido.onclick = function () {
    recuperarContra();
};
