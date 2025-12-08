// Таблица лидеров
const Leaderboard = {
  init() {
    this.render();
  },
  render() {
    const players = Players.list.sort((a, b) => b.score - a.score);
    console.log('Лидеры:', players);
  }
};
