document.addEventListener("DOMContentLoaded", function () {

  //Botón index hacia sección 1

  $('.mini-button').on('click', function () {
    $('html, body').animate({
      scrollTop: $(".white-section").offset().top
    }, 1000);
  });



  //------Data aos animacion start----

  AOS.init();

   //------Data aos animacion end----

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





}); //--------------Dom Content End ----------------


