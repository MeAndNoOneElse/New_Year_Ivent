// Уровень 2: Биржевой магнат
const Level2 = {
  // Конфиг / состояние
  totalRounds: 5,
  scenariosPoolSize: 20,
  scenarioLength: 60, // точек графика
  state: null, // runtime state

  init() {
    // привязки UI
    this.cacheDOM();
    this.bindEvents();
    this.loadSavedSessionsList();
    this.prepareScenarios(); // сгенерировать 20 сценариев
    this.showStartModalIfNeeded();
    console.log('Level2 инициализирован');
  },

  cacheDOM() {
    this.startModal = document.getElementById('startModal');
    this.playersExistingEl = document.getElementById('players-existing');
    this.savedSessionsEl = document.getElementById('saved-sessions');
    this.btnStart = document.getElementById('btn-start-game');
    this.btnAddPlayer = document.getElementById('btn-add-player');
    this.newPlayerName = document.getElementById('new-player-name');
    this.btnCancelStart = document.getElementById('btn-cancel-start');
    this.btnSaveExit = document.getElementById('btn-save-exit');
    this.btnNewPool = document.getElementById('btn-new-pool');
    this.sessionList = document.getElementById('session-list');

    this.balancesEl = document.getElementById('balances');
    this.actionsWrapper = document.getElementById('actions-wrapper');
    this.scenarioTitle = document.getElementById('scenario-title');
    this.scenarioNews = document.getElementById('scenario-news');
    this.btnReveal = document.getElementById('btn-reveal');
    this.btnNext = document.getElementById('btn-next');
    this.roundInfo = document.getElementById('round-info');
    this.chartCanvas = document.getElementById('stockChart');
    this.finalSummary = document.getElementById('final-summary');
    this.summaryTable = document.getElementById('summary-table');
    this.noSummary = document.getElementById('no-summary');
    this.btnFinishSave = document.getElementById('btn-finish-save');
    this.btnBack = document.getElementById('btn-back');
  },

  bindEvents() {
    this.btnStart && this.btnStart.addEventListener('click', () => this.onStartClicked());
    this.btnAddPlayer && this.btnAddPlayer.addEventListener('click', () => this.onAddPlayer());
    this.btnCancelStart && this.btnCancelStart.addEventListener('click', () => this.hideStartModal());
    this.btnSaveExit && this.btnSaveExit.addEventListener('click', () => this.saveAndExit());
    this.btnNewPool && this.btnNewPool.addEventListener('click', () => this.showStartModal());
    this.btnReveal && this.btnReveal.addEventListener('click', () => this.onReveal());
    this.btnNext && this.btnNext.addEventListener('click', () => this.nextRound());
    this.btnFinishSave && this.btnFinishSave.addEventListener('click', () => this.finishAndSave());
    this.btnBack && this.btnBack.addEventListener('click', () => this.handleBack());
    // global click prevents accidental select etc.
  },

  prepareScenarios() {
    // Если определён внешний список LEVEL2_SCENARIOS и он не пуст — используем его.
    if (typeof LEVEL2_SCENARIOS !== 'undefined' && Array.isArray(LEVEL2_SCENARIOS) && LEVEL2_SCENARIOS.length > 0) {
      this.scenarios = LEVEL2_SCENARIOS.map((s, i) => {
        // извлекаем ключи из внешнего объекта; допускаем несколько вариантов названий полей
        const startPrice = +(s.startPrice ?? s.price ?? 100);
        const endPrice = +(s.endPrice ?? s.end_price ?? startPrice + ((Math.random() - 0.5) * 20));
        const startSeries = this.generateSeries(startPrice, 6, this.scenarioLength);
        const endSeries = this.generateSeries(endPrice, 6, this.scenarioLength);
        return {
          id: s.id || ('sc' + (i+1)),
          title: s.paper ? `${s.paper}` : (s.title || `Сценарий #${i+1}`),
          news: s.news || '',
          analysis: s.analysis || '',
          startSeries,
          endSeries,
          startPrice: startSeries[startSeries.length-1],
          endPrice: endSeries[endSeries.length-1],
          startImage: s.startImage || s.startImg || null,
          endImage: s.endImage || s.endImg || null,
          minPrice: (typeof s.minPrice === 'number') ? s.minPrice : Math.min(startPrice, endPrice) - 5,
          maxPrice: (typeof s.maxPrice === 'number') ? s.maxPrice : Math.max(startPrice, endPrice) + 5
        };
      });
      return;
    }

    // fallback: старая генерация случайных сценариев
    this.scenarios = [];
    for (let i = 0; i < this.scenariosPoolSize; i++) {
      const startBase = 50 + Math.round(Math.random() * 100);
      const delta = (Math.random() - 0.5) * 40; // изменения
      const endBase = Math.max(1, Math.round(startBase + delta));
      const startSeries = this.generateSeries(startBase, 6, this.scenarioLength);
      const endSeries = this.generateSeries(endBase, 6, this.scenarioLength);
      this.scenarios.push({
        id: 'sc' + (i+1),
        title: `Сценарий #${i+1}`,
        news: ['Рынок волатилен','Позитивная новость','Негативный отчет','Глобальные события'][Math.floor(Math.random()*4)],
        startSeries, endSeries,
        startPrice: startSeries[startSeries.length-1],
        endPrice: endSeries[endSeries.length-1]
      });
    }
  },

  generateSeries(base, vol, len) {
    // простая генерация серий: шум вокруг base
    const arr = [];
    let val = base;
    for (let i=0;i<len;i++){
      val = Math.max(1, val + (Math.random()-0.5) * vol);
      arr.push(+val.toFixed(2));
    }
    return arr;
  },

  showStartModalIfNeeded() {
    // если есть сохранённая сессия — показать опцию продолжить, иначе показать modal
    const last = Storage.load('level2_last_session');
    this.renderPlayersList();
    this.loadSavedSessionsList();
    if (last) {
      this.showStartModal(); // предложим продолжить внутри modal
    } else {
      this.showStartModal();
    }
  },

  renderPlayersList() {
    const all = Players.list || [];
    this.playersExistingEl.innerHTML = '';
    if (!all.length) {
      this.playersExistingEl.textContent = 'Нет сохранённых игроков. Добавьте имя.';
      return;
    }
    all.forEach(p => {
      const id = 'pl_' + p.name.replace(/\s+/g,'_');
      const label = document.createElement('label');
      label.innerHTML = `<input type="checkbox" data-name="${p.name}" /> ${p.name}`;
      this.playersExistingEl.appendChild(label);
    });
  },

  loadSavedSessionsList() {
    const sessions = Storage.load('level2_sessions') || [];
    this.sessionList.innerHTML = '';
    this.savedSessionsEl.innerHTML = '';
    sessions.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'btn secondary';
      btn.textContent = `Продолжить ${s.poolName}`;
      btn.addEventListener('click', () => this.resumeSession(s.id));
      this.sessionList.appendChild(btn);
      // также в modal
      const btn2 = btn.cloneNode(true);
      btn2.addEventListener('click', () => this.resumeSession(s.id));
      this.savedSessionsEl.appendChild(btn2);
    });
  },

  showStartModal() {
    this.startModal.classList.remove('hidden');
    this.renderPlayersList();
    this.loadSavedSessionsList();
  },

  hideStartModal() {
    this.startModal.classList.add('hidden');
  },

  onAddPlayer() {
    const name = (this.newPlayerName.value || '').trim();
    if (!name) return;
    Players.add(name);
    this.newPlayerName.value = '';
    this.renderPlayersList();
  },

  onStartClicked() {
    // собрать выбранных игроков
    const checkboxes = Array.from(this.playersExistingEl.querySelectorAll('input[type=checkbox]:checked'));
    if (!checkboxes.length) {
      alert('Выберите хотя бы одного игрока.');
      return;
    }
    const players = checkboxes.map(cb => ({ name: cb.dataset.name || cb.getAttribute('data-name'), balance: 100000 }));
    // создать пул
    const pool = {
      id: 'pool_' + Date.now(),
      poolName: 'Пул ' + new Date().toLocaleString(),
      players,
      currentRound: 0,
      usedScenarios: [],
      history: []
    };
    this.state = pool;
    // сохранить reference как последний
    Storage.save('level2_last_session', pool.id);
    let sessions = Storage.load('level2_sessions') || [];
    sessions = sessions.filter(s => s.id !== pool.id);
    sessions.unshift({ id: pool.id, poolName: pool.poolName, ts: Date.now() });
    Storage.save('level2_sessions', sessions);
    Storage.save('level2_session_' + pool.id, pool);
    this.hideStartModal();
    this.startGame();
  },

  resumeSession(id) {
    const saved = Storage.load('level2_session_' + id);
    if (!saved) {
      alert('Сессия не найдена');
      this.loadSavedSessionsList();
      return;
    }
    this.state = saved;
    this.hideStartModal();
    this.startGame();
  },

  startGame() {
    // подготовить UI, balances, pick scenarios if new
    if (!this.state) return;
    if (!this.state.pickedScenarios) {
      this.state.pickedScenarios = this.pickScenarios(this.totalRounds);
    }
    this.renderBalances();
    this.currentScenarioIndex = this.state.currentRound || 0;
    this.updateRoundInfo();
    this.createChart();
    this.renderScenario();
    this.hideSummary();
  },

  pickScenarios(n) {
    // выбираем n уникальных id
    const ids = Array.from({length:this.scenarios.length},(_,i)=>i);
    const chosen = [];
    while (chosen.length < n && ids.length) {
      const idx = Math.floor(Math.random() * ids.length);
      chosen.push(this.scenarios.splice(idx,1)[0]); // remove from pool to avoid repeat across games
      ids.splice(idx,1);
    }
    // если pool меньше n, просто возвращаем what we have
    return chosen;
  },

  renderBalances() {
    this.balancesEl.innerHTML = '';
    this.state.players.forEach(p => {
      const el = document.createElement('div');
      el.className = 'balance-card';
      el.dataset.name = p.name;
      el.innerHTML = `<div><strong>${p.name}</strong></div><div class="small">Баланс: <span data-balance>${p.balance.toFixed(2)}</span> ₽</div>`;
      this.balancesEl.appendChild(el);
    });
  },

  updateBalancesUI() {
    Array.from(this.balancesEl.children).forEach(card => {
      const name = card.dataset.name;
      const player = this.state.players.find(p => p.name === name);
      if (player) {
        const span = card.querySelector('[data-balance]');
        span.textContent = player.balance.toFixed(2);
      }
    });
  },

  createChart() {
    // инициализация Chart.js
    const ctx = this.chartCanvas.getContext('2d');
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({length:this.scenarioLength},(_,i)=>i+1),
        datasets: [{
          label: 'Цена',
          data: Array(this.scenarioLength).fill(null),
          borderColor: '#0078d4',
          tension: 0.2,
          borderWidth: 2,
          pointRadius: 0,
          fill:false
        }]
      },
      options: {
        responsive:true,
        maintainAspectRatio:false,
        animation:false,
        scales:{ x:{ display:false } }
      }
    });
  },

  renderScenario() {
    // отрисовать текущий сценарий (start)
    const idx = this.currentScenarioIndex;
    if (idx >= this.state.pickedScenarios.length) {
      this.showFinalSummary();
      return;
    }
    const sc = this.state.pickedScenarios[idx];
    this.currentScenario = sc;
    this.scenarioTitle.textContent = `${sc.title} (${idx+1}/${this.totalRounds})`;
    this.scenarioNews.textContent = `Новость: ${sc.news}`;
    // показать стартовую серию на графике
    this.chart.data.datasets[0].data = sc.startSeries.slice();
    this.chart.update();
    // render action forms for each player
    this.renderActionForms();
    this.btnReveal.disabled = false;
    this.btnNext.disabled = true;
    this.roundInfo.textContent = `Раунд ${idx+1} / ${this.totalRounds}`;
    // save progress
    this.saveState();
  },

  renderActionForms() {
    this.actionsWrapper.innerHTML = '';
    this.state.players.forEach((p,pi) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'player-action';
      wrapper.innerHTML = `
        <div style="flex:1;">
          <div><strong>${p.name}</strong></div>
          <div class="small">Баланс: ${p.balance.toFixed(0)} ₽</div>
        </div>
        <div style="min-width:260px; display:flex; gap:6px; align-items:center;">
          <select data-player="${pi}" class="action-type">
            <option value="hold">Держать</option>
            <option value="market_buy">Рыночная — купить</option>
            <option value="market_sell">Рыночная — продать (шорт)</option>
            <option value="limit_buy">Лимит — купить</option>
            <option value="limit_sell">Лимит — продать</option>
          </select>
          <input type="number" min="1" value="1" style="width:70px;" data-player-qty="${pi}" />
          <input type="number" placeholder="Цена (для лимит)" style="width:90px;" data-player-price="${pi}" />
        </div>
      `;
      this.actionsWrapper.appendChild(wrapper);
      // подсказка: установить разумный макс по qty исходя из баланса и текущей цене
      const qtyInput = wrapper.querySelector(`[data-player-qty="${pi}"]`);
      const priceInput = wrapper.querySelector(`[data-player-price="${pi}"]`);
      qtyInput.addEventListener('input', () => {});
    });
  },

  onReveal() {
    // собрать действия
    const forms = Array.from(this.actionsWrapper.querySelectorAll('.player-action'));
    const actions = [];
    const startPrice = this.currentScenario.startPrice;
    for (let i=0;i<forms.length;i++){
      const select = forms[i].querySelector('.action-type');
      const qty = Math.max(0, Math.floor(+forms[i].querySelector(`[data-player-qty="${i}"]`).value || 0));
      const price = +forms[i].querySelector(`[data-player-price="${i}"]`).value || null;
      const type = select.value;
      // проверка на доступность покупки
      const player = this.state.players[i];
      if ((type === 'market_buy') && (player.balance < startPrice * qty)) {
        alert(`${player.name}: недостаточно средств для покупки по рынку (нужно ${Math.round(startPrice*qty)} ₽)`);
        return;
      }
      if ((type === 'limit_buy') && (price && player.balance < price * qty)) {
        alert(`${player.name}: недостаточно средств для лимитной покупки по указанной цене`);
        return;
      }
      actions.push({ playerIndex: i, type, qty, price });
    }
    // анимировать переход графика от startSeries -> endSeries
    this.btnReveal.disabled = true;
    this.animateChart(this.currentScenario.startSeries, this.currentScenario.endSeries, 1200).then(() => {
      // после анимации вычисляем результаты
      const results = this.evaluateActions(actions, this.currentScenario);
      // применить результаты к балансу
      results.forEach(r => {
        if (r.executed) {
          this.state.players[r.playerIndex].balance += r.profit;
        }
      });
      // сохранить историю
      this.state.history = this.state.history || [];
      this.state.history.push({ scenarioId: this.currentScenario.id, results });
      this.updateBalancesUI();
      this.renderRoundResults(results);
      this.btnNext.disabled = false;
      this.saveState();
    });
  },

  animateChart(fromSeries, toSeries, duration) {
    // простая интерполяция с шагами
    return new Promise(resolve => {
      const steps = 60;
      let step = 0;
      const s1 = fromSeries.slice();
      const s2 = toSeries.slice();
      const frame = () => {
        step++;
        const t = step / steps;
        const data = s1.map((v,i) => +(v + (s2[i] - v) * t).toFixed(2));
        this.chart.data.datasets[0].data = data;
        this.chart.update('none');
        if (step >= steps) {
          resolve();
        } else {
          requestAnimationFrame(frame);
        }
      };
      frame();
    });
  },

  evaluateActions(actions, scenario) {
    const res = [];
    // линейный проход по точкам для проверки исполнения лимитных заявок
    const path = this.interpolatePath(scenario.startSeries, scenario.endSeries);
    actions.forEach(a => {
      const player = this.state.players[a.playerIndex];
      let executed = false;
      let execPrice = null;
      let profit = 0;
      const start = scenario.startPrice;
      const end = scenario.endPrice;
      if (a.type === 'hold') {
        executed = false;
        profit = 0;
      } else if (a.type === 'market_buy') {
        executed = true;
        execPrice = start;
        profit = (end - execPrice) * a.qty;
      } else if (a.type === 'market_sell') {
        // шорт
        executed = true;
        execPrice = start;
        profit = (execPrice - end) * a.qty;
      } else if (a.type === 'limit_buy') {
        // выполнится, если path в какой-то точке <= price
        const limit = +a.price;
        const hit = path.some(p => p <= limit);
        if (hit) {
          executed = true;
          execPrice = limit;
          profit = (end - execPrice) * a.qty;
        } else {
          executed = false;
          profit = 0;
        }
      } else if (a.type === 'limit_sell') {
        const limit = +a.price;
        const hit = path.some(p => p >= limit);
        if (hit) {
          executed = true;
          execPrice = limit;
          profit = (execPrice - end) * a.qty;
        } else {
          executed = false;
          profit = 0;
        }
      }
      // округления
      profit = +profit.toFixed(2);
      res.push({ playerIndex: a.playerIndex, executed, execPrice, profit, qty: a.qty, action: a.type });
    });
    return res;
  },

  interpolatePath(s1, s2) {
    // формируем path линейной интерполяцией между точками s1->s2
    const len = Math.max(s1.length, s2.length);
    const path = [];
    for (let i=0;i<len;i++){
      const a = s1[Math.min(i, s1.length-1)];
      const b = s2[Math.min(i, s2.length-1)];
      // добавляем промежуточные подпункты
      for (let k=0;k<6;k++){
        const t = k/6;
        path.push(a + (b-a)*t);
      }
    }
    return path;
  },

  renderRoundResults(results) {
    // короткий вывод: кто сколько заработал/не исполнилось
    const out = results.map(r => {
      const name = this.state.players[r.playerIndex].name;
      if (!r.executed) return `${name}: заявка не исполнилась`;
      return `${name}: ${r.profit >=0 ? '+' : ''}${r.profit.toFixed(2)} ₽ (qty ${r.qty})`;
    }).join('\n');
    alert('Результаты:\n' + out);
  },

  nextRound() {
    this.state.currentRound = (this.state.currentRound || 0) + 1;
    this.currentScenarioIndex = this.state.currentRound;
    if (this.currentScenarioIndex >= this.totalRounds) {
      this.showFinalSummary();
      this.saveState();
      return;
    }
    this.saveState();
    this.renderScenario();
  },

  showFinalSummary() {
    this.finalSummary.classList.remove('hidden');
    this.noSummary.classList.add('hidden');
    // таблица результатов: рассчитать прибыль и % прибыли от 100k
    this.summaryTable.innerHTML = '';
    const header = `<tr><th>Игрок</th><th>Сумма, ₽</th><th>Прибыль, ₽</th><th>% прибыли</th><th>Очки</th></tr>`;
    this.summaryTable.insertAdjacentHTML('beforeend', header);
    this.state.players.forEach(p => {
      const profit = +(p.balance - 100000).toFixed(2);
      const pct = +(profit / 100000 * 100).toFixed(2);
      const points = Math.round(500 + (pct * 20));
      // сохранить в Players.list score
      const pl = Players.list.find(x => x.name === p.name);
      if (pl) pl.score = (pl.score || 0) + points;
      this.summaryTable.insertAdjacentHTML('beforeend',
        `<tr><td>${p.name}</td><td>${p.balance.toFixed(2)}</td><td>${profit}</td><td>${pct}%</td><td>${points}</td></tr>`);
    });
    Leaderboard.init();
    this.saveState(true); // финал и сохранение
  },

  finishAndSave() {
    // сохранить финальную сессию отдельно и удалить last_session pointer
    const sessions = Storage.load('level2_sessions') || [];
    // оставить запись, но удалить last pointer
    Storage.save('level2_last_session', null);
    Storage.save('level2_session_' + this.state.id, this.state);
    // обновить Players storage
    Storage.save('players', Players.list);
    alert('Результаты сохранены. Вернитесь в главное меню.');
    // можно перейти на главную
    window.location.href = '../index.html';
  },

  saveAndExit() {
    // сохраняем состояние текущей сессии и помечаем last
    if (!this.state || !this.state.id) return;
    Storage.save('level2_session_' + this.state.id, this.state);
    Storage.save('level2_last_session', this.state.id);
    const sessions = Storage.load('level2_sessions') || [];
    if (!sessions.find(s=>s.id===this.state.id)) {
      sessions.unshift({ id: this.state.id, poolName: this.state.poolName, ts: Date.now() });
      Storage.save('level2_sessions', sessions);
    }
    alert('Сессия сохранена. Возврат в главное меню.');
    window.location.href = '../index.html';
  },

  saveState(final=false) {
    if (!this.state || !this.state.id) return;
    Storage.save('level2_session_' + this.state.id, this.state);
    if (final) {
      // удалить указатель последней активной игры
      Storage.save('level2_last_session', null);
    } else {
      Storage.save('level2_last_session', this.state.id);
    }
    this.loadSavedSessionsList();
  },

  hideSummary() {
    this.finalSummary.classList.add('hidden');
    this.noSummary.classList.remove('hidden');
  },

  handleBack() {
    // при нажатии назад — сохранить прогресс и перейти
    if (confirm('Выйти и сохранить прогресс?')) {
      this.saveAndExit();
    } else {
      // stay
    }
  }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // гарантируем что Players уже инициализирован
  if (typeof Players !== 'undefined') {
    if (!Players.list || !Players.list.length) Players.init();
  }
  Level2.init();
});
