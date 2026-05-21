export function initSeals(sections) {
  const nav = document.getElementById('seal-nav');
  const colors = ['seal-gold', 'seal-rose', 'seal-navy', 'seal-gold', 'seal-rose'];
  const sealEls = [];

  sections.forEach((section, i) => {
    const seal = document.createElement('div');
    seal.className = `seal ${colors[i % colors.length]}`;
    seal.dataset.section = section.id;
    seal.innerHTML = `
      <span>${section.icon}</span>
      <span class="seal-tooltip">${section.label}</span>
    `;

    seal.addEventListener('click', () => {
      const target = document.getElementById(section.id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      seal.style.transform = 'scale(0.8)';
      setTimeout(() => { seal.style.transform = ''; }, 200);
    });

    nav.appendChild(seal);
    sealEls.push(seal);
  });

  // Staggered spin-in when nav becomes visible
  const navObserver = new MutationObserver(() => {
    if (nav.classList.contains('visible')) {
      sealEls.forEach((seal, i) => {
        setTimeout(() => seal.classList.add('seal-visible'), i * 120);
      });
      navObserver.disconnect();
    }
  });
  navObserver.observe(nav, { attributes: true, attributeFilter: ['class'] });

  // Active seal via IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sealEls.forEach((s) => {
          s.classList.toggle('active', s.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((section) => {
    const el = document.getElementById(section.id);
    if (el) observer.observe(el);
  });
}
