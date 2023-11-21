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

function checkFechas() {
  const checkIn = document.getElementById('checkin');
  const fechaIn = new Date(checkIn.value);

  const checkOut = document.getElementById('checkout');
  const fechaOut = new Date(checkOut.value);

  const fechaActual = new Date().getTime();

  // Revisa si la fecha de entrada y salida hayan sido seleccionadas, y se fija que la fecha de entrada sea antes que la de salida
  let conflicto;
  let pasado;

  if (
    !isNaN(fechaIn.getTime()) &&
    !isNaN(fechaOut.getTime()) &&
    fechaIn.getTime() < fechaOut.getTime()
  ) {
    conflicto = false;
  } else {
    conflicto = true;
    fireMixin('error', 'Por favor seleccione una fecha válida.');
  }

  // Revisa que la fecha de entrada o salida no sean en el pasado
  if (
    !isNaN(fechaIn.getTime()) &&
    !isNaN(fechaOut.getTime()) &&
    fechaIn.getTime() > fechaActual &&
    fechaOut.getTime() > fechaActual
  ) {
    pasado = false;
  } else {
    pasado = true;
    fireMixin('error', 'Por favor seleccione una fecha válida.');
  }

  if (!conflicto && !pasado) {
    return true;
  } else {
    return false;
  }
}

function checkHuesp() {
  const inputHuesp = document.getElementById('huespedes');
  const huesp = inputHuesp.value;

  if (huesp == '' || huesp < 1 || huesp > 6) {
    fireMixin('error', 'Por favor seleccione entre 1 y 6 huespedes.');
    return false;
  } else {
    return true;
  }
}

function checkInfo() {
  const fechas = checkFechas();
  const huesp = checkHuesp();

  if (huesp && fechas) {
    return true;
  } else {
    return false;
  }
}

const formReserva = document.getElementById('reservaForm');

formReserva.onsubmit = function (event) {
  console.clear();
  event.preventDefault();

  if (checkInfo()) {
    window.location.href = '../pago/pago.html';
  }
};
