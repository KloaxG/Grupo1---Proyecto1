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
          html: `<b>Nombre del negocio</b>: Escriba el nombre de su negocio. <br> <b>Contacto</b>: Escriba un número de contacto de al menos 8 dígitos. <br> <b>Dirección</b>: Escriba la dirección de su negocio. <br> <b>Descripción</b>: Escriba una breve descripción de su negocio.`,
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
  valuesMap.set('desc', checkDesc());

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

function checkDesc() {
  const desc = document.getElementById('descripcion').value;

  if (desc == '') {
    return false;
  } else {
    return true;
  }
}

const formInfo = document.getElementById('form-negocio');

formInfo.onsubmit = function (event) {
  event.preventDefault();
  console.clear();
  if (checkVacios()) {
    // actualizar en BD.then() redirect a config usuario
    // setTimeout(() => {
    //   window.location.href = '../configNegocio/configNegocio.html';
    // }, 3000);
  }
};
