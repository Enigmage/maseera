export function initPortrait(portraitConfig) {
  if (!portraitConfig) return;

  const container = document.getElementById('portrait-notice');

  container.innerHTML = `
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
  `;
}
