document.addEventListener("DOMContentLoaded", function () {
    //------Data AOS animación start----
    AOS.init({
        offset: 200, // Offset (in px) from the original trigger point
        easing: 'ease-in-out', // Easing function
        duration: 1000,
        once: true // Animation should happen only once
    });

    // Botón mi trayectoria hacia mi cv
    // Botón mi trayectoria hacia mi cv
    $('.button-sobremi').on('click', function () {
        $('html, body').animate({
            scrollTop: $('.about-section').offset().top - 100 // Ajusta el valor según la altura de tu encabezado
        }, 1000);
    });

    // Acordeón cv
    document.querySelectorAll('.accordion').forEach(item => {
        item.addEventListener('click', () => {
            const panel = item.nextElementSibling; // Panel correspondiente
    
            // Cerrar otros paneles
            document.querySelectorAll('.panel').forEach(otherPanel => {
                if (otherPanel !== panel) {
                    otherPanel.style.maxHeight = null; // Cerrar el panel
                    otherPanel.previousElementSibling.classList.remove('active'); // Quitar clase active
                }
            });
    
            // Alternar clase active en el acordeón actual
            item.classList.toggle('active');
    
            // Expandir o colapsar el panel actual
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null; // Cerrar el panel
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px"; // Abrir el panel
            }
        });
    });


});