// Управление игроками
const Players = {
  list: [],
  init() {
    this.list = Storage.load('players') || [];
  },
  add(name) {
    this.list.push({ name, score: 0 });
    Storage.save('players', this.list);
  },
  remove(name) {
    this.list = this.list.filter(p => p.name !== name);
    Storage.save('players', this.list);
  }
};
