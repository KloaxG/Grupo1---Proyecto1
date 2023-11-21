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

function checkNombre() {
  const inputNombre = document.getElementById('nombre');
  const nombre = inputNombre.value;

  if (nombre == '') {
    fireMixin('error', 'Por favor escriba su nombre');
    return false;
  } else {
    return true;
  }
}

function checkApellido() {
  const inputApellido = document.getElementById('apellido');
  const apellido = inputApellido.value;

  if (apellido == '') {
    fireMixin('error', 'Por favor escriba al menos un apellido');
    return false;
  } else {
    return true;
  }
}

function checkDistrito() {
  const inputDistrito = document.getElementById('distrito');
  const distrito = inputDistrito.value;

  if (distrito == '') {
    fireMixin('error', 'Por favor escriba su distrito de vivienda.');
    return false;
  } else {
    return true;
  }
}

function checkProv() {
  const inputProvincia = document.getElementById('provincia');
  const Provincia = inputProvincia.value;

  if (Provincia == '') {
    fireMixin('error', 'Por favor escriba su provincia de vivienda.');
    return false;
  } else {
    return true;
  }
}

function checkCanton() {
  const inputCanton = document.getElementById('canton');
  const canton = inputCanton.value;

  if (canton == '') {
    fireMixin('error', 'Por favor escriba su cantón de vivienda.');
    return false;
  } else {
    return true;
  }
}

function checkDOB() {
  const inputDOB = document.getElementById('nacimiento');
  const DOB = new Date(inputDOB.value);
  const fechaActual = new Date();

  console.log(isNaN(DOB.getTime()));

  if (DOB.getTime() > fechaActual.getTime() || isNaN(DOB.getTime())) {
    fireMixin('error', 'Por favor ingrese una fecha de nacimiento válida.');
    return false;
  } else {
    return true;
  }
}

function checkSennas() {
  const inputSennas = document.getElementById('sennas');
  const sennas = inputSennas.value;

  if (sennas == '') {
    fireMixin('error', 'Por favor especifique distinciones de la dirección.');
    return false;
  } else {
    return true;
  }
}

function checkID() {
  const inputID = document.getElementById('id');
  const ID = inputID.value;

  if (ID == '') {
    fireMixin(
      'error',
      'Por favor ingrese un número de cédula, pasaporte u otro documento oficial.'
    );
    return false;
  } else {
    return true;
  }
}

function checkCorreo() {
  const inputCorreo = document.getElementById('correo');
  const correo = inputCorreo.value;

  // expresion regular para revisar que lo que esten escribiendo sea un correo
  // https://www.regexlib.com/REDetails.aspx?regexp_id=26
  const regExCorreo = new RegExp(
    '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
  );

  if (correo == '' || !regExCorreo.test(correo)) {
    fireMixin(
      'error',
      'Por favor ingrese una dirección de correo electrónico válida.'
    );
    return false;
  } else {
    return true;
  }
}

function checkContra() {
  const inputPW = document.getElementById('pw');
  const PW = inputPW.value;

  if (PW.length < 8) {
    fireMixin(
      'error',
      'Por favor ingrese una contraseña de al menos 8 caracteres.'
    );
    return false;
  } else {
    return true;
  }
}

function checkTerms() {
  const checkbox = document.getElementById('terms');

  if (!checkbox.checked) {
    fireMixin('error', 'Debe aceptar los términos y condiciones.');
    return false;
  } else {
    return true;
  }
}

function checkInfo() {
  if (
    checkNombre() &&
    checkApellido() &&
    checkDOB() &&
    checkID() &&
    checkProv() &&
    checkCanton() &&
    checkDistrito() &&
    checkSennas() &&
    checkCorreo() &&
    checkContra() &&
    checkTerms()
  ) {
    return true;
  } else {
    return false;
  }
}

const formReg = document.getElementById('formReg');
formReg.onsubmit = function (event) {
  event.preventDefault();

  if (checkInfo()) {
    let timerInterval;
    Swal.fire({
      icon: 'success',
      title: 'Cuenta creada con éxito!',
      html: 'Será redireccionado, por favor espere.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector('b');
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '../opciHospedajes/opciHospedajes.html';
      }
    });
  }
};
