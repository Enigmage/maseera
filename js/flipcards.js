export function initFlipCards(reasons) {
  if (!reasons || reasons.length === 0) return;

  const grid = document.getElementById('flipcards-grid');

  reasons.forEach((reason) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flipcard-wrapper';

    wrapper.innerHTML = `
      <div class="flipcard">
        <div class="flipcard-front">
          <div class="card-pattern">
            <div class="card-corner top-left">${reason.icon || '♦'}</div>
            <div class="card-center-ornament">
              <div class="diamond-grid">
                ${Array(9).fill(`<span>${reason.icon || '♦'}</span>`).join('')}
              </div>
            </div>
            <div class="card-corner bottom-right">${reason.icon || '♦'}</div>
          </div>
        </div>
        <div class="flipcard-back">
          <div class="card-back-inner">
            <div class="card-flourish">&#10087;</div>
            <p class="card-reason">${reason.text}</p>
            <div class="card-flourish">&#10087;</div>
          </div>
        </div>
      </div>
    `;

    wrapper.addEventListener('click', () => {
      wrapper.querySelector('.flipcard').classList.toggle('flipped');
    });

    grid.appendChild(wrapper);
  });
}
