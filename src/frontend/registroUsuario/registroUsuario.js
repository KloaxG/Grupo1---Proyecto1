const botonLog = document.getElementById('botonLogin');
const formReg = document.getElementById('formReg');

console.log('object');

formReg.onsubmit = function (event) {
  event.preventDefault();
  window.location.href = '../opciHospedajes/opciHospedajes.html';
};

botonLog.onclick = function () {
  window.location.href = '../opciHospedajes/opciHospedajes.html';
};
