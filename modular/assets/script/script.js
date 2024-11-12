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









