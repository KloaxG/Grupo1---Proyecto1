async function recuperarContra() {
  const resultado = await Swal.fire({
    title: 'Ingrese su correo electronico',
    input: 'text',
    showConfirmButton: true,
    confirmButtonText: 'Enviar correo de recuperacion',
    confirmButtonColor: '#29c3e5',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#DE3B40',
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

const botonLog = document.getElementById('botonLogin');

botonLog.onclick = function () {
  window.location.href = '../opciHospedajes/opciHospedajes.html';
};

const olvido = document.getElementById('recuperar');

olvido.onclick = function () {
  recuperarContra();
};
