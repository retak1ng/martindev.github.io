let btnMenu = document.querySelector('.navbar-mobile');

document.querySelector('#menu-btn').onclick = () =>{
	btnMenu.classList.toggle('active');
}

/* ROTAR ICONO */
$(document).ready(function(){
    $('#menu-btn').click(function(){
        $(this).toggleClass('rotate-180'); // Agrega o quita la clase 'rotate-180' cuando se hace clic en el ícono
    });
});
