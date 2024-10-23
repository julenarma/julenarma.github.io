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



// Manejo del menú responsive
toggleMenu.addEventListener('click', function () {
  if (on_off) {
    navText.style.left = '0';
    on_off = false;
    navbar.classList.add('sticky');
    image.src = getRelativeImagePath('view/img/index/armadev_azul.png');
    toggleMenu.style.color = 'black';
    goTopButton.style.visibility = 'hidden';
    disableScroll();
  } else {
    navText.style.left = '-100%';
    navbar.classList.remove('sticky');
    image.src = getRelativeImagePath('view/img/index/armadev_blanco.png');
    toggleMenu.style.color = 'white';
    goTopButton.style.visibility = 'visible';
    on_off = true;
    enableScroll();
  }
});


// Funciones para desactivar y activar el scroll
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}

// Evento de scroll
window.onscroll = function () {
  stickyMenu();
};



// Guardamos en local storage modo oscuro 
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('darkMode') === 'true') {
      body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icono de sol
  }
});

// Cambiar el modo oscuro
darkModeToggle.addEventListener('click', function () {
  body.classList.toggle('dark-mode');
  // Cambiar el icono y el color del botón
  if (body.classList.contains('dark-mode')) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icono de sol
      localStorage.setItem('darkMode', 'true'); // Guardar en localStorage
  } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Icono de luna
      localStorage.setItem('darkMode', 'false'); // Guardar en localStorage
  }

  // Actualizar el estilo del navbar
  stickyMenu();
});

// Obtener la ruta de la imagen relativa
function getRelativeImagePath(relativePath) {
  var currentUrl = window.location.href;
  var depth = (currentUrl.match(/\//g) || []).length;
  var prefix = Array(depth).fill('..').join('/') + '/';
  return prefix + relativePath;
}
