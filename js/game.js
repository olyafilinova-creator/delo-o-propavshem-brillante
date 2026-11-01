(() => {
  const problems = window.MYSTERY_PROBLEMS;
  const scene=document.querySelector('#scene'), flashlight=document.querySelector('#flashlight'), darkness=document.querySelector('#darkness'), dialog=document.querySelector('#answerDialog'), form=document.querySelector('#answerForm'), input=document.querySelector('#answerInput'), title=document.querySelector('#problemTitle'), feedback=document.querySelector('#feedback'), hint=document.querySelector('#hintText'), toast=document.querySelector('#toast');
  const taskCount = Object.keys(problems).length;
  let current=null, found=new Set(), solved=new Set(), soundOn=false, audio=null, musicTimer=null, musicStep=0;
  Object.entries(problems).forEach(([id, problem]) => {
    const card = document.querySelector(`[data-id="${id}"]`);
    card.querySelector('strong').textContent = problem.text;
    card.setAttribute('aria-label', `Тайный пример: ${problem.text}`);
  });
  document.querySelector('#missionText').textContent=`Проведи фонариком по залу и найди первый из ${taskCount} тайных примеров.`;
  document.querySelector('#progressText').textContent=`Разгадано: 0 из ${taskCount}`;
  function moveLight(e){const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100; flashlight.style.left=`${x}%`;flashlight.style.top=`${y}%`; darkness.style.setProperty('--light-x',`${x}%`);darkness.style.setProperty('--light-y',`${y}%`); detectCards(e.clientX-r.left,e.clientY-r.top,r);}
  function detectCards(x,y,r){
    if(scene.classList.contains('lit')) return;
    const activeId=Object.keys(problems).find(id=>!solved.has(id));
    const card=document.querySelector(`[data-id="${activeId}"]`);
    const b=card.getBoundingClientRect(),cx=b.left+b.width/2-r.left,cy=b.top+b.height/2-r.top;
    if(Math.hypot(x-cx,y-cy)<150&&!found.has(activeId)){
      found.add(activeId);card.style.visibility='visible';card.classList.add('is-found');updateProgress();
      pop(`Найден пример: ${problems[activeId].text}`);tone(620,.07);
    }
  }
  scene.addEventListener('pointermove',moveLight);scene.addEventListener('pointerdown',moveLight);scene.addEventListener('pointerleave',()=>{flashlight.style.left='50%';flashlight.style.top='50%'});
  document.querySelectorAll('.problem-card').forEach(card=>card.addEventListener('click',()=>{current=card.dataset.id;const p=problems[current];title.textContent=p.text;feedback.textContent='Впиши ответ — и мы продолжим поиски.';hint.textContent='';input.value='';dialog.showModal();setTimeout(()=>input.focus(),100)}));
  form.addEventListener('submit',e=>{e.preventDefault();if(!current)return;const p=problems[current];if(Number(input.value)===p.answer){solved.add(current);document.querySelector(`[data-id="${current}"]`).classList.add('done');dialog.close();pop('Верно! Найди следующий пример.');tone(880,.12);updateProgress();if(solved.size===taskCount)setTimeout(lightHall,450)}else{feedback.textContent='Почти! Проверь вычисление и попробуй ещё раз.';input.select();tone(180,.12)}});
  document.querySelector('#hintButton').addEventListener('click',()=>{if(current)hint.textContent='Подсказка: '+problems[current].hint});
  function updateProgress(){
    document.querySelector('#progressText').textContent=`Разгадано: ${solved.size} из ${taskCount}`;
    document.querySelector('#progressBar').style.width=`${solved.size/taskCount*100}%`;
    if(solved.size<taskCount) document.querySelector('#missionText').textContent=`Разгадай пример — тогда откроется следующий (${solved.size + 1} из ${taskCount}).`;
  }
  function lightHall(){scene.classList.add('lit');document.querySelector('#lightMessage').classList.remove('hidden');document.querySelector('#ribbon').classList.remove('hidden');document.querySelector('#missionText').textContent='Все тайные примеры разгаданы. Осмотри улику у витрины!';pop('Свет включился — зал стал безопаснее.');tone(1040,.25)}
  document.querySelector('#ribbon').addEventListener('click',()=>{document.querySelector('#ribbon').classList.add('hidden');document.querySelector('#clueCount').textContent='1';document.querySelector('#clueList').innerHTML='<div class="clue-item"><span class="mini-ribbon"></span><div><b>Голубая лента</b><small>Найдена у пустой витрины с бриллиантом.</small></div></div>';document.querySelector('#missionText').textContent='Улика добавлена в папку. Первый след найден!';document.querySelector('#toSurveillance').classList.remove('hidden');pop('Голубая лента добавлена в папку улик.');tone(1260,.16)});
  document.querySelector('#caseButton').addEventListener('click',()=>document.querySelector('#caseDialog').showModal());
  document.querySelector('#soundButton').addEventListener('click',e=>{soundOn=!soundOn;e.currentTarget.setAttribute('aria-pressed',soundOn);e.currentTarget.textContent=soundOn?'♫':'♪';e.currentTarget.title=soundOn?'Выключить музыку':'Включить музыку';e.currentTarget.setAttribute('aria-label',e.currentTarget.title);if(soundOn){if(!audio)audio=new (window.AudioContext||window.webkitAudioContext)();audio.resume().then(startMusic);tone(440,.06);pop('Музыка включена.')}else{stopMusic();pop('Музыка выключена.')}});
  function tone(freq,duration){if(!soundOn||!audio)return;const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=freq;g.gain.setValueAtTime(.06,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+duration)}
  function startMusic(){if(musicTimer||!soundOn||!audio)return;const melody=[[262,.32],[330,.32],[392,.48],[330,.32],[294,.32],[349,.48],[392,.32],[523,.64],[392,.32],[349,.32],[330,.48],[294,.48]];const play=()=>{if(!soundOn||!audio){musicTimer=null;return}const[note,length]=melody[musicStep%melody.length];musicStep++;const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=note;g.gain.setValueAtTime(.018,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+length*.9);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+length);musicTimer=setTimeout(play,length*1000)};play()}
  function stopMusic(){if(musicTimer){clearTimeout(musicTimer);musicTimer=null}}
  let timer;function pop(text){toast.textContent=text;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),2600)}
  flashlight.style.left='50%';flashlight.style.top='48%';
})();
