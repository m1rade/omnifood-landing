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
    headerEl.classList.toggle('show-menu');
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
const headerHeight = headerEl.getBoundingClientRect().height;

const obs = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) document.body.classList.add('sticky');
    else document.body.classList.remove('sticky');
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
  }
);
obs.observe(sectionHero);

/////////////////////////////////////
// Animation for nav menu
/* const allMenuSections = document.querySelectorAll('.menu');
const navLinksMap = [...document.querySelectorAll('.main-nav-link')].reduce((obj, el) => {
  obj[el.dataset.section] = el;
  return obj;
}, {});


let currentActiveNavLink = document.querySelector('.nav-current-link');

const obsSections = new IntersectionObserver(
  ([entry]) => {
    console.log(entry);

    if (entry.isIntersecting) {
      const targetId = entry.target.getAttribute('id');

      if (currentActiveNavLink && currentActiveNavLink.classList.contains('nav-current-link')) {
        currentActiveNavLink.classList.remove('nav-current-link');
      }

      const navLink = navLinksMap[targetId];

      navLink.classList.add('nav-current-link');
      currentActiveNavLink = navLink;
    } else {
      console.log(entry);
      // if (!currentActiveNavLink) return;
      // currentActiveNavLink.classList.remove('nav-current-link');
    }
  },
  {
    root: null,
    threshold: 0.1,
  }
);

allMenuSections.forEach(s => obsSections.observe(s)); */

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
