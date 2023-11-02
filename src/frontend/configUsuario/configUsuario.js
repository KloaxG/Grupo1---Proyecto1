// Cambia el espacio de un p a un form para actualizar la informacion
function editarNombre() {
  const espNombre = document.getElementById('nombre');

  const formNombre = document.getElementById('formNombre');

  const botonEditar = document.getElementById('botonNombre');

  espNombre.classList.add('hide');
  formNombre.classList.remove('hide');
  formNombre.classList.add('show');
  botonEditar.classList.add('hide');
}

function editarCorreo() {
  const espCorreo = document.getElementById('correo');

  const formCorreo = document.getElementById('formCorreo');

  const botonEditar = document.getElementById('botonCorreo');

  espCorreo.classList.add('hide');
  formCorreo.classList.remove('hide');
  formCorreo.classList.add('show');
  botonEditar.classList.add('hide');
}

function editarDir() {
  const espDir = document.getElementById('direccion');

  const formDir = document.getElementById('formDir');

  const botonEditar = document.getElementById('botonDir');

  espDir.classList.add('hide');
  formDir.classList.remove('hide');
  formDir.classList.add('show');
  botonEditar.classList.add('hide');
}

// hace las validaciones del nombre nuevo
function checkNombre() {
  const espNombre = document.getElementById('nombre');

  const formNombre = document.getElementById('formNombre');
  const inputNombre = document.getElementById('inputNombre');
  const nombre = inputNombre.value;

  const error = document.getElementById('errorNombre');

  const botonEditar = document.getElementById('botonNombre');

  if (nombre == '') {
    error.classList.remove('hide');
    error.classList.add('show');

    inputNombre.classList.add('error');
    return false;
  } else {
    formNombre.classList.remove('show');
    formNombre.classList.add('hide');
    espNombre.classList.remove('hide');
    botonEditar.classList.remove('hide');
    error.classList.remove('show');
    error.classList.add('hide');
    return true;
  }
}

function checkCorreo() {
  const espCorreo = document.getElementById('correo');

  const formCorreo = document.getElementById('formCorreo');
  const inputCorreo = document.getElementById('inputCorreo');
  const correo = inputCorreo.value;

  const error = document.getElementById('errorCorreo');

  const botonEditar = document.getElementById('botonCorreo');

  // expresion regular para revisar que lo que esten escribiendo sea un correo
  // https://www.regexlib.com/REDetails.aspx?regexp_id=26
  const regExCorreo = new RegExp(
    '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
  );

  console.log(regExCorreo.test(correo));

  if (correo == '' || !regExCorreo.test(correo)) {
    error.classList.remove('hide');
    error.classList.add('show');

    inputCorreo.classList.add('error');
    return false;
  } else {
    formCorreo.classList.remove('show');
    formCorreo.classList.add('hide');
    espCorreo.classList.remove('hide');
    botonEditar.classList.remove('hide');
    error.classList.remove('show');
    error.classList.add('hide');
    return true;
  }
}

function checkDir() {
  const espDir = document.getElementById('direccion');

  const formDir = document.getElementById('formDir');
  const inputDir = document.getElementById('inputDir');
  const direccion = inputDir.value;

  const error = document.getElementById('errorDir');

  const botonEditar = document.getElementById('botonDir');

  if (direccion == '') {
    error.classList.remove('hide');
    error.classList.add('show');

    inputDir.classList.add('error');
    return false;
  } else {
    formDir.classList.remove('show');
    formDir.classList.add('hide');
    espDir.classList.remove('hide');
    botonEditar.classList.remove('hide');
    error.classList.remove('show');
    error.classList.add('hide');
    return true;
  }
}

// formularios de cambio de info
formNombre = document.getElementById('formNombre');
formCorreo = document.getElementById('formCorreo');
formDir = document.getElementById('formDir');

// correr y actualizar en bd cuando se hace submit en los forms
formNombre.onsubmit = function (event) {
  event.preventDefault();
  if (checkNombre()) {
    // Mande a BD y actualice
  }
};

formCorreo.onsubmit = function (event) {
  event.preventDefault();
  if (checkCorreo()) {
    // Mande a BD y actualice
  }
};

formDir.onsubmit = function (event) {
  event.preventDefault();
  if (checkDir()) {
    // Mande a BD y actualice
  }
};
