function checkDestino() {
  const inputDestino = document.getElementById("destino");
  const destino = inputDestino.value;
  console.log(destino);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  if (destino == "") {
    Toast.fire({
      icon: "error",
      title: "Por favor seleccione un destino",
    });

    return false;
  } else {
    return true;
  }
}

const botonBuscar = document.getElementById("botonBuscar");

const formDestino = document.getElementById("form");

formDestino.onsubmit = function (event) {
  event.preventDefault();
  if (checkDestino()) {
    window.location.href = "../opciHospedajes/opciHospedajes.html";
  }
};

// Slider empieza aca--------------------------------------------- 

let imagenes = [
  "../assets/tortuga.jpg",
  "../assets/principal.jpg",
  "../assets/cabinas.jpg",
  "../assets/estar.jpg",
  "../assets/verde.jpg"
];
document.imagen.src = imagenes[0];

let SliderDerecha = document.querySelector(".slider-derecha");
let SliderIzquierda = document.querySelector(".slider-izquierda");
let Contador = 0;

function MoverDerecha(){
  Contador++;
  if(Contador >= imagenes.length){
    Contador = 0;
  }
  document.imagen.src = imagenes[Contador];
}
let Intervalo = setInterval(MoverDerecha, 3000);
SliderDerecha.addEventListener("click", function(){
  clearInterval(Intervalo);
  MoverDerecha();
  Intervalo = setInterval(MoverDerecha, 3000);

})

function MoverIzquierda()
{
  Contador--;
  if(Contador < 0)
  {
    Contador = imagenes.length - 1;
  }
  document.imagen.src = imagenes[Contador];
}

SliderIzquierda.addEventListener("click", function(){
  clearInterval(Intervalo);
  MoverIzquierda();
  Intervalo = setInterval(MoverDerecha, 3000);

});

// Slider termina aca---------------------------------------------