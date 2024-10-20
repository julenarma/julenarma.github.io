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
            // Cerrar otras panels
            document.querySelectorAll('.panel').forEach(panel => {
                if (panel !== item.nextElementSibling) {
                    panel.style.maxHeight = null;
                }
            });

            // Expandir o colapsar el panel actual
            const panel = item.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
});