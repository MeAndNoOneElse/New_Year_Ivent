// Уровень 1: Охота за сокровищами
const Level1 = {
  // три варианта: каждый вариант задаёт набор предметов и их целевой порядок
  variants: [
    {
      id: 'A',
      items: ['Ёлка', 'Шар', 'Колокольчик', 'Печенье'],
      size: { cols: 12, rows: 12 },
      count: 4
    },
    {
      id: 'B',
      items: ['Сапог', 'Мандарин', 'Свитер', 'Конфета'],
      size: { cols: 12, rows: 12 },
      count: 4
    },
    {
      id: 'C',
      items: ['Подарок', 'Снежинка', 'Свеча', 'Игрушка'],
      size: { cols: 12, rows: 12 },
      count: 4
    }
  ],

  init() {
    document.addEventListener('DOMContentLoaded', () => this.setup());
  },

  setup() {
    // DOM refs
    this.gridEl = document.getElementById('game-grid');
    this.inventoryEl = document.getElementById('inventory');
    this.modal = document.getElementById('start-modal');
    this.openModalBtn = document.getElementById('open-modal');
    this.startBtn = document.getElementById('start-game-btn');
    this.closeModalBtn = document.getElementById('close-modal');
    this.playerSelect = document.getElementById('player-select');
    this.currentPlayerLabel = document.getElementById('current-player');
    this.hintBtn = document.getElementById('show-hint');
    this.toMenuBtn = document.getElementById('to-menu');
    this.puzzleInfo = document.getElementById('puzzle-info');

    // populate players from Storage (если есть Players.list, оно уже сохранено в локалке)
    const players = (typeof Players !== 'undefined' && Players.list) ? Players.list : (Storage.load('players') || []);
    this.players = players;
    this.players.forEach(p => {
      const opt = document.createElement('option'); opt.value = p.name; opt.textContent = p.name;
      this.playerSelect.appendChild(opt);
    });

    this.openModalBtn.addEventListener('click', () => this.showModal());
    this.closeModalBtn.addEventListener('click', () => this.hideModal());
    this.startBtn.addEventListener('click', () => this.start());
    this.hintBtn.addEventListener('click', () => this.showHint());
    this.toMenuBtn.addEventListener('click', () => location.href = '../index.html');

    // hint state
    this.hintLevel = 0;
  },

  showModal() {
    this.modal.style.display = 'flex';
  },
  hideModal() {
    this.modal.style.display = 'none';
  },

  start() {
    // выбрать игрока
    const player = this.playerSelect.value || (this.players[0] && this.players[0].name) || 'Игрок';
    this.currentPlayer = player;
    this.currentPlayerLabel.textContent = player;
    this.hideModal();

    // рандомный выбор варианта
    this.variant = this.variants[Math.floor(Math.random() * this.variants.length)];
    // build grid
    this.setupGrid();
    // place items randomly on grid
    this.placeItemsRandom();
    // init inventory
    this.createInventorySlots(this.variant.count);
    // reset puzzle state
    this.collected = [];
    this.puzzleActive = false;
    this.hintLevel = 0;
    this.puzzleInfo.textContent = 'Соберите все предметы на карте.';
  },

  setupGrid() {
    // очистка
    this.gridEl.innerHTML = '';
    const cols = this.variant.size.cols;
    const rows = this.variant.size.rows;
    this.grid = [];
    this.gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    // создать ячейки
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.addEventListener('click', () => this.onCellClick(cell));
        this.gridEl.appendChild(cell);
        this.grid.push(cell);
      }
    }
    // начальная позиция игрока (визуально пометим)
    const startIndex = Math.floor(Math.random() * this.grid.length);
    this.playerPos = { index: startIndex };
    this.grid[startIndex].textContent = '🎯';
    // keyboard movement (скользим по льду: при нажатии движение на 2 клетки в направлении пока не граница)
    this.gridEl.focus();
    this.keyHandler = (e) => {
      if (this.puzzleActive) return;
      const dir = { ArrowUp: -this.variant.size.cols, ArrowDown: this.variant.size.cols, ArrowLeft: -1, ArrowRight: 1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      this.slideMove(dir);
    };
    document.addEventListener('keydown', this.keyHandler);
  },

  slideMove(offset) {
    // убираем маркер игрока
    if (this.grid[this.playerPos.index]) this.grid[this.playerPos.index].textContent = '';
    // скользим: перемещаемся на две клетки или до границы
    let next = this.playerPos.index + offset;
    // если смещение по горизонтали и перешли на новый ряд — остановка
    const cols = this.variant.size.cols;
    if (Math.abs(offset) === 1) {
      // move 2 steps horizontally if possible
      const target = this.playerPos.index + offset * 2;
      if (target >= 0 && target < this.grid.length && Math.floor(target / cols) === Math.floor(this.playerPos.index / cols)) next = target;
      else if (this.playerPos.index + offset >= 0 && Math.floor((this.playerPos.index + offset) / cols) === Math.floor(this.playerPos.index / cols)) next = this.playerPos.index + offset;
    } else {
      // vertical: try two cells
      const target = this.playerPos.index + offset * 2;
      if (target >= 0 && target < this.grid.length) next = target;
    }
    // установить позицию
    this.playerPos.index = next;
    // если на ячейке есть предмет (скрытый), его можно открыть по клику, но мы также показываем маркер
    const targetCell = this.grid[this.playerPos.index];
    targetCell.textContent = '🎯';
    // небольшая подсказка при скольжении: если под ногами предмет — пометь
    if (targetCell.dataset.item && !targetCell.dataset.found) {
      targetCell.style.boxShadow = '0 0 8px 2px rgba(255,215,0,0.5)';
      setTimeout(() => targetCell.style.boxShadow = '', 800);
    }
  },

  placeItemsRandom() {
    // choose distinct indices
    const availableIndices = [...Array(this.grid.length).keys()];
    // remove start pos so not overlap
    availableIndices.splice(this.playerPos.index, 1);
    // shuffle and pick
    for (let i = 0; i < this.variant.count; i++) {
      const idx = Math.floor(Math.random() * availableIndices.length);
      const cellIndex = availableIndices.splice(idx, 1)[0];
      const cell = this.grid[cellIndex];
      const itemName = this.variant.items[i];
      cell.dataset.item = itemName;
      // скрытость: не показываем содержимое до клика
    }
  },

  onCellClick(cell) {
    if (this.puzzleActive) return;
    const item = cell.dataset.item;
    if (!item) {
      // эффект попадания по снегу
      cell.classList.add('found');
      setTimeout(() => cell.classList.remove('found'), 300);
      return;
    }
    if (cell.dataset.found === '1') return;
    // открываем предмет
    cell.dataset.found = '1';
    cell.classList.add('found');
    const icon = this.getItemIcon(item);
    cell.innerHTML = `<div style="font-size:20px">${icon}</div>`;
    this.addToInventory(item, icon);
    // подсвечивать снятие
    setTimeout(() => cell.innerHTML = '', 800);
    // проверить завершение сбора
    if (this.collected.length === this.variant.count) {
      // запускаем пазл с расстановкой
      this.startPuzzle();
    }
  },

  getItemIcon(name) {
    // простые соответствия
    const map = {
      'Ёлка': '🎄', 'Шар': '🟠', 'Колокольчик': '🔔', 'Печенье': '🍪',
      'Сапог': '🥾', 'Мандарин': '🍊', 'Свитер': '🧶', 'Конфета': '🍬',
      'Подарок': '🎁', 'Снежинка': '❄️', 'Свеча': '🕯️', 'Игрушка': '🧸'
    };
    return map[name] || '❔';
  },

  createInventorySlots(n) {
    this.inventoryEl.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.index = i;
      slot.addEventListener('click', () => this.onInventoryClick(slot));
      this.inventoryEl.appendChild(slot);
    }
  },

  addToInventory(name, icon) {
    // найти первую пустую ячейку
    const slot = Array.from(this.inventoryEl.children).find(s => !s.dataset.item);
    if (!slot) return;
    slot.dataset.item = name;
    slot.innerHTML = `<div style="text-align:center;"><div style="font-size:28px">${icon}</div><div style="font-size:12px">${name}</div></div>`;
    this.collected.push(name);
    // сохранить прогресс игрока (локально)
    this.saveTempProgress();
  },

  onInventoryClick(slot) {
    // если пазл не активен — нет перестановок; как необычная механика: на этапе пазла клики меняют позиции
    if (!this.puzzleActive) {
      // подсказка пользователю
      this.puzzleInfo.textContent = 'Сначала соберите все предметы. После этого вы сможете переставлять их по слотам.';
      return;
    }
    // при активном пазле — кликом по двум слотам можно менять позиции (реализуем выбор-переключение)
    if (!this.selectedSlot) {
      this.selectedSlot = slot;
      slot.style.outline = '3px solid #ffdd75';
    } else if (this.selectedSlot === slot) {
      this.selectedSlot.style.outline = '';
      this.selectedSlot = null;
    } else {
      // swap data
      const a = this.selectedSlot, b = slot;
      const ai = a.dataset.item, bi = b.dataset.item;
      const ahtml = a.innerHTML, bhtml = b.innerHTML;
      a.dataset.item = bi; a.innerHTML = bhtml;
      b.dataset.item = ai; b.innerHTML = ahtml;
      a.style.outline = '';
      this.selectedSlot = null;
      // проверить порядок
      this.checkPuzzleSolution();
    }
  },

  startPuzzle() {
    this.puzzleActive = true;
    this.puzzleInfo.textContent = 'Пазл активирован: расставьте предметы в правильном порядке (нажмите на слот, затем на другой, чтобы поменять).';
    // для пазла нас интересует правильный порядок — variant.items (целевой порядок)
    // подсказка: показать первые буквы в подсказке уровня можно при использовании подсказки
  },

  checkPuzzleSolution() {
    const current = Array.from(this.inventoryEl.children).map(s => s.dataset.item || '');
    const expected = this.variant.items;
    const ok = expected.every((it, idx) => it === current[idx]);
    if (ok) {
      this.onComplete();
    } else {
      this.puzzleInfo.textContent = 'Порядок пока неверный. Продолжайте.';
    }
  },

  onComplete() {
    // создать код: первые буквы слов в нужном порядке
    const code = this.variant.items.map(w => w[0]).join('').toUpperCase();
    // сохранить код для разблокировки следующего уровня
    const levelId = 1; // текущий уровень
    const levelCodes = Storage.load('level_codes') || {};
    levelCodes[levelId] = code;
    Storage.save('level_codes', levelCodes);
    // также пометить unlocked_levels (следующий уровень разблокируется после ввода кода на главной)
    // показываем игроку код
    alert(`Поздравляем, ${this.currentPlayer}!\nВы собрали и расставили предметы.\nКод для разблокировки следующего уровня: ${code}\nЗапомните его и введите на главной странице.`);
    // пометить в unlocked_levels текущий уровень как пройденый
    const unlocked = Storage.load('unlocked_levels') || [];
    if (!unlocked.includes(levelId)) {
      unlocked.push(levelId);
      Storage.save('unlocked_levels', unlocked);
    }
    // сохранить очки игрока (небольшая логика)
    this.awardPoints(100);
    // перенаправить на главное меню
    location.href = '../index.html';
  },

  awardPoints(points) {
    // попытка записать в Players.local (если существет)
    try {
      if (typeof Players !== 'undefined' && Players.list) {
        const p = Players.list.find(x => x.name === this.currentPlayer);
        if (p) { p.score = (p.score || 0) + points; Storage.save('players', Players.list); }
      }
    } catch (e) { /* silent */ }
  },

  saveTempProgress() {
    // можно сохранять текущую коллекцию для восстановления при перезагрузке (необязательно)
    const key = `level1_progress_${this.currentPlayer || 'guest'}`;
    Storage.save(key, { collected: this.collected });
  },

  showHint() {
    // подсказки многослойные — чем больше нажали, тем конкретнее
    this.hintLevel = (this.hintLevel || 0) + 1;
    const lvl = Math.min(this.hintLevel, 3);
    let text = '';
    if (lvl === 1) text = 'Ищите предметы около заметных объектов на карте.';
    else if (lvl === 2) text = 'Предметы связаны с новогодней темой — елка, шар, колокольчик и т.д.';
    else text = `Если вы собрали все предметы — расставьте их по порядку: ${this.variant.items.join(' → ')}`;
    // показываем краткое сообщение
    this.puzzleInfo.textContent = `Подсказка (${lvl}/3): ${text}`;
  }
};

Level1.init();
