export function initWhistledown(introConfig, onComplete) {
  const introEl = document.getElementById('intro');
  const titleEl = document.getElementById('intro-title');
  const textEl = document.getElementById('narrator-text');
  const skipHint = document.getElementById('skip-hint');

  titleEl.textContent = introConfig.title;

  const fullText = introConfig.narrator_text;
  let index = 0;
  let typing = false;
  let started = false;

  const typeSound = new Audio('assets/audio/typewriter-key.mp3');
  typeSound.volume = 0.3;

  function playKeyClick() {
    const click = typeSound.cloneNode();
    click.volume = 0.2 + Math.random() * 0.15;
    click.playbackRate = 0.9 + Math.random() * 0.2;
    click.play().catch(() => {});
  }

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  textEl.appendChild(cursor);

  function typeNext() {
    if (!typing) return;
    if (index < fullText.length) {
      const char = fullText[index];
      textEl.insertBefore(document.createTextNode(char), cursor);
      index++;
      if (char !== ' ') playKeyClick();
      const delay = char === '.' ? 400 : char === ',' ? 280 : 115 + Math.random() * 35;
      setTimeout(typeNext, delay);
    } else {
      cursor.remove();
      skipHint.textContent = 'Click to continue ↓';
      skipHint.style.opacity = '1';
    }
  }

  // Phase 1: First click/tap unlocks audio and starts typing
  skipHint.textContent = 'Click to begin ↓';
  skipHint.style.opacity = '1';
  skipHint.style.animation = 'none';

  function startTyping() {
    if (started) return;
    started = true;
    typing = true;

    // Unlock audio context with a silent play
    typeSound.play().then(() => { typeSound.pause(); typeSound.currentTime = 0; }).catch(() => {});

    skipHint.style.opacity = '0';
    setTimeout(typeNext, 500);

    // Replace click handler: next click will dismiss (only after typing has progressed)
    introEl.removeEventListener('click', startTyping);
    setTimeout(() => {
      introEl.addEventListener('click', dismiss);
    }, 2000);
  }

  function dismiss() {
    if (introEl.classList.contains('dismissed')) return;
    typing = false;
    introEl.classList.add('dismissed');
    setTimeout(() => {
      introEl.style.display = 'none';
      onComplete();
    }, 800);
  }

  introEl.addEventListener('click', startTyping);

  document.addEventListener('keydown', (e) => {
    if (!started && (e.key === 'Enter' || e.key === ' ')) {
      startTyping();
    } else if (started && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
      dismiss();
    }
  });
}
