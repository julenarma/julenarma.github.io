document.addEventListener("DOMContentLoaded", function () {

    //Botón contacto hacia form 

    $('.button-contactame').on('click', function () {
        $('html, body').animate({
            scrollTop: $(".white-section").offset().top
        }, 1000);
    });


});


/*Función para enviar el comentario*/
function enviarContacto() {

    var nombre = $("#nombreContacto").val();
    var email = $("#emailContacto").val();
    var asunto = $("#asuntoContacto").val();
    var mensaje = $("#mensajeContacto").val();

    if (nombre !== "" && email !== "" && asunto !== "" && mensaje !== "") {

        $.ajax({
            method: 'POST',
            data: {
                "nombre": nombre,
                "email": email,
                "asunto": asunto,
                "mensaje": mensaje
            },
            url: "../../controller/cInsertContact.php",
            success: function () {
                console.log(nombre, email, asunto,mensaje);
            
             alert("ya esta")
            },
            error: function (xhr) {
                alert("An error occurred: " + xhr.status + " " + xhr.statusText);
            }
        });
    }
}
