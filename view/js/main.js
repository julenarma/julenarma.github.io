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
  //------------Donacion cafe end-------