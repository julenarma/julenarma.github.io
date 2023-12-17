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



