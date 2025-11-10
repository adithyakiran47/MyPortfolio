const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
const currentYear = document.getElementById("current-year");
const heroPhoto = document.querySelector(".hero__photo");
const heroAvatar = document.querySelector(".hero__avatar");
const particleCanvas = document.getElementById("particle-canvas");
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

if (particleCanvas && particleCanvas.getContext) {
  const context = particleCanvas.getContext("2d");
  const state = {
    width: particleCanvas.clientWidth,
    height: particleCanvas.clientHeight,
    particles: [],
    animationFrameId: 0,
  };

  const settings = {
    density: 14000,
    minCount: 28,
    maxCount: 90,
    maxVelocity: 0.35,
    connectDistance: 140,
  };

  const randomBetween = (min, max) => Math.random() * (max - min) + min;

  const createParticle = () => ({
    x: Math.random() * state.width,
    y: Math.random() * state.height,
    vx: randomBetween(-settings.maxVelocity, settings.maxVelocity),
    vy: randomBetween(-settings.maxVelocity, settings.maxVelocity),
    size: randomBetween(1.2, 2.4),
    opacity: randomBetween(0.35, 0.8),
  });

  const resizeCanvas = () => {
    state.width = particleCanvas.clientWidth;
    state.height = particleCanvas.clientHeight;
    const ratio = window.devicePixelRatio || 1;

    particleCanvas.width = state.width * ratio;
    particleCanvas.height = state.height * ratio;

    if (typeof context.setTransform === "function") {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    } else {
      context.scale(ratio, ratio);
    }

    const targetCount = Math.max(
      settings.minCount,
      Math.min(settings.maxCount, Math.floor((state.width * state.height) / settings.density)),
    );

    state.particles = Array.from({ length: targetCount }, createParticle);
  };

  const drawParticles = () => {
    context.clearRect(0, 0, state.width, state.height);

    const { particles } = state;
    const maxDistance = settings.connectDistance;
    const maxDistanceSq = maxDistance * maxDistance;

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x <= 0 || particle.x >= state.width) {
        particle.vx *= -1;
      }
      if (particle.y <= 0 || particle.y >= state.height) {
        particle.vy *= -1;
      }

      context.beginPath();
      context.fillStyle = `rgba(56, 189, 248, ${particle.opacity})`;
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();

      for (let j = i + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          const alpha = Math.max(0, 1 - distance / maxDistance) * 0.35;
          context.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          context.lineWidth = 0.6;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
    }

    state.animationFrameId = window.requestAnimationFrame(drawParticles);
  };

  const startParticles = () => {
    window.cancelAnimationFrame(state.animationFrameId);
    resizeCanvas();
    drawParticles();
  };

  const stopParticles = () => {
    window.cancelAnimationFrame(state.animationFrameId);
    context.clearRect(0, 0, state.width, state.height);
  };

  let resizeTimeoutId;
  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(state.animationFrameId);
    window.clearTimeout(resizeTimeoutId);
    resizeTimeoutId = window.setTimeout(() => {
      if (!prefersReducedMotion.matches) {
        startParticles();
      }
    }, 120);
  });

  if (prefersReducedMotion && typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        stopParticles();
      } else {
        startParticles();
      }
    });
  } else if (prefersReducedMotion && typeof prefersReducedMotion.addListener === "function") {
    prefersReducedMotion.addListener((event) => {
      if (event.matches) {
        stopParticles();
      } else {
        startParticles();
      }
    });
  }

  if (!prefersReducedMotion.matches) {
    startParticles();
  }
}

