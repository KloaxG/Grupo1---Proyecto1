const formulario = document.getElementById('form-registro-negocio');

const boton = document.getElementById('fileNegocio');
const previstaImagen = document.getElementById('prevista_imagen');

let datosNegocio = {}; // Declaración de la variable datosNegocio

let myWidget = cloudinary.createUploadWidget(
    {
        cloudName: 'digw2tk5v',
        uploadPreset: 'syncTravel',
    },
    (error, result) => {
        if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);

            // Obtener la URL de la imagen subida
            const imageUrl = result.info.secure_url;

            // Asegurarse de que fotosNegocio sea un array
            if (!datosNegocio.fotosNegocio) {
                datosNegocio.fotosNegocio = [];
            }

            // Agregar la URL al array
            datosNegocio.fotosNegocio.push(imageUrl);

            // Actualizar la vista previa con la primera imagen (puedes ajustar según tus necesidades)
            previstaImagen.src = datosNegocio.fotosNegocio[0];

            // No asignar la imagen al usuario aquí
        }
    }
);

boton.addEventListener('click', () => {
    myWidget.open();
});

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    if (
        !checkNombreNegocio() ||
        !checkCategoriaNegocio() ||
        !checkDescripcionNegocio() ||
        !checkCorreoNegocio() ||
        !checkProvinciaNegocio() ||
        !checkCantonNegocio() ||
        !checkDistritoNegocio() ||
        !checkSenasNegocio() ||
        !checkFotosNegocio() ||
        !checkTermsNegocio()
    ) {
        return;
    }

    const nombreNegocio = document.getElementById('nombreNegocio').value;
    const categoriaNegocio = document.getElementById('categoriaNegocio').value;
    const descripcionNegocio =
        document.getElementById('descripcionNegocio').value;
    const correoNegocio = document.getElementById('correoNegocio').value;
    const provinciaNegocio = document.getElementById('provinciaNegocio').value;
    const cantonNegocio = document.getElementById('cantonNegocio').value;
    const distritoNegocio = document.getElementById('distritoNegocio').value;
    const senasNegocio = document.getElementById('senasNegocio').value;

    datosNegocio = {
        nombreNegocio,
        categoriaNegocio,
        descripcionNegocio,
        correoNegocio,
        provinciaNegocio,
        cantonNegocio,
        distritoNegocio,
        senasNegocio,
        fotosNegocio: datosNegocio.fotosNegocio,
    };

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    fetch(`http://localhost:3000/api/negocio/nuevo/${usuario}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosNegocio),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            let timerInterval;
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                html: 'Redireccionando en <b></b> milisegundos.',
                timer: 2000,
                timerProgressBar: true,

                willClose: () => {
                    clearInterval(timerInterval);
                    // Puedes redirigir aquí
                    window.location.href =
                        '../configUsuario/configUsuario.html';
                },
            });
        })
        .catch((error) => {
            console.error('Error al crear negocio:', error);
            fireMixin('error', 'Error interno del servidor');
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
function checkNombreNegocio() {
    const inputNombreNegocio = document.getElementById('nombreNegocio');
    const nombreNegocio = inputNombreNegocio.value;

    if (nombreNegocio === '') {
        fireMixin('error', 'Por favor escriba el nombre del negocio');
        return false;
    } else {
        return true;
    }
}

function checkCategoriaNegocio() {
    const inputCategoriaNegocio = document.getElementById('categoriaNegocio');
    const categoriaNegocio = inputCategoriaNegocio.value;

    if (categoriaNegocio === '') {
        fireMixin('error', 'Por favor escriba la categoría del negocio');
        return false;
    } else {
        return true;
    }
}

function checkDescripcionNegocio() {
    const inputDescripcionNegocio =
        document.getElementById('descripcionNegocio');
    const descripcionNegocio = inputDescripcionNegocio.value;

    if (descripcionNegocio === '') {
        fireMixin('error', 'Por favor escriba una descripción del negocio');
        return false;
    } else {
        return true;
    }
}

function checkCorreoNegocio() {
    const inputCorreoNegocio = document.getElementById('correoNegocio');
    const correoNegocio = inputCorreoNegocio.value;

    // Puedes agregar una expresión regular para validar el formato del correo si lo deseas

    if (correoNegocio === '') {
        fireMixin(
            'error',
            'Por favor ingrese un correo electrónico para el negocio'
        );
        return false;
    } else {
        return true;
    }
}

function checkProvinciaNegocio() {
    const inputProvinciaNegocio = document.getElementById('provinciaNegocio');
    const provinciaNegocio = inputProvinciaNegocio.value;

    if (provinciaNegocio === '') {
        fireMixin('error', 'Por favor escriba la provincia del negocio');
        return false;
    } else {
        return true;
    }
}

function checkCantonNegocio() {
    const inputCantonNegocio = document.getElementById('cantonNegocio');
    const cantonNegocio = inputCantonNegocio.value;

    if (cantonNegocio === '') {
        fireMixin('error', 'Por favor escriba el cantón del negocio');
        return false;
    } else {
        return true;
    }
}

function checkDistritoNegocio() {
    const inputDistritoNegocio = document.getElementById('distritoNegocio');
    const distritoNegocio = inputDistritoNegocio.value;

    if (distritoNegocio === '') {
        fireMixin('error', 'Por favor escriba el distrito del negocio');
        return false;
    } else {
        return true;
    }
}

function checkSenasNegocio() {
    const inputSenasNegocio = document.getElementById('senasNegocio');
    const senasNegocio = inputSenasNegocio.value;

    if (senasNegocio === '') {
        fireMixin('error', 'Por favor escriba otras señas del negocio');
        return false;
    } else {
        return true;
    }
}

function checkFotosNegocio() {
    const inputFotosNegocio = document.getElementById('fileNegocio');
    const fotosNegocio = inputFotosNegocio.value;

    if (fotosNegocio === '') {
        fireMixin('error', 'Por favor suba al menos una foto del negocio');
        return false;
    } else {
        return true;
    }
}

function checkTermsNegocio() {
    const checkboxNegocio = document.getElementById('termsNegocio');

    if (!checkboxNegocio.checked) {
        fireMixin(
            'error',
            'Debe aceptar los términos y condiciones para el negocio'
        );
        return false;
    } else {
        return true;
    }
}

function checkInfoNegocio() {
    if (
        checkNombreNegocio() &&
        checkCategoriaNegocio() &&
        checkDescripcionNegocio() &&
        checkCorreoNegocio() &&
        checkProvinciaNegocio() &&
        checkCantonNegocio() &&
        checkDistritoNegocio() &&
        checkSenasNegocio() &&
        checkTermsNegocio()
    ) {
        return true;
    } else {
        return false;
    }
}
