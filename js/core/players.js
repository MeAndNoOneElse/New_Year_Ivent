// ============================================================================
// УПРАВЛЕНИЕ ИГРОКАМИ
// ============================================================================
// Хранит список игроков и управляет их состоянием
// Требует: storage.js должен быть подключён ДО этого файла!

const Players = {
    // Список всех игроков: [{ name: 'Имя', score: 100 }, ...]
    list: [],

    /**
     * Инициализация: загружаем игроков из LocalStorage
     * Вызывайте в начале уровня!
     */
    init() {
        this.list = Storage.load('players') || [];
        console.log('✅ Players инициализирован. Всего:', this.list.length);
    },

    /**
     * Добавить нового игрока
     * @param {string} name - имя игрока
     */
    add(name) {
        if (!name || name.trim() === '') return false;

        // Проверяем, нет ли уже такого
        if (this.list.find(p => p.name === name)) {
            console.warn(`⚠️ Игрок "${name}" уже существует`);
            return false;
        }

        this.list.push({ name, score: 0 });
        Storage.save('players', this.list);
        console.log(`✅ Игрок "${name}" добавлен`);
        return true;
    },

    /**
     * Удалить игрока
     * @param {string} name - имя игрока
     */
    remove(name) {
        const before = this.list.length;
        this.list = this.list.filter(p => p.name !== name);

        if (this.list.length < before) {
            Storage.save('players', this.list);
            console.log(`✅ Игрок "${name}" удалён`);
            return true;
        }
        return false;
    },

    /**
     * Получить игрока по имени
     * @param {string} name
     * @returns {object|null}
     */
    getByName(name) {
        return this.list.find(p => p.name === name) || null;
    },

    /**
     * Обновить баллы игрока (добавить баллы)
     * @param {string} name
     * @param {number} points - баллы для добавления
     */
    addScore(name, points) {
        const player = this.getByName(name);
        if (player) {
            player.score = (player.score || 0) + points;
            Storage.save('players', this.list);
            console.log(`✅ Игроку "${name}" добавлено ${points} баллов (всего: ${player.score})`);
            return true;
        }
        console.warn(`⚠️ Игрок "${name}" не найден`);
        return false;
    },

    /**
     * Очистить всех игроков
     */
    clearAll() {
        this.list = [];
        Storage.save('players', this.list);
        console.log('✅ Все игроки удалены');
    },

    /**
     * Получить топ игроков по баллам
     * @param {number} limit
     * @returns {array}
     */
    getTop(limit = 10) {
        return this.list
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .slice(0, limit);
    }
};

// ✅ ВАЖНО: Players.init() должен быть вызван при загрузке уровня!