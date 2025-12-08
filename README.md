# 🎄 Семейный Новогодний Квест 2025

Интерактивный онлайн-квест для всей семьи! Играйте на одном устройстве, демонстрируя на телевизоре. 10 уровней с разными механиками и технологиями.

## 🎮 Как играть

1. Откройте сайт на планшете/ноутбуке
2. Подключите устройство к телевизору (демонстрация экрана)
3. Добавьте игроков
4. Выбирайте уровни и соревнуйтесь!

## 📊 Уровни

| # | Название | Сложность | Технологии | Ход игры |
|---|----------|-----------|------------|----------|
| 1 | 🔍 Охота за сокровищами | ⭐ | CSS, DOM | Ищем 7 скрытых артефактов на карте |
| 2 | 📈 Биржевой магнат | ⭐⭐ | Chart.js, Canvas | Покупаем/продаём акции, ждём результат |
| 3 | 🌱 Ландшафтный дизайнер | ⭐⭐ | Drag&Drop, CSS Grid | Сажаем растения по правилам |
| 4 | 🔐 Криптограф | ⭐⭐ | JavaScript | Собираем декодер, расшифровываем сообщение |
| 5 | 🧩 3D Лабиринт | ⭐⭐ | A-Frame | Ищем выход в 3D лабиринте |
| 6 | 🌍 GeoGuessr | ⭐⭐⭐ | Leaflet.js | Угадываем место по фото на карте |
| 7 | 🎣 Рыбалка | ⭐⭐ | Canvas 2D | Ловим рыбу, QTE механики |
| 8 | 🍳 Кухня | ⭐⭐⭐ | DOM, Drag&Drop | Готовим блюда по рецептам |
| 9 | ❓ Викторина | ⭐ | JavaScript | Угадываем ответы друг друга |
| 10 | 🕵️ Детектив | ⭐ | JavaScript | Ищем самозванца среди игроков |

## 📁 Структура проекта

```
├── index.html                 # Главный хаб
├── css/
│   ├── main.css              # Основные стили
│   ├── animations.css        # Анимации
│   └── themes/
│       └── new-year.css      # Новогодняя тема
├── js/
│   ├── core/
│   │   ├── app.js            # Логика приложения
│   │   ├── storage.js        # LocalStorage
│   │   ├── players.js        # Управление игроками
│   │   └── leaderboard.js    # Таблица лидеров
│   └── levels/
│       ├── level1-treasure.js
│       ├── level2-stocks.js
│       ├── level3-garden.js
│       ├── level4-crypto.js
│       ├── level5-maze.js
│       ├── level6-geoguessr.js
│       ├── level7-fishing.js
│       ├── level8-kitchen.js
│       ├── level9-quiz.js
│       └── level10-detective.js
├── levels/
│   ├── level1-treasure.html
│   ├── level2-stocks.html
│   ├── level3-garden.html
│   ├── level4-crypto.html
│   ├── level5-maze.html
│   ├── level6-geoguessr.html
│   ├── level7-fishing.html
│   ├── level8-kitchen.html
│   ├── level9-quiz.html
│   └── level10-detective.html
└── assets/
    ├── data/
    │   ├── levels.json
    │   ├── quiz-questions.json
    │   ├── detective-words.json
    │   ├── recipes.json
    │   └── fish-types.json
    ├── images/
    └── sounds/
```

## 🛠️ Технологии

- HTML5, CSS3, JavaScript (ES6+)
- Chart.js — графики акций
- A-Frame — 3D лабиринт
- Leaflet.js — карты
- Canvas API — рыбалка, анимации
- Drag & Drop API — сад, кухня
- LocalStorage — сохранение прогресса

## 🚀 Запуск

Проект работает на GitHub Pages:

1. Settings → Pages
2. Source: Deploy from branch
3. Branch: master, / (root)
4. Save

Сайт будет доступен: `https://meandnooneelse.github.io/New_Year_Ivent/`

## 👨‍👩‍👧‍👦 Авторы

Семейный проект для новогодних праздников 2025!
