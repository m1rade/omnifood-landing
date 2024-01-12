///////////////////////////////////////
// Mobile nav menu
const headerEl = document.querySelector('.header');
const btnNavMobile = document.querySelector('.btn-nav-mobile');

btnNavMobile.addEventListener('click', () => headerEl.classList.toggle('show-menu'));
