$(document).ready(function () {
    cargarDonaciones();
});


function seleccionarCantidad(cantidad) {
    actualizarCantidadPersonalizada(cantidad);
    actualizarTotalSoporte(cantidad);
}

function getCantidadSeleccionada() {
    return parseInt(document.getElementById('cantidadPersonalizada').value) || 0;
}

function getMensaje() {
    return document.getElementById('mensaje').value;
}

function actualizarCantidadPersonalizada(cantidad) {
    document.getElementById('cantidadPersonalizada').value = cantidad;
}

function actualizarTotalSoporte(cantidad) {
    document.getElementById('totalSoporte').innerText = cantidad;
}


// Añadir evento input para validar la entrada en el campo de cantidad personalizada
document.getElementById('cantidadPersonalizada').addEventListener('input', function () {
    var cantidadInput = this.value;

    // Reemplaza todo lo que no sea un número con una cadena vacía
    var cantidadNumerica = cantidadInput.replace(/[^\d]/g, '');


    // Limita la cantidad a un valor entre 0.01 y 10
    cantidadNumerica = Math.min(10, Math.max(1, parseFloat(cantidadNumerica)));



    // Actualiza el campo de cantidad personalizada y el total de soporte
    actualizarCantidadPersonalizada(cantidadNumerica);
    actualizarTotalSoporte(cantidadNumerica);
});





// Incluir el SDK de PayPal

paypal.Buttons({
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {

                    value: getCantidadSeleccionada().toString()
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            // Lógica después de un pago exitoso
            // Llama a la función para procesar la donación y pasa los datos a la página de éxito
            procesarDonacion();
        });
    },
    // Configura las credenciales aquí
    // Puedes obtener estas credenciales desde el panel de desarrolladores de PayPal
    // No compartas estas credenciales en el código fuente público
    client: {
        sandbox: 'AT-FpvT_iWqLPgQBMCU_L-ohOjzVPtVL3QV-gZCb2RI1Wc3SimIF5hiw8bncw9s9HnvVAM92BLnUM973',
        //production: 'AUP12vPigK8ANBi187po0u3M2mQreUtlRK83g91lUd58WGwLVvnU1MSTcHEC6gAes_nsCVyPZtT3STIG'    Reemplaza con tu Client ID de producción cuando estés listo para lanzar
    }
}).render('#paypal-button-container');


function procesarDonacion() {

    console.log("holaaaa")

    var nombre = document.getElementById('donacionNombre').value;
    var mensaje = document.getElementById('donacionMensaje').value;
    var cantidad = document.getElementById('totalSoporte').innerText; // Cambiado a innerText

    var url = '../../controller/cInsertDonation.php';
    var data = {
        'nombre': nombre,
        'mensaje': mensaje,
        'cantidad': cantidad,
    };

    fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(result => {
            if (!result.error) {
                // Redirige a la página de donación exitosa y pasa los datos como parámetros de la URL
                window.location.href = `../pages/donacion_exitosa.html?nombre=${nombre}&cantidad=${cantidad}`;
            } else {
                // Muestra un mensaje de error al usuario o redirige a una página de error
                console.error('Error en la solicitud al servidor:', result.message);
                // Puedes redirigir a la página de error si es necesario
                window.location.href = '../pages/donacion_error.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



//------------Donacion cafe end-------


//Cargar donaciones


function cargarDonaciones() {

    var url = '../../controller/cDonations.php';

    fetch(url, {

            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then(res => res.json()).then(result => {


            var myHtml = "";
            var donaciones = result.list;

            for (let i = 0; i < donaciones.length; i++) {

                myHtml += `
                <div class="col-md-4 mb-4">
                  <div class="card mb-4 box-shadow">
                    <div class="card-body">
                      <h5 class="card-title">${donaciones[i].nombre}</h5>
                      <p class="card-text">${donaciones[i].mensaje}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-outline-secondary">Café</button>
                          <button type="button" class="btn btn-sm btn-outline-secondary">€${donaciones[i].cantidad}</button>
                        </div>
                        <small class="text-muted">${formatFecha(donaciones[i].fecha)}</small>
                      </div>
                    </div>
                  </div>
                </div>`;
            }

            //Metemos los cards en las noticias
            $("#donaciones").html(myHtml);
        })
        .catch(error => console.error('Error status:', error));

}

//funcion para formatear la fecha y hora
function formatFecha(fechaString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', options);
  }
  