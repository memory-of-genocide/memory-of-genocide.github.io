const burger = document.getElementById('menu-burger-icon');
const menu = document.querySelector('.menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
});
