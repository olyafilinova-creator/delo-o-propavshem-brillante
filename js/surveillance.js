(() => {
  const sceneOne = document.querySelector('#scene');
  const surveillance = document.querySelector('#surveillanceScene');
  const tasks = {
    t1: { text: '1 ч − 40 мин = ?', answer: 20, hint: 'В одном часе 60 минут. Вычти 40 из 60.' },
    t2: { text: '1 ч − 20 мин = ?', answer: 40, hint: 'В одном часе 60 минут. Вычти 20 из 60.' },
    t3: { text: '50 мин + 5 мин = ?', answer: 55, hint: 'Прибавь к 50 ещё 5 минут.' },
    t4: { text: '30 мин + 35 мин = ?', answer: 65, hint: '30 + 35 = 65. Это 1 час 5 минут.' }
  };
  const solved = new Set(); let current = null; let nextOrder = 0;
  const dialog = document.querySelector('#timeDialog'), form = document.querySelector('#timeForm');
  document.querySelector('#toSurveillance').addEventListener('click', () => { sceneOne.classList.add('hidden'); surveillance.classList.remove('hidden'); window.scrollTo(0, 0); });
  document.querySelectorAll('[data-time-task]').forEach(card => card.addEventListener('click', () => {
    if (solved.has(card.dataset.timeTask)) return;
    current = card.dataset.timeTask; const task = tasks[current];
    document.querySelector('#timeTitle').textContent = task.text;
    document.querySelector('#timeFeedback').textContent = 'Впиши длительность в минутах.';
    document.querySelector('#timeHintText').textContent = '';
    document.querySelector('#timeInput').value = '';
    dialog.showModal(); setTimeout(() => document.querySelector('#timeInput').focus(), 100);
  }));
  document.querySelector('#timeHint').addEventListener('click', () => { if (current) document.querySelector('#timeHintText').textContent = `Подсказка: ${tasks[current].hint}`; });
  form.addEventListener('submit', event => {
    event.preventDefault(); const task = tasks[current]; const input = document.querySelector('#timeInput');
    if (Number(input.value) !== task.answer) { document.querySelector('#timeFeedback').textContent = 'Проверь вычисление и попробуй ещё раз.'; input.select(); return; }
    solved.add(current); const card = document.querySelector(`[data-time-task="${current}"]`);
    card.classList.add('solved'); card.querySelector('i').textContent = `Верно: ${task.answer === 65 ? '1 ч 5 мин' : task.answer + ' мин'}`;
    dialog.close();
    if (solved.size === Object.keys(tasks).length) { document.querySelector('#orderingPanel').classList.remove('hidden'); document.querySelector('#surveillanceMission').textContent = 'Все записи вычислены. Расставь их от самой короткой к самой длинной.'; }
  });
  const correctOrder = ['t1', 't2', 't3', 't4'];
  document.querySelectorAll('[data-order-id]').forEach(button => button.addEventListener('click', () => {
    if (button.disabled) return;
    const feedback = document.querySelector('#orderFeedback');
    if (button.dataset.orderId === correctOrder[nextOrder]) {
      button.disabled = true; button.classList.add('placed'); nextOrder += 1;
      feedback.textContent = nextOrder === 4 ? 'Порядок верный! Запись восстанавливается…' : 'Верно! Выбери следующую запись.';
      if (nextOrder === 4) setTimeout(showClue, 500);
    } else {
      feedback.textContent = 'Эта запись не следующая. Попробуй другую — штрафа нет.';
      button.classList.add('wrong'); setTimeout(() => button.classList.remove('wrong'), 350);
    }
  }));
  function showClue() {
    document.querySelector('#orderingPanel').classList.add('hidden'); document.querySelector('#videoClue').classList.remove('hidden'); document.querySelector('#toInterrogation').classList.remove('hidden');
    document.querySelector('#clueCount').textContent = '2';
    document.querySelector('#clueList').innerHTML = '<div class="clue-item"><span class="mini-ribbon"></span><div><b>Голубая лента</b><small>Найдена у пустой витрины с бриллиантом.</small></div></div><div class="clue-item"><span class="mini-ribbon"></span><div><b>Запись камеры</b><small>След ведёт в музейный архив.</small></div></div>';
  }
})();
