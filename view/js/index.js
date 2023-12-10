document.addEventListener("DOMContentLoaded", function () {

  window.onscroll = function () {
    stickyMenu()

  };

  var image = document.getElementById('scrollImage');
  var navbar = document.getElementById('navbar');
  var navText = document.querySelector('.nav1-principal');
  var sticky = navbar.offsetTop;

  function stickyMenu() {
    if (window.pageYOffset > sticky) {
      navbar.classList.add('sticky'); // Agregar la clase sticky
      navText.style.color = 'black'; // Cambiar el color de los textos a negro
      image.src = 'view/img/index/armadev_azul.png'; //imagen armadev azul
    } else {
      navbar.classList.remove('sticky'); // Eliminar la clase sticky
      navText.style.color = 'white'; // Mantener el color blanco de los textos
      image.src = 'view/img/index/armadev_blanco.png'; //Imagen armadev blanco
    }
  }

  //Botón index hacia sección 1

  $('.mini-button').on('click', function () {
    $('html, body').animate({
      scrollTop: $(".white-section").offset().top
    }, 1000);
  });



  //------Data aos animacion start----

  AOS.init({
    offset: 200,
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
  });

  var animationCompleted = [false, false, false];
  var animated = false;

  function isElementInViewport(el, offset) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateCounters() {
    if (!animated && isElementInViewport($(".my-stats")[0], 0)) {
      $(".my-stats span").each(function (index) {
        var $this = $(this);
        var targetValue;

        if (index === 0) {
          targetValue = 20;
        } else if (index === 1) {
          targetValue = 400;
        } else if (index === 2) {
          targetValue = 7090;
        }

        if (!animationCompleted[index]) {
          $({
            value: 0
          }).animate({
            value: targetValue
          }, {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.find("div").text(Math.ceil(this.value));
            },
            complete: function () {
              animationCompleted[index] = true;
              animated = true;
            },
          });
        }
      });
    }
  }

  // Verifica al desplazarse y anima los contadores
  $(window).on("scroll resize", function () {
    animateCounters();
  });
  // Asegura que la animación de los contadores se ejecute después de la carga inicial
  $(window).on('load', function () {
    animated = false;
    animateCounters();
  });

  // Utiliza el evento 'aos:in' para iniciar la animación de cada contador específico
  $('[data-aos]').on('aos:in', function (event) {
    animateCounters();
  });
  
}); //--------------Dom Content End ----------------


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

//--------------Función para mostrar el texto gradualmente-------------------
function mostrarTextoGradualmente(elementId) {
  const elemento = document.getElementById(elementId);
  const palabras = elemento.innerText.split(' ');

  // Se reinicia el contenido del elemento
  elemento.innerHTML = '';

  palabras.forEach((palabra, index) => {
    // Se añade cada palabra con un pequeño retraso
    setTimeout(() => {
      elemento.innerHTML += palabra + ' ';
    }, index * 300); // Puedes ajustar la velocidad modificando el valor de '500'
  });

  // Se muestra el texto con la animación de opacidad
  elemento.classList.add('hidden-text');

}

// Llamada a la función para cada elemento

mostrarTextoGradualmente('parrafo');

//--------------Función para mostrar el texto gradualmente end-------------------