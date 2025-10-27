'use client';

import { useEffect, useMemo, useState } from 'react';

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

interface SearchEntry {
  id: string;
  title: string;
  description: string;
}

const normalize = (value: string) => value.toLowerCase().normalize('NFKD');

const collectEntries = (): SearchEntry[] => {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-search-entry="true"]')
  );

  return elements
    .map((element) => {
      const id = element.id;
      const title =
        element.dataset.searchTitle ||
        element.querySelector('h1, h2, h3')?.textContent ||
        '';
      const description =
        element.dataset.searchDescription ||
        element.getAttribute('aria-description') ||
        element.textContent ||
        '';

      if (!id || !title) return null;

      return {
        id,
        title: title.trim(),
        description: description.trim().replace(/\s+/g, ' ')
      };
    })
    .filter((entry): entry is SearchEntry => Boolean(entry));
};

const filterEntries = (entries: SearchEntry[], query: string) => {
  if (!query) return entries;
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return entries;

  return entries.filter((entry) => {
    const haystack = normalize(`${entry.title} ${entry.description}`);
    return tokens.every((token) => haystack.includes(token));
  });
};

const GlobalSearch = ({ open, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<SearchEntry[]>([]);

  useEffect(() => {
    if (!open) return;
    setEntries(collectEntries());
    setQuery('');

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const firstInput = document.getElementById('global-search-input');
    firstInput?.focus();
  }, [open, entries.length]);

  const results = useMemo(
    () => filterEntries(entries, query),
    [entries, query]
  );

  if (!open) return null;

  return (
    <div className="global-search" role="dialog" aria-modal="true">
      <div className="global-search__backdrop" onClick={onClose} />
      <div
        className="global-search__content"
        role="document"
        onClick={(event) => event.stopPropagation()}
      >
        <label className="global-search__label" htmlFor="global-search-input">
          Search the site
        </label>
        <input
          id="global-search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to search sections and features"
          aria-label="Search the site"
        />
        <ul className="global-search__results">
          {results.length === 0 && (
            <li className="global-search__empty">Nothing found yet.</li>
          )}
          {results.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const section = document.getElementById(entry.id);
                    section?.focus?.();
                  }, 0);
                }}
              >
                <strong>{entry.title}</strong>
                <span>{entry.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GlobalSearch;
