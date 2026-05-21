import { initWhistledown } from './whistledown.js';
import { initSeals } from './seals.js';
import { initEnvelopes } from './envelopes.js';
import { initMusicBox } from './musicbox.js';
import { initPetals } from './petals.js';
import { initTimeline } from './timeline.js';
import { initCandle } from './candle.js';
import { initPortrait } from './portrait.js';
import { initReminders } from './reminders.js';
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
  initPortrait(config.portrait);
  initReminders(config.reminders);
  initMusicBox(config.music);
  initCandle();
  initGsapEffects();
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
