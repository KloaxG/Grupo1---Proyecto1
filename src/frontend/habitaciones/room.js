// Mil disculpas por como revise las fechas,
// Estaba estresado y no se me ocurrio buscar si js
// tenia forma nativa de comparar fechas, pero ahora se
// que si se puede
// -Daniel

function checkFechas() {
  const checkIn = document.getElementById('checkin');
  const fechaIn = checkIn.value;

  const checkOut = document.getElementById('checkout');
  const fechaOut = checkOut.value;

  // arrays de fechas [anno, mes, dia]
  let arrFechaIn = fechaIn.split('-');
  let arrFechaOut = fechaOut.split('-');

  let diaActual = new Date().getDay();
  let mesActual = new Date().getMonth();
  let annoActual = new Date().getFullYear().toString();

  // variable que guarda si la fecha de entrada es antes de la fecha actual
  let ayer;

  if (
    arrFechaIn[2] <= diaActual &&
    arrFechaIn[1] + 1 < mesActual &&
    arrFechaIn[0] < annoActual
  ) {
    ayer = true;
  } else {
    ayer = false;
  }

  // guarda si la fecha de salida es antes de la de entrada
  let conflicto;

  // revisa si el año es antes, si lo es, hay conflicto
  if (arrFechaIn[0] > arrFechaOut[0]) {
    conflicto = true;
  }
  // si el anno no es antes, revisa si es el mismo año
  else if (arrFechaIn[0] == arrFechaOut[0]) {
    // si es el mismo anno, revisa los meses
    // si el mes es antes, hay conflicto
    if (arrFechaIn[1] + 1 > arrFechaOut[1] + 1) {
      conflicto = true;
    }

    // si el mes no es antes, revisa si es el mismo
    else if (arrFechaIn[1] + 1 == arrFechaOut[1] + 1) {
      // si el mes es antes, revisa si la fecha es ante
      // si lo es, hay conflicto
      if (arrFechaIn[2] > arrFechaOut[2]) {
        conflicto = true;
      }

      // revisa si el dia es el mismo, si lo es, hay conflicto
      else if (arrFechaIn[2] == arrFechaOut[2]) {
        conflicto = true;
      }

      // si la fecha es a futuro, no hay conflicto
      else if (arrFechaIn[2] < arrFechaOut[2]) {
        conflicto = false;
      }
    }
    // si el mes es a futuro, no hay conflicto
    else if (arrFechaIn[1] + 1 < arrFechaOut[1] + 1) {
      conflicto = false;
    }
  }
  // si el anno es a futuro, no hay conflicto
  else if (arrFechaIn[0] < arrFechaOut[0]) {
    conflicto = false;
  }

  if (!ayer && !conflicto) {
    return true;
  } else {
    return false;
  }
}

function checkHuesp() {
  const inputHuesp = document.getElementById('huespedes');
  const huesp = inputHuesp.value;

  if (huesp == '' || huesp < 1 || huesp > 6) {
    return false;
  } else {
    return true;
  }
}

const formReserva = document.getElementById('reservaForm');

formReserva.onsubmit = function (event) {
  console.clear();
  event.preventDefault();

  const huespValido = checkHuesp();
  const fechaValida = checkFechas();

  // mensaje de error por fechas
  if (!fechaValida) {
    const errorFechas = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    errorFechas.fire({
      icon: 'error',
      title: 'Por favor ingrese fechas validas',
    });
  }

  // mensaje de error por huespdes
  if (!huespValido) {
    const errorHuesp = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    errorHuesp.fire({
      icon: 'error',
      title: 'Por favor ingrese una cantidad de huespedes entre 1 y 6',
    });
  }

  if (fechaValida && huespValido) {
    window.location.href = '../pago/pago.html';
  }
};
