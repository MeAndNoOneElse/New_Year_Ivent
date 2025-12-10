// ============================================================================
// УТИЛИТА: РАБОТА С LOCALSTORAGE
// ============================================================================
// Используется для сохранения данных игроков, прогресса и состояния уровней

const Storage = {
    /**
     * Сохранить данные в LocalStorage
     * @param {string} key - ключ
     * @param {*} data - данные (будут преобразованы в JSON)
     */
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error(`❌ Ошибка сохранения ${key}:`, e);
        }
    },

    /**
     * Загрузить данные из LocalStorage
     * @param {string} key - ключ
     * @returns {*} - распарсенные данные или null
     */
    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error(`❌ Ошибка загрузки ${key}:`, e);
            return null;
        }
    },

    /**
     * Удалить данные из LocalStorage
     * @param {string} key - ключ
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error(`❌ Ошибка удаления ${key}:`, e);
        }
    },

    /**
     * Очистить всё LocalStorage
     */
    clear() {
        try {
            localStorage.clear();
            console.log('✅ LocalStorage очищен');
        } catch (e) {
            console.error('❌ Ошибка очистки localStorage:', e);
        }
    },

    /**
     * Получить все ключи
     * @returns {array}
     */
    keys() {
        return Object.keys(localStorage);
    }
};

// ✅ Экспортируем для использования в других модулях
