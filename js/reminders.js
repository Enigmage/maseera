export function initReminders(reminders) {
  if (!reminders || reminders.length === 0) return;

  const grid = document.getElementById('reminders-grid');

  reminders.forEach((item, i) => {
    const tile = document.createElement('div');
    tile.className = 'reminder-tile';
    tile.style.animationDelay = `${i * 0.08}s`;

    tile.innerHTML = `
      <div class="reminder-icon">${item.icon}</div>
      <p class="reminder-caption">${item.caption}</p>
    `;

    grid.appendChild(tile);
  });
}
