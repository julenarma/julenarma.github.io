$(document).scroll(function () {
  // console.log(window.pageYOffset != 0, window.pageYOffset );
  if (window.pageYOffset >= 500) {

    //Nos sale
    $('.go-top').show();
  } else {
    //se oculta
    $('.go-top').hide();
  }
  $('.go-top ').on('click', function () {

    $("html, body").animate({
      scrollTop: 0
    }, 600);

  });
});


var image = document.getElementById('scrollImage');
var navbar = document.getElementById('navbar');
var navText = document.querySelector('.nav1-principal');
var toggleMenu = document.getElementById('toggleMenu');
var sticky = navbar.offsetTop;
var on_off = true;

window.onscroll = function () {
  stickyMenu();
};


/*Responsive Menu*/

toggleMenu.addEventListener('click', function () {
  if (on_off) {
    //Si es true que no se desplace
    navText.style.left = '0';
    on_off = false; // lo desactivamos porque ya está activado
    navbar.classList.add('sticky');
    image.src = getRelativeImagePath('view/img/index/armadev_azul.png');
    toggleMenu.style.color = 'black';
    disableScroll();

  } else {
    //Si es false que se desplace
    navText.style.left = '-100%';
    navbar.classList.remove('sticky');
    image.src = getRelativeImagePath('view/img/index/armadev_blanco.png');
    toggleMenu.style.color = 'white';
    on_off = true; // lo activamos para que funcione ya que está cerrado
    enableScroll()
  }

})
// Funciones para desactivar y activar el scroll
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}

function stickyMenu() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add('sticky');
    navText.style.color = 'black';
    image.src = getRelativeImagePath('view/img/index/armadev_azul.png');
    // Assuming .btn-menu is your toggle menu icon
    toggleMenu.style.color = 'black';
  } else {
    navbar.classList.remove('sticky');
    navText.style.color = 'white';
    image.src = getRelativeImagePath('view/img/index/armadev_blanco.png');
    // Assuming .btn-menu is your toggle menu icon
    toggleMenu.style.color = 'white';
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