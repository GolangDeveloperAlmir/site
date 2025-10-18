'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface Section {
  id: string;
  title: string;
  description: string;
}

const sections: Section[] = [
  { id: 'hero', title: 'Главная', description: 'Знакомство и быстрые ссылки для связи.' },
  { id: 'about', title: 'Обо мне', description: 'Биография, миссия и факты о себе.' },
  { id: 'mission', title: 'Миссия и ценности', description: 'Ключевые принципы и ориентиры в работе.' },
  { id: 'skills', title: 'Навыки и языки', description: 'Категории навыков, уровни владения и текущие изучения.' },
  { id: 'projects', title: 'Проекты', description: 'Пет-проекты, коммерческие инициативы и ссылки.' },
  { id: 'questions', title: 'Вопросы с собеседований', description: 'Коллекция вопросов с фильтрами и синхронизацией.' },
  { id: 'travel', title: 'Путешествия', description: 'Города и страны, которые удалось посетить.' },
  { id: 'gallery', title: 'Галерея', description: 'Подборка фотографий и иллюстраций.' },
  { id: 'career', title: 'Карьера', description: 'Основные этапы профессионального пути.' },
  { id: 'timeline', title: 'Личный таймлайн', description: 'Запоминающиеся события и моменты.' },
  { id: 'achievements', title: 'Достижения', description: 'Значимые победы и награды.' },
  { id: 'inspiration', title: 'Вдохновение', description: 'Что читаю, смотрю и слушаю сейчас.' },
  { id: 'faq', title: 'FAQ', description: 'Ответы на часто задаваемые вопросы.' },
  { id: 'now', title: 'Сейчас', description: 'Чем занимаюсь и какие цели ставлю.' },
  { id: 'recommended', title: 'Рекомендую', description: 'Курсы, книги и полезные материалы.' },
  { id: 'tools', title: 'Рабочие инструменты', description: 'Софт и сервисы для ежедневной работы.' },
  { id: 'presets', title: 'Пресеты тем', description: 'Готовые цветовые схемы для сайта.' },
  { id: 'microblog', title: 'Дневник', description: 'Короткие заметки и размышления.' },
  { id: 'music', title: 'Музыка', description: 'Плейлисты и любимые альбомы.' },
  { id: 'coming-soon', title: 'Скоро', description: 'Предстоящие проекты и задумки.' },
  { id: 'contact', title: 'Где меня найти', description: 'Социальные сети и способы связи.' }
];

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery('');
    }
  }, [open]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return sections;
    return sections.filter(({ title, description }) => {
      const haystack = `${title} ${description}`.toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [query]);

  return (
    <>
      <button
        type="button"
        className="search-toggle"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="global-search-dialog"
        onClick={() => setOpen(true)}
      >
        Поиск
      </button>
      {open && (
        <div className="global-search-backdrop" role="presentation">
          <div
            ref={containerRef}
            className="global-search"
            role="dialog"
            aria-modal="true"
            id="global-search-dialog"
          >
            <header className="global-search-header">
              <label htmlFor="global-search-input">Поиск по разделам</label>
              <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть поиск">
                ×
              </button>
            </header>
            <input
              ref={inputRef}
              id="global-search-input"
              type="search"
              placeholder="Начните вводить название раздела"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ul className="global-search-results">
              {results.length === 0 && <li>Ничего не найдено</li>}
              {results.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} onClick={() => setOpen(false)}>
                    <strong>{section.title}</strong>
                    <span>{section.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSearch;
