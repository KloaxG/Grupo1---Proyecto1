function fireMixin(icono, msj, showReqs = false) {
  const mixin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true,
    confirmButtonText: 'Ver requerimientos de cada dato.',
    confirmButtonColor: '#EFB034',

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  mixin
    .fire({
      icon: icono,
      title: msj,
      showConfirmButton: showReqs,
    })
    .then((r) => {
      if (r.isConfirmed) {
        Swal.fire({
          title: 'Requerimientos',
          html: `<b>Nombre</b>: Escriba su nombre. <br> <b>Correo</b>: Escriba un correo válido. <br> <b>Dirección</b>: Escriba su dirección. <br> <b>Número telefónico</b>: Escriba un número de al menos 8 dígitos.`,
          confirmButtonColor: '#1DD75B',
        });
      }
    });
}

function fireConfirmacion() {
  Swal.fire({
    title: 'La información ingresada válida será actualizada.',
    text: 'Continuar?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#1DD75B',
    cancelButtonColor: '#DE3B40',
    confirmButtonText: 'Actualizar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Información actualizada',
        text: 'Sus cambios han sido guardados.',
        icon: 'success',
        confirmButtonColor: '#1DD75B',
      });
    }
  });
}

function checkInfo() {
  if (checkNombre() || checkCorreo() || checkDir() || checkNum()) {
    return true;
  }
}

function setValues() {
  let valuesMap = new Map();

  valuesMap.set('nombre', checkNombre());
  valuesMap.set('correo', checkCorreo());
  valuesMap.set('dir', checkDir());
  valuesMap.set('num', checkNum());

  return valuesMap;
}

function checkVacios() {
  const values = setValues();
  let validos = new Array();

  values.forEach(function unValido(value, key) {
    console.log(`${key}: ${value}`);

    if (value) {
      validos.push(key);
    }
  });

  console.log(validos);

  if (validos.length == 0) {
    fireMixin(
      'error',
      'Por favor ingrese al menos un dato en formato válido para ser actualizado.',
      true
    );
    return false;
  } else {
    fireConfirmacion();
    return true;
  }
}

function checkNombre() {
  const nombre = document.getElementById('nombre').value;

  if (nombre == '') {
    return false;
  } else {
    return true;
  }
}

function checkCorreo() {
  const correo = document.getElementById('correo').value;

  // https://www.regexlib.com/REDetails.aspx?regexp_id=26
  const regExCorreo = new RegExp(
    '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
  );

  if (!regExCorreo.test(correo)) {
    return false;
  } else {
    return true;
  }
}

function checkDir() {
  const dir = document.getElementById('direccion').value;

  if (dir == '') {
    return false;
  } else {
    return true;
  }
}

function checkNum() {
  const num = document.getElementById('numero').value;

  if (num.toString().length < 8) {
    return false;
  } else {
    return true;
  }
}

const formInfo = document.getElementById('form-usuario');

formInfo.onsubmit = function (event) {
  event.preventDefault();
  console.clear();
  if (checkVacios()) {
    // actualizar en BD.then() redirect a config usuario
    setTimeout(() => {
      window.location.href = '../configUsuario/configUsuario.html';
    }, 3000);
  }
};
