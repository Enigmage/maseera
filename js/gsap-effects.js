import { animate, inView } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

const FLOAT_SYMBOLS = ['✦', '❧', '◆', '✿', '❦', '♦', '✦'];

export function initGsapEffects() {
  initCursor();
  initFloatingElements();
  initBounceEntrances();
}

function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    animate(cursor, { left: e.clientX, top: e.clientY }, { duration: 0.18, ease: 'easeOut' });
  });

  const interactives = document.querySelectorAll('button, .seal, .envelope-wrapper, #candle, .tl-card, .reminder-tile');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => animate(cursor, { width: 30, height: 30 }, { duration: 0.25 }));
    el.addEventListener('mouseleave', () => animate(cursor, { width: 18, height: 18 }, { duration: 0.25 }));
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

  const duration = 9 + Math.random() * 7;
  const xDrift = (Math.random() - 0.5) * 120;
  const rotation = (Math.random() - 0.5) * 270;

  animate(
    el,
    { y: -(window.innerHeight + 80), x: xDrift, rotate: rotation, opacity: [0, 0.7, 0] },
    { duration, ease: 'linear' }
  ).then(() => el.remove());
}

function initFloatingElements() {
  setInterval(spawnFloat, 2800);
  setTimeout(spawnFloat, 800);
  setTimeout(spawnFloat, 1800);
}

function initBounceEntrances() {
  const titles = document.querySelectorAll('.section-title');
  titles.forEach((t) => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(32px)';
  });

  inView('.section-title', (el) => {
    animate(
      el,
      { y: [32, 0], opacity: [0, 1], scale: [0.94, 1] },
      { ease: 'backOut', duration: 0.9 }
    );
  }, { amount: 0.3 });
}
