'use client';

import { useEffect, useState } from 'react';

// Minimal, well-typed global search component to replace corrupted content
// Extend as needed by the app.

type SearchItem = {
  id: string;
  title: string;
  description: string;
};

type GlobalSearchProps = {
  open?: boolean;
  items?: SearchItem[];
};

function GlobalSearch({ open = false, items = [] }: GlobalSearchProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // placeholder for any side-effects when search opens
  }, [open]);

  const filtered = query
    ? items.filter((it) =>
        it.title.toLowerCase().includes(query.toLowerCase()) ||
        it.description.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  return (
    <div>
      <input
        id="global-search-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul>
        {filtered.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`}>{it.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GlobalSearch;
