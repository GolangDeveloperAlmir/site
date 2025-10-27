'use client';

import { useEffect, useMemo, useState } from 'react';

type Frequency = 'часто' | 'норма' | 'редко';
type Complexity = 'easy' | 'medium' | 'hard';

type Question = {
  id: string;
  question: string;
  tags: string[];
  frequency: Frequency;
  complexity: Complexity;
};

const storageKey = 'interview-questions-progress';

const parseQuestionsFromEnv = (): Question[] => {
  const raw = process.env.NEXT_PUBLIC_QUESTIONS;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Question[];
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
};

const fallbackQuestions: Question[] = [
  {
    id: 'q1',
    question: 'Как работает планировщик Go и что такое ворк-стилер?',
    tags: ['Go'],
    frequency: 'часто',
    complexity: 'medium'
  },
  {
    id: 'q2',
    question: 'Какие метрики важны для оценки здоровья микросервиса?',
    tags: ['Observability'],
    frequency: 'часто',
    complexity: 'easy'
  },
  {
    id: 'q3',
    question: 'Опишите паттерн circuit breaker и его реализацию.',
    tags: ['Architecture'],
    frequency: 'норма',
    complexity: 'medium'
  },
  {
    id: 'q4',
    question: 'Как организовать blue-green деплой и почему это полезно?',
    tags: ['Infrastructure'],
    frequency: 'норма',
    complexity: 'hard'
  },
  {
    id: 'q5',
    question: 'Что такое backpressure в очередях сообщений?',
    tags: ['Messaging'],
    frequency: 'редко',
    complexity: 'hard'
  }
];

const fuzzyMatch = (query: string, text: string) => {
  if (!query) return true;
  let i = 0;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  for (const char of lowerQuery) {
    const index = lowerText.indexOf(char, i);
    if (index === -1) return false;
    i = index + 1;
  }
  return true;
};

const InterviewQuestionsSection = () => {
  const questions = useMemo(() => {
    const envQuestions = parseQuestionsFromEnv();
    return envQuestions.length ? envQuestions : fallbackQuestions;
  }, []);

  const [query, setQuery] = useState('');
  const [frequency, setFrequency] = useState<'all' | Frequency>('all');
  const [complexity, setComplexity] = useState<'all' | Complexity>('all');
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [importValue, setImportValue] = useState('');
  const [syncStatus, setSyncStatus] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setDone(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(done));
    } catch {
      // ignore
    }
  }, [done]);

  const filtered = questions.filter((question) => {
    if (frequency !== 'all' && question.frequency !== frequency) return false;
    if (complexity !== 'all' && question.complexity !== complexity) return false;
    const haystack = `${question.question} ${question.tags.join(' ')}`;
    return fuzzyMatch(query, haystack);
  });

  const toggle = (id: string) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExport = () => {
    const payload = JSON.stringify({ done }, null, 2);
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(payload).then(
        () => setSyncStatus('Прогресс скопирован в буфер обмена.'),
        () => setSyncStatus('Не удалось скопировать.')
      );
    }
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importValue) as { done?: Record<string, boolean> };
      if (parsed?.done) {
        setDone(parsed.done);
        setSyncStatus('Прогресс импортирован.');
      } else {
        setSyncStatus('Не найден ключ done.');
      }
    } catch {
      setSyncStatus('Ошибка парсинга JSON.');
    }
  };

  const handleSync = async () => {
    const endpoint = process.env.NEXT_PUBLIC_QUESTIONS_SYNC_URL;
    if (!endpoint) {
      setSyncStatus('Настройте NEXT_PUBLIC_QUESTIONS_SYNC_URL для синхронизации.');
      return;
    }
    try {
      setSyncStatus('Синхронизация...');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done, timestamp: new Date().toISOString() })
      });
      if (!response.ok) throw new Error('Request failed');
      setSyncStatus('Синхронизировано.');
    } catch (error) {
      console.error(error);
      setSyncStatus('Не удалось синхронизировать.');
    }
  };

  return (
    <section
      id="interview"
      className="section interview"
      data-search-entry="true"
      data-search-title="Interview Questions"
      data-search-description="Searchable bank with filters and cloud sync"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Вопросы с собеседований</h2>
        <p>Тренировочный список с фильтрами и прогрессом.</p>
      </header>
      <div className="interview__controls">
        <input
          type="search"
          placeholder="Поиск (fuzzy)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Поиск вопросов"
        />
        <label>
          Частота
          <select value={frequency} onChange={(event) => setFrequency(event.target.value as typeof frequency)}>
            <option value="all">Все</option>
            <option value="часто">часто</option>
            <option value="норма">норма</option>
            <option value="редко">редко</option>
          </select>
        </label>
        <label>
          Сложность
          <select
            value={complexity}
            onChange={(event) => setComplexity(event.target.value as typeof complexity)}
          >
            <option value="all">Все</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </label>
        <button type="button" onClick={handleExport}>
          Export JSON
        </button>
        <button type="button" onClick={handleSync}>
          Sync to cloud
        </button>
      </div>
      <textarea
        className="interview__import"
        placeholder="Вставьте JSON чтобы импортировать прогресс"
        value={importValue}
        onChange={(event) => setImportValue(event.target.value)}
      />
      <button type="button" onClick={handleImport} className="interview__import-btn">
        Import progress
      </button>
      {syncStatus && <p className="interview__status" role="status">{syncStatus}</p>}
      <ul className="interview__list">
        {filtered.map((question) => (
          <li key={question.id}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(done[question.id])}
                onChange={() => toggle(question.id)}
              />
              <span className="interview__question-text">{question.question}</span>
            </label>
            <div className="interview__meta">
              <span className={`frequency frequency--${question.frequency}`}>{question.frequency}</span>
              <span className={`complexity complexity--${question.complexity}`}>{question.complexity}</span>
              <div className="interview__tags">
                {question.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
        {filtered.length === 0 && <li>Нет результатов. Попробуйте изменить фильтры.</li>}
      </ul>
    </section>
  );
};

export default InterviewQuestionsSection;
