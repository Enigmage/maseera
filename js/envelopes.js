import { burstPetals } from './petals.js';

export function initEnvelopes(envelopes) {
  const grid = document.getElementById('envelopes-grid');

  envelopes.forEach((env) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'envelope-wrapper';

    wrapper.innerHTML = `
      <div class="envelope">
        <div class="envelope-front">
          <div class="envelope-flap"></div>
          <div class="fold-left"></div>
          <div class="fold-right"></div>
          <div class="envelope-seal ${env.seal_color}">&#10087;</div>
          <span class="hint">Click to open</span>
        </div>
        <div class="envelope-back">
          <p class="message">&ldquo;${env.message}&rdquo;</p>
          <p class="message-from">${env.from}</p>
        </div>
      </div>
    `;

    wrapper.addEventListener('click', () => {
      const envelopeEl = wrapper.querySelector('.envelope');
      envelopeEl.classList.toggle('opened');
      if (envelopeEl.classList.contains('opened')) {
        const rect = wrapper.getBoundingClientRect();
        burstPetals(rect.left + rect.width / 2, rect.top);
      }
    });

    grid.appendChild(wrapper);
  });
}
