//Ejecutar función en el evento click
document.getElementById("btn_open").addEventListener("click", open_close_menu);
//Declaramos variables
var side_menu = document.getElementById("navigation-section");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");
//Evento para mostrar y ocultar menú
    function open_close_menu(){
        body.classList.toggle("body_move");
        side_menu.classList.toggle("navigation-section_move");
    }
//Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página
if (window.innerWidth < 760){
    body.classList.add("body_move");
    side_menu.classList.add("navigation-section_move");
}
//Responsivo
window.addEventListener("resize", function(){
    if (window.innerWidth > 760){
        body.classList.remove("body_move");
        side_menu.classList.remove("navigation-section_move");
    }
    if (window.innerWidth < 760){
        body.classList.add("body_move");
        side_menu.classList.add("navigation-section_move");
    }
});

//conectarme
function toggleCheckbox(checkbox) {
    checkbox.classList.toggle('checked');
}

function conectar() {
    const aceptoCheckbox = document.querySelector('.checkbox');
    if (aceptoCheckbox.classList.contains('checked')) {
        // Realiza la conexión aquí
        window.location.href = 'menu_carrusel.html';
    } else {
        alert('Por favor, acepta los términos y condiciones.');
    }
}

//-----------------------------------------CARRUSEL---------------------------------------------------

 // Redirigir a la página del carrusel si la pantalla es pequeña
 function checkScreenSize() {
    if (window.innerWidth < 755) {
        window.location.href = "menu_carrusel.html"; // Redirige a la página del carrusel
    }
}


// También comprobar el tamaño de la pantalla cuando la ventana cambia de tamaño
window.onresize = checkScreenSize;

// Función para enviar solicitudes al ESP32
function sendCommand(command) {
    fetch(command)  //Fetch usado para buscar recursos en la red
        .then(response => {
            if (response.ok) {
                console.log(`Comando ${command} enviado correctamente`); //Mensaje en consola
            } else {
                console.error(`Error al enviar el comando ${command}`); 
            }
        })
        .catch(error => console.error(`Error de conexión: ${error}`));
}

// Asociar eventos a los botones de control
document.querySelector('.arriba').addEventListener('click', () => sendCommand('/avanzar'));
document.querySelector('.abajo').addEventListener('click', () => sendCommand('/retroceder'));
document.querySelector('.izquierda').addEventListener('click', () => sendCommand('/izquierda'));
document.querySelector('.derecha').addEventListener('click', () => sendCommand('/derecha'));

// Opcional: detener motores cuando se suelten todos los botones
document.querySelectorAll('.arriba, .abajo, .izquierda, .derecha').forEach(button => {
    button.addEventListener('mouseup', () => sendCommand('/detener'));
    button.addEventListener('touchend', () => sendCommand('/detener')); // Para dispositivos táctiles
});