// Este script maneja la interacción del menú de navegación en la página web
document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.querySelector('.navbar-mobile');
    const menuBtn = document.querySelector('#menu-btn');

    // Verifica que los elementos existan
    if (btnMenu && menuBtn) {
        menuBtn.addEventListener('click', () => {
            btnMenu.classList.toggle('active'); // Alterna la clase 'active' en el menú móvil
            menuBtn.classList.toggle('rotate-180'); // Alterna la rotación del ícono
        });
    } else {
        console.error('No se encontró el elemento #menu-btn o .navbar-mobile en el DOM.');
    }

    // Manejo de enlaces en el menú principal
    const navLinks = document.querySelectorAll('.navbar li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Manejo de enlaces en el menú móvil
    const mobileNavItems = document.querySelectorAll('.navbar-mobile ul li');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
});