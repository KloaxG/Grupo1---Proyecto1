window.onload = function() {
    const form = document.getElementById('formulario');
    form.addEventListener('submit', function(event){
        event.preventDefault();

        const destino = document.getElementById('destino');
        const ingreso = document.getElementById('ingreso');
        const salida = document.getElementById('salida');
        const huespedes = document.getElementById('huespedes');

        const destinoError = document.getElementById('destinoError');
        const ingresoError = document.getElementById('ingresoError');
        const salidaError = document.getElementById('salidaError');
        const huespedesError = document.getElementById('huespedesError');

        destinoError.textContent = '';
        ingresoError.textContent = '';
        salidaError.textContent = '';
        huespedesError.textContent = '';

        validarFechaIngreso(ingreso, ingresoError);
        validarFechaSalida (salida, salidaError);

        // Validación de destino
        if (destino.value === '' || destino.value.trim() === '') {
            alert (destinoError.textContent = 'Ingresa el destino');
        } else if (!/^[A-Za-z\s]+$/.test(destino.value)) {
            alert (destinoError.textContent = 'El destino solo puede contener letras y espacios.');
        } else if (destino.value.length < 3 || destino.value.length > 50) {
            alert (destinoError.textContent = 'El destino debe tener entre 3 y 50 caracteres.');
        }

        // Validación de ingreso
        function validarFechaIngreso(ingreso, ingresoError) {
            const fechaActual = new Date();
            const fechaInicioReserva = new Date(ingreso.value);
        
            if (fechaInicioReserva < fechaActual) {
                alert (ingresoError.textContent = 'La fecha de inicio debe ser igual o posterior a la fecha actual.');
            } else if (ingreso.value === '' || ingreso.value.trim() === '') {
                alert (ingresoError.textContent = 'Ingresa la fecha de ingreso');
            } else {
                ingresoError.textContent = '';
            }
        }
        

        // Validación de salida
        function validarFechaSalida(salida, salidaError) {
            const fechaActual = new Date();
            const fechaFinReserva = new Date(salida.value);

            if (fechaFinReserva < fechaActual) {
                alert (salidaError.textContent = 'La fecha de fin debe ser igual o posterior a la fecha actual.');
            } else if (salida.value === '' || salida.value.trim() === '') {
                alert (salidaError.textContent = 'Ingresa la fecha de salida');
            } else {
                salidaError.textContent = '';
            }
           } 

        // Validación de huéspedes
        if (huespedes.value === '' || huespedes.value.trim() === '') {
            alert (huespedesError.textContent = 'Ingresa la cantidad de huéspedes');
        } else if (!/^[0-9]+$/.test(huespedes.value)) {
            alert (huespedesError.textContent = 'La cantidad de huéspedes solo puede contener números.');
        } else if (huespedes.value.length < 1 || huespedes.value.length > 2) {
            alert (huespedesError.textContent = 'La cantidad de huéspedes debe tener entre 1 y 2 caracteres.');
        }

        // Validación final
        if (destinoError.textContent === '' && ingresoError.textContent === '' && salidaError.textContent === '' && huespedesError.textContent === '') {
            form.submit();
        }
    });
}
