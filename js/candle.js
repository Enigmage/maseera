import { burstPetals } from './petals.js';

export function initCandle() {
  const candle = document.getElementById('candle');
  const flame = document.getElementById('candle-flame');
  if (!candle) return;

  let blown = false;

  candle.addEventListener('click', () => {
    if (blown) return;
    blown = true;

    // Append smoke to the flame element so it positions relative to it
    flame.classList.add('extinguished');
    const smoke = document.createElement('div');
    smoke.className = 'candle-smoke';
    flame.appendChild(smoke);

    // Confetti burst from the flame's actual screen position
    const flameRect = flame.getBoundingClientRect();
    const cx = flameRect.left + flameRect.width / 2;
    const cy = flameRect.top;
    const confettiColors = ['#F0A0B8', '#FAE8EE', '#E8A0B8', '#C8547A', '#DFC0CC'];
    burstPetals(cx, cy, 30, confettiColors);

    // Fade out smoke after 2s
    setTimeout(() => { smoke.style.opacity = '0'; }, 2000);
  });
}
