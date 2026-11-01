(() => {
  const tower = document.querySelector('#towerScene');
  const scene = document.querySelector('#finaleScene');
  const dialog = document.querySelector('#finaleDialog');
  const form = document.querySelector('#finaleForm');
  const input = document.querySelector('#finaleInput');

  document.querySelector('#toFinale').addEventListener('click', () => {
    tower.classList.add('hidden');
    scene.classList.remove('hidden');
    window.scrollTo(0, 0);
  });
  document.querySelector('#finaleChapterContinue').addEventListener('click', () => document.querySelector('#finaleChapter').classList.add('hidden'));
  document.querySelector('#solveFinaleTask').addEventListener('click', openTask);
  document.querySelector('#finaleHint').addEventListener('click', () => {
    document.querySelector('#finaleHintText').textContent = 'Во втором замке привидений в 3 раза больше: 9 · 3 = 27. Затем сложи привидения из обоих замков.';
  });

  function openTask() {
    document.querySelector('#finaleFeedback').textContent = 'Впиши ответ — и замки откроются.';
    document.querySelector('#finaleHintText').textContent = '';
    input.value = '';
    dialog.showModal();
    setTimeout(() => input.focus(), 100);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (Number(input.value) !== 36) {
      document.querySelector('#finaleFeedback').textContent = 'Проверь оба действия: сначала найди количество во втором замке, затем общее количество.';
      input.select();
      return;
    }
    dialog.close();
    document.querySelector('#finaleTask').classList.add('hidden');
    document.querySelector('#victoryCard').classList.remove('hidden');
    document.querySelector('#finaleMission').textContent = 'Последний механизм открыт!';
    document.querySelector('#clueCount').textContent = '6';
    document.querySelector('#clueList').insertAdjacentHTML('beforeend', '<div class="clue-item"><span class="mini-ribbon"></span><div><b>Голубой бриллиант</b><small>Найден в комнате остановившихся часов и возвращён музею.</small></div></div>');
    window.showDetectiveMessage?.('Великолепно! Мы нашли Голубой бриллиант.');
  });

  document.querySelector('#showClueFolder').addEventListener('click', () => document.querySelector('#caseDialog').showModal());
  document.querySelector('#restartGame').addEventListener('click', () => window.location.reload());
})();
