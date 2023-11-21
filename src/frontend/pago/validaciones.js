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

function checkForm() {
  console.clear();

  // Corre todas las funciones para ver que toda la info este bien
  const pasaCVV = checkCVV();
  const pasaVencimiento = checkVencimiento();
  const pasaTarjeta = checkNumTarjeta();
  const pasaNombre = checkNombre();

  // Si toda la info esta correcta, manda el go para subir a base de datos
  if (pasaNombre && pasaTarjeta && pasaVencimiento && pasaCVV) {
    return true;
  }
}

function checkNombre() {
  const inputNombre = document.getElementById('nombre');
  const nombre = inputNombre.value;

  // quita el borde de error y esconde el mensaje en caso que haya uno onfocus
  if (nombre != '') {
    // valido, nombre escrito
    return true;
  } else {
    // no valido, no hay info en el campo
    // agrega borde al campo para denotar error
    fireMixin(
      'error',
      'Por favor escriba el nombre del titular de la tarjeta.'
    );
    return false;
  }
}

function checkNumTarjeta() {
  const inputTarjeta = document.getElementById('numero');
  const numero = inputTarjeta.value;

  if (numero == '' || numero == NaN || numero < 0) {
    // no valido, no es numero o no hay info
    fireMixin('error', 'Por favor escriba un numero de tarjeta válido.');
    return false;
  } else {
    if (numero.toString().length == 16) {
      // valor es un numero, y es del largo correcto
      return true;
    } else {
      // no valido, muy grande o pequenno
      fireMixin('error', 'Por favor escriba un numero de tarjeta válido.');
      return false;
    }
  }
}

function checkVencimiento() {
  const vencimiento = document.getElementById('fecha');
  const fecha = vencimiento.value; // returns string

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
    fireMixin('error', 'Por favor escriba una fecha de expiración válida.');
    return false;
  }
}

function checkCVV() {
  const inputCVV = document.getElementById('codigo');
  const cvv = inputCVV.value;

  if (cvv.toString().length != 3 || cvv == '' || cvv < 0) {
    fireMixin('error', 'Por favor introduzca un código de seguridad válido.');
    return false;
  } else {
    return true;
  }
}

formInfo = document.getElementById('datos');

formInfo.onsubmit = function (event) {
  event.preventDefault();

  if (checkForm()) {
    // Mande a base de datos

    //
    const exito = Swal.fire({
      icon: 'success',
      title: 'Reserva creada con éxito!',
      text: 'Se le envio un correo de confirmación.',
      footer:
        '<a href="../opciHospedajes/opciHospedajes.html">Ver mas reservas</a>',
      showConfirmButton: 'true',
      confirmButtonColor: '#1DD75B',
      confirmButtonText: 'Ver reserva',
    })
      .then((result) => {
        if (result.isConfirmed) {
          window.location.href = '../historial/historial.html';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
