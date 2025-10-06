document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    if (!navToggle || !nav) {
        console.error('Не найдены необходимые элементы');
        return;
    }
    
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Важно!
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});
