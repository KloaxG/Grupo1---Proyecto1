// Validaciones

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
  const inputUser = document.getElementById('username');
  const user = inputUser.value;
  // https://www.regexlib.com/REDetails.aspx?regexp_id=26
  const regExCorreo = new RegExp(
    '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
  );

  if (user == '') {
    fireMixin(
      'error',
      'Por favor ingrese su usuario o dirección de correo electrónico.'
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

const formInicio = document.getElementById('formulario');
formInicio.onsubmit = function (event) {
  event.preventDefault();

  const inputUser = document.getElementById('username');
  const inputPW = document.getElementById('password');

  // revisa si el admin esta haciendo log in y lo manda al dashboard, si no son las credenciales manda a servicios
  if (inputUser.value == 'admin' && inputPW.value == 'admin') {
    window.location.href = '../configAdmin/tablaGeneral.html';
  } else if (checkInfo()) {
    window.location.href = '../opciHospedajes/opciHospedajes.html';
  }
};

// Olvido contraseña
async function recuperarContra() {
  const resultado = await Swal.fire({
    title: 'Ingrese su correo electronico',
    input: 'text',
    showConfirmButton: true,
    confirmButtonText: 'Enviar correo de recuperacion',
    confirmButtonColor: '#29c3e5',
  });

  const regExCorreo = new RegExp(
    '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
  );

  if (resultado.isConfirmed && regExCorreo.test(resultado.value)) {
    // mande correo
    Swal.fire({
      icon: 'success',
      title:
        'Se le envio un correo de recuperacion, revise su bandeja de entrada',
      showConfirmButton: true,
      confirmButtonColor: '#29c3e5',
    });
  } else {
    Swal.fire({
      title: 'Por favor ingrese un correo valido',
      showConfirmButton: true,
      confirmButtonColor: '#29c3e5',
    });
  }
}

const olvido = document.getElementById('recuperar');
olvido.onclick = function () {
  recuperarContra();
};
