const Level2 = {
  keyPrefix: 'level2_pool_',
  pool: null, // { id, players: [{name,balance}], pickedScenarios:[], currentIndex, history:[] }
  chart: null,
  totalRounds: 5,
  init() {
    // DOM refs
    this.startModal = document.getElementById('startModal');
    this.closeStartBtn = document.getElementById('close-start');
    this.playersExistingEl = document.getElementById('players-existing');
    this.btnAddPlayer = document.getElementById('btn-add-player');
    this.inputNewPlayer = document.getElementById('new-player-name');
    this.btnStart = document.getElementById('btn-start-game');
    this.btnCancelStart = document.getElementById('btn-cancel-start');
    this.savedSessionsEl = document.getElementById('saved-sessions');
    this.balancesEl = document.getElementById('balances');
    this.actionsWrapper = document.getElementById('actions-wrapper');
    this.scenarioTitle = document.getElementById('scenario-title');
    this.scenarioNews = document.getElementById('scenario-news');
    this.btnReveal = document.getElementById('btn-reveal');
    this.btnNext = document.getElementById('btn-next');
    this.btnSaveExit = document.getElementById('btn-save-exit');
    this.roundInfo = document.getElementById('round-info');
    this.summaryTable = document.getElementById('summary-table');
    this.finalSummary = document.getElementById('final-summary');
    this.noSummary = document.getElementById('no-summary');
    this.btnFinishSave = document.getElementById('btn-finish-save');
    this.btnNewPool = document.getElementById('btn-new-pool');
    this.sessionListEl = document.getElementById('session-list');

    // image element вместо Chart.js
    this.imageEl = document.getElementById('scenarioImage');

    // events
    if (this.btnAddPlayer) this.btnAddPlayer.addEventListener('click', () => this.handleAddPlayer());
    if (this.btnStart) this.btnStart.addEventListener('click', () => this.handleStart());
    if (this.btnCancelStart) this.btnCancelStart.addEventListener('click', () => this.handleCancelStart());
    if (this.btnReveal) this.btnReveal.addEventListener('click', () => this.handleReveal());
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.nextScenario());
    if (this.btnSaveExit) this.btnSaveExit.addEventListener('click', () => this.saveAndExit());
    if (this.btnFinishSave) this.btnFinishSave.addEventListener('click', () => this.finishAndSave());
    if (this.btnNewPool) this.btnNewPool.addEventListener('click', () => this.openNewPoolModal());

    // render existing players and sessions
    this.renderExistingPlayers();
    this.renderSavedSessions();
    // show modal on load
    this.showStartModalIfNeeded();
      if (this.closeStartBtn) {
          this.closeStartBtn.addEventListener('click', () => {
              // поведение зависит от режима: 'info' — просто закрыть модал, 'initial' — уйти на главную
              if (this.startModalMode === 'info') {
                  if (this.hideStart) this.hideStart();
              } else {
                  // initial или по умолчанию — вернуть на главную
                  if (this.hideStart) this.hideStart();
                  window.location.href = "../index.html";
              }
          });
      }
  },

  // --- UI helpers ---
  showStartModalIfNeeded() {
    // if there's a saved active pool, offer continue; otherwise open modal
    const lastPoolId = localStorage.getItem(this.keyPrefix + 'last');
    if (lastPoolId) {
      // show modal with continue option
      this.startModal.classList.remove('hidden');
    } else {
      this.startModal.classList.remove('hidden');
    }
  },

  renderExistingPlayers() {
    if (!this.playersExistingEl) return;
    this.playersExistingEl.innerHTML = '';
    Players.init(); // ensure loaded
    const list = Players.list || [];
    list.forEach(p => {
      const lbl = document.createElement('label');
      const chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.value = p.name;
      lbl.appendChild(chk);
      lbl.appendChild(document.createTextNode(' ' + p.name));
      this.playersExistingEl.appendChild(lbl);
    });
  },

  renderSavedSessions() {
    if (!this.savedSessionsEl) return;
    this.savedSessionsEl.innerHTML = '';
    // enumerate localStorage keys starting with prefix
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.keyPrefix)) {
        try {
          const pool = JSON.parse(localStorage.getItem(key));
          const btn = document.createElement('button');
          btn.className = 'btn secondary';
          btn.textContent = `Продолжить пул ${pool.id} (раунд ${pool.currentIndex+1 || 1})`;
          btn.addEventListener('click', () => this.loadPool(pool.id));
          this.savedSessionsEl.appendChild(btn);
        } catch (e) { /* ignore */ }
      }
    }
  },

  handleAddPlayer() {
    const name = (this.inputNewPlayer && this.inputNewPlayer.value || '').trim();
    if (!name) return;
    Players.add(name);
    this.inputNewPlayer.value = '';
    this.renderExistingPlayers();
  },

  handleCancelStart() {
    // when start modal is initial (first open) Cancel should go to main; here modal always closable
    this.startModal.classList.add('hidden');
    // if no active pool present, go back
    const lastPoolId = localStorage.getItem(this.keyPrefix + 'last');
    if (!lastPoolId) {
      window.location.href = '../index.html';
    }
  },

  handleStart() {
    // collect selected players
    const checks = Array.from(this.playersExistingEl.querySelectorAll('input[type=checkbox]:checked'));
    const names = checks.map(c => c.value).filter(Boolean);
    if (names.length === 0) {
      alert('Выберите хотя бы одного игрока');
      return;
    }
    // create pool object
    const poolId = 'pool_' + Date.now();
    const players = names.map(n => ({ name: n, balance: 100000, initialBalance: 100000 }));
    this.pool = {
      id: poolId,
      players,
      pickedScenarios: [],
      currentIndex: 0,
      history: []
    };
    // pick scenarios (5) from LEVEL2_SCENARIOS
    this.pool.pickedScenarios = this.pickScenarios(this.totalRounds);
    // save
    localStorage.setItem(this.keyPrefix + poolId, JSON.stringify(this.pool));
    localStorage.setItem(this.keyPrefix + 'last', poolId);
    this.startModal.classList.add('hidden');
    this.renderBalances();
    this.renderScenario();
    this.renderSavedSessions();
  },

  loadPool(poolId) {
    const raw = localStorage.getItem(this.keyPrefix + poolId);
    if (!raw) { alert('Сессия не найдена'); return; }
    this.pool = JSON.parse(raw);
    // ensure balances exist
    this.pool.players.forEach(p => { if (typeof p.balance !== 'number') p.balance = p.initialBalance || 100000; });
    this.startModal.classList.add('hidden');
    this.renderBalances();
    this.renderScenario();
    this.renderSavedSessions();
  },

  pickScenarios(n) {
    const pool = (typeof LEVEL2_SCENARIOS !== 'undefined' ? LEVEL2_SCENARIOS.slice() : []);
    // shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const chosen = pool.slice(0, n).map(s => {
      // ensure series fields: if startSeries/endSeries not present, create simple arrays from startPrice/endPrice
      const startSeries = s.startSeries || this.generateSeries(s.startPrice || s.price || 100, 30, 30);
      const endSeries = s.endSeries || this.generateSeries(s.endPrice || s.end_price || (startSeries[startSeries.length-1] * (1 + ((Math.random()-0.5)/5))), 30, 30);
      return Object.assign({}, s, { startSeries, endSeries });
    });
    return chosen;
  },

  // simple price series generator (not used if provided)
  generateSeries(base, volatility = 6, len = 30) {
    const arr = [];
    let p = base;
    for (let i = 0; i < len; i++) {
      p = Math.max(1, p + (Math.random() - 0.5) * volatility);
      arr.push(Number(p.toFixed(2)));
    }
    return arr;
  },

  renderBalances() {
    if (!this.balancesEl || !this.pool) return;
    this.balancesEl.innerHTML = '';
    this.pool.players.forEach(p => {
      const div = document.createElement('div');
      div.className = 'balance-card';
      div.innerHTML = `<strong>${p.name}</strong><div class="small">Баланс: <span data-name="${p.name}" class="bal-val">${Number(p.balance).toLocaleString('ru-RU')} ₽</span></div>`;
      this.balancesEl.appendChild(div);
    });
  },

  renderScenario() {
    if (!this.pool) return;
    const idx = this.pool.currentIndex || 0;
    if (idx >= this.pool.pickedScenarios.length) {
      this.showFinal();
      return;
    }
    const sc = this.pool.pickedScenarios[idx];
    this.currentScenario = sc;
    this.scenarioTitle.textContent = `${sc.paper || sc.title || 'Сценарий'} — ${idx+1}/${this.totalRounds}`;
    // show news/analysis/startPosition using updateRoundInfo
    this.updateRoundInfo();
    // draw start image instead of chart
    if (this.imageEl) {
      this.imageEl.classList.remove('fading');
      this.imageEl.src = sc.startImage || '';
      this.imageEl.alt = `${sc.paper || sc.title} — старт`;
    }
    // render action forms for each player
    this.renderActionForms();
    this.btnReveal.disabled = false;
    this.btnNext.disabled = true;
  },

  updateRoundInfo() {
    if (!this.currentScenario) return;
    const sc = this.currentScenario;
    const idx = (this.pool && this.pool.currentIndex) ? this.pool.currentIndex : 0;
    this.roundInfo.textContent = `Раунд ${idx+1} / ${this.totalRounds}`;
    // compose info
    const parts = [];
    if (sc.news) parts.push(`Новость: ${sc.news}`);
    if (sc.analysis) parts.push(`Анализ: ${sc.analysis}`);
    if (sc.startPosition) {
      const sp = sc.startPosition;
      parts.push(`Начальная позиция: ${sp.count} шт @ ${Number(sp.price).toLocaleString('ru-RU')} ₽`);
    } else if (typeof sc.startPrice === 'number') {
      parts.push(`Стартовая цена: ${Number(sc.startPrice).toFixed(2)} ₽`);
    }
    this.scenarioNews.textContent = parts.join(' — ');
  },

  renderActionForms() {
    if (!this.actionsWrapper || !this.pool) return;
    this.actionsWrapper.innerHTML = '';
    this.pool.players.forEach((p, pi) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'player-action';
      // max qty estimate (for buy)
      const price = this.currentScenario.startPrice || this.currentScenario.startSeries.slice(-1)[0];
      const maxQty = Math.floor((p.balance > 0 ? p.balance : 0) / (price || 1));
      wrapper.innerHTML = `
        <div style="flex:1">
          <strong>${p.name}</strong>
          <div class="small">Баланс: ${Number(p.balance).toLocaleString('ru-RU')} ₽</div>
        </div>
        <div style="min-width:300px; display:flex; gap:8px; align-items:center;">
          <select data-player="${p.name}" class="action-type">
            <option value="hold">Держать</option>
            <option value="market_buy">Рыночная — Купить</option>
            <option value="market_sell">Рыночная — Продать</option>
            <option value="limit_buy">Лимит — Купить</option>
            <option value="limit_sell">Лимит — Продать</option>
          </select>
          <input type="number" data-player="${p.name}" class="action-qty" min="0" value="${Math.max(0, Math.min(1, maxQty))}" placeholder="шт" style="width:80px"/>
          <input type="number" data-player="${p.name}" class="action-price hidden" placeholder="цена лимита" style="width:100px"/>
        </div>
      `;
      this.actionsWrapper.appendChild(wrapper);
    });
    // attach listeners for showing price input on limit
    this.actionsWrapper.querySelectorAll('.action-type').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const player = sel.dataset.player;
        const parent = sel.closest('.player-action');
        const priceInp = parent.querySelector('.action-price');
        if (sel.value === 'limit_buy' || sel.value === 'limit_sell') priceInp.classList.remove('hidden'); else priceInp.classList.add('hidden');
      });
    });
  },

  collectActions() {
    // returns map name -> {type,qty,price}
    const actions = {};
    if (!this.pool) return actions;
    const nodes = Array.from(this.actionsWrapper.querySelectorAll('.player-action'));
    nodes.forEach(node => {
      const name = node.querySelector('strong').textContent;
      const sel = node.querySelector('.action-type');
      const qtyInp = node.querySelector('.action-qty');
      const priceInp = node.querySelector('.action-price');
      const type = sel ? sel.value : 'hold';
      const qty = qtyInp ? Math.max(0, Math.floor(Number(qtyInp.value)||0)) : 0;
      const price = priceInp && priceInp.value ? Number(priceInp.value) : null;
      actions[name] = { type, qty, price };
    });
    return actions;
  },

  handleReveal() {
    if (!this.pool || !this.currentScenario) return;
    this.btnReveal.disabled = true;
    const sc = this.currentScenario;
    // вместо анимации Chart.js — плавно сменим картинку с startImage на endImage
    if (!this.imageEl) {
      // fallback: сразу считать
      const actions = this.collectActions();
      this.calculatePayouts(actions, sc);
      this.btnNext.disabled = false;
      return;
    }
    // плавное исчезновение
    this.imageEl.classList.add('fading');
    const transitionMs = 650;
    setTimeout(() => {
      // смена на конечную картинку
      this.imageEl.src = sc.endImage || sc.startImage || '';
      this.imageEl.alt = `${sc.paper || sc.title} — финал`;
      // показать (fade-in)
      this.imageEl.classList.remove('fading');
      // после окончания перехода запускаем расчет выплат
      setTimeout(() => {
        const actions = this.collectActions();
        this.calculatePayouts(actions, sc);
        this.btnNext.disabled = false;
      }, transitionMs + 50);
    }, transitionMs);
  },

  calculatePayouts(actions, sc) {
    // sc must have minPrice/maxPrice/endPrice/startPrice
    const startPrice = sc.startPrice || sc.startSeries.slice(-1)[0];
    const endPrice = sc.endPrice || sc.endSeries.slice(-1)[0];
    const minPrice = (typeof sc.minPrice === 'number') ? sc.minPrice : Math.min(...sc.endSeries, ...sc.startSeries);
    const maxPrice = (typeof sc.maxPrice === 'number') ? sc.maxPrice : Math.max(...sc.endSeries, ...sc.startSeries);
    // record per player result
    const roundResult = [];
    this.pool.players.forEach(p => {
      const action = actions[p.name] || { type: 'hold', qty: 0 };
      let note = '';
      let pnl = 0;
      if (action.type === 'hold' || action.qty === 0) {
        note = 'Держал';
        pnl = 0;
      } else if (action.type === 'market_buy') {
        // buy at market open (startPrice), close at endPrice
        pnl = (endPrice - startPrice) * action.qty;
        note = `Маркет покупка ${action.qty} шт`;
      } else if (action.type === 'market_sell') {
        // short: sell at start, buy back at end
        pnl = (startPrice - endPrice) * action.qty;
        note = `Маркет продажа (шорт) ${action.qty} шт`;
      } else if (action.type === 'limit_buy') {
        // buy if price touched <= limit price somewhere between min/max
        const limit = action.price;
        if (limit === null) { note = 'Лимит без цены'; pnl = 0; }
        else {
          // for buy, execution if minPrice <= limit
          if (minPrice <= limit) {
            // executed at limit price (assume execution at limit)
            pnl = (endPrice - limit) * action.qty;
            note = `Лимит покупка исполнена @${limit}`;
          } else {
            note = 'Заявка не исполнилась';
            pnl = 0;
          }
        }
      } else if (action.type === 'limit_sell') {
        const limit = action.price;
        if (limit === null) { note = 'Лимит без цены'; pnl = 0; }
        else {
          // for sell, execution if maxPrice >= limit
          if (maxPrice >= limit) {
            // executed at limit price (assume execution at limit)
            pnl = (limit - endPrice) * action.qty;
            note = `Лимит продажа исполнена @${limit}`;
          } else {
            note = 'Заявка не исполнилась';
            pnl = 0;
          }
        }
      }
      // update balance
      p.balance = Number((p.balance + pnl).toFixed(2));
      roundResult.push({ name: p.name, pnl, note, balance: p.balance });
    });

    // save to history
    this.pool.history = this.pool.history || [];
    this.pool.history.push({ scenarioId: sc.id, result: roundResult });
    // persist pool
    localStorage.setItem(this.keyPrefix + this.pool.id, JSON.stringify(this.pool));
    // update UI: balances and small table of results
    this.renderBalances();
    this.showRoundResults(roundResult);
  },

  showRoundResults(roundResult) {
    // simple temporary popup: append below actions
    const resBox = document.createElement('div');
    resBox.className = 'card';
    resBox.innerHTML = '<strong>Результаты раунда:</strong><div style="margin-top:8px;"></div>';
    const body = resBox.querySelector('div');
    roundResult.forEach(r => {
      const row = document.createElement('div');
      row.textContent = `${r.name}: ${r.pnl >= 0 ? '+' : ''}${r.pnl.toFixed(2)} ₽ — ${r.note} — Баланс: ${Number(r.balance).toLocaleString('ru-RU')} ₽`;
      body.appendChild(row);
    });
    // insert after actionsWrapper
    this.actionsWrapper.parentNode.insertBefore(resBox, this.actionsWrapper.nextSibling);
    // auto remove after 6s
    setTimeout(() => { if (resBox.parentNode) resBox.parentNode.removeChild(resBox); }, 6000);
  },

  nextScenario() {
    // advance index
    if (!this.pool) return;
    this.pool.currentIndex = (this.pool.currentIndex || 0) + 1;
    // if finished
    if (this.pool.currentIndex >= this.pool.pickedScenarios.length) {
      this.showFinal();
      localStorage.setItem(this.keyPrefix + this.pool.id, JSON.stringify(this.pool));
      return;
    }
    // save and render next
    localStorage.setItem(this.keyPrefix + this.pool.id, JSON.stringify(this.pool));
    // clear any previous action-result cards
    const nextCards = Array.from(document.querySelectorAll('.card'));
    // avoid removing main cards, just re-render
    this.renderScenario();
    this.btnNext.disabled = true;
  },

  showFinal() {
    // build summary table
    this.finalSummary.classList.remove('hidden');
    this.noSummary.classList.add('hidden');
    this.summaryTable.innerHTML = '<tr><th>Игрок</th><th>Итоговый баланс</th><th>Прибыль</th><th>Очки</th></tr>';
    this.pool.players.forEach(p => {
      const profit = Number((p.balance - (p.initialBalance || 100000)).toFixed(2));
      const profitPercent = ((profit) / (p.initialBalance || 100000)) * 100;
      const points = Math.round(500 + profitPercent * 20);
      // save to Players score
      const pl = Players.list.find(x => x.name === p.name);
      if (pl) pl.score = (pl.score || 0) + points;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.name}</td><td>${Number(p.balance).toLocaleString('ru-RU')} ₽</td><td>${profit >=0 ? '+' : ''}${profit.toFixed(2)} ₽ (${profitPercent.toFixed(2)}%)</td><td>${points}</td>`;
      this.summaryTable.appendChild(tr);
    });
    // persist players
    Storage.save('players', Players.list);
    // persist pool final state and remove "last"
    localStorage.setItem(this.keyPrefix + this.pool.id, JSON.stringify(this.pool));
    localStorage.removeItem(this.keyPrefix + 'last');
  },

  finishAndSave() {
    // final save and redirect to menu
    localStorage.setItem(this.keyPrefix + this.pool.id, JSON.stringify(this.pool));
    localStorage.removeItem(this.keyPrefix + 'last');
    alert('Результат сохранён. Возврат в меню.');
    window.location.href = '../index.html';
  },

  saveAndExit() {
    if (!this.pool) return;
    localStorage.setItem(this.keyPrefix + this.pool.id, JSON.stringify(this.pool));
    localStorage.setItem(this.keyPrefix + 'last', this.pool.id);
    alert('Пул сохранён. Выход в меню.');
    window.location.href = '../index.html';
  },

  openNewPoolModal() {
    // clear players selection and show modal
    this.startModal.classList.remove('hidden');
  },

  handleCancelStart() {
    this.startModal.classList.add('hidden');
  }
};

document.addEventListener('DOMContentLoaded', () => Level2.init());
