/* ----------------------------INFO PERSONAL---------------------------------- */

window.onload = function () {
    const infoPe = document.getElementById('infoPersonal');
    const seguridad = document.getElementById('seguridad');
    const infoNegocio = document.getElementById('infoNegocio');
    const metodoPago = document.getElementById('metodoPago');
    const historial = document.getElementById('historialReserva');

    const click_info = document.querySelector('.infope-click');
    const click_segur = document.querySelector('.seguridad-click');
    const click_infoNegocio = document.querySelector('.negocio-click');
    const click_metodo = document.querySelector('.pagos-click');
    const click_historial = document.querySelector('.reserva-click');

    click_info.addEventListener('click', () => {
        mostrarSeccion(infoPe);
    });

    click_segur.addEventListener('click', () => {
        mostrarSeccion(seguridad);
    });

    click_infoNegocio.addEventListener('click', () => {
        mostrarSeccion(infoNegocio);
    });

    click_metodo.addEventListener('click', () => {
        mostrarSeccion(metodoPago);
    });

    click_historial.addEventListener('click', () => {
        mostrarSeccion(historial);
    });

    const selectMenu = document.getElementById('select');

    function mostrarSeccion(seccion) {
        const secciones = [
            infoPe,
            seguridad,
            infoNegocio,
            metodoPago,
            historial,
        ];
        secciones.forEach((element) => {
            element.style.display = 'none';
        });
        seccion.style.display = 'block';
    }

    const botonEditar = document.querySelector('.infopeclick-edit');
    const imgPerfil = document.getElementById('img_perfil');
    let myWidget;

    if (botonEditar && imgPerfil) {
        myWidget = cloudinary.createUploadWidget(
            {
                cloudName: 'digw2tk5v',
                uploadPreset: 'syncTravel',
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    console.log('Done! Here is the image info: ', result.info);

                    // Actualizar la imagen localmente
                    imgPerfil.src = result.info.secure_url;

                    // Disparar un evento 'input' para notificar cambios en la imagen
                    const inputEvent = new Event('input', { bubbles: true });
                    imgPerfil.dispatchEvent(inputEvent);

                    // Guardar la URL de la imagen en la base de datos
                    const usuario = JSON.parse(localStorage.getItem('usuario'));
                    fetch(`http://localhost:3000/api/users/${usuario}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            imagen: result.info.secure_url,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            }
        );

        botonEditar.addEventListener('click', () => {
            myWidget.open();
        });
    }

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const direccion = document.getElementById('direccionExacta');
    const numero = document.getElementById('cel');
    fetch(`http://localhost:3000/api/users/${usuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            nombre.value = `${data.nombre} ${data.apellido}`;
            correo.value = data.correo;
            direccion.value = data.direccionExacta;
            numero.value = data.cel;
            if (data.imagen) {
                imgPerfil.src = data.imagen;
            }

            if (data.role === 'admin') {
            } else if (data.role === 'usuario') {
                const dashboard = document.getElementById('dashboard');
                dashboard.style.display = 'none';
            } else if (data.role === 'negocio') {
                const divInformacionNegocio = document.querySelector(
                    '.infoNegocio-edit-uno'
                );
                divInformacionNegocio.style.display = 'none';
                const dashboard = document.getElementById('dashboard');
                dashboard.style.display = 'none';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
const selectMenu = document.getElementById('select');
selectMenu.addEventListener('change', () => {
    const selectedOption = selectMenu.options[selectMenu.selectedIndex].id;

    switch (selectedOption) {
        case 'perfil':
            mostrarSeccion(infoPe);
            localStorage.getItem('usuario');
            break;
        case 'cierreSesion':
            localStorage.removeItem('usuario');
            window.location.href = '../index/index.html';
            break;
    }
});

/* ----------------------------FIN INFO PERSONAL---------------------------------- */

/* ----------------------------VALIDACIONES SEGURIDAD---------------------------------- */

document.addEventListener('DOMContentLoaded', function () {
    const formSeguridad = document.querySelector('.formulario-seguridad');
    const seguridadClickSave = document.querySelector('.seguridad-clickSave');

    formSeguridad.addEventListener('submit', function (event) {
        event.preventDefault();
        cambiarContrasena();
    });

    function cambiarContrasena() {
        const contrasenaActual = document.getElementById('actual').value;
        const nuevaContrasena = document.getElementById('nueva').value;
        const confirmarContrasena = document.getElementById('confirmar').value;

        if (!contrasenaActual || !nuevaContrasena || !confirmarContrasena) {
            mostrarError('Todos los campos son obligatorios.');
            return;
        }

        if (nuevaContrasena.length < 8) {
            mostrarError(
                'La nueva contraseña debe tener al menos 8 caracteres.'
            );
            return;
        }

        if (nuevaContrasena !== confirmarContrasena) {
            mostrarError('Las contraseñas no coinciden.');
            return;
        }

        const usuario = JSON.parse(localStorage.getItem('usuario'));

        fetch(`http://localhost:3000/api/users/cambiar-contrasena/${usuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contrasenaActual: contrasenaActual,
                nuevaContrasena: nuevaContrasena,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Contraseña cambiada:', data);
                mostrarExito('Contraseña cambiada exitosamente.');
            })
            .catch((error) => {
                console.error('Error al cambiar contraseña:', error);
                mostrarExito('Contraseña cambiada exitosamente.');
            });
    }

    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje,
            confirmButtonColor: '#EFB034',
        });
    }

    function mostrarExito(mensaje) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: mensaje,
            confirmButtonColor: '#1DD75B',
        });
    }
});

/* ----------------------------FIN VALIDACIONES SEGURIDAD---------------------------------- */

/* ----------------------------VALIDACIONES NEGOCIO---------------------------------- */

document.addEventListener('DOMContentLoaded', function () {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const nombreNegocio = document.getElementById('nombreNegocio');
    const correoNegocio = document.getElementById('correoNegocio');
    const descripcionNegocio = document.getElementById('descripcionNegocio');
    const direccionNegocio = document.getElementById('senasNegocio');
    const imgOne = document.getElementById('img-one');
    const imgTwo = document.getElementById('img-two');
    const imgThree = document.getElementById('img-three');

    fetch(`http://localhost:3000/api/users/${usuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);

            // Ajusta esto según la estructura de tu objeto
            const primerNegocio = data.negocio[0];

            if (primerNegocio) {
                nombreNegocio.value = primerNegocio.nombreNegocio;
                correoNegocio.value = primerNegocio.correoNegocio;
                descripcionNegocio.value = primerNegocio.descripcionNegocio;
                direccionNegocio.value = primerNegocio.senasNegocio;

                if (Array.isArray(primerNegocio.fotosNegocio)) {
                    primerNegocio.fotosNegocio.forEach((foto, index) => {
                        if (index === 0) {
                            imgOne.src = foto;
                        } else if (index === 1) {
                            imgTwo.src = foto;
                        } else if (index === 2) {
                            imgThree.src = foto;
                        }
                    });
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// const botonEditarNegocio = document.querySelector('.editFotosNegocio');
// const imgOne = document.getElementById('img-one'); // Asegúrate de que estos elementos estén definidos
// const imgTwo = document.getElementById('img-two'); // Asegúrate de que estos elementos estén definidos
// const imgThree = document.getElementById('img-three'); // Asegúrate de que estos elementos estén definidos

// let myWidget2;

// if (botonEditarNegocio && imgOne && imgTwo && imgThree) {
//     myWidget2 = cloudinary.createUploadWidget(
//         {
//             cloudName: 'digw2tk5v',
//             uploadPreset: 'syncTravel',
//         },
//         (error, result) => {
//             if (!error && result && result.event === 'success') {
//                 console.log('Done! Here is the image info: ', result.info);

//                 // Actualizar la imagen localmente según la lógica de tus imágenes
//                 if (imgOne.src === '') {
//                     imgOne.src = result.info.secure_url;
//                 } else if (imgTwo.src === '') {
//                     imgTwo.src = result.info.secure_url;
//                 } else if (imgThree.src === '') {
//                     imgThree.src = result.info.secure_url;
//                 }

//                 // Disparar un evento 'input' para notificar cambios en la imagen
//                 const inputEvent = new Event('input', { bubbles: true });
//                 imgOne.dispatchEvent(inputEvent);

//                 // Guardar la URL de la imagen en la base de datos
//                 const usuario = JSON.parse(localStorage.getItem('usuario'));
//                 fetch(`http://localhost:3000/api/users/${usuario}`, {
//                     method: 'PATCH',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         imagen: result.info.secure_url,
//                     }),
//                 })
//                     .then((response) => response.json())
//                     .then((data) => {
//                         console.log('Success:', data);
//                     })
//                     .catch((error) => {
//                         console.error('Error:', error);
//                     });
//             }
//         }
//     );

//     botonEditarNegocio.addEventListener('click', () => {
//         myWidget2.open();
//     });
// }

/* ----------------------------FIN VALIDACIONES NEGOCIO---------------------------------- */

/* ----------------------------VALIDACIONES PAGOS---------------------------------- */

const guardarTarjeta = document.querySelector('.btn-guardar-pago');

guardarTarjeta.addEventListener('click', (event) => {
    event.preventDefault();

    if (
        !checkNombreTarjeta() ||
        !checkNumeroTarjeta() ||
        !checkFechaTarjeta() ||
        !checkCvvTarjeta()
    ) {
        return;
    }

    const nombreTarjeta = document.getElementById('nombreTarjeta');
    const numeroTarjeta = document.getElementById('numeroTarjeta');
    const fechaTarjeta = document.getElementById('fechaTarjeta');
    const cvvTarjeta = document.getElementById('cvvTarjeta');

    const datosTarjeta = {
        nombreTarjeta: nombreTarjeta.value,
        numeroTarjeta: numeroTarjeta.value,
        fechaTarjeta: fechaTarjeta.value,
        cvvTarjeta: cvvTarjeta.value,
    };

    const usuarioData = localStorage.getItem('usuario');
    const usuario = usuarioData ? JSON.parse(usuarioData) : null;

    if (!usuario) {
        mostrarError('No se pudo obtener la información del usuario.');
        return;
    }

    fetch(`http://localhost:3000/api/users/${usuario}/tarjetas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosTarjeta),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Tarjeta guardada:', data);
            let timerInterval;
            Swal.fire({
                icon: 'success',
                title: 'Tarjeta vinculada a la cuenta',
                text: 'Tarjeta guardada exitosamente.',
                timer: 2000,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                    // Restablecer campos del formulario
                    nombreTarjeta.value = '';
                    numeroTarjeta.value = '';
                    fechaTarjeta.value = '';
                    cvvTarjeta.value = '';
                },
            });
        })
        .catch((error) => {
            console.error('Error al guardar pago:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const divTarjetas = document.querySelector('.tarjetas-pago');


    fetch(`http://localhost:3000/api/users/${usuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);

            if (data && data.pago && Array.isArray(data.pago) && data.pago.length > 0) {
                data.pago.forEach((tarjeta) => {
                    divTarjetas.innerHTML += `
                        <div class="primer-tarjeta-pago">
                            <div>
                                <i
                                    class="fa-brands fa-cc-visa"
                                    style="color: #283fe6"
                                ></i>
                            </div>
                            <div>
                                <p>${tarjeta.numeroTarjeta}</p>
                            </div>
                            <div>
                                <p>${tarjeta.nombreTarjeta}</p>
                            </div>
                            <div>
                                <p>${tarjeta.fechaTarjeta}</p>
                            </div>
                            
                        </div>`;
                });
            } else {
                divTarjetas.innerHTML = '<p>No hay tarjetas vinculadas a la cuenta.</p>';
            }
        })
        .catch((error) => {
            console.error('Error:', error);

        });
});

// const eliminarTarjeta = document.querySelector('.btn-eliminar-pago');

// eliminarTarjeta.addEventListener('click', (event) => {
//     event.preventDefault();

//     const usuarioData = localStorage.getItem('usuario');
//     const usuario = usuarioData ? JSON.parse(usuarioData) : null;

//     if (!usuario) {
//         mostrarError('No se pudo obtener la información del usuario.');
//         return;
//     }

//     fetch(`http://localhost:3000/api/users/${usuario}/tarjetas`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log('Tarjeta eliminada:', data);
//             let timerInterval;
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Tarjeta eliminada',
//                 text: 'Tarjeta eliminada exitosamente.',
//                 timer: 2000,
//                 timerProgressBar: true,
//                 willClose: () => {
//                     clearInterval(timerInterval);
//                 },
//             });
//         })
//         .catch((error) => {
//             console.error('Error al eliminar pago:', error);
//         });
// });

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

function checkNombreTarjeta() {
    const nombreTarjeta = document.getElementById('nombreTarjeta').value;
    if (nombreTarjeta === '') {
        mostrarError('El nombre de la tarjeta es obligatorio.');
        return false;
    }
    return true;
}

function checkNumeroTarjeta() {
    const numeroTarjeta = document.getElementById('numeroTarjeta').value;
    if (numeroTarjeta === '' || numeroTarjeta.length < 16) {
        mostrarError(
            'El número de la tarjeta es obligatorio, ingrese minimo 16 digitos.'
        );
        return false;
    }
    return true;
}

function checkFechaTarjeta() {
    const fechaTarjeta = document.getElementById('fechaTarjeta').value;
    if (fechaTarjeta === '') {
        mostrarError('La fecha de vencimiento es obligatoria.');
        return false;
    }
    return true;
}

function checkCvvTarjeta() {
    const cvvTarjeta = document.getElementById('cvvTarjeta').value;
    if (cvvTarjeta === '' || cvvTarjeta.length < 3) {
        mostrarError(
            'El código de seguridad es obligatorio, ingrese minimo 3 digitos.'
        );
        return false;
    }
    return true;
}

function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonColor: '#EFB034',
    });
}

/* ----------------------------FIN VALIDACIONES PAGOS---------------------------------- */
/* --------------------------- VALIDACIONES RESERVAS---------------------------------- */

/* ----------------------------FIN VALIDACIONES RESERVAS---------------------------------- */

/* CIERRES DE SESION */
