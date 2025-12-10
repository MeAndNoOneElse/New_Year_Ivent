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

        // 1. Восстанавливаем состояние игры
        this.gamePlayers = session.gamePlayers;
        this.currentRound = session.currentRound;
        this.usedScenarios = session.usedScenarios || [];
        this.sessionId = session.sessionId || Date.now().toString();

        // 2. ✅ КРИТИЧНО: Восстанавливаем ТЕКУЩИЙ СЦЕНАРИЙ ПО ID
        // Это нужно чтобы startPosition был заполнен!
        if (session.currentScenarioId) {
            const scenario = LEVEL2_SCENARIOS.find(s => s.id === session.currentScenarioId);
            if (scenario) {
                this.currentScenario = scenario;
                console.log(`✅ Сценарий загружен: ${scenario.paper} (ID: ${scenario.id})`);
            }
        }

        // 3. На всякий случай fallback: если currentScenario не найден
        if (!this.currentScenario && this.currentRound < this.totalRounds) {
            console.warn('⚠️ Сценарий не найден, берём следующий...');
            this.currentScenario = this.getNextScenario();
        }

        // 4. Восстанавливаем балансы каждого игрока
        if (session.playerBalances) {
            Object.entries(session.playerBalances).forEach(([player, balance]) => {
                Storage.save(`level2_balance_${player}`, balance);
                console.log(`✅ ${player}: ${this.formatMoney(balance)} ₽`);
            });
        }

        console.log(`✅ Сессия загружена. Раунд ${this.currentRound + 1} / ${this.totalRounds}`);

        // 5. Продолжаем игру
        if (this.currentRound >= this.totalRounds) {
            // Игра уже закончена, показываем финальные результаты
            this.showFinalResults();
        } else {
            // ✅ ИСПРАВЛЕНИЕ: Вызываем renderScenario напрямую
            // (а не nextScenario, чтобы не перетирать currentScenario)
            this.renderScenario();
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
        // ✅ ИСПРАВЛЕНИЕ: Если сценарий уже установлен (из resumeSession),
        // не перетираем его и не пересчитываем startPosition
        if (!this.currentScenario) {
            this.currentScenario = this.getNextScenario();
        }

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
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 300px;">
                    <h3>📰 Новость</h3>
                    <p>${this.currentScenario.news}</p>
                    
                    <h3>🔍 Анализ</h3>
                    <p>${this.currentScenario.analysis}</p>
                    
                    <h3>📊 Период торговли</h3>
                    <p>От: ${this.currentScenario.startDate}</p>
                    <p>До: ${this.currentScenario.endDate}</p>
                </div>
                <div style="flex: 0 0 350px;">
                    <img 
                        src="${this.currentScenario.startImage}" 
                        style="width: 100%; max-height: 250px; border-radius: 6px; object-fit: cover;"
                        onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22350%22 height=%22250%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22350%22 height=%22250%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3EИзображение не найдено%3C/text%3E%3C/svg%3E'"
                        alt="Сценарий">
                    <p style="margin-top: 10px; font-size: 0.9em; color: #666;">
                        💰 Цена: ${this.formatMoney(this.currentScenario.startPrice)} ₽<br>
                        📈 Min/Max: ${this.formatMoney(this.currentScenario.minPrice)}-${this.formatMoney(this.currentScenario.maxPrice)} ₽
                    </p>
                </div>
            </div>
        `;
        }

        // Очищаем старые формы и увеличиваем раунд
        this.currentRound++;

        // Отрисовываем формы действий игроков
        this.renderPlayerActionForms();
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
            const maxMoney = balance;

            const formHTML = `
            <div class="player-action-form" data-player="${playerName}">
                <h4>${playerName}</h4>
                <p>💰 Баланс: <strong>${this.formatMoney(balance)} ₽</strong></p>
                <p>📊 Начальная позиция: <strong>${this.currentScenario.paper} по ${this.formatMoney(this.currentScenario.startPrice)} ₽</strong></p>
                
                <!-- ОПЦИЯ 1: ДЕРЖАТЬ -->
                <div class="action-type">
                    <label>
                        <input type="radio" name="action_${playerName}" value="hold" checked> 
                        ✋ Держать (ничего не делать)
                    </label>
                </div>
                
                <!-- ОПЦИЯ 2: РЫНОЧНАЯ ПОКУПКА -->
                <div class="action-type">
                    <label>
                        <input type="radio" name="action_${playerName}" value="market_buy"> 
                        📈 Рыночная заявка: КУПИТЬ по ${this.formatMoney(this.currentScenario.startPrice)} ₽/шт
                    </label>
                    <div style="margin-left: 24px; margin-top: 8px;">
                        <input 
                            type="number" 
                            name="count_${playerName}" 
                            class="quantity-input"
                            min="0" 
                            max="${maxShares}" 
                            value="0" 
                            placeholder="Кол-во бумаг (макс ${maxShares})"
                            data-player="${playerName}"
                            data-type="market_buy"
                            data-max="${maxShares}"
                            data-price="${this.currentScenario.startPrice}"
                        >
                        <div class="input-error" id="error_count_${playerName}"></div>
                        <p class="input-hint" style="color: #667eea; font-size: 0.9em; margin: 5px 0 0 0;">
                            Стоимость: <strong id="cost_${playerName}">0 ₽</strong> из ${this.formatMoney(balance)} ₽
                        </p>
                    </div>
                </div>
                
                <!-- ОПЦИЯ 3: РЫНОЧНАЯ ПРОДАЖА (ШОРТ) -->
                <div class="action-type">
                    <label>
                        <input type="radio" name="action_${playerName}" value="market_sell"> 
                        📉 Рыночная заявка: ПРОДАТЬ (Шорт) по ${this.formatMoney(this.currentScenario.startPrice)} ₽/шт
                    </label>
                    <div style="margin-left: 24px; margin-top: 8px;">
                        
                        <!-- ИНФОРМАЦИЯ О НАЧАЛЬНОЙ ПОЗИЦИИ -->
                        ${this.currentScenario.startPosition.count > 0 ? `
                        <p style="background: #fff3e0; border-left: 3px solid #ff9800; padding: 8px; margin: 0 0 10px 0; font-size: 0.9em; border-radius: 3px;">
                            📊 У вас есть начальная позиция: <strong>${this.currentScenario.startPosition.count} бумаг по ${this.formatMoney(this.currentScenario.startPosition.price)} ₽</strong>
                            <br>Стоимость закрытия: <strong>${this.formatMoney(this.currentScenario.startPosition.count * this.currentScenario.startPrice)} ₽</strong>
                            <br>Вы сможете продать макс: <strong>${this.calculateMaxShortSellable(playerName)} бумаг</strong> (чтобы оставить деньги на закрытие позиции)
                        </p>
                        ` : ''}
                        
                        <input 
                            type="number" 
                            name="count_sell_${playerName}" 
                            class="quantity-input"
                            min="0" 
                            value="0" 
                            placeholder="Кол-во бумаг для шорта"
                            data-player="${playerName}"
                            data-type="market_sell"
                            data-max="${this.calculateMaxShortSellable(playerName)}"
                            data-price="${this.currentScenario.startPrice}"
                        >
                        <div class="input-error" id="error_count_sell_${playerName}"></div>
                        <p class="input-hint" style="color: #667eea; font-size: 0.9em; margin: 5px 0 0 0;">
                            Выручка: <strong id="revenue_${playerName}">0 ₽</strong>
                            ${this.currentScenario.startPosition.count > 0 ? `
                            <br>Деньги на закрытие позиции: <strong id="funds_left_${playerName}">${this.formatMoney(this.getPlayerBalance(playerName) - this.currentScenario.startPosition.count * this.currentScenario.startPrice)} ₽</strong>
                            ` : ''}
                        </p>
                    </div>
                </div>

                
                <!-- ОПЦИЯ 4: ЛИМИТНАЯ ПОКУПКА -->
                <div class="action-type">
                    <label>
                        <input type="radio" name="action_${playerName}" value="limit_buy"> 
                        🎯 Лимитная заявка: КУПИТЬ по цене
                    </label>
                    <div style="margin-left: 24px; margin-top: 8px;">
                        <div style="display: flex; gap: 10px; align-items: flex-start; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 150px;">
                                <label style="font-size: 0.9em; color: #666;">Цена за бумагу (₽):</label>
                                <input 
                                    type="number" 
                                    name="limit_price_buy_${playerName}" 
                                    class="price-input"
                                    value="${this.currentScenario.startPrice}" 
                                    min="1"
                                    step="1"
                                    placeholder="Цена"
                                    data-player="${playerName}"
                                    data-type="limit_buy"
                                >
                                <div class="input-error" id="error_limit_price_buy_${playerName}"></div>
                            </div>
                            <div style="flex: 1; min-width: 150px;">
                                <label style="font-size: 0.9em; color: #666;">Кол-во бумаг:</label>
                                <input 
                                    type="number" 
                                    name="count_limit_buy_${playerName}" 
                                    class="quantity-input"
                                    min="0" 
                                    value="0" 
                                    placeholder="Кол-во"
                                    data-player="${playerName}"
                                    data-type="limit_buy"
                                >
                                <div class="input-error" id="error_count_limit_buy_${playerName}"></div>
                            </div>
                        </div>
                        <p class="input-hint" style="color: #667eea; font-size: 0.9em; margin: 5px 0 0 0;">
                            Макс. стоимость: <strong id="cost_limit_buy_${playerName}">0 ₽</strong> из ${this.formatMoney(balance)} ₽
                        </p>
                    </div>
                </div>
                
                <!-- ОПЦИЯ 5: ЛИМИТНАЯ ПРОДАЖА -->
               <div class="action-type">
                    <label>
                        <input type="radio" name="action_${playerName}" value="limit_sell"> 
                        🎯 Лимитная заявка: ПРОДАТЬ по цене
                    </label>
                    <div style="margin-left: 24px; margin-top: 8px;">
                        
                        <!-- ИНФОРМАЦИЯ О НАЧАЛЬНОЙ ПОЗИЦИИ -->
                        ${this.currentScenario.startPosition.count > 0 ? `
                        <p style="background: #fff3e0; border-left: 3px solid #ff9800; padding: 8px; margin: 0 0 10px 0; font-size: 0.9em; border-radius: 3px;">
                            📊 У вас есть начальная позиция: <strong>${this.currentScenario.startPosition.count} бумаг по ${this.formatMoney(this.currentScenario.startPosition.price)} ₽</strong>

                            <br>Стоимость закрытия: <strong>${this.formatMoney(this.currentScenario.startPosition.count * this.currentScenario.startPrice)} ₽</strong>
                                                    <br>Вы сможете продать макс: <strong>${this.calculateMaxShortSellable(playerName)} бумаг</strong> (чтобы оставить деньги на закрытие позиции)

                        </p>
                        ` : ''}
                        
                        <div style="display: flex; gap: 10px; align-items: flex-start; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 150px;">
                                <label style="font-size: 0.9em; color: #666;">Цена за бумагу (₽):</label>
                                <input 
                                    type="number" 
                                    name="limit_price_sell_${playerName}" 
                                    class="price-input"
                                    value="${this.currentScenario.startPrice}" 
                                    min="1"
                                    step="1"
                                    placeholder="Цена"
                                    data-player="${playerName}"
                                    data-type="limit_sell"
                                >
                                <div class="input-error" id="error_limit_price_sell_${playerName}"></div>
                            </div>
                            <div style="flex: 1; min-width: 150px;">
                                <label style="font-size: 0.9em; color: #666;">Кол-во бумаг:</label>
                                <input 
                                    type="number" 
                                    name="count_limit_sell_${playerName}" 
                                    class="quantity-input"
                                    min="0" 
                                    value="0" 
                                    placeholder="Кол-во"
                                    data-player="${playerName}"
                                    data-type="limit_sell"
                                    data-max="${this.calculateMaxShortSellable(playerName)}"
                                >
                                <div class="input-error" id="error_count_limit_sell_${playerName}"></div>
                            </div>
                        </div>
                        <p class="input-hint" style="color: #667eea; font-size: 0.9em; margin: 5px 0 0 0;">
                            Выручка: <strong id="revenue_limit_sell_${playerName}">0 ₽</strong>
                            ${this.currentScenario.startPosition.count > 0 ? `
                            <br>Деньги на закрытие позиции: <strong id="funds_left_limit_sell_${playerName}">${this.formatMoney(this.getPlayerBalance(playerName) - this.currentScenario.startPosition.count * this.currentScenario.startPrice)} ₽</strong>
                            ` : ''}
                        </p>
                    </div>
                </div>
        `;

            this.playerActionsContainer.innerHTML += formHTML;
        });

        // Инициализируем валидацию
        this.setupAdvancedValidation();
    },
    setupAdvancedValidation() {
        const container = this.playerActionsContainer;

        // === ОБРАБОТЧИКИ ДЛЯ ВСЕХ INPUT ПОЛЕЙ ===
        container.querySelectorAll('input[type="number"]').forEach(input => {
            // 1. ЗАПРЕТИТЬ ОТРИЦАТЕЛЬНЫЕ И НЕЦЕЛЫЕ ЧИСЛА
            input.addEventListener('input', (e) => {
                let value = e.target.value;

                // Удаляем всё кроме цифр (и минус в начале)
                value = value.replace(/[^\d]/g, '');
                e.target.value = value;
            });

            // 2. ПРОВЕРКА ПРИ ИЗМЕНЕНИИ
            input.addEventListener('change', (e) => {
                this.validatePlayerInput(e.target);
            });

            // 3. LIVE КАЛЬКУЛЯЦИЯ СТОИМОСТИ/ВЫРУЧКИ
            input.addEventListener('input', (e) => {
                this.calculateTotalCost(e.target);
            });
        });

        // === ОБРАБОТЧИКИ ДЛЯ RADIO BUTTONS ===
        container.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const formDiv = e.target.closest('.player-action-form');
                // Очищаем все ошибки при смене действия
                formDiv.querySelectorAll('.input-error').forEach(err => err.textContent = '');
            });
        });
    },
    validatePlayerInput(input) {
        const playerName = input.dataset.player;
        const inputType = input.dataset.type;
        const max = parseInt(input.dataset.max) || Infinity;
        const price = parseInt(input.dataset.price) || 0;
        let value = parseInt(input.value) || 0;
        const balance = this.getPlayerBalance(playerName);
        const errorDiv = document.getElementById(`error_${input.name}`);

        if (!errorDiv) return;

        errorDiv.textContent = '';
        errorDiv.style.color = '#f44336';
        errorDiv.style.fontSize = '0.85em';
        errorDiv.style.marginTop = '4px';

        // === РЫНОЧНАЯ ПОКУПКА ===
        if (inputType === 'market_buy') {
            if (value < 0) {
                value = 0;
                input.value = 0;
                errorDiv.textContent = '❌ Отрицательное число недопустимо';
                return;
            }

            if (value > max) {
                input.value = max;
                errorDiv.textContent = `❌ Максимум ${max} бумаг (ваш баланс: ${this.formatMoney(balance)} ₽)`;
                return;
            }

            const totalCost = value * price;
            if (totalCost > balance) {
                const canBuy = Math.floor(balance / price);
                input.value = canBuy;
                errorDiv.textContent = `❌ Не хватает средств. Максимум ${canBuy} бумаг на ${this.formatMoney(balance)} ₽`;
                return;
            }
        }

        // === ЛИМИТНАЯ ПОКУПКА ===
        if (inputType === 'limit_buy') {
            if (value < 0) {
                value = 0;
                input.value = 0;
                errorDiv.textContent = '❌ Отрицательное число недопустимо';
                return;
            }

            // Получаем цену из соответствующего поля
            const priceInput = document.querySelector(`input[name="limit_price_buy_${playerName}"]`);
            const limitPrice = parseInt(priceInput?.value) || 0;

            if (limitPrice <= 0) {
                errorDiv.textContent = '❌ Укажите цену > 0';
                return;
            }

            const totalCost = value * limitPrice;
            if (totalCost > balance) {
                const canBuy = Math.floor(balance / limitPrice);
                input.value = canBuy;
                errorDiv.textContent = `❌ При цене ${this.formatMoney(limitPrice)} ₽ можно купить максимум ${canBuy} бумаг`;
                return;
            }
        }

        // === ЛИМИТНАЯ ПРОДАЖА ===
        if (inputType === 'limit_sell') {
            const startPosition = this.currentScenario.startPosition;
            const costToClose = startPosition.count * this.currentScenario.startPrice;

            if (value < 0) {
                value = 0;
                input.value = 0;
                errorDiv.textContent = '❌ Отрицательное число недопустимо';
                return;
            }

            // Если есть начальная позиция, проверяем можно ли продать
            if (startPosition.count > 0 && input.name.includes('count_limit_sell')) {
                const priceInput = document.querySelector(`input[name="limit_price_sell_${playerName}"]`);
                const limitPrice = parseInt(priceInput?.value) || 0;
                const revenue = value * limitPrice;
                const balanceAfterRevenue = balance + revenue;
                const fundsLeft = balanceAfterRevenue - costToClose;

                if (fundsLeft < 0) {
                    const maxCanSell = Math.floor((balance + balance - costToClose) / limitPrice);
                    input.value = Math.max(0, maxCanSell);
                    errorDiv.textContent = `❌ При цене ${this.formatMoney(limitPrice)} ₽ и продаже ${value} бумаг не останется денег на закрытие позиции. Максимум ${Math.max(0, maxCanSell)} бумаг.`;
                    return;
                }

                // Обновляем информацию о деньгах
                const fundsLeftDiv = document.getElementById(`funds_left_limit_sell_${playerName}`);
                if (fundsLeftDiv) {
                    fundsLeftDiv.textContent = this.formatMoney(fundsLeft) + ' ₽';
                }
            }
        }

        // === РЫНОЧНАЯ ПРОДАЖА (ШОРТ) ===
        if (inputType === 'market_sell') {
            const maxShortable = this.calculateMaxShortSellable(playerName);
            const startPosition = this.currentScenario.startPosition;
            const costToClose = startPosition.count * this.currentScenario.startPrice;

            if (value < 0) {
                value = 0;
                input.value = 0;
                errorDiv.textContent = '❌ Отрицательное число недопустимо';
                return;
            }

            if (value > maxShortable) {
                input.value = maxShortable;

                if (startPosition.count > 0) {
                    errorDiv.textContent = `❌ Если продать ${value} бумаг, не останется денег на закрытие начальной позиции (${startPosition.count} шт по ${this.formatMoney(this.currentScenario.startPrice)} ₽). Максимум ${maxShortable} бумаг.`;
                } else {
                    errorDiv.textContent = `❌ Максимум ${maxShortable} бумаг`;
                }
                return;
            }

            // Обновляем информацию о оставшихся деньгах
            const revenue = value * this.currentScenario.startPrice;
            const balanceAfterRevenue = balance + revenue;
            const fundsLeftForClose = balanceAfterRevenue - costToClose;

            const fundsLeftDiv = document.getElementById(`funds_left_${playerName}`);
            if (fundsLeftDiv && startPosition.count > 0) {
                fundsLeftDiv.textContent = this.formatMoney(fundsLeftForClose) + ' ₽';

                if (fundsLeftForClose < 0) {
                    errorDiv.textContent = `⚠️ Недостаточно средств на закрытие позиции. Нужно ${this.formatMoney(costToClose)} ₽, будет ${this.formatMoney(balanceAfterRevenue)} ₽`;
                }
            }
        }

    },
    calculateMaxShortSellable(playerName) {
        const balance = this.getPlayerBalance(playerName);
        const startPrice = this.currentScenario.startPrice;
        const startPosition = this.currentScenario.startPosition;

        // Если начальная позиция 0 или отрицательная (уже шорт) — можно продавать без ограничений
        if (startPosition.count <= 0) {
            // Можно продать как угодно много (уже шортим)
            // Ограничение только по логике: не более 1000 бумаг (разумный предел)
            return 1000;
        }

        // Если есть ДЛИННАЯ позиция (startPosition.count > 0):
        // Надо оставить денег на закрытие этой позиции
        // cost_to_close = startPosition.count × startPrice

        const costToClose = startPosition.count * startPrice;

        // Макс можем оставить = баланс - стоимость закрытия
        const maxMoneyToSpendOnShort = balance - costToClose;

        if (maxMoneyToSpendOnShort <= 0) {
            // Недостаточно денег даже на закрытие текущей позиции
            return 0;
        }

        // Макс бумаг для шорта = деньги / начальная цена
        const maxShortable = Math.floor(maxMoneyToSpendOnShort / startPrice);

        return Math.max(0, maxShortable);
    },
    calculateTotalCost(input) {
        const playerName = input.dataset.player;
        const inputType = input.dataset.type;
        const price = parseInt(input.dataset.price) || 0;
        const value = parseInt(input.value) || 0;

        // === РЫНОЧНАЯ ПОКУПКА ===
        if (inputType === 'market_buy') {
            const totalCost = value * price;
            const costDiv = document.getElementById(`cost_${playerName}`);
            if (costDiv) {
                costDiv.textContent = this.formatMoney(totalCost) + ' ₽';
            }
        }

        // === РЫНОЧНАЯ ПРОДАЖА ===
        if (inputType === 'market_sell') {
            const totalRevenue = value * price;
            const revenueDiv = document.getElementById(`revenue_${playerName}`);
            if (revenueDiv) {
                revenueDiv.textContent = this.formatMoney(totalRevenue) + ' ₽';
            }

            // Обновляем деньги на закрытие позиции
            const startPosition = this.currentScenario.startPosition;
            if (startPosition.count > 0) {
                const costToClose = startPosition.count * this.currentScenario.startPrice;
                const balanceAfterRevenue = this.getPlayerBalance(playerName) + totalRevenue;
                const fundsLeft = balanceAfterRevenue - costToClose;

                const fundsLeftDiv = document.getElementById(`funds_left_${playerName}`);
                if (fundsLeftDiv) {
                    fundsLeftDiv.textContent = this.formatMoney(fundsLeft) + ' ₽';
                }
            }
        }

        // === ЛИМИТНАЯ ПОКУПКА ===
        if (inputType === 'limit_buy' && input.name.includes('count_limit_buy')) {
            const priceInput = document.querySelector(`input[name="limit_price_buy_${playerName}"]`);
            const limitPrice = parseInt(priceInput?.value) || 0;
            const totalCost = value * limitPrice;
            const costDiv = document.getElementById(`cost_limit_buy_${playerName}`);
            if (costDiv) {
                costDiv.textContent = this.formatMoney(totalCost) + ' ₽';
            }
        }

        // === ПЕРЕСЧЁТ ПРИ ИЗМЕНЕНИИ ЦЕНЫ В ЛИМИТНОЙ ПОКУПКЕ ===
        if (inputType === 'limit_buy' && input.name.includes('limit_price_buy')) {
            const countInput = document.querySelector(`input[name="count_limit_buy_${playerName}"]`);
            const count = parseInt(countInput?.value) || 0;
            const totalCost = count * value;
            const costDiv = document.getElementById(`cost_limit_buy_${playerName}`);
            if (costDiv) {
                costDiv.textContent = this.formatMoney(totalCost) + ' ₽';
            }
        }

// === ЛИМИТНАЯ ПРОДАЖА (КОЛИЧЕСТВО) ===
        if (inputType === 'limit_sell' && input.name.includes('count_limit_sell')) {
            const priceInput = document.querySelector(`input[name="limit_price_sell_${playerName}"]`);
            const limitPrice = parseInt(priceInput?.value) || 0;
            const totalRevenue = value * limitPrice;
            const revenueDiv = document.getElementById(`revenue_limit_sell_${playerName}`);
            if (revenueDiv) {
                revenueDiv.textContent = this.formatMoney(totalRevenue) + ' ₽';
            }

            // Обновляем деньги на закрытие
            const startPosition = this.currentScenario.startPosition;
            if (startPosition.count > 0) {
                const costToClose = startPosition.count * this.currentScenario.startPrice;
                const balanceAfterRevenue = this.getPlayerBalance(playerName) + totalRevenue;
                const fundsLeft = balanceAfterRevenue - costToClose;

                const fundsLeftDiv = document.getElementById(`funds_left_limit_sell_${playerName}`);
                if (fundsLeftDiv) {
                    fundsLeftDiv.textContent = this.formatMoney(fundsLeft) + ' ₽';
                }
            }
        }

        // === ЛИМИТНАЯ ПРОДАЖА (ЦЕНА) ===
        if (inputType === 'limit_sell' && input.name.includes('limit_price_sell')) {
            const countInput = document.querySelector(`input[name="count_limit_sell_${playerName}"]`);
            const count = parseInt(countInput?.value) || 0;
            const totalRevenue = count * value;
            const revenueDiv = document.getElementById(`revenue_limit_sell_${playerName}`);
            if (revenueDiv) {
                revenueDiv.textContent = this.formatMoney(totalRevenue) + ' ₽';
            }

            // Обновляем деньги на закрытие
            const startPosition = this.currentScenario.startPosition;
            if (startPosition.count > 0) {
                const costToClose = startPosition.count * this.currentScenario.startPrice;
                const balanceAfterRevenue = this.getPlayerBalance(playerName) + totalRevenue;
                const fundsLeft = balanceAfterRevenue - costToClose;

                const fundsLeftDiv = document.getElementById(`funds_left_limit_sell_${playerName}`);
                if (fundsLeftDiv) {
                    fundsLeftDiv.textContent = this.formatMoney(fundsLeft) + ' ₽';
                }
            }
        }



        // === ПЕРЕСЧЁТ ПРИ ИЗМЕНЕНИИ ЦЕНЫ В ЛИМИТНОЙ ПРОДАЖЕ ===
        if (inputType === 'limit_sell' && input.name.includes('limit_price_sell')) {
            const countInput = document.querySelector(`input[name="count_limit_sell_${playerName}"]`);
            const count = parseInt(countInput?.value) || 0;
            const totalRevenue = count * value;
            const revenueDiv = document.getElementById(`revenue_limit_sell_${playerName}`);
            if (revenueDiv) {
                revenueDiv.textContent = this.formatMoney(totalRevenue) + ' ₽';
            }
        }
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
        // ПРОВЕРЯЕМ ВСЕ ДЕЙСТВИЯ ПО ИГРОКАМ
        const container = this.playerActionsContainer;
        let hasErrors = false;

        container.querySelectorAll('.player-action-form').forEach(form => {
            const errors = form.querySelectorAll('.input-error');
            errors.forEach(err => {
                if (err.textContent.trim()) {
                    hasErrors = true;
                }
            });
        });

        if (hasErrors) {
            // Показываем красивое сообщение об ошибке
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = `
            background: #ffebee;
            color: #c62828;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 15px;
            border-left: 4px solid #c62828;
        `;
            errorMsg.textContent = '❌ Пожалуйста, исправьте ошибки в формах перед тем как раскрыть будущее';
            container.insertBefore(errorMsg, container.firstChild);

            setTimeout(() => {
                errorMsg.remove();
            }, 5000);

            return;
        }

        // Если ошибок нет, продолжаем обычный расчёт
        this.collectPlayerActions();
        this.calculateResults();
        const sessionData = {
            gamePlayers: this.gamePlayers,
            currentRound: this.currentRound,
            usedScenarios: this.usedScenarios,
            currentScenarioId: this.currentScenario.id,  // ← ВАЖНО: сохраняем ID
            sessionId: this.sessionId,
            playerBalances: {}
        };

        this.gamePlayers.forEach(player => {
            sessionData.playerBalances[player] = this.getPlayerBalance(player);
        });

        Storage.save('level2_session', sessionData);
        console.log('💾 Сессия сохранена после раскрытия будущего');
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

        // ✅ ДОБАВИТЬ: Сохраняем ID текущего сценария
        const sessionData = {
            gamePlayers: this.gamePlayers,
            currentRound: this.currentRound,
            usedScenarios: this.usedScenarios,
            currentScenarioId: this.currentScenario.id,  // ← ВАЖНО: сохраняем ID
            sessionId: this.sessionId,
            playerBalances: {}
        };

        // Сохраняем балансы каждого игрока
        this.gamePlayers.forEach(player => {
            sessionData.playerBalances[player] = this.getPlayerBalance(player);
        });

        Storage.save('level2_session', sessionData);
        console.log('💾 Сессия сохранена (ID сценария: ' + this.currentScenario.id + ')');
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