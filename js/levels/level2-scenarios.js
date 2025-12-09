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
  {
    id: '1',
    paper: 'MGNT',
    startDate: '15.02.2018',
      // Кол-во штук на начало
    startPosition: {count:0,price:0},
    news: 'Реальная история: Сергей Галицкий(основатель магнита) продает 29,1% акций своей компании группе ВТБ за 138 млрд руб.',
    analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
    startPrice: 4847,
    startImage: 'url("../assets/images/MGNT_2_start.png")',

    reaction: 'Падение 12 % — рынок опасался смены стратегии и ухода основателя.',
    endImage: 'url("../assets/images/MGNT_2_finish.png")',
    endDate: '19.02.2018',
    endPrice: 4251,
    minPrice: 4250,
    maxPrice: 4909
  },
    {
        id: '2',
        paper: 'MGNT',
        startDate: '15.02.2018',
        // Кол-во штук на начало
        startPosition: {count:1,price:5000},
        news: 'Реальная история: Сергей Галицкий(основатель магнита) продает 29,1% акций своей компании группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: 'url("../assets/images/MGNT_2_start.png")',

        reaction: 'Падение 12 % — рынок опасался смены стратегии и ухода основателя.',
        endImage: 'url("../assets/images/MGNT_2_finish.png")',
        endDate: '19.02.2018',
        endPrice: 4251,
        minPrice: 4250,
        maxPrice: 4909
    },{
        id: '3',
        paper: 'MGNT',
        startDate: '15.02.2018',
        // Кол-во штук на начало
        startPosition: {count:10,price:4847},
        news: 'Реальная история: Сергей Галицкий(основатель магнита) продает 29,1% акций своей компании группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: 'url("../assets/images/MGNT_2_start.png")',

        reaction: 'Падение 12 % — рынок опасался смены стратегии и ухода основателя.',
        endImage: 'url("../assets/images/MGNT_2_finish.png")',
        endDate: '19.02.2018',
        endPrice: 4251,
        minPrice: 4250,
        maxPrice: 4909
    },{
        id: '4',
        paper: 'MGNT',
        startDate: '15.02.2018',
        // Кол-во штук на начало
        startPosition: {count:-5,price:4900},
        news: 'Реальная история: Сергей Галицкий(основатель магнита) продает 29,1% акций своей компании группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: 'url("../assets/images/MGNT_2_start.png")',

        reaction: 'Падение 12 % — рынок опасался смены стратегии и ухода основателя.',
        endImage: 'url("../assets/images/MGNT_2_finish.png")',
        endDate: '19.02.2018',
        endPrice: 4251,
        minPrice: 4250,
        maxPrice: 4909
    },{
        id: '5',
        paper: 'MGNT',
        startDate: '15.02.2018',
        // Кол-во штук на начало
        startPosition: {count:7,price:4847},
        news: 'Реальная история: Сергей Галицкий(основатель магнита) продает 29,1% акций своей компании группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: 'url("../assets/images/MGNT_2_start.png")',

        reaction: 'Падение 12 % — рынок опасался смены стратегии и ухода основателя.',
        endImage: 'url("../assets/images/MGNT_2_finish.png")',
        endDate: '19.02.2018',
        endPrice: 4251,
        minPrice: 4250,
        maxPrice: 4909
    },{
        id: '6',
        paper: 'MGNT',
        startDate: '15.02.2018',
        // Кол-во штук на начало
        startPosition: {count:-1,price:4847},
        news: 'Реальная история: Сергей Галицкий(основатель магнита) продает 29,1% акций своей компании группе ВТБ за 138 млрд руб.',
        analysis: 'С одной стороны, это привлечение новых денег в компанию, с другой стороны смена руководства может привести к неопределённости',
        startPrice: 4847,
        startImage: 'url("../assets/images/MGNT_2_start.png")',

        reaction: 'Падение 12 % — рынок опасался смены стратегии и ухода основателя.',
        endImage: 'url("../assets/images/MGNT_2_finish.png")',
        endDate: '19.02.2018',
        endPrice: 4251,
        minPrice: 4250,
        maxPrice: 4909
    }

];
