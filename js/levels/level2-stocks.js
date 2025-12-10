// ============================================================================
// УРОВЕНЬ 2: "БИРЖЕВОЙ МАГНАТ" — ПОЛНАЯ РЕАЛИЗАЦИЯ V3
// ============================================================================
// С изображениями сценариев, проверками баланса и статусом банкротства
// ============================================================================

const LEVEL2_SCENARIOS = [
    {
        id: '1', paper: 'MGNT', startDate: '15.02.2018', startPosition: {count:0,price:0},
        news: 'Реальная история: Сергей Галицкий продает 29,1% акций Магнита группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: '../assets/images/MGNT_2_start.png',
        reaction: 'Падение 12% — рынок опасался смены стратегии и ухода основателя.',
        endImage: '../assets/images/MGNT_2_finish.png',
        endDate: '19.02.2018',
        endPrice: 4251, minPrice: 4250, maxPrice: 4909
    },
    {
        id: '2', paper: 'MGNT', startDate: '15.02.2018', startPosition: {count:1,price:5000},
        news: 'Реальная история: Сергей Галицкий продает 29,1% акций Магнита группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: '../assets/images/MGNT_2_start.png',
        reaction: 'Падение 12% — рынок опасался смены стратегии и ухода основателя.',
        endImage: '../assets/images/MGNT_2_finish.png',
        endDate: '19.02.2018',
        endPrice: 4251, minPrice: 4250, maxPrice: 4909
    },
    {
        id: '3', paper: 'MGNT', startDate: '15.02.2018', startPosition: {count:10,price:4847},
        news: 'Реальная история: Сергей Галицкий продает 29,1% акций Магнита группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: '../assets/images/MGNT_2_start.png',
        reaction: 'Падение 12% — рынок опасался смены стратегии и ухода основателя.',
        endImage: '../assets/images/MGNT_2_finish.png',
        endDate: '19.02.2018',
        endPrice: 4251, minPrice: 4250, maxPrice: 4909
    },
    {
        id: '4', paper: 'MGNT', startDate: '15.02.2018', startPosition: {count:-5,price:4900},
        news: 'Реальная история: Сергей Галицкий продает 29,1% акций Магнита группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: '../assets/images/MGNT_2_start.png',
        reaction: 'Падение 12% — рынок опасался смены стратегии и ухода основателя.',
        endImage: '../assets/images/MGNT_2_finish.png',
        endDate: '19.02.2018',
        endPrice: 4251, minPrice: 4250, maxPrice: 4909
    },
    {
        id: '5', paper: 'MGNT', startDate: '15.02.2018', startPosition: {count:7,price:4847},
        news: 'Реальная история: Сергей Галицкий продает 29,1% акций Магнита группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: '../assets/images/MGNT_2_start.png',
        reaction: 'Падение 12% — рынок опасался смены стратегии и ухода основателя.',
        endImage: '../assets/images/MGNT_2_finish.png',
        endDate: '19.02.2018',
        endPrice: 4251, minPrice: 4250, maxPrice: 4909
    },
    {
        id: '6', paper: 'MGNT', startDate: '15.02.2018', startPosition: {count:-1,price:4847},
        news: 'Реальная история: Сергей Галицкий продает 29,1% акций Магнита группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: '../assets/images/MGNT_2_start.png',
        reaction: 'Падение 12% — рынок опасался смены стратегии и ухода основателя.',
        endImage: '../assets/images/MGNT_2_finish.png',
        endDate: '19.02.2018',
        endPrice: 4251, minPrice: 4250, maxPrice: 4909
    }
];

// ============================================================================
// ГЛАВНЫЙ ОБЪЕКТ УРОВНЯ 2
// ============================================================================

const Level2 = {
    // === СОСТОЯНИЕ ИГРЫ ===
    currentRound: 0,
    totalRounds: 5,
    currentScenario: null,
    usedScenarios: [],
    sessionId: null,
    gamePlayers: [],
    playerActions: {},

    // === DOM ЭЛЕМЕНТЫ ===
    selectPlayersModal: null,
    playerListContainer: null,
    startGameBtn: null,
    sceneContainer: null,
    roundLabel: null,
    scenarioInfo: null,
    startImageContainer: null,
    endImageContainer: null,
    playerActionsContainer: null,
    revealFutureBtn: null,
    nextCaseBtn: null,
    backToMenuBtn: null,
    finalResultsModal: null,

    // === ИНИЦИАЛИЗАЦИЯ ===
    init() {
        document.addEventListener('DOMContentLoaded', () => this.setup());
    },

    setup() {
        console.log('🎮 Level2 setup initializing...');

        // Получаем DOM элементы
        this.selectPlayersModal = document.getElementById('select-players-modal');
        this.playerListContainer = document.getElementById('player-list');
        this.startGameBtn = document.getElementById('start-game-btn');
        this.sceneContainer = document.getElementById('scene');
        this.roundLabel = document.getElementById('round-label');
        this.scenarioInfo = document.getElementById('scenario-info');
        this.playerActionsContainer = document.getElementById('player-actions');
        this.revealFutureBtn = document.getElementById('reveal-future');
        this.nextCaseBtn = document.getElementById('next-case');
        this.backToMenuBtn = document.getElementById('back-to-menu');
        this.finalResultsModal = document.getElementById('final-results-modal');

        // Инициализируем систему игроков
        Players.init && Players.init();

        // Обработчики
        if (this.startGameBtn) {
            this.startGameBtn.addEventListener('click', () => this.startGameWithSelectedPlayers());
        }
        if (this.revealFutureBtn) {
            this.revealFutureBtn.addEventListener('click', () => this.revealFutureAndCalculate());
        }
        if (this.nextCaseBtn) {
            this.nextCaseBtn.addEventListener('click', () => this.nextScenario());
        }
        if (this.backToMenuBtn) {
            this.backToMenuBtn.addEventListener('click', () => this.saveProgressAndReturn());
        }

        // Проверяем, есть ли сохранённая сессия
        const savedSession = Storage.load('level2_session');
        if (savedSession && savedSession.gamePlayers && savedSession.gamePlayers.length > 0) {
            this.showSessionResumeOption(savedSession);
        } else {
            this.showPlayerSelection();
        }

        console.log('✅ Level2 setup completed');
    },

    // === ВЫБОР ИГРОКОВ ===
    showPlayerSelection() {
        if (this.selectPlayersModal) {
            this.selectPlayersModal.style.display = 'flex';
        }
        this.renderPlayerCheckboxes();
    },

    renderPlayerCheckboxes() {
        if (!this.playerListContainer) return;

        this.playerListContainer.innerHTML = '';
        const playerList = Players.list || [];

        if (playerList.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'Нет сохранённых игроков. Добавьте их на главной странице.';
            this.playerListContainer.appendChild(msg);

            const guestLabel = document.createElement('label');
            guestLabel.innerHTML = '<input type="checkbox" data-name="Гость" value="Гость" checked> Гость';
            this.playerListContainer.appendChild(guestLabel);
            return;
        }

        playerList.forEach(player => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" data-name="${player.name}" value="${player.name}" checked> ${player.name}`;
            this.playerListContainer.appendChild(label);
        });
    },

    startGameWithSelectedPlayers() {
        const checkboxes = this.playerListContainer.querySelectorAll('input[type="checkbox"]:checked');
        const selected = Array.from(checkboxes).map(cb => cb.value);

        if (selected.length === 0) {
            alert('Выберите хотя бы одного игрока!');
            return;
        }

        // Инициализируем сессию
        this.gamePlayers = selected;
        this.currentRound = 0;
        this.usedScenarios = [];
        this.playerActions = {};
        this.sessionId = Date.now().toString();

        // Инициализируем балансы (100000 для каждого)
        this.gamePlayers.forEach(player => {
            const balance = Storage.load(`level2_balance_${player}`) || 100000;
            Storage.save(`level2_balance_${player}`, balance);
        });

        // Скрываем модал и стартуем первый сценарий
        if (this.selectPlayersModal) {
            this.selectPlayersModal.style.display = 'none';
        }

        this.nextScenario();
    },
    resumeSession(session) {
        console.log('🔄 Загрузка сохранённой сессии...');

        // Восстанавливаем состояние игры
        this.gamePlayers = session.gamePlayers;
        this.currentRound = session.currentRound;
        this.usedScenarios = session.usedScenarios || [];
        this.sessionId = session.sessionId || Date.now().toString();

        // Восстанавливаем балансы каждого игрока
        if (session.playerBalances) {
            Object.entries(session.playerBalances).forEach(([player, balance]) => {
                Storage.save(`level2_balance_${player}`, balance);
                console.log(`✅ ${player}: ${this.formatMoney(balance)} ₽`);
            });
        }

        console.log(`✅ Сессия загружена. Раунд ${this.currentRound + 1} / 5`);

        // Продолжаем игру
        if (this.currentRound >= this.totalRounds) {
            // Игра уже закончена, показываем финальные результаты
            this.showFinalResults();
        } else {
            // Продолжаем с текущего раунда
            this.nextScenario();
        }
    },

    showSessionResumeOption(session) {
        this.showPlayerSelection();
    },

    // === СЦЕНАРИИ ===
    getNextScenario() {
        if (this.currentRound >= this.totalRounds) {
            return null;
        }

        let scenario;
        do {
            scenario = LEVEL2_SCENARIOS[Math.floor(Math.random() * LEVEL2_SCENARIOS.length)];
        } while (this.usedScenarios.includes(scenario.id));

        this.usedScenarios.push(scenario.id);
        return scenario;
    },

    renderScenario() {
        this.currentScenario = this.getNextScenario();

        if (!this.currentScenario) {
            this.showFinalResults();
            return;
        }

        // Обновляем заголовок раунда
        const roundText = `Раунд ${this.currentRound + 1} / ${this.totalRounds} | ${this.currentScenario.startDate} → ${this.currentScenario.endDate}`;
        if (this.roundLabel) {
            this.roundLabel.textContent = roundText;
        }

        // Показываем информацию о сценарии
        if (this.scenarioInfo) {
            this.scenarioInfo.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 30px;">
          <div style="flex: 1;">
            <h3>${this.currentScenario.paper}</h3>
            <p><strong>Период:</strong> ${this.currentScenario.startDate} → ${this.currentScenario.endDate}</p>
            <p><strong>Начальная цена:</strong> ${this.formatMoney(this.currentScenario.startPrice)} ₽</p>
            <p><strong>Конечная цена:</strong> ${this.formatMoney(this.currentScenario.endPrice)} ₽</p>
            <p><strong>Диапазон:</strong> ${this.formatMoney(this.currentScenario.minPrice)} - ${this.formatMoney(this.currentScenario.maxPrice)} ₽</p>
            <p><strong>Новость:</strong> ${this.currentScenario.news}</p>
            <p><strong>Анализ:</strong> ${this.currentScenario.analysis}</p>
          </div>
          <div style="flex: 0 0 300px;">
            <img src="${this.currentScenario.startImage}" alt="Начальный график" style="width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          </div>
        </div>
      `;
        }

        // Рендерим форму для каждого игрока
        this.renderPlayerActionForms();

        // Показываем кнопку "Узнать будущее"
        if (this.revealFutureBtn) {
            this.revealFutureBtn.style.display = 'block';
        }
        if (this.nextCaseBtn) {
            this.nextCaseBtn.style.display = 'none';
        }
    },

    renderPlayerActionForms() {
        if (!this.playerActionsContainer) return;

        this.playerActionsContainer.innerHTML = '';
        this.playerActions = {};

        this.gamePlayers.forEach(playerName => {
            const balance = this.getPlayerBalance(playerName);

            // === ПРОВЕРКА БАНКРОТСТВА ===
            if (balance <= 0) {
                const bankruptDiv = document.createElement('div');
                bankruptDiv.className = 'player-action-form';
                bankruptDiv.style.borderLeftColor = '#f44336';
                bankruptDiv.innerHTML = `
          <h4>${playerName}</h4>
          <p style="color: #f44336; font-weight: bold; font-size: 1.2em;">
            💔 БАНКРОТ
          </p>
          <p style="color: #f44336;">Баланс: ${this.formatMoney(balance)} ₽</p>
          <p style="color: #999;">К сожалению, у вас закончились деньги. Вы не можете совершать сделки.</p>
        `;
                this.playerActionsContainer.appendChild(bankruptDiv);
                return;
            }

            const maxShares = Math.floor(balance / this.currentScenario.startPrice);

            const formHTML = `
        <div class="player-action-form" data-player="${playerName}">
          <h4>${playerName}</h4>
          <p>💰 Баланс: <strong>${this.formatMoney(balance)} ₽</strong></p>
          <p>📊 Начальная позиция: <strong>${this.currentScenario.paper} @ ${this.formatMoney(this.currentScenario.startPrice)} ₽</strong></p>
          <p>📈 Можно купить max: <strong>${maxShares} бумаг</strong></p>
          
          <div class="action-type">
            <label>
              <input type="radio" name="action_${playerName}" value="hold" checked> 
              Держать (ничего не делать)
            </label>
          </div>
          
          <div class="action-type">
            <label>
              <input type="radio" name="action_${playerName}" value="market_buy"> 
              Рыночная заявка: КУПИТЬ @ ${this.formatMoney(this.currentScenario.startPrice)}
            </label>
            <input type="number" name="count_${playerName}" min="0" max="${maxShares}" value="0" placeholder="Кол-во бумаг" data-max="${maxShares}" data-price="${this.currentScenario.startPrice}">
          </div>
          
          <div class="action-type">
            <label>
              <input type="radio" name="action_${playerName}" value="market_sell"> 
              Рыночная заявка: ПРОДАТЬ (Шорт) @ ${this.formatMoney(this.currentScenario.startPrice)}
            </label>
            <input type="number" name="count_sell_${playerName}" min="0" max="${maxShares}" value="0" placeholder="Кол-во бумаг">
          </div>
          
          <div class="action-type">
            <label>
              <input type="radio" name="action_${playerName}" value="limit_buy"> 
              Лимитная заявка: КУПИТЬ по цене
            </label>
            <input type="number" name="limit_price_buy_${playerName}" value="${this.currentScenario.startPrice}" placeholder="Цена">
            <input type="number" name="count_limit_buy_${playerName}" min="0" max="${maxShares}" value="0" placeholder="Кол-во" data-max="${maxShares}">
          </div>
          
          <div class="action-type">
            <label>
              <input type="radio" name="action_${playerName}" value="limit_sell"> 
              Лимитная заявка: ПРОДАТЬ по цене
            </label>
            <input type="number" name="limit_price_sell_${playerName}" value="${this.currentScenario.startPrice}" placeholder="Цена">
            <input type="number" name="count_limit_sell_${playerName}" min="0" max="${maxShares}" value="0" placeholder="Кол-во">
          </div>
        </div>
      `;

            this.playerActionsContainer.innerHTML += formHTML;
        });

        // Добавляем обработчик для проверки баланса при вводе
        this.setupBalanceValidation();
    },

    setupBalanceValidation() {
        this.playerActionsContainer.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const max = parseInt(e.target.dataset.max) || 0;
                const price = parseInt(e.target.dataset.price) || 0;
                let value = parseInt(e.target.value) || 0;

                if (value > max) {
                    console.warn(`⚠️ Введено ${value}, максимум ${max}`);
                    e.target.value = max;
                    alert(`⚠️ Вы ввели ${value} бумаг, но можете купить только ${max}.\nВыставлено максимальное значение.`);
                }
            });
        });
    },

    // === РАСКРЫТИЕ БУДУЩЕГО И РАСЧЁТЫ ===
    revealFutureAndCalculate() {
        this.collectPlayerActions();
        this.animateToEndImage();

        setTimeout(() => {
            this.calculateResults();

            if (this.revealFutureBtn) {
                this.revealFutureBtn.style.display = 'none';
            }
            if (this.nextCaseBtn) {
                this.nextCaseBtn.style.display = 'block';
            }
        }, 1500);
    },

    collectPlayerActions() {
        this.playerActions = {};

        this.gamePlayers.forEach(playerName => {
            const form = this.playerActionsContainer.querySelector(`[data-player="${playerName}"]`);
            if (!form) return;

            const actionType = form.querySelector(`input[name="action_${playerName}"]:checked`)?.value || 'hold';
            let action = {
                type: actionType,
                count: 0,
                price: 0,
                limitPrice: 0
            };

            switch (actionType) {
                case 'market_buy':
                    action.count = parseInt(form.querySelector(`input[name="count_${playerName}"]`).value) || 0;
                    action.price = this.currentScenario.startPrice;
                    break;
                case 'market_sell':
                    action.count = parseInt(form.querySelector(`input[name="count_sell_${playerName}"]`).value) || 0;
                    action.price = this.currentScenario.startPrice;
                    break;
                case 'limit_buy':
                    action.count = parseInt(form.querySelector(`input[name="count_limit_buy_${playerName}"]`).value) || 0;
                    action.limitPrice = parseInt(form.querySelector(`input[name="limit_price_buy_${playerName}"]`).value) || this.currentScenario.startPrice;
                    break;
                case 'limit_sell':
                    action.count = parseInt(form.querySelector(`input[name="count_limit_sell_${playerName}"]`).value) || 0;
                    action.limitPrice = parseInt(form.querySelector(`input[name="limit_price_sell_${playerName}"]`).value) || this.currentScenario.startPrice;
                    break;
                case 'hold':
                default:
                    break;
            }

            this.playerActions[playerName] = action;
        });
    },

    animateToEndImage() {
        if (!this.scenarioInfo) return;

        // Меняем изображение на конечное с анимацией
        const imgElement = this.scenarioInfo.querySelector('img');
        if (imgElement) {
            imgElement.style.transition = 'opacity 0.5s ease';
            imgElement.style.opacity = '0';

            setTimeout(() => {
                imgElement.src = this.currentScenario.endImage;
                imgElement.style.opacity = '1';
            }, 250);
        }
    },

    calculateResults() {
        let resultsHTML = `<h3>📊 Результаты раунда ${this.currentRound + 1}</h3>`;
        resultsHTML += `<p><strong>Цена открытия:</strong> ${this.formatMoney(this.currentScenario.startPrice)}</p>`;
        resultsHTML += `<p><strong>Цена закрытия:</strong> ${this.formatMoney(this.currentScenario.endPrice)}</p>`;
        resultsHTML += `<p><strong>Реакция рынка:</strong> ${this.currentScenario.reaction}</p>`;
        resultsHTML += '<div class="results-grid">';

        this.gamePlayers.forEach(playerName => {
            const action = this.playerActions[playerName];
            if (!action) return;

            const balance = this.getPlayerBalance(playerName);

            // Если банкрот - не пересчитываем
            if (balance <= 0) {
                resultsHTML += `
          <div class="result-item">
            <h4>${playerName}</h4>
            <p style="color: #f44336;">💔 БАНКРОТ</p>
            <p>Невозможно совершить сделку</p>
          </div>
        `;
                return;
            }

            let pnl = 0;
            let resultText = 'Позиция не изменилась';

            if (action.type === 'hold') {
                pnl = 0;
                resultText = 'Вы ничего не делали';
            } else if (action.type === 'market_buy') {
                pnl = (this.currentScenario.endPrice - this.currentScenario.startPrice) * action.count;
                resultText = `Куплено ${action.count} по ${this.formatMoney(this.currentScenario.startPrice)}, продано по ${this.formatMoney(this.currentScenario.endPrice)}`;
            } else if (action.type === 'market_sell') {
                pnl = (this.currentScenario.startPrice - this.currentScenario.endPrice) * action.count;
                resultText = `Шорт: продано ${action.count} по ${this.formatMoney(this.currentScenario.startPrice)}, закрыто по ${this.formatMoney(this.currentScenario.endPrice)}`;
            } else if (action.type === 'limit_buy') {
                if (action.limitPrice >= this.currentScenario.minPrice) {
                    pnl = (this.currentScenario.endPrice - action.limitPrice) * action.count;
                    resultText = `Лимит КУПИТЬ ✅ исполнился по ${this.formatMoney(action.limitPrice)}, продано по ${this.formatMoney(this.currentScenario.endPrice)}`;
                } else {
                    resultText = `Лимит КУПИТЬ ❌ по ${this.formatMoney(action.limitPrice)} - не исполнился (минимум был ${this.formatMoney(this.currentScenario.minPrice)})`;
                }
            } else if (action.type === 'limit_sell') {
                if (action.limitPrice <= this.currentScenario.maxPrice) {
                    pnl = (action.limitPrice - this.currentScenario.endPrice) * action.count;
                    resultText = `Лимит ПРОДАТЬ✅ исполнился по ${this.formatMoney(action.limitPrice)}, закрыто по ${this.formatMoney(this.currentScenario.endPrice)}`;
                } else {
                    resultText = `Лимит ПРОДАТЬ❌ по ${this.formatMoney(action.limitPrice)} - не исполнился (максимум был ${this.formatMoney(this.currentScenario.maxPrice)})`;
                }
            }

            const oldBalance = balance;
            const newBalance = Math.max(0, oldBalance + pnl);
            this.setPlayerBalance(playerName, newBalance);

            const pnlClass = pnl > 0 ? 'positive' : (pnl < 0 ? 'negative' : 'neutral');
            resultsHTML += `
        <div class="result-item">
          <h4>${playerName}</h4>
          <p>${resultText}</p>
          <p class="${pnlClass}">P&L: ${pnl > 0 ? '+' : ''}${this.formatMoney(pnl)} ₽</p>
          <p>Баланс: ${this.formatMoney(oldBalance)} → ${this.formatMoney(newBalance)} ₽</p>
        </div>
      `;
        });

        resultsHTML += '</div>';

        if (this.scenarioInfo) {
            this.scenarioInfo.innerHTML = resultsHTML;
        }

        this.currentRound++;
    },

    nextScenario() {
        if (this.currentRound >= this.totalRounds) {
            this.showFinalResults();
            return;
        }

        this.renderScenario();
    },

    // === ФИНАЛЬНЫЕ РЕЗУЛЬТАТЫ ===
    showFinalResults() {
        const results = [];

        this.gamePlayers.forEach(playerName => {
            const finalBalance = this.getPlayerBalance(playerName);
            const profitPercent = ((finalBalance - 100000) / 100000) * 100;
            const score = Math.max(0, 500 + Math.round((profitPercent * 20)));

            results.push({
                name: playerName,
                balance: finalBalance,
                profit: finalBalance - 100000,
                profitPercent: profitPercent,
                score: score
            });
        });

        results.sort((a, b) => b.score - a.score);

        let resultsHTML = '<h2>🏆 Финальные результаты</h2>';
        resultsHTML += '<div class="final-results-grid">';

        results.forEach((result, idx) => {
            const medal = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : ''));
            const resultClass = result.score > 500 ? 'win' : (result.score < 500 ? 'loss' : 'neutral');

            resultsHTML += `
        <div class="final-result-item ${resultClass}">
          <h3>${medal} ${result.name}</h3>
          <p>Финальный баланс: <strong>${this.formatMoney(result.balance)} ₽</strong></p>
          <p>Прибыль: <span class="${result.profit > 0 ? 'positive' : 'negative'}">
            ${result.profit > 0 ? '+' : ''}${this.formatMoney(result.profit)} ₽ (${result.profitPercent > 0 ? '+' : ''}${result.profitPercent.toFixed(1)}%)
          </span></p>
          <p>Итоговые баллы: <strong>${result.score}</strong></p>
        </div>
      `;
        });

        resultsHTML += '</div>';
        resultsHTML += '<div class="final-buttons">';
        resultsHTML += '<button id="clear-level2-data" class="btn btn-danger">Очистить данные уровня</button>';
        resultsHTML += '<button id="return-to-menu" class="btn btn-primary">На главную</button>';
        resultsHTML += '</div>';

        if (this.finalResultsModal) {
            this.finalResultsModal.innerHTML = resultsHTML;
            this.finalResultsModal.style.display = 'flex';

            document.getElementById('clear-level2-data').addEventListener('click', () => {
                this.clearLevel2Data();
            });

            document.getElementById('return-to-menu').addEventListener('click', () => {
                window.location.href = '../index.html';
            });
        }

        results.forEach(result => {
            const player = Players.list.find(p => p.name === result.name);
            if (player) {
                player.score = (player.score || 0) + result.score;
                Storage.save('players', Players.list);
            }
        });
    },


    saveProgressAndReturn() {
        const sessionData = {
            sessionId: this.sessionId,
            gamePlayers: this.gamePlayers,
            currentRound: this.currentRound,
            currentScenarioId: this.currentScenario ? this.currentScenario.id : null,
            usedScenarios: this.usedScenarios,
            playerBalances: {}
        };

        this.gamePlayers.forEach(player => {
            sessionData.playerBalances[player] = this.getPlayerBalance(player);
        });

        Storage.save('level2_session', sessionData);

        console.log('💾 Сессия сохранена:');
        console.log('- Игроки:', this.gamePlayers);
        console.log('- Раунд:', this.currentRound + 1);
        console.log('- Балансы:', sessionData.playerBalances);

        window.location.href = '../index.html';
    },

    clearLevel2Data() {
        const keysToDelete = [];
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('level2_')) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach(key => localStorage.removeItem(key));

        alert('Все данные уровня очищены!');
        window.location.href = '../index.html';
    },

    // === УТИЛИТЫ ===
    getPlayerBalance(playerName) {
        return Storage.load(`level2_balance_${playerName}`) || 100000;
    },

    setPlayerBalance(playerName, amount) {
        Storage.save(`level2_balance_${playerName}`, Math.max(0, amount));
    },

    formatMoney(amount) {
        return new Intl.NumberFormat('ru-RU').format(Math.round(amount));
    }
};

// === ИНИЦИАЛИЗАЦИЯ ===
Level2.init();