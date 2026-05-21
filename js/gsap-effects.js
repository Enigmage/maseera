// GSAP-powered effects: cursor trail, floating elements, bounce entrances

const FLOAT_SYMBOLS = ['✦', '❧', '◆', '✿', '❦', '♦', '✦'];

export function initGsapEffects() {
  if (typeof gsap === 'undefined') return;

  initCursor();
  initFloatingElements();
  initBounceEntrances();
}

function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      left: e.clientX,
      top: e.clientY,
      duration: 0.18,
      ease: 'power2.out',
    });
  });

  // Slight scale pulse on interactive elements
  const interactives = document.querySelectorAll('button, .seal, .envelope-wrapper, #candle, .tl-card, .reminder-tile');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => gsap.to(cursor, { width: 30, height: 30, duration: 0.25 }));
    el.addEventListener('mouseleave', () => gsap.to(cursor, { width: 18, height: 18, duration: 0.25 }));
  });
}

function spawnFloat() {
  const el = document.createElement('div');
  el.className = 'gsap-float';
  el.textContent = FLOAT_SYMBOLS[Math.floor(Math.random() * FLOAT_SYMBOLS.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.top = '100vh';
  el.style.color = Math.random() > 0.5 ? 'var(--gold)' : 'rgba(240,160,184,0.6)';
  document.body.appendChild(el);

  gsap.to(el, {
    y: -(window.innerHeight + 80),
    x: (Math.random() - 0.5) * 120,
    rotation: (Math.random() - 0.5) * 270,
    opacity: 0.7,
    duration: 9 + Math.random() * 7,
    ease: 'none',
    onComplete: () => el.remove(),
  });
}

function initFloatingElements() {
  // Start sparse background floats
  setInterval(spawnFloat, 2800);
  // Seed a couple immediately (staggered)
  setTimeout(spawnFloat, 800);
  setTimeout(spawnFloat, 1800);
}

function initBounceEntrances() {
  // GSAP bounce.out on section titles when they become visible
  const titles = document.querySelectorAll('.section-title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.fromTo(entry.target,
          { y: 32, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  titles.forEach((t) => {
    // Reset so CSS transition doesn't conflict
    t.style.opacity = '0';
    t.style.transform = 'translateY(32px)';
    observer.observe(t);
  });
}
