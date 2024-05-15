document.addEventListener("DOMContentLoaded", function () {

  //------Data aos animacion start----
  AOS.init({
    offset: 200, // Offset (in px) from the original trigger point
    easing: 'ease-in-out', // Easing function ('ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', or a cubic bezier curve)
    duration: 1000,
    once: true// Duration of the animation in milliseconds
});


  //Botón index hacia sección 1
  $('.mini-button').on('click', function () {
    $('html, body').animate({
      scrollTop: $(".white-section").offset().top
    }, 1000);
  });

  // Llamada a la función para cada elemento

  mostrarTextoGradualmente('parrafo');

  // Verifica al desplazarse y anima los contadores, 
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

  // Show images from the "todos" category by default
  showCategory("todos");

  // Handle category filter clicks
  $(".nav2-principal a").click(function () {
    var category = $(this).data("categoria");
    showCategory(category);

    // Update active class in the navigation menu
    $(".nav2-principal a").removeClass("active");
    $(this).addClass("active");
  });


}); //--------------Dom Content End ----------------


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


//My stats animation
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


function showCategory(category) {
  $(".imagen").hide(); // Hide all images

  if (category === "todos") {
    // Show only images with the "todos" category
    $(".imagen[data-categoria='todos']").show();
  } else {
    // Show images of the selected category
    $(".imagen[data-categoria='" + category + "']").show();
  }
  
  // Remove empty spaces by adjusting the layout
  $(".galeria").css("justify-content", "flex-start");
  $(".imagen:not(:visible)").css("flex", "0 0 0"); // Set flex to zero for hidden images
  $(".imagen:visible").css("flex", "1 0 auto"); // Set flex to default for visible images
}


