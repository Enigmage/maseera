const container = document.getElementById('petal-container');
const petals = [];
let animating = false;

const COLORS = ['#E8A0B8', '#F0C0D0', '#C8547A', '#F8D0E0', '#B87090'];
const MAX_LIVE = 15;

function createPetal(x, y, isBurst = false) {
  if (!isBurst && petals.length >= MAX_LIVE) return;

  const petal = document.createElement('div');
  petal.className = 'petal';

  const size = 8 + Math.random() * 12;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  petal.style.cssText = `
    width: ${size}px;
    height: ${size * 1.3}px;
    background: ${color};
    border-radius: 50% 0 50% 50%;
    left: ${x}px;
    top: ${y}px;
    opacity: 1;
  `;

  const state = {
    el: petal,
    x,
    y,
    vx: isBurst ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 1,
    vy: isBurst ? -(Math.random() * 3 + 1) : (Math.random() * 1 + 0.5),
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 3,
    opacity: 1,
    decay: 0.003 + Math.random() * 0.005,
  };

  container.appendChild(petal);
  petals.push(state);

  if (!animating) startAnimation();
}

function startAnimation() {
  animating = true;
  requestAnimationFrame(animate);
}

function animate() {
  let active = false;

  for (let i = petals.length - 1; i >= 0; i--) {
    const p = petals[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.02;
    p.vx *= 0.99;
    p.rotation += p.rotSpeed;
    p.opacity -= p.decay;

    if (p.opacity <= 0) {
      p.el.remove();
      petals.splice(i, 1);
    } else {
      p.el.style.transform = `translate(${p.x - parseFloat(p.el.style.left)}px, ${p.y - parseFloat(p.el.style.top)}px) rotate(${p.rotation}deg)`;
      p.el.style.opacity = p.opacity;
      active = true;
    }
  }

  if (active) {
    requestAnimationFrame(animate);
  } else {
    animating = false;
  }
}

export function burstPetals(x, y, count = 12, colors = null) {
  const palette = colors || COLORS;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 8 + Math.random() * 12;
    const color = palette[Math.floor(Math.random() * palette.length)];
    const px = x + (Math.random() - 0.5) * 30;
    const py = y;

    petal.style.cssText = `
      width: ${size}px;
      height: ${size * 1.3}px;
      background: ${color};
      border-radius: 50% 0 50% 50%;
      left: ${px}px;
      top: ${py}px;
      opacity: 1;
    `;

    const state = {
      el: petal,
      x: px, y: py,
      vx: (Math.random() - 0.5) * 6,
      vy: -(Math.random() * 5 + 2),
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 5,
      opacity: 1,
      decay: 0.008 + Math.random() * 0.008,
    };

    container.appendChild(petal);
    petals.push(state);
  }
  if (!animating) startAnimation();
}

export function initPetals() {
  // Initial burst: 20 petals over 12s, then continuous slow drip
  let count = 0;
  const burst = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    createPetal(x, -20);
    count++;
    if (count >= 20) {
      clearInterval(burst);
      // Slow continuous drip — 1 petal every 3s
      setInterval(() => {
        const x = Math.random() * window.innerWidth;
        createPetal(x, -20);
      }, 3000);
    }
  }, 600);
}
