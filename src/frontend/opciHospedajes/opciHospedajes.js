function checkDestino() {
  const inputDestino = document.getElementById('destino');
  const destino = inputDestino.value;
  console.log(destino);

  const Toast = Swal.mixin({
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

  if (destino == '') {
    Toast.fire({
      icon: 'error',
      title: 'Por favor seleccione un destino',
    });

    return false;
  } else {
    return true;
  }
}

const botonBuscar = document.getElementById('botonBuscar');

const formDestino = document.getElementById('formDestino');

formDestino.onsubmit = function (event) {
  event.preventDefault();
  if (checkDestino()) {
    // Actualice busqueda
  }
};
