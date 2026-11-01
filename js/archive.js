(() => {
  const interrogation = document.querySelector('#interrogationScene');
  const scene = document.querySelector('#archiveScene');
  const codes = {
    a1: { text: '63 : 9 · 4 = ?', answer: 28, hint: 'Умножение и деление выполняй слева направо: сначала 63 : 9.' },
    a2: { text: '9 · 7 + (50 − 13) = ?', answer: 100, hint: 'Сначала выполни действие в скобках, затем умножение.' },
    a3: { text: '(72 : 8 + 45) − 19 = ?', answer: 35, hint: 'Сначала действие в скобках: раздели 72 на 8, затем прибавь 45.' },
    a4: { text: '(80 − 31) : (32 − 25) = ?', answer: 7, hint: 'Сначала найди значения в обеих скобках, потом раздели.' },
    a5: { text: '(30 − 5) : 5 + 55 = ?', answer: 60, hint: 'Сначала скобки, потом деление, затем сложение.' },
    a6: { text: '100 − 6 · 5 = ?', answer: 70, hint: 'Сначала умножь 6 на 5, затем вычти результат из 100.' }
  };
  const solved = new Set(); let current = null;
  const dialog = document.querySelector('#archiveDialog'), form = document.querySelector('#archiveForm');
  document.querySelector('#toArchive').addEventListener('click', () => { interrogation.classList.add('hidden'); scene.classList.remove('hidden'); window.scrollTo(0, 0); });
  document.querySelector('#archiveChapterContinue').addEventListener('click', () => document.querySelector('#archiveChapter').classList.add('hidden'));
  document.querySelectorAll('[data-expression]').forEach(card => card.addEventListener('click', () => { if (!solved.has(card.dataset.expression)) openCode(card.dataset.expression); }));
  document.querySelector('#archiveHint').addEventListener('click', () => { if (current) document.querySelector('#archiveHintText').textContent = `Подсказка: ${codes[current].hint}`; });
  function openCode(id) { current = id; const code = codes[id]; document.querySelector('#archiveTitle').textContent = code.text; document.querySelector('#archiveDialogFeedback').textContent = 'Впиши значение выражения.'; document.querySelector('#archiveHintText').textContent = ''; document.querySelector('#archiveInput').value = ''; dialog.showModal(); setTimeout(() => document.querySelector('#archiveInput').focus(), 100); }
  form.addEventListener('submit', event => { event.preventDefault(); const code = codes[current], input = document.querySelector('#archiveInput'); if (Number(input.value) !== code.answer) { document.querySelector('#archiveDialogFeedback').textContent = 'Проверь порядок действий и попробуй ещё раз.'; input.select(); return; } solved.add(current); const card = document.querySelector(`[data-expression="${current}"]`); card.classList.add('solved'); card.disabled = true; card.querySelector('i').textContent = `Верно: ${code.answer}`; dialog.close(); if (['a2', 'a4', 'a6'].includes(current)) window.showDetectiveMessage?.('Отлично! Ты уверенно справляешься с трудными шифрами.'); document.querySelector('#archiveMission').textContent = `Разгадано шифров: ${solved.size} из 6.`; if (solved.size === 6) setTimeout(showArchiveClue, 450); });
  function showArchiveClue() { document.querySelector('#expressionCards').classList.add('hidden'); document.querySelector('#finalArchiveClue').classList.remove('hidden'); document.querySelector('#toWorkshop').classList.remove('hidden'); document.querySelector('#clueCount').textContent = '4'; document.querySelector('#clueList').innerHTML = '<div class="clue-item"><span class="mini-ribbon"></span><div><b>Голубая лента</b><small>Найдена у пустой витрины с бриллиантом.</small></div></div><div class="clue-item"><span class="mini-ribbon"></span><div><b>Запись камеры</b><small>След привёл в кабинет допросов.</small></div></div><div class="clue-item"><span class="mini-ribbon"></span><div><b>Заявка на папку №17</b><small>След привёл в музейный архив.</small></div></div><div class="clue-item"><span class="mini-ribbon"></span><div><b>Запись из архива</b><small>Неизвестный искал документы о реставрационной мастерской.</small></div></div>'; }
})();
