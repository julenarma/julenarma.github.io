// Agrega la función getParameterByName antes de su uso
function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}



// Agrega un script para recuperar los parámetros de la URL y mostrar la factura
document.addEventListener('DOMContentLoaded', function () {
  // Obtén los valores de la URL
  var nombre = getParameterByName('nombre');
  var cantidad = getParameterByName('cantidad');

  // Obtiene la fecha y hora actual
  var fechaHoraActual = obtenerFechaHoraActual();

  // Muestra los detalles de la factura en el contenedor
  var facturaContainer = document.getElementById('factura');
  if (facturaContainer) {
    facturaContainer.innerHTML = `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Fecha y Hora:</strong> ${fechaHoraActual}</p>
      <p><strong>Cantidad:</strong> ${cantidad}</p>
      <!-- Puedes agregar más detalles si es necesario -->
      <button id="descargarFactura">Descargar Factura</button>
    `;

    // Agrega un evento de clic al botón para manejar la descarga
    var botonDescarga = document.getElementById('descargarFactura');
    botonDescarga.addEventListener('click', function () {
      descargarFactura(nombre, fechaHoraActual, cantidad);
    });
  }
});

// Función para obtener la fecha y hora actual en el formato deseado
function obtenerFechaHoraActual() {
  var fecha = new Date();

  // Obtiene los componentes de la fecha y hora
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Meses en JavaScript van de 0 a 11
  var anio = fecha.getFullYear();
  var horas = fecha.getHours();
  var minutos = fecha.getMinutes();
  var segundos = fecha.getSeconds();

  // Formatea la fecha y hora como DD/MM/AAAA HH:MM:SS
  return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
}

// Función para descargar la factura en formato PDF

function descargarFactura(nombre, fechaHora, cantidad) {
  // Crea el contenido HTML para la factura
  var contenidoFactura = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Fecha y Hora:</strong> ${fechaHora}</p>
    <p><strong>Cantidad:</strong> ${cantidad}</p>
    <!-- Puedes agregar más detalles si es necesario -->
  `;
  console.log('Descargando factura...');



// Convierte el contenido HTML a un archivo PDF y guarda con FileSaver.js
html2pdf().from(contenidoFactura).toPdf().output('arraybuffer').then(function (pdf) {
  console.log('Generando PDF...');
  try {
    var blob = new Blob([pdf], { type: 'application/pdf' });
    saveAs(blob, 'factura.pdf');
    console.log('Guardado exitoso');
  } catch (error) {
    console.error('Error en el guardado:', error);
  }
});



}