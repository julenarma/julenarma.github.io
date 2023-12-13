document.addEventListener("DOMContentLoaded", function () {

    //Botón contacto hacia form 

    $('.button-contactame').on('click', function () {
        $('html, body').animate({
            scrollTop: $(".white-section").offset().top
        }, 1000);
    });

});

function enviarContactoForm() {
    var nombre = $("#nombreContacto").val();
    var email = $("#emailContacto").val();
    var asunto = $("#asuntoContacto").val();
    var mensaje = $("#mensajeContacto").val();

    permitirInsertContacto = true;

    // Restaurar los estilos de borde a su estado original
    $("#nombreContacto, #emailContacto, #asuntoContacto").css("border", "");

    // Validar campos
    if (nombre.trim() === "") {
        $("#nombreContacto").css("border", "1px solid red");
        permitirInsertContacto = false;
    }
    if (email.trim() === "") {
        $("#emailContacto").css("border", "1px solid red");
        permitirInsertContacto = false;
    } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        // Mostrar mensaje específico para formato de correo electrónico incorrecto
        permitirInsertContacto = false;
        Swal.fire({
            icon: 'warning',
            title: 'Formato de correo incorrecto',
            text: 'Por favor, introduce una dirección de correo electrónico válida.',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            reverseButtons: true,
        });
        $("#emailContacto").css("border", "1px solid red");
    }

    if (asunto.trim() === "") {
        $("#asuntoContacto").css("border", "1px solid red");
        permitirInsertContacto = false;
    }

    // Validar campos
    if (nombre.trim() === "" || email.trim() === "" || asunto.trim() === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Completa todos los campos antes de enviar el mensaje.',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            reverseButtons: true,
        });
        return;
    }

    if (permitirInsertContacto) {
        var url = "../../controller/cInsertContact.php";
        var data = {
            'nombre': nombre,
            'email': email,
            'asunto': asunto,
            'mensaje': mensaje,
        };

        fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(result => {
                if (!result.error) {
                    // Muestra el modal de éxito
                    Swal.fire({
                        icon: 'success',
                        title: '¡Enviado con éxito!',
                        text: 'Tu mensaje ha sido enviado correctamente.',
                        showCancelButton: false,
                        showConfirmButton: true,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Aceptar',
                        reverseButtons: true,
                    })

                    $("#nombreContacto").val("");
                    $("#emailContacto").val("");
                    $("#asuntoContacto").val("");
                    $("#mensajeContacto").val("");

                } else {
                    // Muestra un mensaje de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.',
                        showCancelButton: false,
                        showConfirmButton: true,
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'Aceptar',
                        reverseButtons: true,
                    });
                }
            })
            .catch(error => {
                console.error('Error status:', error);
            });
    }
}