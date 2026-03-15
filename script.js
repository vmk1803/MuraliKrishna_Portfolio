const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.topnav a');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

document.body.classList.add('js-ready');
revealItems.forEach((item, index) => {
  window.setTimeout(() => {
    item.classList.add('is-visible');
  }, 120 + index * 80);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isMatch = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', isMatch);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: '-20% 0px -45% 0px',
  }
);

sections.forEach((section) => navObserver.observe(section));
