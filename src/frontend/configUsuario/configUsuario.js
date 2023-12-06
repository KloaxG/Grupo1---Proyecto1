/* ----------------------------INFO PERSONAL---------------------------------- */
window.onload = function () {
    const infoPe = document.getElementById('infoPersonal');
    const seguridad = document.getElementById('seguridad');
    const infoNegocio = document.getElementById('infoNegocio');
    const infoNegocioEdit = document.getElementById('infoNegocio-edit');
    const metodoPago = document.getElementById('metodoPago');
    const historial = document.getElementById('historialReserva');

    const click_info = document.querySelector('.infope-click');
    const click_segur = document.querySelector('.seguridad-click');
    const click_infoNegocio = document.querySelector('.negocio-click');
    const click_infoNegocioEdit = document.querySelector('.infoNegocio-edit');
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

    click_infoNegocioEdit.addEventListener('click', () => {
        mostrarSeccion(infoNegocioEdit);
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
            infoNegocioEdit,
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
                const divInformacionNegocio =
                    document.querySelector('form-negocio');
                divInformacionNegocio.style.display = 'none';
            } else if (data.role === 'usuario') {
                const divInformacionNegocio =
                    document.getElementById('infoNegocio-edit');
                divInformacionNegocio.style.display = 'none';
            } else if (data.role === 'negocio') {
                const divInformacionNegocio =
                    document.getElementById('infoNegocio-edit');
                divInformacionNegocio.style.display = 'none';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

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

/* FIN VALIDACIONES NEGOCIO */

/* VALIDACIONES PAGOS */

/* FIN VALIDACIONES PAGOS */

/* VALIDACIONES RESERVAS */

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
