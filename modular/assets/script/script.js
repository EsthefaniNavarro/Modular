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