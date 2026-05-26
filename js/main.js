import { initWhistledown } from './whistledown.js';
import { initSeals } from './seals.js';
import { initEnvelopes } from './envelopes.js';
import { initMusicBox } from './musicbox.js';
import { initPetals } from './petals.js';
import { initTimeline } from './timeline.js';
import { initCandle } from './candle.js';
import { initPortrait } from './portrait.js';
import { initReminders } from './reminders.js';
import { initFlipCards } from './flipcards.js';
import { initGsapEffects } from './gsap-effects.js';

async function loadConfig() {
  const res = await fetch('assets/config.json');
  return res.json();
}

async function init() {
  const config = await loadConfig();

  initWhistledown(config.intro, () => {
    document.getElementById('main-content').classList.add('visible');
    document.getElementById('seal-nav').classList.add('visible');
    document.getElementById('music-box').classList.add('visible');
    initPetals();
    initSectionReveal();
  });

  initSeals(config.sections);
  initTimeline(config.timeline);
  initEnvelopes(config.envelopes);
  initFlipCards(config.reasons);
  initPortrait(config.portrait);
  initReminders(config.reminders);
  initMusicBox(config.music);
  initCandle();
  initGsapEffects();
  initEasterEggs();
}

function initEasterEggs() {
  // Easter egg 5: triple-click "Happy Birthday, Maseera" to reveal hidden line
  const msg = document.getElementById('finale-message');
  const hidden = document.getElementById('finale-hidden');
  if (msg && hidden) {
    let clickCount = 0;
    let clickTimer = null;
    msg.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 600);
      if (clickCount >= 3) {
        clickCount = 0;
        hidden.classList.toggle('revealed');
      }
    });
  }

  // Easter egg 3: click all section dividers in order to unlock someday modal
  const dividers = Array.from(document.querySelectorAll('.section-divider span'));
  const modal = document.getElementById('someday-modal');
  const modalClose = document.getElementById('someday-close');
  if (!dividers.length || !modal) return;

  let progress = 0;
  dividers.forEach((div, i) => {
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => {
      if (i === progress) {
        progress++;
        div.classList.add('egg-lit');
        if (progress === dividers.length) {
          progress = 0;
          setTimeout(() => modal.classList.add('visible'), 300);
        }
      } else {
        dividers.forEach(d => d.classList.remove('egg-lit'));
        progress = 0;
        if (i === 0) {
          progress = 1;
          div.classList.add('egg-lit');
        }
      }
    });
  });

  modalClose.addEventListener('click', () => modal.classList.remove('visible'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('visible');
  });
}

function initSectionReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach((s) => observer.observe(s));
}

init();
