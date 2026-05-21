export function initMusicBox(musicConfig) {
  const btn = document.getElementById('music-box');
  const audio = document.getElementById('bg-music');

  if (!musicConfig || !musicConfig.file) return;

  audio.src = `assets/${musicConfig.file}`;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.classList.add('playing');
        btn.innerHTML = '&#9836;';
      }).catch(() => {});
    } else {
      audio.pause();
      btn.classList.remove('playing');
      btn.innerHTML = '&#9835;';
    }
  });
}
