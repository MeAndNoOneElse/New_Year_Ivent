// Полная реализация уровня 1 по новому ТЗ
const Level1 = {
  // Сцены — 3 реализации, у каждой 7 артефактов и набор зон (проще: зоны с позициями и типом взаимодействия)
  scenes: [
    {
      id: 'yard',
      name: 'Новогодний двор',
      bg: 'url("../assets/images/scene-yard.jpg")', // (опционально) замените на существующий файл
      mechanic: 'swap', // вариант A: обмен по двум кликам
      artifacts: [
        { id: 'sanok', name: 'Игрушечная санка', icon: '🛷', letter: 'С' },
        { id: 'rukav', name: 'Рукавица', icon: '🧤', letter: 'Р' },
        { id: 'nos', name: 'Нос-морковка', icon: '🥕', letter: 'Н' },
        { id: 'sharok', name: 'Ёлочный шар', icon: '🟠', letter: 'Ш' },
        { id: 'zvezda', name: 'Ёлочная звезда', icon: '⭐', letter: 'З' },
        { id: 'gir', name: 'Гирлянда', icon: '🔔', letter: 'Г' },
        { id: 'snowglob', name: 'Снежный шар', icon: '❄️', letter: 'С' }
      ],
      zones: [
        // координаты: left/top проценты и interaction: hover/click/longpress/dblclick
        { x: 12, y: 72, w: 16, h: 16, artifactId: 'sanok', interaction: 'hover' },
        { x: 64, y: 18, w: 12, h: 14, artifactId: 'rukav', interaction: 'longpress' },
        { x: 40, y: 50, w: 10, h: 12, artifactId: 'nos', interaction: 'longpress' },
        { x: 30, y: 28, w: 10, h: 12, artifactId: 'sharok', interaction: 'dblclick' },
        { x: 48, y: 32, w: 12, h: 12, artifactId: 'zvezda', interaction: 'click' },
        { x: 78, y: 46, w: 12, h: 12, artifactId: 'gir', interaction: 'click' },
        { x: 18, y: 36, w: 12, h: 12, artifactId: 'snowglob', interaction: 'longpress' }
      ],
      hintTexts: [
        'Общий принцип: используйте наведение, клик, долгое удержание и двойной клик.',
        'Подозрительные области: сугроб у крыльца, фонарь и ёлка — наведите и посмотрите.',
        'Спойлер: задержите на фонаре и дважды кликните на снеговика.'
      ],
      correctOrder: ['sanok','rukav','nos','sharok','zvezda','gir','snowglob']
    },
    {
      id: 'square',
      name: 'Новогодняя площадь',
      bg: 'url("../assets/images/scene-square.jpg")',
      mechanic: 'push', // вариант B: "толкание" выбранного предмета стрелками
      artifacts: [
        { id: 'ticket', name: 'Каток-билет', icon: '🎫', letter: 'К' },
        { id: 'cacao', name: 'Горячий какао', icon: '☕', letter: 'Г' },
        { id: 'statue', name: 'Лёд-скульптура', icon: '🧊', letter: 'Л' },
        { id: 'mic', name: 'Сценический микрофон', icon: '🎤', letter: 'С' },
        { id: 'topper', name: 'Ёлочный топпер', icon: '⭐', letter: 'Т' },
        { id: 'lantern', name: 'Небесный фонарик', icon: '🏮', letter: 'Н' },
        { id: 'fire', name: 'Фейерверк-петарда', icon: '🎆', letter: 'Ф' }
      ],
      zones: [
        { x: 22, y: 60, w: 12, h: 12, artifactId: 'ticket', interaction: 'click' },
        { x: 34, y: 44, w: 12, h: 12, artifactId: 'cacao', interaction: 'hover' },
        { x: 52, y: 22, w: 14, h: 14, artifactId: 'statue', interaction: 'longpress' },
        { x: 62, y: 38, w: 12, h: 12, artifactId: 'mic', interaction: 'click' },
        { x: 46, y: 28, w: 12, h: 12, artifactId: 'topper', interaction: 'dblclick' },
        { x: 74, y: 18, w: 12, h: 12, artifactId: 'lantern', interaction: 'longpress' },
        { x: 82, y: 62, w: 12, h: 12, artifactId: 'fire', interaction: 'dblclick' }
      ],
      hintTexts: [
        'Осмотритесь: лавки, каток и сцена — места для поиска.',
        'Подсветим подозрительные палатки на короткое время.',
        'Спойлер: удержите на ледяной скульптуре и дважды кликните по ёлке.'
      ],
      correctOrder: ['ticket','cacao','statue','mic','topper','lantern','fire']
    },
    {
      id: 'room',
      name: 'Семейная комната',
      bg: 'url("../assets/images/scene-room.jpg")',
      mechanic: 'carousel', // вариант C: кольцевая карусель колесом/стрелками
      artifacts: [
        { id: 'album', name: 'Фотоальбом', icon: '📕', letter: 'Ф' },
        { id: 'letter', name: 'Письмо Деду Морозу', icon: '✉️', letter: 'П' },
        { id: 'mandar', name: 'Мандарин', icon: '🍊', letter: 'М' },
        { id: 'candy', name: 'Конфета', icon: '🍬', letter: 'К' },
        { id: 'blanket', name: 'Свернутый плед', icon: '🧣', letter: 'С' },
        { id: 'photo', name: 'Шар-игрушка с фото', icon: '🧸', letter: 'Ш' },
        { id: 'alarm', name: 'Будильник до полуночи', icon: '⏰', letter: 'Б' }
      ],
      zones: [
        { x: 18, y: 34, w: 12, h: 12, artifactId: 'album', interaction: 'hover' },
        { x: 44, y: 54, w: 12, h: 12, artifactId: 'letter', interaction: 'click' },
        { x: 36, y: 38, w: 10, h: 10, artifactId: 'mandar', interaction: 'click' },
        { x: 58, y: 46, w: 10, h: 10, artifactId: 'candy', interaction: 'click' },
        { x: 24, y: 66, w: 12, h: 12, artifactId: 'blanket', interaction: 'longpress' },
        { x: 66, y: 28, w: 12, h: 12, artifactId: 'photo', interaction: 'dblclick' },
        { x: 74, y: 56, w: 10, h: 10, artifactId: 'alarm', interaction: 'longpress' }
      ],
      hintTexts: [
        'В гостиной обращайте внимание на стол, полку и ёлку.',
        'Мы можем подсветить окна с предметами на пару секунд.',
        'Спойлер: дважды кликните на ёлку, удержание на кресле даст ещё один предмет.'
      ],
      correctOrder: ['letter','mandar','candy','blanket','album','photo','alarm']
    }
  ],

  init() {
    document.addEventListener('DOMContentLoaded', () => this.setup());
  },

  setup() {
    // DOM refs
    this.sceneEl = document.getElementById('scene');
    this.inventoryEl = document.getElementById('inventory');
    this.startModal = document.getElementById('start-modal');
    this.startBtns = Array.from(document.querySelectorAll('.player-btn'));
    this.startPlayBtn = document.getElementById('start-play');
    this.closeStartBtn = document.getElementById('close-start');
    this.currentPlayerLabel = document.getElementById('current-player');
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

    // state
    this.selectedPlayer = null;
    this.hintLevel = 0;
    this.collected = {}; // artifactId -> true
    this.inventory = new Array(7).fill(null); // ids
    this.orderMode = false;
    this.selectedSlotIndex = null;

    // events
    document.getElementById('open-modal').addEventListener('click', () => this.showStart());
    this.hintToggle.addEventListener('click', () => this.toggleHint());
    this.hintNext.addEventListener('click', () => this.nextHint());
    this.hintReset.addEventListener('click', () => this.resetHints());
    this.checkBtn.addEventListener('click', () => this.checkOrder());
    this.resetBtn.addEventListener('click', () => this.resetLevel());
    this.finalToMenu.addEventListener('click', () => location.href = '../index.html');
    this.closeStartBtn.addEventListener('click', () => this.hideStart());

    // player buttons
    this.startBtns.forEach(b => b.addEventListener('click', (e) => {
      this.startBtns.forEach(x => x.classList.remove('chosen'));
      e.currentTarget.classList.add('chosen');
      this.selectedPlayer = e.currentTarget.dataset.name;
    }));
    this.startPlayBtn.addEventListener('click', () => {
      if (!this.selectedPlayer) this.selectedPlayer = 'Гость';
      this.currentPlayerLabel.textContent = this.selectedPlayer;
      this.hideStart();
      this.startLevel();
    });

    // populate players list into select/store (keep Players integration)
    Players.init && Players.init();

    // show start modal on load
    this.showStart();
  },

  showStart() { this.startModal.style.display = 'flex'; },
  hideStart() { this.startModal.style.display = 'none'; },

  startLevel() {
    // reset internal state
    this.hintLevel = 0;
    this.collected = {};
    this.inventory = new Array(7).fill(null);
    this.orderMode = false;
    this.selectedSlotIndex = null;
    this.hintPanel.style.display = 'none';
    this.renderScene();
    this.createInventory();
    this.puzzleInfo.textContent = 'Найдите 7 артефактов на карте.';
  },

  renderScene() {
    // choose random scene
    this.scene = this.scenes[Math.floor(Math.random() * this.scenes.length)];
    // background
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
      el.dataset.artifact = z.artifactId;
      el.dataset.interaction = z.interaction;
      // icon shown on reveal
      const art = this.scene.artifacts.find(a => a.id === z.artifactId);
      el.dataset.icon = art ? art.icon : '?';
      // Gestures
      // hover
      el.addEventListener('mouseenter', () => this.onHover(el));
      el.addEventListener('mouseleave', () => this.onLeave(el));
      // click/dblclick
      el.addEventListener('click', (ev) => this.onClickZone(ev, el));
      el.addEventListener('dblclick', (ev) => this.onDblClickZone(ev, el));
      // longpress
      let longTimer = null;
      el.addEventListener('mousedown', (e) => {
        longTimer = setTimeout(() => this.onLongPress(el), 700);
      });
      el.addEventListener('mouseup', () => { clearTimeout(longTimer); });
      el.addEventListener('mouseleave', () => { clearTimeout(longTimer); });
      this.sceneEl.appendChild(el);
    });
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
    const type = el.dataset.interaction;
    if (type === 'click') this.revealArtifact(el);
    else if (type === 'dblclick') {
      // clicking once does nothing; dblclick needed — but allow single click to hint
      this.puzzleInfo.textContent = 'Попробуйте двойной клик на этом объекте.';
    } else if (type === 'longpress') {
      this.puzzleInfo.textContent = 'Задержите кнопку на этом объекте, чтобы раскрыть содержимое.';
    } else if (type === 'hover') {
      this.puzzleInfo.textContent = 'Подведите курсор и кликните.';
    }
  },
  onDblClickZone(ev, el) {
    ev.stopPropagation();
    if (el.dataset.interaction === 'dblclick') this.revealArtifact(el);
  },
  onLongPress(el) {
    if (el.dataset.interaction === 'longpress') this.revealArtifact(el);
  },

  revealArtifact(el) {
    const id = el.dataset.artifact;
    if (this.collected[id]) return; // уже собран
    // визуально показать и затем добавить в инвентарь
    el.classList.add('revealed');
    // краткая подсказка
    const art = this.scene.artifacts.find(a => a.id === id);
    this.puzzleInfo.textContent = `Найдено: ${art.name}`;
    // collect with slight delay (анимация)
    setTimeout(() => {
      this.collectArtifact(id);
      // скрыть зону
      el.style.opacity = '0.15';
      el.style.pointerEvents = 'none';
    }, 300);
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
    if (this.scene.mechanic === 'swap') {
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
      // не сразу разблокируем следующий — пользователь введёт код вручную; но отметим текущ как пройден
      if (!unlocked.includes(1)) unlocked.push(1);
      Storage.save('unlocked_levels', unlocked);
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
  }
};

Level1.init();
