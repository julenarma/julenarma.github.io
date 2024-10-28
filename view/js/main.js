$(document).scroll(function () {
  if (window.pageYOffset >= 500) {
    $('.go-top').show();
  } else {
    $('.go-top').hide();
  }
});

// Manejo del clic en el botón "Go Top"
$('.go-top').on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  }, 600, function () {
    window.scrollTo(0, 0);
  });
});


// Variables
var image = document.getElementById('scrollImage');
var navbar = document.getElementById('navbar');
var navText = document.querySelector('.nav1-principal');
var toggleMenu = document.getElementById('toggleMenu');
var goTopButton = document.querySelector('.go-top');
var body = document.getElementById('pageBody');
var darkModeToggle = document.getElementById('dark-mode-toggle');
var sticky = navbar.offsetTop;
var on_off = true;

// Función para manejar el menú sticky
function stickyMenu() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add('sticky');

    // Cambiar estilos según el modo oscuro
    if (body.classList.contains('dark-mode')) {
      navbar.style.backgroundColor = 'black'; // Fondo oscuro
      toggleMenu.style.color = 'white'; // Color del menú en modo oscuro
      image.src = getRelativeImagePath('view/img/index/armadev_blanco.png');
      darkModeToggle.style.color = 'white';
      navText.querySelectorAll('a').forEach(link => {
        link.style.color = 'white'; // Letras blancas en modo oscuro
      });
    } else {
      navbar.style.backgroundColor = 'white'; // Fondo blanco
      toggleMenu.style.color = 'black'; // Color del menú en modo claro
      image.src = getRelativeImagePath('view/img/index/armadev_azul.png');
      darkModeToggle.style.color = 'black';
      navText.querySelectorAll('a').forEach(link => {
        link.style.color = 'black'; // Letras negras en modo normal
      });

    }
  } else {
    navbar.classList.remove('sticky');
    navbar.style.backgroundColor = 'transparent'; // Mantener transparente en la parte superior
    toggleMenu.style.color = 'white';
    image.src = getRelativeImagePath('view/img/index/armadev_blanco.png');
    darkModeToggle.style.color = 'white';
    navText.querySelectorAll('a').forEach(link => {
      link.style.color = 'white'; // Letras blancas cuando es transparente
    });

  }
}


toggleMenu.addEventListener('click', function () {
  // Mostrar u ocultar el menú
  if (on_off) {
    navText.style.left = '0'; // Mostrar menú
    document.body.classList.add('menu-open'); // Agrega una clase para el menú abierto
    goTopButton.style.visibility = 'hidden'; // Ocultar botón "Ir arriba"

    // Deshabilitar el scroll
    document.body.style.overflow = 'hidden';

    // Actualizar el fondo del navbar
    if (body.classList.contains('dark-mode')) {
      navbar.style.backgroundColor = 'black'; // Fondo oscuro
      toggleMenu.style.color = 'white'; // Color del menú en modo oscuro
    } else {
      navbar.style.backgroundColor = 'white'; // Fondo claro
      toggleMenu.style.color = 'black'; // Color del menú en modo claro
      image.src = getRelativeImagePath('view/img/index/armadev_azul.png')
    }
  } else {
    navText.style.left = '-100%'; // Cerrar menú
    document.body.style.overflow = 'auto'; // Habilitar el scroll

    // Hacer el navbar transparente solo si no es sticky
    if (window.pageYOffset === 0) {
      navbar.style.backgroundColor = 'transparent'; // Cambiar el fondo a transparente
      toggleMenu.style.color = 'white'; // Color del menú en modo claro
      image.src = getRelativeImagePath('view/img/index/armadev_blanco.png')
    }
  }

  on_off = !on_off; // Cambiar el estado del menú

  // Actualizar estilos de enlaces al cerrar el menú
  if (!on_off) {
    navText.querySelectorAll('a').forEach(link => {
      if (body.classList.contains('dark-mode')) {
        link.style.color = 'white'; // Letras blancas en modo oscuro
      } else {
        link.style.color = 'black'; // Letras negras en modo claro
      }
    });

    // Actualizar estilo del botón de modo oscuro
    if (body.classList.contains('dark-mode')) {
      darkModeToggle.style.color = 'white'; // Color del botón en modo oscuro
    } else {
      darkModeToggle.style.color = 'black'; // Color del botón en modo claro
    }
  }
});

// Evento de scroll
window.onscroll = function () {
  stickyMenu();
};

// Inicializar el estado del navbar al cargar
stickyMenu();


// Cambiar el modo oscuro
darkModeToggle.addEventListener('click', function () {
  body.classList.toggle('dark-mode');

  // Cambiar el icono y el color del botón
  if (body.classList.contains('dark-mode')) {
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icono de sol
    localStorage.setItem('dark-mode', 'enabled'); // Guardar en localStorage
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Icono de luna
    localStorage.setItem('dark-mode', 'disabled'); // Guardar en localStorage
  }
  // Actualizar el estilo del navbar
  stickyMenu();
});

// Cargar estado del modo oscuro desde localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
  body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icono de sol
}


// Obtener la ruta de la imagen relativa
function getRelativeImagePath(relativePath) {
  var currentUrl = window.location.href;
  var depth = (currentUrl.match(/\//g) || []).length;
  var prefix = Array(depth).fill('..').join('/') + '/';
  return prefix + relativePath;
}