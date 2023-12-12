document.addEventListener("DOMContentLoaded", function () {

    //Botón contacto hacia form 

    $('.button-contactame').on('click', function () {
        $('html, body').animate({
            scrollTop: $(".white-section").offset().top
        }, 1000);
    });


});

/* Insertar Contacto */
function enviarContacto() {
    var nombre = $("#nombreContacto").val();
    var email = $("#emailContacto").val();
    var asunto = $("#asuntoContacto").val();
    var mensaje = $("#mensajeContacto").val();

    if (nombre !== "" && email !== "" && asunto !== "" && mensaje !== "") {
        var url = "../../controller/cInsertContact.php";
        var data = {
            'nombre': nombre,
            'email': email,
            'asunto': asunto,
            'mensaje': mensaje,
        };

        // Llamada fetch
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(result => {
            if (result.error) {
                alert("Error: " + result.error);
            } else {
                alert("Mensaje enviado correctamente");
            }
        })
        .catch(error => console.error('Error status:', error));
    } else {
        alert("Por favor, complete todos los campos.");
    }
}
