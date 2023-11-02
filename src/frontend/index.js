const form = document.getElementById('formulario');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre');
    const contacto = document.getElementById('contacto');
    const direccion = document.getElementById('direccion');

    const nombreError = document.getElementById('nombreError');
    const contactoError = document.getElementById('contactoError');
    const direccionError = document.getElementById('direccionError');

    nombreError.textContent = ''; 
    contactoError.textContent = '';
    direccionError.textContent = '';

    if (nombre.value === '' || nombre.value === null) {
        nombreError.textContent = 'Ingresa el nombre';
    }

    if (contacto.value === '' || contacto.value === null) {
        contactoError.textContent = 'Ingresa el contacto';
    }

    if (direccion.value === '' || direccion.value === null) {
        direccionError.textContent = 'Ingresa la dirección completa';
    }

    // 
    if (nombreError.textContent !== '' || contactoError.textContent !== '' || direccionError.textContent !== '') {
        
    } else {
        
        form.submit();
    }
});