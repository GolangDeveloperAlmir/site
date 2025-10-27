'use client';

import { useMemo, useState } from 'react';

type Resource = {
  title: string;
  summary: string;
  url: string;
  category: 'course' | 'book' | 'tool';
};

const resources: Resource[] = [
  {
    title: 'Practical Monitoring',
    summary: 'Книга о построении зрелых процессов наблюдаемости.',
    url: 'https://www.oreilly.com/library/view/practical-monitoring/9781491957356/',
    category: 'book'
  },
  {
    title: 'Systems Thinking',
    summary: 'Курс о мышлении в системах и организационных изменениях.',
    url: 'https://kailo.school/',
    category: 'course'
  },
  {
    title: 'Excalidraw',
    summary: 'Инструмент для совместных диаграмм и стратегических сессий.',
    url: 'https://excalidraw.com/',
    category: 'tool'
  }
];

const RecommendedSection = () => {
  const [filter, setFilter] = useState<'all' | Resource['category']>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return resources;
    return resources.filter((resource) => resource.category === filter);
  }, [filter]);

  return (
    <section
      id="recommended"
      className="section recommended"
      data-search-entry="true"
      data-search-title="Recommended"
      data-search-description="Curated resources with filter"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Рекомендую</h2>
        <p>Подборка материалов, к которым часто возвращаюсь.</p>
      </header>
      <div className="recommended__filters">
        <label>
          Категория
          <select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)}>
            <option value="all">Все</option>
            <option value="book">Книги</option>
            <option value="course">Курсы</option>
            <option value="tool">Инструменты</option>
          </select>
        </label>
      </div>
      <ul className="recommended__list">
        {filtered.map((resource) => (
          <li key={resource.title}>
            <h3>{resource.title}</h3>
            <p>{resource.summary}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Открыть
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecommendedSection;
