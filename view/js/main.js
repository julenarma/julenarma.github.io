/*Función nav sticky para todos los html independientemente de la ruta*/
window.onscroll = function () {
  stickyMenu();
};

var image = document.getElementById('scrollImage');
var navbar = document.getElementById('navbar');
var navText = document.querySelector('.nav1-principal');
var sticky = navbar.offsetTop;

function stickyMenu() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add('sticky');
    navText.style.color = 'black';
    image.src = getRelativeImagePath('view/img/index/armadev_azul.png');
  } else {
    navbar.classList.remove('sticky');
    navText.style.color = 'white';
    image.src = getRelativeImagePath('view/img/index/armadev_blanco.png');
  }
}

function getRelativeImagePath(relativePath) {
  // Get the current page's URL
  var currentUrl = window.location.href;

  // Determine the depth of the current page within the directory structure
  var depth = (currentUrl.match(/\//g) || []).length;

  // Construct the relative path based on the depth
  var prefix = Array(depth).fill('..').join('/') + '/';

  return prefix + relativePath;
}

//------mostrar cerrar modal---

function mostrarModal() {
  $('#modal').modal('show');

}

function cerrarModal() {
  $('#modal').modal('hide');
}
//---mostrar cerrar modal fin ---

//------------Donacion cafe start-------



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
  cantidadNumerica = Math.min(10, Math.max(0.01, parseFloat(cantidadNumerica)));

  // Formatea la cantidad a dos decimales
  cantidadNumerica = cantidadNumerica.toFixed(2);

  // Actualiza el campo de cantidad personalizada y el total de soporte
  actualizarCantidadPersonalizada(cantidadNumerica);
  actualizarTotalSoporte(cantidadNumerica);
});


// Añadir evento clic al botón de modal
document.getElementById('boton').addEventListener('click', function () {
  // También seleccionar la cantidad al abrir el modal
  seleccionarCantidad(getCantidadSeleccionada());
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
      cerrarModal(); // Cierra el modal después del pago exitoso

      // Llama a la función para procesar la donación
      procesarDonacion();
      window.location.href = '../view/pages/donacion_exitosa.html';
    });
  },
  onError: function (err) {
    // Lógica en caso de error en el pago
    console.error('Error en el pago:', err);
    // Redirige a la página de donación con error
    window.location.href = '../view/pages/donacion_error.html';
  }
}).render('#paypal-button-container');


function procesarDonacion() {


  console.log ("hola")
  var nombre = document.getElementById('donacionNombre').value;
  var mensaje = document.getElementById('donacionMensaje').value;
  var cantidad = document.getElementById('totalSoporte').innerText; // Cambiado a innerText

  // Verificar si los valores son válidos
  if (nombre.trim() === '' || cantidad.trim() === '') {
    console.error('Nombre o cantidad inválidos');
    return;
  }

  // Codificar componentes de la cadena de consulta
  nombre = encodeURIComponent(nombre);
  mensaje = encodeURIComponent(mensaje);
  cantidad = encodeURIComponent(cantidad);

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
        // No es necesario redirigir aquí, ya que PayPal se encargará de ello
      } else {
        // Muestra un mensaje de error al usuario o redirige a una página de error
        console.error('Error en la solicitud al servidor:', result.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


//------------Donacion cafe end-------