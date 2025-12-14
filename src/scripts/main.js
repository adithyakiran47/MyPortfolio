const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
const currentYear = document.getElementById("current-year");
const heroPhoto = document.querySelector(".hero__photo");
const heroAvatar = document.querySelector(".hero__avatar");

const prefersReducedMotion = window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)")
  : { matches: false, addEventListener: null, addListener: null };

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Scroll Reveal Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  section.classList.add('reveal-section');
  observer.observe(section);
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (heroPhoto && heroAvatar) {
  const hideFallback = () => heroAvatar.classList.add("is-hidden");
  const showFallback = () => heroAvatar.classList.remove("is-hidden");

  if (heroPhoto.complete && heroPhoto.naturalWidth > 0) {
    hideFallback();
  } else {
    heroPhoto.addEventListener("load", hideFallback);
  }

  heroPhoto.addEventListener("error", showFallback);
}



