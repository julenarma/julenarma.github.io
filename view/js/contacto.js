document.addEventListener("DOMContentLoaded", function () {

    //Botón contacto hacia form 

    $('.button-contactame').on('click', function () {
        $('html, body').animate({
            scrollTop: $(".white-section").offset().top
        }, 1000);
    });


});