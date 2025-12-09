// Полная реализация уровня 1 по новому ТЗ
const Level1 = {
  // Сцены — 3 реализации, у каждой 7 артефактов и набор зон (проще: зоны с позициями и типом взаимодействия)
  scenes: [
    {
      id: 'yard',
      name: 'Новогодний двор',
      bg: 'url("../assets/images/scene-yard.jpg")',
      mechanic: 'поменять местами',
      artifacts: [
        { id: 'sanok', name: 'Санки', icon: '🛷', letter: 'С' },
        { id: 'rukav', name: 'Перчатки', icon: '🧤', letter: 'П' },
        { id: 'nos', name: 'Морковка', icon: '🥕', letter: 'М' },
        { id: 'sharok', name: 'Шарик', icon: '🟠', letter: 'Ш' },
        { id: 'zvezda', name: 'Звезда', icon: '⭐', letter: 'З' },
        { id: 'gir', name: 'Колокольчик', icon: '🔔', letter: 'К' },
        { id: 'snowglob', name: 'Сугроб', icon: '❄️', letter: 'С' }
      ],
      zones: [
        // sanok — обычный клик по сугробу
        { x: 68, y: 80, w: 16, h: 16, artifactId: 'sanok', interaction: 'click' },
        // rukav — hover + click по крыше (hoverclick)
        { x: 64, y: 18, w: 12, h: 14, artifactId: 'rukav', interaction: 'event', requiredFlag: 'МаминоЗрение', trigger: 'click', phase: 1 },
        // nos — долгий клик (разкапывание)
        { x: 40, y: 85, w: 10, h: 12, artifactId: 'nos', interaction: 'longpress' },
        // sharok — double click по снеговику
        { x: 43, y: 50, w: 10, h: 10, artifactId: 'sharok', interaction: 'dblclick' },
        // gir — 7-кратный клик на гирлянду
        { x: 15, y:65, w: 10, h: 10, artifactId: 'gir', interaction: 'multiclick7' },
        // zvezda — жест вверх-вниз по контуру елки
        { x: 45, y: 4, w: 10, h: 25, artifactId: 'zvezda', interaction: 'gesture' },
        // lantern switch (включение фонаря) — долгий клик задаёт флаг Свет (не артефакт)
        { x: 76, y: 50, w: 10, h: 14, artifactId: null, interaction: 'toggle', flag: 'Свет' },
        { x: 1, y: 22, w: 6, h: 22, artifactId: null, interaction: 'toggle', flag: 'МаминоЗрение' },
        // snowglob — событийный: требует Свет + двойной клик по светящемуся пятну
        { x: 90, y: 75, w: 12, h: 12, artifactId: 'snowglob', interaction: 'event', requiredFlag: 'Свет', trigger: 'dblclick' }
      ],
      hintTexts: [
        'Общий принцип: области в которых находятся предметы при наведение подсвечиваются, но заметить это трудно.' +
        'Нужно сделать некоторые действия, чтобы собрать все 7 предметов.',
        'Подозрительные области: сугроб перед ёлкой, двери, яркие предметы, тёмные.',
      ],
      correctOrder: ['sanok','rukav','nos','sharok','zvezda','gir','snowglob']
    },
    // {
    //   id: 'square',
    //   name: 'Новогодняя площадь',
    //   bg: 'url("../assets/images/scene-square.jpg")',
    //   mechanic: 'push', // вариант B: "толкание" выбранного предмета стрелками
    //   artifacts: [
    //     { id: 'present', name: 'Подарок', icon: '🎫', letter: 'П' },
    //     { id: 'cacao', name: 'Какао', icon: '☕', letter: 'К' },
    //     { id: 'statue', name: 'Лёд-скульптура', icon: '🧊', letter: 'Л' },
    //     { id: 'mic', name: 'Сценический микрофон', icon: '🎤', letter: 'С' },
    //     { id: 'topper', name: 'Ёлочный топпер', icon: '⭐', letter: 'Т' },
    //     { id: 'lantern', name: 'Небесный фонарик', icon: '🏮', letter: 'Н' },
    //     { id: 'fire', name: 'Фейерверк', icon: '🎆', letter: 'Ф' }
    //   ],
    //   zones: [
    //     { x: 22, y: 60, w: 12, h: 12, artifactId: 'present', interaction: 'click' },
    //     { x: 34, y: 44, w: 12, h: 12, artifactId: 'cacao', interaction: 'hover' },
    //     { x: 52, y: 22, w: 14, h: 14, artifactId: 'statue', interaction: 'longpress' },
    //     { x: 62, y: 38, w: 12, h: 12, artifactId: 'mic', interaction: 'click' },
    //     { x: 46, y: 28, w: 12, h: 12, artifactId: 'topper', interaction: 'dblclick' },
    //     { x: 74, y: 18, w: 12, h: 12, artifactId: 'lantern', interaction: 'longpress' },
    //     { x: 82, y: 62, w: 12, h: 12, artifactId: 'fire', interaction: 'dblclick' }
    //   ],
    //   hintTexts: [
    //     'Осмотритесь: лавки, каток и сцена — места для поиска.',
    //     'Подсветим подозрительные палатки на короткое время.',
    //     'Спойлер: удержите на ледяной скульптуре и дважды кликните по ёлке.'
    //   ],
    //   correctOrder: ['present','cacao','statue','mic','topper','lantern','fire']
    // },
    // {
    //   id: 'room',
    //   name: 'Семейная комната',
    //   bg: 'url("../assets/images/scene-room.jpg")',
    //   mechanic: 'carousel', // вариант C: кольцевая карусель колесом/стрелками
    //   artifacts: [
    //     { id: 'album', name: 'Фотоальбом', icon: '📕', letter: 'Ф' },
    //     { id: 'letter', name: 'Письмо Деду Морозу', icon: '✉️', letter: 'П' },
    //     { id: 'mandar', name: 'Мандарин', icon: '🍊', letter: 'М' },
    //     { id: 'candy', name: 'Конфета', icon: '🍬', letter: 'К' },
    //     { id: 'blanket', name: 'Свернутый плед', icon: '🧣', letter: 'С' },
    //     { id: 'photo', name: 'Шар-игрушка с фото', icon: '🧸', letter: 'Ш' },
    //     { id: 'alarm', name: 'Будильник до полуночи', icon: '⏰', letter: 'Б' }
    //   ],
    //   zones: [
    //     { x: 18, y: 34, w: 12, h: 12, artifactId: 'album', interaction: 'hover' },
    //     { x: 44, y: 54, w: 12, h: 12, artifactId: 'letter', interaction: 'click' },
    //     { x: 36, y: 38, w: 10, h: 10, artifactId: 'mandar', interaction: 'click' },
    //     { x: 58, y: 46, w: 10, h: 10, artifactId: 'candy', interaction: 'click' },
    //     { x: 24, y: 66, w: 12, h: 12, artifactId: 'blanket', interaction: 'longpress' },
    //     { x: 66, y: 28, w: 12, h: 12, artifactId: 'photo', interaction: 'dblclick' },
    //     { x: 74, y: 56, w: 10, h: 10, artifactId: 'alarm', interaction: 'longpress' }
    //   ],
    //   hintTexts: [
    //     'В гостиной обращайте внимание на стол, полку и ёлку.',
    //     'Мы можем подсветить окна с предметами на пару секунд.',
    //     'Спойлер: дважды кликните на ёлку, удержание на кресле даст ещё один предмет.'
    //   ],
    //   correctOrder: ['letter','mandar','candy','blanket','album','photo','alarm']
    // }
  ],

  init() {
    document.addEventListener('DOMContentLoaded', () => this.setup());
  },

  setup() {
    // Безопасно получить DOM-элементы (с проверками)
    this.sceneEl = document.getElementById('scene');
    this.inventoryEl = document.getElementById('inventory');
    this.startModal = document.getElementById('start-modal');
    this.startPlayBtn = document.getElementById('start-play');
    this.closeStartBtn = document.getElementById('close-start');
    this.currentPlayerLabel = document.getElementById('current-player');
    this.playerButtonsContainer = document.getElementById('player-list-buttons');
    this.hintPanel = document.getElementById('hint-panel');
    this.hintToggle = document.getElementById('hint-toggle');
    this.hintText = document.getElementById('hint-text');
    this.hintNext = document.getElementById('hint-next');
    this.hintReset = document.getElementById('hint-reset');
    this.puzzleInfo = document.getElementById('puzzle-info');
    this.checkBtn = document.getElementById('check-order');
    this.resetBtn = document.getElementById('reset-level');
    this.finalModal = document.getElementById('final-modal');
    this.finalText = document.getElementById('final-text');
    this.finalToMenu = document.getElementById('to-menu');
    this.backBtn = document.getElementById('back-btn');

    // state
    this.selectedPlayer = null;
    this.hintLevel = 0;
    this.hintState = {};
    this.collected = {};
    this.inventory = new Array(7).fill(null);
    this.orderMode = false;
    this.selectedSlotIndex = null;
    this.flags = {};
    this.glovesPhase = this.glovesPhase || 1;

    // Инициализация Players и отрисовка кнопок выбора игрока
    Players.init && Players.init();
    this.renderPlayerButtons && this.renderPlayerButtons();

    // Если уже выбран игрок — восстановим прогресс, иначе попросим выбрать
    const storedPlayer = Storage.load('level1_currentPlayer');
    if (storedPlayer) {
      this.selectedPlayer = storedPlayer;
      if (this.currentPlayerLabel) this.currentPlayerLabel.textContent = this.selectedPlayer;
      this.loadHintState && this.loadHintState();
      // стартуем уровень автоматически (восстановление внутри)
      this.startLevel && this.startLevel();
    } else {
      // показываем модал с выбором игрока
      this.showStart && this.showStart();
    }

    // --- UI: навешиваем обработчики (защищённо) ---
    const openBtn = document.getElementById('open-modal');
    if (openBtn) openBtn.addEventListener('click', () => this.showStart && this.showStart());

    if (this.startPlayBtn) {
      this.startPlayBtn.addEventListener('click', () => {
        if (!this.selectedPlayer) this.selectedPlayer = 'Гость';
        Storage.save('level1_currentPlayer', this.selectedPlayer);
        if (this.currentPlayerLabel) this.currentPlayerLabel.textContent = this.selectedPlayer;
        this.loadHintState && this.loadHintState();
        this.hideStart && this.hideStart();
        this.startLevel && this.startLevel();
      });
    }

    if (this.closeStartBtn) this.closeStartBtn.addEventListener('click', () => this.hideStart && this.hideStart());

    // Подсказки
    if (this.hintToggle) this.hintToggle.addEventListener('click', () => this.toggleHint && this.toggleHint());
    if (this.hintNext) this.hintNext.addEventListener('click', () => this.nextHint && this.nextHint());
    if (this.hintReset) this.hintReset.addEventListener('click', () => this.resetHints && this.resetHints());

    // Кнопки управления уровнем
    if (this.checkBtn) this.checkBtn.addEventListener('click', () => this.checkOrder && this.checkOrder());
    if (this.resetBtn) this.resetBtn.addEventListener('click', () => this.resetLevel && this.resetLevel());
    if (this.finalToMenu) this.finalToMenu.addEventListener('click', () => location.href = '../index.html');

    // Кнопка назад — удаляем текущего игрока и переходим по ссылке
    if (this.backBtn) {
      this.backBtn.addEventListener('click', (e) => {
        try { localStorage.removeItem('level1_currentPlayer'); } catch (err) {}
        // href выполнит переход
      });
    }

    // Обработчик клика по сцене: показывать "тут ничего нет" только если инвентарь ещё не заполнен
    if (this.sceneEl) {
      // удаляем предыдущие обработчики, если они есть (безопасность)
      try { this.sceneEl.removeEventListener('click', this._sceneEmptyClickHandler); } catch (e) {}
      this._sceneEmptyClickHandler = (e) => {
        const hotspot = e.target && e.target.closest && e.target.closest('.hotspot');
        if (!hotspot) {
          const filled = Array.isArray(this.inventory) ? this.inventory.filter(Boolean).length : (this.collected ? Object.keys(this.collected).length : 0);
          if (filled < 7) {
            if (this.puzzleInfo) this.puzzleInfo.textContent = 'тут ничего нет';
          }
        }
      };
      this.sceneEl.addEventListener('click', this._sceneEmptyClickHandler);
    }

    // Рендер/инициализация завершена
    console.log('Level1 setup completed. player=', this.selectedPlayer);
  },

  // Рендер кнопок выбора игрока в модальном окне (берём из Players.list)
  renderPlayerButtons() {
     const container = document.getElementById('player-list-buttons');
     if (!container) return;
     container.innerHTML = '';
     Players.init && Players.init();
     const list = Players.list && Players.list.length ? Players.list : [];
     if (list.length === 0) {
       const note = document.createElement('div');
       note.style.opacity = '0.9';
       note.textContent = 'Сначала добавьте игроков на главной странице — или сыграйте как Гость.';
       container.appendChild(note);
       const guestBtn = document.createElement('button');
       guestBtn.className = 'player-btn';
       guestBtn.dataset.name = 'Гость';
       guestBtn.textContent = 'Гость';
       guestBtn.style.padding = '8px 10px';
       guestBtn.addEventListener('click', (e) => {
         container.querySelectorAll('.player-btn').forEach(x => x.classList.remove('chosen'));
         e.currentTarget.classList.add('chosen');
         this.selectedPlayer = 'Гость';
       });
       container.appendChild(guestBtn);
       return;
     }
     list.forEach(p => {
       const btn = document.createElement('button');
       btn.className = 'player-btn';
       btn.dataset.name = p.name;
       btn.textContent = p.name;
       btn.style.padding = '8px 10px';
       btn.addEventListener('click', (e) => {
         container.querySelectorAll('.player-btn').forEach(x => x.classList.remove('chosen'));
         e.currentTarget.classList.add('chosen');
         this.selectedPlayer = p.name;
       });
       container.appendChild(btn);
     });
   },

   showStart() {
     // показываем модал; если игрок уже выбран — скрываем блок выбора и кнопку Играть
     if (!this.startModal) return;
     const stored = Storage.load('level1_currentPlayer');
     if (stored) {
       // уже выбран — показываем только инструкцию (скроем блок выбора)
       const container = document.getElementById('player-list-buttons');
       if (container) container.style.display = 'none';
       if (this.startPlayBtn) this.startPlayBtn.style.display = 'none';
       // показать модал с инструкцией
       this.startModal.style.display = 'flex';
     } else {
       // первый раз — показать выбор игроков и кнопку Играть
       const container = document.getElementById('player-list-buttons');
       if (container) container.style.display = '';
       if (this.startPlayBtn) this.startPlayBtn.style.display = '';
       this.startModal.style.display = 'flex';
     }
   },
   hideStart() { if (this.startModal) this.startModal.style.display = 'none'; },

   // После renderScene и createInventory — восстановить собранные предметы из локалки
   loadSavedCollected() {
     if (!this.sceneEl || !this.inventoryEl) return;
     const playerKey = this.selectedPlayer || Storage.load('level1_currentPlayer') || 'guest';
     const saved = Storage.load(`level1_${playerKey}_collected`);
     if (!saved || !Array.isArray(saved) || saved.length === 0) return;

     // Сначала убедимся, что слоты созданы
     if (!Array.from(this.inventoryEl.children).length) this.createInventory();

     // очистим текущие состояния коллекции (не трогаем selectedPlayer)
     this.inventory = new Array(7).fill(null);
     this.collected = this.collected || {};

     // Заполняем слоты в порядке saved (saved[0] -> слот 0 и т.д.)
     for (let i = 0; i < saved.length && i < 7; i++) {
       const id = saved[i];
       if (!id) continue;
       const art = this.scene.artifacts.find(a => a.id === id);
       // Записываем в внутренний массив и DOM в тот же индекс
       this.inventory[i] = id;
       this.collected[id] = true;
       const slot = this.inventoryEl.children[i];
       if (slot) {
         slot.dataset.artifact = id;
         slot.innerHTML = `<div style="text-align:center"><div style="font-size:30px">${art ? art.icon : '?'}</div><div style="font-size:12px">${art ? art.name : id}</div></div>`;
         slot.classList.add('collected');
       }
       // деактивировать соответствующую зону на сцене, если она есть
       try {
         // используем селектор по data-artifact
         const selector = `.hotspot[data-artifact="${id}"]`;
         const zone = this.sceneEl.querySelector(selector);
         if (zone) {
           zone.style.pointerEvents = 'none';
           zone.style.opacity = '0.25';
           zone.classList.add('revealed');
         }
       } catch (e) {
         // silent
       }
     }

     // если восстановлено 7 предметов — сразу перейти в режим упорядочивания
     if (Object.keys(this.collected).length === 7) {
       setTimeout(() => this.beginOrdering(), 300);
     }
   },

   startLevel() {
     // reset internal state (не затираем selectedPlayer)
     this.hintLevel = 0;
     this.orderMode = false;
     this.selectedSlotIndex = null;
     this.hintPanel.style.display = 'none';
     // render scene and inventory
     this.renderScene();
     this.createInventory();
     // восстановление прогресса (если есть)
     this.loadSavedCollected();
     this.puzzleInfo.textContent = 'Найдите 7 артефактов на карте.';
   },

   renderScene() {
     // choose random scene
     this.scene = this.scenes[Math.floor(Math.random() * this.scenes.length)];
     if (this.scene.bg) this.sceneEl.style.backgroundImage = this.scene.bg;
     this.sceneEl.innerHTML = '';
     // create hotspots
     this.scene.zones.forEach(z => {
       const el = document.createElement('div');
       el.className = 'hotspot';
       el.style.left = z.x + '%';
       el.style.top = z.y + '%';
       el.style.width = z.w + '%';
       el.style.height = z.h + '%';
       el.dataset.artifact = z.artifactId || '';
       el.dataset.interaction = z.interaction;
       if (z.flag) el.dataset.flag = z.flag;
       if (z.requiredFlag) el.dataset.requiredFlag = z.requiredFlag;
       if (z.trigger) el.dataset.trigger = z.trigger;
       // icon shown on reveal
       const art = this.scene.artifacts.find(a => a.id === z.artifactId);
       el.dataset.icon = art ? art.icon : '';
       // init auxiliary counters/state per element
       el._mc_count = 0;
       el._mc_timer = null;
       el._gesture = { ys: [], dirs: 0, lastY: null, lastDir: null };
       el._sliderDist = 0;
       // Gestures and interactions
       el.addEventListener('mouseenter', () => this.onHover(el));
       el.addEventListener('mouseleave', () => this.onLeave(el));
       el.addEventListener('click', (ev) => this.onClickZone(ev, el));
       el.addEventListener('dblclick', (ev) => this.onDblClickZone(ev, el));
       // longpress (shared)
       let longTimer = null;
       el.addEventListener('mousedown', (e) => {
         // start longpress timer (for longpress and gesture/slider)
         longTimer = setTimeout(() => {
           if (el.dataset.interaction === 'longpress' || el.dataset.interaction === 'toggle' ) {
             this.onLongPress(el);
           }
         }, 700);

         // gesture start (if gesture type)
         if (el.dataset.interaction === 'gesture') {
           el._gesture.ys = [];
           el._gesture.dirs = 0;
           el._gesture.lastY = e.clientY;
           el._gesture.lastDir = null;
           this._gestureMoveHandler = (ev) => {
             const y = ev.clientY;
             el._gesture.ys.push(y);
             const dir = (y > el._gesture.lastY) ? 'down' : (y < el._gesture.lastY) ? 'up' : el._gesture.lastDir;
             if (el._gesture.lastDir && dir !== el._gesture.lastDir) el._gesture.dirs++;
             el._gesture.lastDir = dir;
             el._gesture.lastY = y;
           };
           document.addEventListener('mousemove', this._gestureMoveHandler);
         }

         // slider start
         if (el.dataset.interaction === 'slider' || el.dataset.interaction === 'trajectory') {
           el._sliderDist = 0;
           el._lastPos = { x: e.clientX, y: e.clientY };
           this._sliderMoveHandler = (ev) => {
             const dx = Math.abs(ev.clientX - el._lastPos.x);
             const dy = Math.abs(ev.clientY - el._lastPos.y);
             el._sliderDist += Math.sqrt(dx*dx + dy*dy);
             el._lastPos = { x: ev.clientX, y: ev.clientY };
           };
           document.addEventListener('mousemove', this._sliderMoveHandler);
         }
       });
       el.addEventListener('mouseup', (e) => {
         clearTimeout(longTimer);
         // stop gesture tracking
         if (el.dataset.interaction === 'gesture') {
           document.removeEventListener('mousemove', this._gestureMoveHandler);
           // evaluate gesture thresholds
           const ys = el._gesture.ys;
           const amp = ys.length ? Math.max(...ys) - Math.min(...ys) : 0;
           if (amp > 40 && el._gesture.dirs >= 3) {
             // success
             this.revealArtifact(el);
           } else {
             this.puzzleInfo.textContent = 'Жест не распознан — попробуйте быстрее и с переключениями вверх/вниз.';
           }
         }
         if (el.dataset.interaction === 'slider' || el.dataset.interaction === 'trajectory') {
           document.removeEventListener('mousemove', this._sliderMoveHandler);
           if (el._sliderDist > 220) {
             this.revealArtifact(el);
           } else {
             this.puzzleInfo.textContent = 'Попробуйте провести мышью быстрее/дальше по этому объекту.';
           }
         }
       });
       el.addEventListener('mouseleave', () => {
         // сбрасываем временные счётчики
         if (el._mc_timer) { clearTimeout(el._mc_timer); el._mc_timer = null; el._mc_count = 0; }
         if (el.dataset.interaction === 'gesture') {
           document.removeEventListener('mousemove', this._gestureMoveHandler);
         }
         if (el.dataset.interaction === 'slider' || el.dataset.interaction === 'trajectory') {
           document.removeEventListener('mousemove', this._sliderMoveHandler);
         }
       });

       // special: multiclick7 behaviour
       if (z.interaction === 'multiclick7') {
         el.addEventListener('click', (ev) => {
           ev.stopPropagation();
           el._mc_count++;
           if (el._mc_timer) clearTimeout(el._mc_timer);
           el._mc_timer = setTimeout(() => { el._mc_count = 0; el._mc_timer = null; }, 1500);
           // visual feedback: light up partial
           el.style.boxShadow = `0 0 ${4 + el._mc_count}px rgba(255,200,30,${0.08 * el._mc_count})`;
           if (el._mc_count >= 12) {
             el._mc_count = 0;
             if (el._mc_timer) { clearTimeout(el._mc_timer); el._mc_timer = null; }
             this.revealArtifact(el);
           }
         });
       }

       this.sceneEl.appendChild(el);

       // сохранить ссылку на реальную перчатку (rukav)
       if (z.artifactId === 'rukav') {
         this.rukavEl = el;
       }
     });

     // если rukav найден и фаза 1 — скрыть её (появится при phase 2)
     if (this.rukavEl) {
       if (this.glovesPhase === 1) {
         this.rukavEl.style.opacity = '0';
         this.rukavEl.style.pointerEvents = 'none';
       } else {
         this.rukavEl.style.opacity = '1';
         this.rukavEl.style.pointerEvents = '';
       }
     }
   },

   onHover(el) {
     el.classList.add('hovered');
     // if zone expects hover -> reveal briefly
     if (el.dataset.interaction === 'hover') {
       this.revealArtifact(el);
     }
   },
   onLeave(el) {
     el.classList.remove('hovered');
   },
   onClickZone(ev, el) {
     ev.stopPropagation();
     // если режим визии активен — разрешаем только взаимодействие с rukav (реальной перчаткой)
     if (this.visionActive) {
       const isRukav = el && el.dataset && el.dataset.artifact === 'rukav';
       if (!isRukav) {
         this.puzzleInfo.textContent = 'Сейчас видно только перчатки — попробуйте навести на них.';
         return;
       }
       // если rukav и phase 1 — шутка (если вдруг реальная оказалась видимой)
       if (isRukav && this.glovesPhase === 1) {
         this.puzzleInfo.textContent = 'А тут ничего нет. Это была магия мамы!';
         this.exitVision();
         return;
       }
       // если rukav и phase 2 — позволить собрать
       if (isRukav && this.glovesPhase === 2) {
         this.revealArtifact(el);
         this.exitVision();
         return;
       }
     }

     const type = el.dataset.interaction;
     // hoverclick: требуем сначала hover, затем click
     if (type === 'hoverclick') {
       if (el.matches(':hover')) {
         this.revealArtifact(el);
       } else {
         this.puzzleInfo.textContent = 'Наведите курсор на объект, затем кликните.';
       }
       return;
     }
     // click — простая выдача
     if (type === 'click') {
       if (el.dataset.interaction === 'toggle' && el.dataset.flag) {
         this.flags[el.dataset.flag] = !this.flags[el.dataset.flag];
         this.puzzleInfo.textContent = `${el.dataset.flag} = ${this.flags[el.dataset.flag] ? 'включено' : 'выключено'}`;
         return;
       }
       if (el.dataset.requiredFlag) {
         if (!this.flags[el.dataset.requiredFlag]) {
           this.puzzleInfo.textContent = 'Похоже, сначала нужно включить что-то в другом месте.';
           return;
         }
       }
       if (el.dataset.interaction === 'event' && el.dataset.trigger && el.dataset.trigger !== 'click') {
         this.puzzleInfo.textContent = 'Здесь нужен другой тип взаимодействия.';
         return;
       }
       if (el.dataset.artifact) this.revealArtifact(el);
       return;
     }
     // остальные типы: dblclick/longpress обработаны отдельно
     if (type === 'longpress') {
       this.puzzleInfo.textContent = 'Вероятно тут надо по капаться.';
       // конкретная обработка выполняется в onLongPress
       return;
     }
     if (type === 'multiclick7') {
       // multiclick7 handled by special listener installed earlier
         this.puzzleInfo.textContent = 'стучи настойчивее...';

         return;
     }
     if (type === 'event') {
         const reqFlag = el.dataset.requiredFlag;
         if (reqFlag && !this.flags[reqFlag]) {
             this.puzzleInfo.textContent = 'Плохо видно, надо что-то включить в другом месте.';
             return;
         }
         // ПЕРЧАТКИ: специальная логика фаз
         if (el.dataset.artifact === 'rukav') {
             if (this.glovesPhase === 1) {
                 this.puzzleInfo.textContent = 'Это иллюзия! Активируйте зрение ещё раз.';
                 return;
             }
             // фаза 2 — выдаём предмет
             this.revealArtifact(el);
             document.body.classList.remove('mom-vision');
             this.flags['МаминоЗрение'] = false; // выключаем режим
             return;
         }
         if (el.dataset.artifact === 'snowglob') {
             if (!el.dataset.trigger || el.dataset.trigger === 'click') {
               if (el.dataset.requiredFlag && !this.flags[el.dataset.requiredFlag]) {
                 this.puzzleInfo.textContent = 'Требуется предварительное действие в другом месте.';
               } else {
                 this.revealArtifact(el);
               }
             } else {
               this.puzzleInfo.textContent = 'Тут слишком темно и не видно';
             }
         }

         // остальные event зоны
         if (el.dataset.trigger === 'click') {
             this.revealArtifact(el);
         }
         return;

       // return;
     }
     // default fallback
     this.puzzleInfo.textContent = 'Да, тут что-то есть, попробуйте другой тип взаимодействия.';
   },
   onDblClickZone(ev, el) {
     ev.stopPropagation();
     const type = el.dataset.interaction;
     // if zone expects dblclick (including event requiring dblclick)
     if (type === 'dblclick' || (type === 'event' && el.dataset.trigger === 'dblclick')) {
       // if requiredFlag exists, check it
       if (el.dataset.requiredFlag && !this.flags[el.dataset.requiredFlag]) {
         this.puzzleInfo.textContent = 'Требуется предварительное действие в другом месте.';
         return;
       }
       this.revealArtifact(el);
       return;
     }
     // special: some event items require combo (longpress somewhere + dblclick here)
     if (type === 'combo') {
       // check combo flags
       if (this.flags['comboReady']) this.revealArtifact(el);
       else this.puzzleInfo.textContent = 'Сначала выполните подготовительное действие в другом месте.';
     }
   },
     onLongPress(el) {
         if (el.dataset.interaction === 'longpress') this.revealArtifact(el);

         if (el.dataset.interaction === 'toggle' && el.dataset.flag) {
             // СВЕТ (уже работает)
             if (el.dataset.flag === 'Свет') {
                 this.flags[el.dataset.flag] = true;
                 el.style.boxShadow = '0 0 18px 4px rgba(255,200,50,0.8)'; // голубая подсветка
                 this.puzzleInfo.textContent = 'Фонарь включён! Теперь можно искать в темных местах.';
                 setTimeout(() => el.style.boxShadow = '', 3000);
             }

             // МАМИНО ЗРЕНИЕ (новое)
             if (el.dataset.flag === 'МаминоЗрение') {
                 this.flags[el.dataset.flag] = true;
                 el.style.boxShadow = '0 0 18px 4px rgba(100,200,255,0.8)'; // голубая подсветка
                 this.puzzleInfo.textContent = 'МаминоЗрение включено! Наведите на перчатки.';

                 this.enterMomVision(); // ← вызов
                 setTimeout(() => el.style.boxShadow = '', 3000);

                 return;
             }

             return;
         }
   },
     tempHighlight(el, className = 'item-highlight', ms = 2000) {
         if (!el) return;
         try {
             // добавляем класс
             el.classList.add(className);
             // если был предыдущий таймер — очищаем
             if (el._tempHighlightTimer) {
                 clearTimeout(el._tempHighlightTimer);
                 el._tempHighlightTimer = null;
             }
             // ставим новый таймер для удаления класса
             el._tempHighlightTimer = setTimeout(() => {
                 try { el.classList.remove(className); } catch (e) { /* silent */ }
                 el._tempHighlightTimer = null;
             }, ms);
         } catch (err) {
             console.warn('tempHighlight error', err);
         }
     },

     enterMomVision() {
         // НЕ удаляем оригинальный фон — создаём временный слой поверх сцены
         // Если уже есть active fake bg — ничего не делаем
         if (this.fakeBgEl) return;

         // 1) создаём фоновый слой с фейковым изображением
         const fakeBg = document.createElement('div');
         fakeBg.className = 'vision-fake-bg';
         // стиль прямо инлайн, чтобы не требовать правки CSS-файлов
         fakeBg.style.position = 'absolute';
         fakeBg.style.left = '0';
         fakeBg.style.top = '0';
         fakeBg.style.right = '0';
         fakeBg.style.bottom = '0';
         fakeBg.style.backgroundImage = 'url("../assets/images/fake2.jpg")';
         fakeBg.style.backgroundSize = 'cover';
         fakeBg.style.backgroundPosition = 'center';
         fakeBg.style.zIndex = '10'; // ниже hotspot'ов (hotspot z-index обычно выше)
         fakeBg.style.pointerEvents = 'none';
         // вставляем первым ребёнком, чтобы он был под hotspot-элементами
         if (this.sceneEl.firstChild) this.sceneEl.insertBefore(fakeBg, this.sceneEl.firstChild);
         else this.sceneEl.appendChild(fakeBg);
         this.fakeBgEl = fakeBg;

         // 2) затемняем все зоны кроме перчаток
         Array.from(this.sceneEl.querySelectorAll('.hotspot')).forEach(h => {
             if (h.dataset.artifact !== 'rukav') {
                 h.classList.add('scene-dimmed');
                 // дополнительно скрываем события и pointer-events
                 h.style.pointerEvents = 'none';
                 h.style.opacity = '0';
             }
         });

         // 3) обработка фаз
         const rukavEl = Array.from(this.sceneEl.querySelectorAll('.hotspot')).find(el => el.dataset.artifact === 'rukav');

         if (this.glovesPhase === 1) {
             // ФАЗА 1: фейк за кадром — создаём фейковую иконку перчатки, кликом переведём в фазу 2
             const fake = document.createElement('div');
             fake.className = 'gloves-fake';
             fake.style.left = '30%';
             fake.style.top = '85%';
             fake.style.width = '90px';
             fake.style.height = '90px';
             fake.style.position = 'absolute';
             fake.style.zIndex = '60';
             fake.innerHTML = '🧤';
             fake.addEventListener('click', (ev) => {
                 ev.stopPropagation();
                 this.puzzleInfo.textContent = 'А тут ничего нет. Это была магия мамы!' +
                     'На самом деле перчатки здесь.';
                 fake.classList.add('puff');
                 setTimeout(() => {
                     // удаляем фейковый элемент
                     if (fake.parentNode) fake.parentNode.removeChild(fake);
                     this.fakeGloveEl = null;
                     // переводим фазу в реальную
                     this.glovesPhase = 2;
                     // удаляем временный фоновый слой — оригинальный фон останется
                     if (this.fakeBgEl && this.fakeBgEl.parentNode) {
                         this.fakeBgEl.parentNode.removeChild(this.fakeBgEl);
                         this.fakeBgEl = null;
                     }
                     // восстанавливаем зоны (exitMomVision) — real rukav станет видимым там, где он должен быть
                     this.exitMomVision();
                     // делаем реальную перчатку доступной
                     if (rukavEl) {
                         rukavEl.style.opacity = '1';
                         rukavEl.style.pointerEvents = '';
                         // после перехода фейка в реальную фазу — показываем реальную перчатку кратковременно
                         // заменили прямой add --> tempHighlight
                         this.tempHighlight(rukavEl, 'item-highlight', 2000);
                       }
                 }, 800);
             });
             // сохраняем ссылку для возможного удаления
             this.fakeGloveEl = fake;
             this.sceneEl.appendChild(fake);
         } else {
             // ФАЗА 2: подсвечиваем ТОЛЬКО реальную перчатку (и оставляем fakeBg до закрытия)
             if (rukavEl) {
                 rukavEl.style.zIndex = '100';
                 rukavEl.style.opacity = '1';
                 rukavEl.style.pointerEvents = '';
                 // временная подсветка 2s
                 this.tempHighlight(rukavEl, 'item-highlight', 2000);
             }
             // автоматически закроем режим через короткое время, чтобы вернуть обычную сцену,
             // но при этом real rukav останется видимой (логика exitMomVision не удаляет rukav при phase 2)
             setTimeout(() => {
                 // удаляем временный фоновый слой
                 if (this.fakeBgEl && this.fakeBgEl.parentNode) {
                     this.fakeBgEl.parentNode.removeChild(this.fakeBgEl);
                     this.fakeBgEl = null;
                 }
                 this.exitMomVision();
                 // оставить rukav доступной
                 if (rukavEl) {
                     rukavEl.style.opacity = '1';
                     rukavEl.style.pointerEvents = '';
                 }
             }, 1000);
         }
     },

     exitMomVision() {
         // НЕ восстанавливаем backgroundImage явно — оригинальный фон не трогаем
         // Удалим временный fakeBg если он остался
         if (this.fakeBgEl && this.fakeBgEl.parentNode) {
             this.fakeBgEl.parentNode.removeChild(this.fakeBgEl);
             this.fakeBgEl = null;
         }
         // удаляем фейковую перчатку, если осталась
         if (this.fakeGloveEl && this.fakeGloveEl.parentNode) {
             this.fakeGloveEl.parentNode.removeChild(this.fakeGloveEl);
             this.fakeGloveEl = null;
         }
         // восстановим все зоны — учтём фазу перчаток: если phase 1 — прячем rukav, если phase 2 — показываем
         Array.from(this.sceneEl.querySelectorAll('.hotspot')).forEach(h => {
             h.classList.remove('scene-dimmed', 'item-highlight');
             h.style.zIndex = '';
             // восстановим pointerEvents/opacity в зависимости от того, что нужно
             if (h.dataset.artifact === 'rukav') {
                 if (this.glovesPhase === 2) {
                     h.style.pointerEvents = '';
                     h.style.opacity = '1';
                 } else {
                     h.style.pointerEvents = 'none';
                     h.style.opacity = '0';
                 }
             } else {
                 h.style.pointerEvents = '';
                 h.style.opacity = '';
             }
         });
         // скрыть overlay если был
         if (this.visionOverlay) {
             this.visionOverlay.style.display = 'none';
             this.visionOverlay.setAttribute('aria-hidden', 'true');
         }
     },

   revealArtifact(el) {
     const id = el.dataset.artifact;
     if (!id) {
       return;
     }
     // Если в режиме визии и это перчатки и phase 1 — блокируем
     if (this.visionActive && id === 'rukav' && this.glovesPhase === 1) {
       this.puzzleInfo.textContent = 'А тут ничего нет. Это была магия мамы!';
       return;
     }
     if (this.collected[id]) return;
     const req = el.dataset.requiredFlag;
     if (req && !this.flags[req]) {
       this.puzzleInfo.textContent = 'Не выполнены условия появления предмета.';
       return;
     }
     // визуально показать и затем добавить в инвентарь
     el.classList.add('revealed');
     const art = this.scene.artifacts.find(a => a.id === id);
     this.puzzleInfo.textContent = `Найдено: ${art.name}`;
     const slotIndex = this.inventory.indexOf(null);
     setTimeout(() => {
       this.collectArtifact(id);
       el.style.opacity = '0.2';
       el.style.pointerEvents = 'none';
     }, 350);
   },

   collectArtifact(id) {
     if (this.collected[id]) return;
     // найти первый пустой слот
     const slotIndex = this.inventory.indexOf(null);
     if (slotIndex === -1) return;
     this.inventory[slotIndex] = id;
     this.collected[id] = true;
     // визуально положить в слот
     const art = this.scene.artifacts.find(a => a.id === id);
     const slot = this.inventoryEl.children[slotIndex];
     slot.dataset.artifact = id;
     slot.innerHTML = `<div style="text-align:center"><div style="font-size:30px">${art.icon}</div><div style="font-size:12px">${art.name}</div></div>`;
     slot.classList.add('collected');
     // short tooltip-like info
     setTimeout(() => { this.puzzleInfo.textContent = `Предмет "${art.name}" добавлен в инвентарь.`; }, 50);
     // when all collected -> enable ordering
     if (Object.keys(this.collected).length === 7) {
       setTimeout(() => this.beginOrdering(), 400);
     }
     // save temporary progress
     Storage.save(`level1_${this.selectedPlayer || 'guest'}_collected`, Object.keys(this.collected));
   },

   createInventory() {
     this.inventoryEl.innerHTML = '';
     for (let i = 0; i < 7; i++) {
       const slot = document.createElement('div');
       slot.className = 'slot';
       slot.dataset.index = i;
       slot.addEventListener('click', () => this.onSlotClick(i));
       this.inventoryEl.appendChild(slot);
     }
     // restore if needed
     const saved = Storage.load(`level1_${this.selectedPlayer || 'guest'}_collected`);
     if (saved && Array.isArray(saved)) {
       // try to restore into slots in order (best-effort)
       saved.forEach((id, idx) => {
         const art = this.scene.artifacts.find(a => a.id === id);
         if (art && this.inventory[idx] === null) {
           this.inventory[idx] = id;
           const slot = this.inventoryEl.children[idx];
           slot.dataset.artifact = id;
           slot.innerHTML = `<div style="text-align:center"><div style="font-size:30px">${art.icon}</div><div style="font-size:12px">${art.name}</div></div>`;
           slot.classList.add('collected');
           this.collected[id] = true;
         }
       });
     }
   },

   beginOrdering() {
     this.orderMode = true;
     this.puzzleInfo.textContent = `Все предметы собраны. Используйте механику "${this.scene.mechanic}" для расстановки.`;
     // add keyboard behavior for mechanics
     if (this.scene.mechanic === 'push') {
       this.keyHandler = (e) => {
         if (!this.orderMode || this.selectedSlotIndex === null) return;
         if (e.key === 'ArrowLeft') this.pushSlot(this.selectedSlotIndex, -1);
         if (e.key === 'ArrowRight') this.pushSlot(this.selectedSlotIndex, 1);
       };
       document.addEventListener('keydown', this.keyHandler);
     } else if (this.scene.mechanic === 'carousel') {
       // wheel to rotate
       this.wheelHandler = (e) => {
         if (!this.orderMode) return;
         e.preventDefault();
         const delta = e.deltaY > 0 ? 1 : -1;
         this.rotateInventory(delta);
       };
       this.inventoryEl.addEventListener('wheel', this.wheelHandler, { passive: false });
       // arrow keys also rotate
       this.keyHandler = (e) => {
         if (!this.orderMode) return;
         if (e.key === 'ArrowLeft') this.rotateInventory(-1);
         if (e.key === 'ArrowRight') this.rotateInventory(1);
       };
       document.addEventListener('keydown', this.keyHandler);
     }
     // swap mechanic requires no extra key handlers
   },

   onSlotClick(index) {
     if (!this.orderMode) {
       this.puzzleInfo.textContent = 'Сначала соберите все предметы.';
       return;
     }
     // mechanic behaviors
     if (this.scene.mechanic === 'поменять местами') {
       // select-first then second -> swap
       if (this.selectedSlotIndex === null) {
         this.selectedSlotIndex = index;
         this.inventoryEl.children[index].classList.add('selected');
       } else if (this.selectedSlotIndex === index) {
         this.inventoryEl.children[index].classList.remove('selected');
         this.selectedSlotIndex = null;
       } else {
         // swap
         this.swapSlots(this.selectedSlotIndex, index);
         this.inventoryEl.children[this.selectedSlotIndex].classList.remove('selected');
         this.selectedSlotIndex = null;
         this.checkAfterMove();
       }
     } else if (this.scene.mechanic === 'push') {
       // select slot to push
       if (this.selectedSlotIndex === null) {
         this.selectedSlotIndex = index;
         this.inventoryEl.children[index].classList.add('selected');
         this.puzzleInfo.textContent = 'Выбрана ячейка для "толкания". Используйте стрелки влево/вправо.';
       } else if (this.selectedSlotIndex === index) {
         this.inventoryEl.children[index].classList.remove('selected');
         this.selectedSlotIndex = null;
       } else {
         // change selection
         this.inventoryEl.children[this.selectedSlotIndex].classList.remove('selected');
         this.selectedSlotIndex = index;
         this.inventoryEl.children[index].classList.add('selected');
       }
     } else if (this.scene.mechanic === 'carousel') {
       // select a slot to be "focused" (cursor) or just rotate using wheel/keys
       this.selectedSlotIndex = index;
       // highlight briefly
       Array.from(this.inventoryEl.children).forEach(s => s.classList.remove('selected'));
       this.inventoryEl.children[index].classList.add('selected');
       this.puzzleInfo.textContent = 'Используйте колесико мыши или стрелки, чтобы вращать карусель инвентаря.';
     }
   },

   swapSlots(a, b) {
     const tmp = this.inventory[a];
     this.inventory[a] = this.inventory[b];
     this.inventory[b] = tmp;
     this.renderInventorySlots();
   },

   pushSlot(index, dir) {
     // dir: -1 left, 1 right — "ползёт" выбранный предмет, упираясь в соседей
     const newIndex = index + dir;
     if (newIndex < 0 || newIndex >= this.inventory.length) return;
     // если сосед пуст, просто переместить
     if (this.inventory[newIndex] === null) {
       this.inventory[newIndex] = this.inventory[index];
       this.inventory[index] = null;
       this.selectedSlotIndex = newIndex;
     } else {
       // push: поменять местами с соседом (имитация толчка)
       const tmp = this.inventory[newIndex];
       this.inventory[newIndex] = this.inventory[index];
       this.inventory[index] = tmp;
       this.selectedSlotIndex = newIndex;
     }
     this.renderInventorySlots();
     Array.from(this.inventoryEl.children).forEach(s => s.classList.remove('selected'));
     this.inventoryEl.children[this.selectedSlotIndex].classList.add('selected');
     this.checkAfterMove();
   },

   rotateInventory(delta) {
     // delta positive -> move right; negative -> move left
     const n = this.inventory.length;
     const d = ((delta % n) + n) % n;
     if (d === 0) return;
     const newArr = new Array(n);
     for (let i = 0; i < n; i++) {
       newArr[(i + d) % n] = this.inventory[i];
     }
     this.inventory = newArr;
     this.renderInventorySlots();
     this.checkAfterMove();
   },

   renderInventorySlots() {
     for (let i = 0; i < 7; i++) {
       const s = this.inventoryEl.children[i];
       const id = this.inventory[i];
       s.dataset.artifact = id || '';
       if (!id) { s.innerHTML = ''; s.classList.remove('collected'); }
       else {
         const art = this.scene.artifacts.find(a => a.id === id);
         s.innerHTML = `<div style="text-align:center"><div style="font-size:30px">${art.icon}</div><div style="font-size:12px">${art.name}</div></div>`;
         s.classList.add('collected');
       }
     }
   },

   checkAfterMove() {
     // optional: show quick feedback
     this.puzzleInfo.textContent = 'Позиции обновлены.';
   },

   checkOrder() {
     if (!this.orderMode) {
       this.puzzleInfo.textContent = 'Сначала соберите все предметы.';
       return;
     }
     const current = this.inventory.slice();
     const expected = this.scene.correctOrder.slice();
     // validate non-null entries
     const ok = expected.every((id, idx) => current[idx] === id);
     // visual feedback
     for (let i = 0; i < 7; i++) {
       const slot = this.inventoryEl.children[i];
       slot.classList.remove('correct','wrong');
       if (current[i] && current[i] === expected[i]) {
         slot.classList.add('correct');
       } else {
         slot.classList.add('wrong');
       }
     }
     if (ok) {
       this.onComplete();
     } else {
       this.puzzleInfo.textContent = 'Порядок неверен. Подсказка: некоторые ячейки подсвечены как правильные.';
       // убрать класс wrong через полсекунды, оставить correct
       setTimeout(() => {
         for (let i = 0; i < 7; i++) this.inventoryEl.children[i].classList.remove('wrong');
       }, 800);
     }
   },

   // Обновлённый onComplete: перед показом модала очищаем инвентарь и localStorage
   onComplete() {
     // формируем код: первые буквы названий в правильном порядке
     const letters = this.scene.correctOrder.map(id => {
       const art = this.scene.artifacts.find(a => a.id === id);
       return art ? (art.letter || art.name[0]) : '?';
     });
     const code = letters.join('').toUpperCase();

     // сохранить код и unlocked status (следующий уровень)
     const levelCodes = Storage.load('level_codes') || {};
     levelCodes[1] = code;
     Storage.save('level_codes', levelCodes);
     const unlocked = Storage.load('unlocked_levels') || [];
     if (!unlocked.includes(2)) {
       if (!unlocked.includes(1)) unlocked.push(1);
       Storage.save('unlocked_levels', unlocked);
     }

    // Удаляем запись о текущем игроке — завершенный игрок выходит из уровня
    try { localStorage.removeItem('level1_currentPlayer'); } catch (err) { /* silent */ }

     // ОЧИСТКА ИНВЕНТАРЯ: внутренний стейт + DOM + localStorage
     try {
       // очистить внутреннее состояние
       this.inventory = new Array(7).fill(null);
       this.collected = {};

       // очистить DOM‑ячейки инвентаря
       if (this.inventoryEl && this.inventoryEl.children) {
         for (let i = 0; i < this.inventoryEl.children.length; i++) {
           const slot = this.inventoryEl.children[i];
           slot.dataset.artifact = '';
           slot.innerHTML = '';
           slot.classList.remove('collected', 'selected', 'correct', 'wrong');
         }
       }

       // удалить временный прогресс из localStorage для текущего игрока
       const key = `level1_${this.selectedPlayer || 'guest'}_collected`;
       try { localStorage.removeItem(key); } catch (e) { /* silent */ }
     } catch (e) {
       console.warn('Ошибка при очистке инвентаря:', e);
     }

     // показать финальный модал с кодом
     this.finalText.textContent = code;
     this.finalModal.style.display = 'flex';
     this.puzzleInfo.textContent = 'Уровень пройден!';

     // начислить очки
     try {
       Players.init && Players.init();
       const p = Players.list.find(x => x.name === this.selectedPlayer);
       if (p) { p.score = (p.score || 0) + 150; Storage.save('players', Players.list); }
     } catch (e) {}
   },

   toggleHint() {
     if (this.hintPanel.style.display === 'block') this.hintPanel.style.display = 'none';
     else { this.hintPanel.style.display = 'block'; this.hintLevel = 0; this.nextHint(); }
   },
   nextHint() {
     if (!this.scene) { this.hintText.textContent = 'Сначала нажмите "Играть".'; return; }
     this.hintLevel = Math.min(3, this.hintLevel + 1);
     this.hintText.textContent = this.scene.hintTexts[this.hintLevel - 1] || '';
     // для level 2 behavior: подсвечиваем подозрительные зоны кратковременно
     if (this.hintLevel === 2) {
       // подсветить первые 2 подозрительных зоны
       const els = Array.from(this.sceneEl.children).slice(0, 2);
       els.forEach(el => { el.classList.add('hovered'); setTimeout(() => el.classList.remove('hovered'), 2400); });
     } else if (this.hintLevel === 3) {
       // подсказка почти спойлер — можно подсветить последние зоны (не раскрывая всё)
       const els = Array.from(this.sceneEl.children).slice(-2);
       els.forEach(el => { el.classList.add('hovered'); setTimeout(() => el.classList.remove('hovered'), 2400); });
     }
   },
   resetHints() { this.hintLevel = 0; this.hintText.textContent = ''; },

   resetLevel() {
     // очистка событий
     if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler);
     if (this.wheelHandler) this.inventoryEl.removeEventListener('wheel', this.wheelHandler);
     this.hideStart();
     this.startLevel();
   },

  // ключ для хранения подсказок per-player
  hintStorageKey() {
    return `level1_hints_${this.selectedPlayer || Storage.load('level1_currentPlayer') || 'guest'}`;
  },

  // загрузить состояние подсказок из localStorage (если есть)
  loadHintState() {
    try {
      const saved = Storage.load(this.hintStorageKey());
      this.hintState = saved && typeof saved === 'object' ? saved : {};
    } catch (e) {
      this.hintState = {};
    }
  },

  // сохранить состояние подсказок
  saveHintState() {
    try {
      Storage.save(this.hintStorageKey(), this.hintState || {});
    } catch (e) {
      // silent
    }
  },
 };

 Level1.init();

