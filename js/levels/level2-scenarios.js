// Список сценариев для Level2 — оставлен пустым, заполнишь сам.
// Структура объектов:
// {
//   id: 'string',                // уникальный id
//   paper: 'бумага (AAPL / SBER и т.д.)',
//   news: 'новость (кратко)',
//   analysis: 'анализ / ожидания',
//   startDate: 'YYYY-MM-DD',
//   startPrice: number,          // цена в начале
//   startImage: 'path/to/start.jpg', // опционально
//   reaction: 'реальная реакция (кратко)',
//   endImage: 'path/to/end.jpg',     // опционально
//   endDate: 'YYYY-MM-DD',
//   endPrice: number,            // цена в конце
//   minPrice: number,            // минимальная цена в процессе
//   maxPrice: number             // максимальная цена в процессе
// }

const LEVEL2_SCENARIOS = [
  // Пустой список — заполнишь своими сценариями.

  {
    id: 'sc1',
    paper: 'MGNT',
    startDate: '16.02.2018',
    news: 'Реальная история: Сергей Галицкий(основатель магнита) продает 29,1% акций своей компании группе ВТБ за 138 млрд руб.',
    analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
    startPrice: 120.5,
    startImage: 'assets/images/MGNT_start.png',

    reaction: 'Падение ~4–5 % — рынок опасался смены стратегии и ухода основателя.',
    endImage: 'assets/images/MGNT_end.png',
    endDate: '28.02.2018',
    endPrice: 130.2,
    minPrice: 118.0,
    maxPrice: 133.5
  }

];

