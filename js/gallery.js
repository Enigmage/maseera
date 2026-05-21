export function initGallery(galleryItems) {
  const grid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentIndex = -1;

  galleryItems.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';

    const frameClass = item.frame === 'classic' ? 'gallery-frame classic' : 'gallery-frame';

    wrapper.innerHTML = `
      <div class="${frameClass}">
        <img src="assets/${item.file}" alt="${item.caption}" loading="lazy">
      </div>
      <p class="gallery-caption">${item.caption}</p>
    `;

    wrapper.addEventListener('click', () => openLightbox(index));
    grid.appendChild(wrapper);
  });

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    lightboxImg.src = `assets/${item.file}`;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    lightbox.classList.add('active');
  }

  function navigate(dir) {
    if (currentIndex < 0) return;
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = `assets/${item.file}`;
      lightboxImg.alt = item.caption;
      lightboxCaption.textContent = item.caption;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    currentIndex = -1;
  }
}
