(() => {
  const intro = document.querySelector('#introScreen');
  const pages = [...document.querySelectorAll('.story-page')];
  const dots = [...document.querySelectorAll('.story-dots i')];
  let page = 0;
  function showPage(index) {
    page = index;
    pages.forEach((item, i) => item.classList.toggle('active', i === page));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === page));
  }
  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showPage(page + 1)));
  document.querySelector('#storyClue').addEventListener('click', event => {
    event.currentTarget.classList.add('examined');
    event.currentTarget.disabled = true;
    document.querySelector('#cluePrompt').textContent = 'Запомнили: голубая лента может быть связана с исчезновением бриллианта.';
    document.querySelector('#toBriefing').disabled = false;
  });
  document.querySelector('#startGame').addEventListener('click', () => {
    intro.classList.add('hidden');
    document.querySelector('#gameShell').classList.remove('hidden');
    window.scrollTo(0, 0);
  });
})();
