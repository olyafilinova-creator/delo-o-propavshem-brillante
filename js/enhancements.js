(() => {
  const label = document.querySelector('#locationLabel');
  const locations = [['scene', 'Эпизод 1 · Тёмный зал музея'], ['surveillanceScene', 'Эпизод 2 · Видеонаблюдение'], ['interrogationScene', 'Эпизод 3 · Кабинет допросов'], ['archiveScene', 'Эпизод 4 · Музейный архив'], ['workshopScene', 'Эпизод 5 · Мастерская'], ['towerScene', 'Эпизод 6 · Старая башня'], ['finaleScene', 'Финал · Комната часов']];
  function updateLocation() { const active = locations.find(([id]) => !document.querySelector(`#${id}`).classList.contains('hidden')); if (active) label.textContent = active[1]; }
  locations.forEach(([id]) => new MutationObserver(updateLocation).observe(document.querySelector(`#${id}`), { attributes: true, attributeFilter: ['class'] }));
  updateLocation();
  const message = document.querySelector('#detectiveMessage'); let messageTimer;
  window.showDetectiveMessage = text => { message.textContent = `Лис: ${text}`; message.classList.add('show'); clearTimeout(messageTimer); messageTimer = setTimeout(() => message.classList.remove('show'), 3600); };
})();
