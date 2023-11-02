function checkForm() {
  console.clear();

  const exito = document.getElementById('exito');

  // Corre todas las funciones para ver que toda la info este bien
  const pasaNombre = checkNombre();
  const pasaTarjeta = checkNumTarjeta();
  const pasaVencimiento = checkVencimiento();
  const pasaCVV = checkCVV();
  const pasaDir = checkDir();
  const pasaZip = checkZip();

  // Si toda la info esta correcta, manda el go para subir a base de datos
  if (
    pasaNombre &&
    pasaTarjeta &&
    pasaVencimiento &&
    pasaCVV &&
    pasaDir &&
    pasaZip
  ) {
    return true;
  }
}

function checkNombre() {
  const inputNombre = document.getElementById('inputNombre');
  const error = document.getElementById('errorNombre');
  const nombre = inputNombre.value;

  // quita el borde de error y esconde el mensaje en caso que haya uno onfocus
  inputNombre.onfocus = function () {
    inputNombre.classList.remove('error');
    error.classList.add('hide');
    error.classList.remove('show');
  };

  if (nombre != '') {
    // valido, nombre escrito
    return true;
  } else {
    // no valido, no hay info en el campo
    // agrega borde al campo para denotar error
    inputNombre.classList.add('error');
    error.classList.remove('hide');
    error.classList.add('show');
    return false;
  }
}

function checkNumTarjeta() {
  const inputTarjeta = document.getElementById('numTarjeta');
  const error = document.getElementById('errorNumero');
  const numero = inputTarjeta.value;

  inputTarjeta.onfocus = function () {
    inputTarjeta.classList.remove('error');
    error.classList.add('hide');
    error.classList.remove('show');
  };

  if (numero == '' || numero == NaN) {
    // no valido, no es numero o no hay info
    inputTarjeta.classList.add('error');
    error.classList.remove('hide');
    error.classList.add('show');
    return false;
  } else {
    if (numero.toString().length == 16) {
      // valor es un numero, y es del largo correcto
      return true;
    } else {
      // no valido, muy grande o pequenno
      inputTarjeta.classList.add('error');
      error.classList.remove('hide');
      error.classList.add('show');
      return false;
    }
  }
}

function checkVencimiento() {
  const vencimiento = document.getElementById('vencimiento');
  const error = document.getElementById('errorVencimiento');
  const fecha = vencimiento.value; // returns string

  vencimiento.onfocus = function () {
    vencimiento.classList.remove('error');
    error.classList.add('hide');
    error.classList.remove('show');
  };

  // hace la fecha un array de numeros para poder comparar [año, mes]
  // da los meses en un array entonces van de 0 a 11
  let valorFecha = fecha.split('-');

  // Convierte el array en numeros para comparar con fecha actual
  valorFecha = valorFecha.map(function (str) {
    return parseInt(str);
  });

  // mes y anno de la fecha actual para comparar
  const mesActual = new Date().getMonth();
  const annoActual = new Date().getFullYear().toString();

  // revisa que el mes sea en el futuro del actual
  let pasaMes;
  if (mesActual + 1 < valorFecha[1]) {
    pasaMes = true;
  }

  // revisa que el anno sea el actual o siguientes
  let pasaAnno;
  if (annoActual <= valorFecha[0]) {
    pasaAnno = true;
  }

  if (pasaMes && pasaAnno) {
    // fecha de expiracion valida
    return true;
  } else {
    vencimiento.classList.add('error');
    error.classList.remove('hide');
    error.classList.add('show');
    return false;
  }
}

function checkCVV() {
  const inputCVV = document.getElementById('cvv');
  const error = document.getElementById('errorCVV');
  const cvv = inputCVV.value;

  inputCVV.onfocus = function () {
    inputCVV.classList.remove('error');
    error.classList.add('hide');
    error.classList.remove('show');
  };

  if (cvv.toString().length != 3 || cvv == '') {
    inputCVV.classList.add('error');
    error.classList.remove('hide');
    error.classList.add('show');
    return false;
  } else {
    return true;
  }
}

function checkDir() {
  const inputDir = document.getElementById('direccion');
  const error = document.getElementById('errorDir');
  const direccion = inputDir.value;

  inputDir.onfocus = function () {
    inputDir.classList.remove('error');
    error.classList.add('hide');
    error.classList.remove('show');
  };

  if (direccion != '') {
    return true;
  } else {
    inputDir.classList.add('error');
    error.classList.remove('hide');
    error.classList.add('show');
    return false;
  }
}

function checkZip() {
  const inputZip = document.getElementById('zip');
  const zip = inputZip.value;
  const error = document.getElementById('errorZip');

  inputZip.onfocus = function () {
    inputZip.classList.remove('error');
    error.classList.add('hide');
    error.classList.remove('show');
  };

  if (zip.toString().length != 5 || cvv == '') {
    inputZip.classList.add('error');
    error.classList.remove('hide');
    error.classList.add('show');
    return false;
  } else {
    return true;
  }
}

formInfo = document.getElementById('formularioDatosCC');

formInfo.onsubmit = function (event) {
  event.preventDefault();

  if (checkForm()) {
    // Mande a base de datos

    // Muestre mensaje de exito
    exito.classList.remove('hide');
    exito.classList.add('showExito');

    // espera 3 segundos y vuelve a la pagina de tarjetas
    setTimeout(() => {
      window.location.href = '../html/configPago.html';
    }, 3000);
  }
};
