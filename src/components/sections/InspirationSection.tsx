'use client';

import { FormEvent, useEffect, useState } from 'react';

type InspirationItem = {
  title: string;
  url: string;
};

const reading: InspirationItem[] = [
  { title: 'Staff Engineer', url: 'https://staffeng.com/book' },
  { title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/' }
];

const watching: InspirationItem[] = [
  { title: 'GOTO Conferences', url: 'https://www.youtube.com/@GOTO' },
  { title: 'Observability Talks', url: 'https://www.youtube.com/@o11y' }
];

const listening: InspirationItem[] = [
  { title: 'Darknet Diaries', url: 'https://darknetdiaries.com/' },
  { title: 'Go Time', url: 'https://changelog.com/gotime' }
];

const storageKey = 'inspiration-save-for-later';

const InspirationSection = () => {
  const [saveForLater, setSaveForLater] = useState<InspirationItem[]>([]);
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setSaveForLater(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(saveForLater));
    } catch {
      // ignore
    }
  }, [saveForLater]);

  const saveItem = (item: InspirationItem) => {
    setSaveForLater((current) => {
      if (current.some((existing) => existing.url === item.url)) return current;
      return [...current, item];
    });
  };

  const removeItem = (url: string) => {
    setSaveForLater((current) => current.filter((item) => item.url !== url));
  };

  const handleCustomSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!customTitle || !customUrl) return;
    saveItem({ title: customTitle, url: customUrl });
    setCustomTitle('');
    setCustomUrl('');
  };

  const renderList = (items: InspirationItem[]) => (
    <ul>
      {items.map((item) => (
        <li key={item.url}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
          <button type="button" onClick={() => saveItem(item)}>
            Save for later
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="inspiration"
      className="section inspiration"
      data-search-entry="true"
      data-search-title="Inspiration"
      data-search-description="Reading, watching, listening lists with save for later"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Вдохновение</h2>
        <p>Что читаю, смотрю и слушаю, чтобы подпитывать идеи.</p>
      </header>
      <div className="inspiration__columns">
        <article>
          <h3>Reading</h3>
          {renderList(reading)}
        </article>
        <article>
          <h3>Watching</h3>
          {renderList(watching)}
        </article>
        <article>
          <h3>Listening</h3>
          {renderList(listening)}
        </article>
      </div>
      <section className="inspiration__save">
        <h3>Save for later</h3>
        {saveForLater.length === 0 && <p>Добавьте ссылки, которые хотите посмотреть позже.</p>}
        <ul>
          {saveForLater.map((item) => (
            <li key={item.url}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <button type="button" onClick={() => removeItem(item.url)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCustomSubmit} className="inspiration__form">
          <input
            type="text"
            placeholder="Название"
            value={customTitle}
            onChange={(event) => setCustomTitle(event.target.value)}
            aria-label="Название ссылки"
          />
          <input
            type="url"
            placeholder="https://"
            value={customUrl}
            onChange={(event) => setCustomUrl(event.target.value)}
            aria-label="URL ссылки"
          />
          <button type="submit">Добавить</button>
        </form>
      </section>
    </section>
  );
};

export default InspirationSection;
