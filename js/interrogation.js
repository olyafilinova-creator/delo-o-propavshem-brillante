(() => {
  const surveillance = document.querySelector('#surveillanceScene');
  const scene = document.querySelector('#interrogationScene');
  const cases = {
    lina: { name: 'Лина', label: 'ПОКАЗАНИЕ ЛИНЫ', text: '«Я отнесла пропуск в шкафчик. На нём был номер, который можно узнать так: 82 − 56».', task: '82 − 56 = ?', answer: 26, hint: 'Вычти из 82 сначала 50, затем ещё 6.' },
    boris: { name: 'Борис', label: 'ПОКАЗАНИЕ БОРИСА', text: '«На столе смотрителя лежала папка. Её номер можно узнать так: 19 + 35».', task: '19 + 35 = ?', answer: 54, hint: 'К 35 прибавь 20, а затем отними 1.' },
    fedot: { name: 'Федот', label: 'ПОКАЗАНИЕ ФЕДОТА', text: '«В журнале я видел архивную коробку. Её номер: 47 + 53».', task: '47 + 53 = ?', answer: 100, hint: 'Сложи десятки и единицы: 40 + 50 и 7 + 3.' },
    drawer: { name: 'Ящик', label: 'КОД ЗАКРЫТОГО ЯЩИКА', text: 'В ящике может лежать важная улика. Реши пример и введи код.', task: '100 − 83 = ?', answer: 17, hint: 'Из 100 вычти 80, а потом ещё 3.' }
  };
  const solved = new Set(); let current = null;
  const dialog = document.querySelector('#interrogationDialog'), form = document.querySelector('#interrogationForm');
  document.querySelector('#toInterrogation').addEventListener('click', () => { surveillance.classList.add('hidden'); scene.classList.remove('hidden'); window.scrollTo(0, 0); });
  document.querySelector('#interrogationChapterContinue').addEventListener('click', () => document.querySelector('#interrogationChapter').classList.add('hidden'));
  document.querySelectorAll('[data-suspect]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.suspect, item = cases[id];
    document.querySelectorAll('[data-suspect]').forEach(tab => tab.classList.toggle('active', tab === button));
    document.querySelector('#testimonyPanel').classList.remove('hidden');
    document.querySelector('#testimonyLabel').textContent = item.label;
    document.querySelector('#testimonyName').textContent = item.name;
    document.querySelector('#testimonyText').textContent = item.text;
    document.querySelector('#solveTestimony').dataset.caseId = id;
    document.querySelector('#solveTestimony').textContent = solved.has(id) ? 'Номер уже проверен ✓' : 'Проверить номер';
    document.querySelector('#solveTestimony').disabled = solved.has(id);
  }));
  document.querySelector('#solveTestimony').addEventListener('click', event => { if (!event.currentTarget.disabled) openTask(event.currentTarget.dataset.caseId); });
  document.querySelector('#lockedDrawer').addEventListener('click', () => openTask('drawer'));
  document.querySelector('#interrogationHint').addEventListener('click', () => { if (current) document.querySelector('#interrogationHintText').textContent = `Подсказка: ${cases[current].hint}`; });
  function openTask(id) { current = id; const item = cases[id]; document.querySelector('#interrogationDialogLabel').textContent = item.label; document.querySelector('#interrogationTitle').textContent = item.task; document.querySelector('#interrogationFeedback').textContent = current === 'drawer' ? 'Впиши код ящика.' : 'Впиши номер, который назвал помощник.'; document.querySelector('#interrogationHintText').textContent = ''; document.querySelector('#interrogationInput').value = ''; dialog.showModal(); setTimeout(() => document.querySelector('#interrogationInput').focus(), 100); }
  form.addEventListener('submit', event => { event.preventDefault(); const item = cases[current], input = document.querySelector('#interrogationInput'); if (Number(input.value) !== item.answer) { document.querySelector('#interrogationFeedback').textContent = 'Проверь вычисление и попробуй ещё раз.'; input.select(); return; } dialog.close(); if (current === 'drawer') { showArchiveClue(); return; } solved.add(current); const tab = document.querySelector(`[data-suspect="${current}"]`); tab.classList.add('solved'); tab.disabled = true; document.querySelector('#testimonyPanel').classList.add('hidden'); document.querySelector('#interrogationMission').textContent = `Проверено показаний: ${solved.size} из 3.`; if (solved.size === 3) { document.querySelector('#interrogationMission').textContent = 'Все показания проверены. Теперь можно открыть закрытый ящик.'; document.querySelector('#lockedDrawer').classList.remove('hidden'); } });
  function showArchiveClue() { document.querySelector('#lockedDrawer').classList.add('hidden'); document.querySelector('#archiveClue').classList.remove('hidden'); document.querySelector('#toArchive').classList.remove('hidden'); document.querySelector('#clueCount').textContent = '3'; document.querySelector('#clueList').innerHTML = '<div class="clue-item"><span class="mini-ribbon"></span><div><b>Голубая лента</b><small>Найдена у пустой витрины с бриллиантом.</small></div></div><div class="clue-item"><span class="mini-ribbon"></span><div><b>Запись камеры</b><small>След привёл в кабинет допросов.</small></div></div><div class="clue-item"><span class="mini-ribbon"></span><div><b>Заявка на папку №17</b><small>След похитителя ведёт в музейный архив.</small></div></div>'; }
})();
