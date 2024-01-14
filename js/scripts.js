const headerEl = document.querySelector('.header');

///////////////////////////////////////
// Mobile nav menu
const btnNavMobile = document.querySelector('.btn-nav-mobile');

btnNavMobile.addEventListener('click', () => headerEl.classList.toggle('show-menu'));

/////////////////////////////////////
// Smooth scrolling animation
const logoLinks = document.querySelectorAll('.logo');
const heroHeadingEl = document.querySelector('.hero-heading-box');

const scrollToByTarget = target => {
  if (!target) return;

  const id = target.getAttribute('href');

  if (id !== '#' && id.startsWith('#')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
};

// Navbar
headerEl.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('main-nav-link')) {
    scrollToByTarget(e.target);

    // Close mobile nav menu
    if (window.matchMedia('(max-width: 59em)').matches) {
      headerEl.classList.toggle('show-menu');
    }
  }
});

// Buttons with navigation
heroHeadingEl.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('btn--scroll-to')) {
    scrollToByTarget(e.target);
  }
});

// For logo
logoLinks.forEach(l => {
  l.addEventListener('click', function (e) {
    e.preventDefault();

    const logoLink = e.target.closest('a:link');

    if (logoLink.getAttribute('href') === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  });
});

/////////////////////////////////////
// Sticky nav menu
const sectionHero = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) document.body.classList.add('sticky');
    else document.body.classList.remove('sticky');
  },
  {
    root: null,
    threshold: 0,
  }
);
obs.observe(sectionHero);

/////////////////////////////////////
// Animation for nav menu
const allMenuSections = document.querySelectorAll('.menu');
const navLinksMap = [...document.querySelectorAll('.main-nav-link')].reduce((obj, el) => {
  obj[el.dataset.section] = el;
  return obj;
}, {});

// let currentActiveNavLink = document.querySelector('.nav-current-link');

const obsSections = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.intersectionRatio >= 0.1) {
          const currentLink = document.querySelector('.nav-current-link');

          if (currentLink) {
            currentLink.classList.remove('nav-current-link');
          }

          const id = entry.target.getAttribute('id');

          navLinksMap[id].classList.add('nav-current-link');
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.1,
  }
);

allMenuSections.forEach(s => obsSections.observe(s));

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log("Check if it's supported flexbox gap property:", isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();
