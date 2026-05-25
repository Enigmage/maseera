export function initPortrait(portraitConfig) {
  if (!portraitConfig) return;

  const container = document.getElementById('portrait-notice');

  const photoHtml = portraitConfig.photo ? `
    <div class="portrait-photo-wrap">
      <div class="portrait-photo-frame">
        <img src="assets/${portraitConfig.photo}" alt="${portraitConfig.name}" class="portrait-photo">
      </div>
      <div class="portrait-photo-glow"></div>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="portrait-layout">
      ${photoHtml}
      <div class="notice-paper">
        <div class="notice-header">
          <span class="notice-vol">Lady Whistledown's Society Papers</span>
          <div class="notice-rule"></div>
        </div>
        <p class="notice-body">${portraitConfig.notice}</p>
        <div class="notice-rule"></div>
        <div class="traits-grid">
          ${portraitConfig.traits.map(t => `
            <div class="trait-item">
              <span class="trait-label">${t.label}</span>
              <span class="trait-desc">${t.description}</span>
            </div>
          `).join('')}
        </div>
        <div class="notice-footer">
          <span class="notice-sig">&#10087; &nbsp; With the utmost sincerity &nbsp; &#10087;</span>
        </div>
      </div>
    </div>
  `;

  // Entrance animations on scroll into view
  const section = document.getElementById('portrait');
  const photoWrap = container.querySelector('.portrait-photo-wrap');
  const noticePaper = container.querySelector('.notice-paper');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (photoWrap) photoWrap.classList.add('portrait-revealed');
        if (noticePaper) noticePaper.classList.add('portrait-revealed');

        // Stagger the trait items
        container.querySelectorAll('.trait-item').forEach((item, i) => {
          item.style.transitionDelay = `${0.5 + i * 0.07}s`;
          item.classList.add('trait-revealed');
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.15 });

  if (section) observer.observe(section);
}
