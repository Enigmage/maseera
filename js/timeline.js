export function initTimeline(items) {
  if (!items || items.length === 0) return;

  const track = document.getElementById('timeline-track');

  items.forEach((item, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const entry = document.createElement('div');
    entry.className = `tl-entry tl-${side}`;

    entry.innerHTML = `
      <div class="tl-card">
        <div class="tl-photo-frame">
          <img src="assets/${item.file}" alt="${item.caption}" loading="lazy">
        </div>
        <div class="tl-content">
          ${item.date ? `<span class="tl-date">${item.date}</span>` : ''}
          <p class="tl-caption">${item.caption}</p>
        </div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
      </div>
    `;

    track.appendChild(entry);
  });

  // Scroll-reveal: cards fade/slide in as they enter the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  track.querySelectorAll('.tl-entry').forEach((el) => observer.observe(el));
}
