function checkForm() {
  const pasaActual = checkActual();
  const pasaNueva = checkNueva();

  if (pasaActual && pasaNueva) {
    return true;
  }
}

function checkActual() {
  // consigue info del form
  const inputActual = document.getElementById('PwActual');
  const pw = inputActual.value;
  const error = document.getElementById('errorActual');

  // quita error si hay uno
  inputActual.onfocus = function () {
    inputActual.classList.remove('error');
    error.classList.add('hide');
    error.classList.remove('show');
  };

  // revisa si esta vacio
  // tiene que comparar con BD cuando estemos en eso
  if (pw != '') {
    return true;
  } else {
    inputActual.classList.add('error');
    error.classList.remove('hide');
    error.classList.add('show');
    return false;
  }
}

function checkNueva() {
  // saca info de contra nueva y confirmacion
  const inputNueva = document.getElementById('PwNueva');
  const nueva = inputNueva.value;

  const inputConfirma = document.getElementById('confirma');
  const confirma = inputConfirma.value;

  const error = document.getElementById('errorNueva');

  // quita errores si los hay
  inputNueva.onfocus = function () {
    inputNueva.classList.remove('error');
    inputConfirma.classList.remove('error');
    error.classList.add('hide');
    error.classList.remove('show');
  };

  inputConfirma.onfocus = function () {
    inputConfirma.classList.remove('error');
  };

  // revisa si los inputs son iguales
  if (nueva != confirma) {
    inputNueva.classList.add('error');
    inputConfirma.classList.add('error');
    error.classList.remove('hide');
    error.classList.add('show');
    return false;
  } else {
    return true;
  }
}

formInfo = document.getElementById('informacion');

formInfo.onsubmit = function (event) {
  event.preventDefault();

  if (checkForm()) {
    // Mande a base de datos (todo esto se va )

    // Muestre mensaje de exito
    exito.classList.remove('hide');
    exito.classList.add('showExito');

    // espera 3 segundos y vuelve a la pagina de ajustes
    setTimeout(() => {
      window.location.href = '../html/configUsuario.html';
    }, 3000);
  }
};
