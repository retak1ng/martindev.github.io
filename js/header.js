

document.addEventListener('DOMContentLoaded', () => {
    let btnMenu = document.querySelector('.navbar-mobile');

    document.querySelector('#menu-btn').onclick = () => {
        btnMenu.classList.toggle('active');
    }

    /* ROTAR ICONO */
    $(document).ready(function () {
        $('#menu-btn').click(function () {
            $(this).toggleClass('rotate-180'); // Agrega o quita la clase 'rotate-180' cuando se hace clic en el ícono
        });
    });


    const navLinks = document.querySelectorAll('.navbar li a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Eliminar la clase 'active' de todos los enlaces
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Agregar la clase 'active' al enlace seleccionado
            link.classList.add('active');
        });
    });

    const mobileNavItems = document.querySelectorAll('.navbar-mobile ul li');

    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Eliminar la clase 'active' de todos los <li>
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            // Agregar la clase 'active' al <li> seleccionado
            item.classList.add('active');
        });
    });
});