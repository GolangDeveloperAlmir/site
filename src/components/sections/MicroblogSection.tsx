'use client';

import { useEffect, useMemo, useState } from 'react';

type Post = {
  id: string;
  timestamp: string;
  title: string;
  content: string;
  tags: string[];
};

const posts: Post[] = [
  {
    id: 'post-1',
    timestamp: '2025-01-01T09:00:00Z',
    title: 'Новый год — новые пайплайны',
    content: 'Запустил экспериментальную ветку Temporal воркфлоу. Ощущения: бодро!',
    tags: ['temporal', 'experiments']
  },
  {
    id: 'post-2',
    timestamp: '2024-12-15T12:30:00Z',
    title: 'Операционная прозорливость',
    content: 'Собрали метрику "время до инсайта". Она превращает ретроспективы в точные разговоры.',
    tags: ['observability']
  },
  {
    id: 'post-3',
    timestamp: '2024-11-20T17:45:00Z',
    title: 'Музыкальная пауза',
    content: 'Сыграли сет для команды. Бит bpm=90 успокаивает перед релизом.',
    tags: ['music', 'team']
  }
];

const storageKey = 'microblog-favorites';

const MicroblogSection = () => {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const filtered = useMemo(() => {
    if (!query) return posts;
    const lower = query.toLowerCase();
    return posts.filter((post) =>
      `${post.title} ${post.content} ${post.tags.join(' ')}`.toLowerCase().includes(lower)
    );
  }, [query]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((fav) => fav !== id) : [...current, id]
    );
  };

  return (
    <section
      id="microblog"
      className="section microblog"
      data-search-entry="true"
      data-search-title="Microblog"
      data-search-description="Timeline of short posts with favorites"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Дневник</h2>
        <p>Короткие заметки о рабочих и личных открытиях.</p>
      </header>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Поиск по заметкам"
        aria-label="Поиск по дневнику"
        className="microblog__search"
      />
      <ol className="microblog__list">
        {filtered.map((post) => (
          <li key={post.id} className={favorites.includes(post.id) ? 'favorite' : ''}>
            <div className="microblog__timestamp">
              <time dateTime={post.timestamp}>
                {new Date(post.timestamp).toLocaleString()}
              </time>
            </div>
            <div className="microblog__content">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="microblog__tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button type="button" onClick={() => toggleFavorite(post.id)}>
                {favorites.includes(post.id) ? 'Убрать из избранного' : 'В избранное'}
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && <li>Нет записей.</li>}
      </ol>
    </section>
  );
};

export default MicroblogSection;
