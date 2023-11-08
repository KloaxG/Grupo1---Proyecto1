function editarNombre() {
  const espNombre = document.getElementById('nombre');

  const formNombre = document.getElementById('formNombre');

  const botonEditar = document.getElementById('botonNombre');

  espNombre.classList.add('hide');
  formNombre.classList.remove('hide');
  formNombre.classList.add('show');
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

function editarNum() {
  const espNum = document.getElementById('numero');

  const formNum = document.getElementById('formNum');

  const botonEditar = document.getElementById('botonNum');

  espNum.classList.add('hide');
  formNum.classList.remove('hide');
  formNum.classList.add('show');
  botonEditar.classList.add('hide');
}

function editarDesc() {
  const espDesc = document.getElementById('descripcion');

  const formDesc = document.getElementById('formDesc');

  const botonEditar = document.getElementById('botonDesc');

  espDesc.classList.add('hide');
  formDesc.classList.remove('hide');
  formDesc.classList.add('show');
  botonEditar.classList.add('hide');
}

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

function checkNum() {
  const espNum = document.getElementById('numero');

  const formNum = document.getElementById('formNum');
  const inputNum = document.getElementById('inputNum');
  const numero = inputNum.value;

  const error = document.getElementById('errorNum');

  const botonEditar = document.getElementById('botonNum');

  if (numero == '' || numero < 0) {
    error.classList.remove('hide');
    error.classList.add('show');

    inputNum.classList.add('error');
    return false;
  } else {
    formNum.classList.remove('show');
    formNum.classList.add('hide');
    espNum.classList.remove('hide');
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

function checkDesc() {
  const espDesc = document.getElementById('descripcion');

  const formDesc = document.getElementById('formDesc');
  const inputDesc = document.getElementById('inputDesc');
  const descripcion = inputDesc.value;

  const error = document.getElementById('errorDesc');

  const botonEditar = document.getElementById('botonDesc');

  if (descripcion == '') {
    error.classList.remove('hide');
    error.classList.add('show');

    inputDesc.classList.add('error');
    return false;
  } else {
    formDesc.classList.remove('show');
    formDesc.classList.add('hide');
    espDesc.classList.remove('hide');
    botonEditar.classList.remove('hide');
    error.classList.remove('show');
    error.classList.add('hide');
    return true;
  }
}

function checkCat() {
  const cats = document.querySelectorAll('input[type=checkbox]');
  const error = document.getElementById('errorCat');
  console.log(cats);

  let minimo = 0;

  cats.forEach(function (cat, idx) {
    if (cats[idx].checked) {
      minimo = minimo + 1;
      console.log(minimo);
    }
  });

  if (minimo == 0) {
    errorCat.classList.add('show');
    errorCat.classList.remove('hide');
  }
}

const formNombre = document.getElementById('formNombre');
const formNum = document.getElementById('formNum');
const formDir = document.getElementById('formDir');
const formDesc = document.getElementById('formDesc');
const formCat = document.getElementById('formCat');

formNombre.onsubmit = function (event) {
  event.preventDefault();
  if (checkNombre()) {
    // Mande a BD y actualice
  }
};
formNum.onsubmit = function (event) {
  event.preventDefault();
  if (checkNum()) {
    // Mande a BD y actualice
  }
};
formDir.onsubmit = function (event) {
  event.preventDefault();
  if (checkDir()) {
    // Mande a BD y actualice
  }
};
formDesc.onsubmit = function (event) {
  event.preventDefault();
  if (checkDesc()) {
    // Mande a BD y actualice
  }
};
formCat.onsubmit = function (event) {
  event.preventDefault();
  if (checkCat()) {
    // Mande a BD y actualice
  }
};
