(() => {
  const workshop = document.querySelector('#workshopScene');
  const scene = document.querySelector('#towerScene');
  const dialog = document.querySelector('#towerDialog');
  const form = document.querySelector('#towerForm');
  const input = document.querySelector('#towerInput');

  document.querySelector('#toTower').addEventListener('click', () => {
    workshop.classList.add('hidden');
    scene.classList.remove('hidden');
    window.scrollTo(0, 0);
  });
  document.querySelector('#towerChapterContinue').addEventListener('click', () => document.querySelector('#towerChapter').classList.add('hidden'));
  document.querySelector('#solveTowerTask').addEventListener('click', openTask);
  document.querySelector('#towerHint').addEventListener('click', () => {
    document.querySelector('#towerHintText').textContent = 'Сначала узнай, сколько красных шариков: 9 · 3 = 27. Затем сложи синие и красные шарики.';
  });

  function openTask() {
    document.querySelector('#towerFeedback').textContent = 'Впиши число — это и будет код замка.';
    document.querySelector('#towerHintText').textContent = '';
    input.value = '';
    dialog.showModal();
    setTimeout(() => input.focus(), 100);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (Number(input.value) !== 36) {
      document.querySelector('#towerFeedback').textContent = 'Проверь оба действия: сначала красные шарики, затем все вместе.';
      input.select();
      return;
    }
    dialog.close();
    document.querySelector('#towerTask').classList.add('hidden');
    document.querySelector('#towerChest').classList.remove('hidden');
    document.querySelector('#towerMission').textContent = 'Код найден: 36. Нажми на сундук.';
    window.showDetectiveMessage?.('Вот это да! Ты решил задачу в два действия.');
    updateClues();
  });

  document.querySelector('#towerChest').addEventListener('click', () => {
    document.querySelector('#towerChest').classList.add('hidden');
    document.querySelector('#towerFinalClue').classList.remove('hidden');
    document.querySelector('#toFinale').classList.remove('hidden');
    document.querySelector('#towerMission').textContent = 'Тайная схема найдена!';
  });

  function updateClues() {
    document.querySelector('#clueCount').textContent = '5';
    document.querySelector('#clueList').insertAdjacentHTML('beforeend', '<div class="clue-item"><span class="mini-ribbon"></span><div><b>Схема тайного прохода</b><small>Подсказка из башни: «Бриллиант спрятан там, где часы не идут».</small></div></div>');
  }
})();
