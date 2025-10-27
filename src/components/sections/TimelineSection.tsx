'use client';

import { useState } from 'react';

type TimelineItem = {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
};

const careerTimeline: TimelineItem[] = [
  {
    id: 'career-1',
    title: 'Principal Engineer',
    company: 'Observa',
    date: '2024 — сейчас',
    description: 'Руковожу платформой наблюдаемости, запустил единый центр инцидентов.'
  },
  {
    id: 'career-2',
    title: 'Senior Go Developer',
    company: 'CloudBase',
    date: '2021 — 2024',
    description: 'Вёл миграции на сервисную архитектуру, внедрил хаос-тестирование.'
  },
  {
    id: 'career-3',
    title: 'Software Engineer',
    company: 'FinOps Lab',
    date: '2018 — 2021',
    description: 'Работал над аналитикой затрат и оптимизацией инфраструктуры.'
  }
];

const personalTimeline: TimelineItem[] = [
  {
    id: 'personal-1',
    title: 'Собрал первый механический синтезатор',
    company: '',
    date: '2023',
    description: 'Проект выходного дня, который превратился в музыкальный перформанс.'
  },
  {
    id: 'personal-2',
    title: 'Переехал в Берлин',
    company: '',
    date: '2022',
    description: 'Открыл для себя сообщество инженеров и новые кофейни.'
  }
];

const Timeline = ({ title, id, items }: { title: string; id: string; items: TimelineItem[] }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <section
      id={id}
      className="timeline"
      data-search-entry="true"
      data-search-title={title}
      data-search-description={`${title} milestones`}
      tabIndex={-1}
    >
      <header className="timeline__header">
        <h3>{title}</h3>
        <button type="button" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Скрыть' : 'Показать'}
        </button>
      </header>
      {expanded && (
        <ol className="timeline__list">
          {items.map((item) => (
            <li key={item.id}>
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__content">
                <h4>{item.title}</h4>
                {item.company && <p className="timeline__company">{item.company}</p>}
                <time className="timeline__date">{item.date}</time>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

const TimelineSection = () => (
  <section id="timelines" className="section timelines" tabIndex={-1} data-search-entry="true" data-search-title="Timelines" data-search-description="Career and personal timelines">
    <header className="section__header">
      <h2>Хронологии</h2>
      <p>Главные шаги в карьере и личной жизни.</p>
    </header>
    <div className="timelines__columns">
      <Timeline title="Карьерная линия" id="career" items={careerTimeline} />
      <Timeline title="Личная линия" id="personal" items={personalTimeline} />
    </div>
  </section>
);

export default TimelineSection;
