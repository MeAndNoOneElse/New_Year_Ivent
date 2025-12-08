// Основная логика приложения
const App = {
  init() {
    console.log('🎄 Семейный Квест 2025 загружен!');
    Players.init();
    Leaderboard.init();
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
