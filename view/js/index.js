document.addEventListener("DOMContentLoaded", function () {

  window.onscroll = function() { stickyMenu() };

  var image = document.getElementById('scrollImage');
  var navbar = document.getElementById('navbar');
  var navText = document.querySelector('.nav1-principal');
  var sticky = navbar.offsetTop;
  
  function stickyMenu() {
    if (window.pageYOffset > sticky) {
      navbar.classList.add('sticky');  // Agregar la clase sticky
      navText.style.color = 'black';  // Cambiar el color de los textos a negro
      image.src = 'view/img/index/armadev_azul.png';  //imagen armadev azul
    } else {
      navbar.classList.remove('sticky');  // Eliminar la clase sticky
      navText.style.color = 'white';  // Mantener el color blanco de los textos
      image.src = 'view/img/index/armadev_blanco.png'; //Imagen armadev blanco
    }
  }
  
  
}); //--------------Dom Content End ----------------

function mostrarModal() {
  $('#modal').modal('show');
}

function cerrarModal() {
  $('#modal').modal('hide');
}

function realizarSupport() {
  // Lógica de pago
  var cantidadSeleccionada = getCantidadSeleccionada();
  var mensaje = getMensaje();
  var mensajeAlerta = 'Support realizado para ' + cantidadSeleccionada + ' cafés';

  if (mensaje) {
    mensajeAlerta += ' con el mensaje: ' + mensaje;
  }

  alert(mensajeAlerta);
  cerrarModal();
}

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
  actualizarTextoBoton(cantidad);
}

function actualizarTextoBoton(cantidad) {
  var botonSupport = document.getElementById('supportButton');
  botonSupport.innerText = 'Support (' + cantidad + '€)';
}

// Añadir evento input para validar la entrada en el campo de cantidad personalizada
document.getElementById('cantidadPersonalizada').addEventListener('input', function () {
  var cantidadInput = this.value;
  if (cantidadInput < 0) {
    this.value = 0;
  } else if (cantidadInput > 10) {
    this.value = 10;
  }

  actualizarTotalSoporte(this.value);
});