function validarPago() {
    var numeroTarjeta = document.getElementById("numero_tarjeta").value;
    var nombreTitular = document.getElementById("nombre_titular").value;
    var fechaExpiracion = document.getElementById("fecha_expiracion").value;
    var cvv = document.getElementById("cvv").value;
    var fechaReserva = document.getElementById("fecha").value;
    var ninos = document.getElementById("ninos").value;
    var adultos = document.getElementById("adultos").value;

    var valid = true;

    // Validación del número de tarjeta 
    if (!/^\d{16}$/.test(numeroTarjeta)) {
        document.getElementById("numero_tarjeta").style.borderColor = "red";
        valid = false;
    } else {
        document.getElementById("numero_tarjeta").style.borderColor = "";
    }

    // Validación del nombre del titular 
    if (nombreTitular.trim() === "") {
        document.getElementById("nombre_titular").style.borderColor = "red";
        valid = false;
    } else {
        document.getElementById("nombre_titular").style.borderColor = "";
    }

    // Validación de la fecha de expiración 
    if (!/^\d{2}\/\d{2}$/.test(fechaExpiracion)) {
        document.getElementById("fecha_expiracion").style.borderColor = "red";
        valid = false;
    } else {
        document.getElementById("fecha_expiracion").style.borderColor = "";
    }

    // Validación del CVV 
    if (!/^\d{3,4}$/.test(cvv)) {
        document.getElementById("cvv").style.borderColor = "red";
        valid = false;
    } else {
        document.getElementById("cvv").style.borderColor = "";
    }

    // Validación de la fecha de reserva
    if (fechaReserva.trim() === "") {
        document.getElementById("fecha").style.borderColor = "red";
        valid = false;
    } else {
        document.getElementById("fecha").style.borderColor = "";
    }

    // Validación del número de niños y adultos
    if (ninos === "" || adultos === "") {
        document.getElementById("ninos").style.borderColor = "red";
        document.getElementById("adultos").style.borderColor = "red";
        valid = false;
    } else {
        document.getElementById("ninos").style.borderColor = "";
        document.getElementById("adultos").style.borderColor = "";
    }
    }
