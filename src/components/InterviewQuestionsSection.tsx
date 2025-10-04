'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

const DATA_STORAGE_KEY = 'interviewQuestions:data';
const COMPLETED_STORAGE_KEY = 'interviewQuestions:completed';

export type Frequency = 'часто' | 'норма' | 'редко';
export type Complexity = 'junior' | 'middle' | 'senior';

type QuestionInput = {
  id?: unknown;
  question?: unknown;
  answer?: unknown;
  tags?: unknown;
  frequency?: unknown;
  complexity?: unknown;
  source?: unknown;
};

export interface InterviewQuestion {
  id: string;
  question: string;
  answer?: string;
  tags: string[];
  frequency: Frequency;
  complexity: Complexity;
  source?: string;
}

const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: 'часто', label: 'Часто' },
  { value: 'норма', label: 'Норма' },
  { value: 'редко', label: 'Редко' }
];

const complexityOptions: { value: Complexity; label: string; hint: string }[] = [
  { value: 'junior', label: 'Базовый', hint: 'Junior' },
  { value: 'middle', label: 'Средний', hint: 'Middle' },
  { value: 'senior', label: 'Продвинутый', hint: 'Senior' }
];

const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'complexity', label: 'По сложности' },
  { value: 'frequency', label: 'По частоте' }
] as const;

type SortMode = (typeof sortOptions)[number]['value'];

const frequencyWeight: Record<Frequency, number> = {
  часто: 0,
  норма: 1,
  редко: 2
};

const complexityWeight: Record<Complexity, number> = {
  junior: 0,
  middle: 1,
  senior: 2
};

const ensureTags = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
      .filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
};

let importCounter = 0;

const sanitizeQuestion = (input: QuestionInput): InterviewQuestion | null => {
  if (typeof input !== 'object' || input === null) return null;
  if (typeof input.question !== 'string' || !input.question.trim()) return null;

  const id =
    typeof input.id === 'string' && input.id.trim()
      ? input.id.trim()
      : `imported-${importCounter++}`;
  const frequency = frequencyOptions.find((option) => option.value === input.frequency)
    ?.value ?? 'норма';
  const complexity = complexityOptions.find((option) => option.value === input.complexity)
    ?.value ?? 'middle';

  return {
    id,
    question: input.question.trim(),
    answer: typeof input.answer === 'string' ? input.answer.trim() : undefined,
    tags: ensureTags(input.tags),
    frequency,
    complexity,
    source:
      typeof input.source === 'string' && input.source.trim()
        ? input.source.trim()
        : undefined
  };
};

const defaultQuestions: InterviewQuestion[] = [
  {
    id: 'go-context-cancellation',
    question: 'Как в Go работает контекст и почему с ним важно уметь отменять долгие операции?',
    answer:
      'Показать, как устроены Context WithTimeout/WithCancel, как прокидывать их в goroutine и зачем отменять запросы к внешним сервисам.',
    tags: ['Go', 'Concurrency', 'Resilience'],
    frequency: 'часто',
    complexity: 'middle'
  },
  {
    id: 'k8s-crashloopbackoff',
    question: 'Что означает статус CrashLoopBackOff в Kubernetes и как бы вы диагностировали проблему?',
    answer:
      'Нужно описать цикл рестартов, посмотреть describe, логи контейнера, readiness/liveness, лимиты ресурсов и общие паттерны.',
    tags: ['Kubernetes', 'Operations', 'Troubleshooting'],
    frequency: 'часто',
    complexity: 'middle'
  },
  {
    id: 'feature-flags-system',
    question: 'Как бы вы спроектировали систему feature flag-ов для продукта с миллионами пользователей?',
    answer:
      'Рассказать про rollout по сегментам, audit trail, антибюджет на чистку флагов и интеграции с CI/CD.',
    tags: ['Architecture', 'Feature Flags', 'Product'],
    frequency: 'норма',
    complexity: 'senior'
  },
  {
    id: 'apdex-calculation',
    question: 'Как считается Apdex и чем он полезнее простой медианы времени ответа?',
    answer:
      'Apdex агрегирует латентность в индикатор удовлетворённости — полезно обсудить выбор T, влияние slow-requests и коммуникацию с бизнесом.',
    tags: ['Observability', 'SLI/SLO'],
    frequency: 'норма',
    complexity: 'middle'
  },
  {
    id: 'saga-pattern',
    question: 'Объясните паттерн Saga и приведите пример, когда он лучше, чем распределённая транзакция.',
    answer:
      'Сравнить choreography vs orchestration, показать компенсирующие действия и что делать, если шагов становится слишком много.',
    tags: ['Architecture', 'Distributed Systems'],
    frequency: 'норма',
    complexity: 'senior'
  },
  {
    id: 'zero-downtime-migrations',
    question: 'Как организовать миграции базы без простоя, если нужно добавить обязательное поле?',
    answer:
      'Рассказать про expand-contract, backfill, feature toggles на запись и как мониторить деградацию во время миграции.',
    tags: ['Databases', 'Delivery'],
    frequency: 'часто',
    complexity: 'middle'
  },
  {
    id: 'token-bucket',
    question: 'Как работает алгоритм token bucket и как применить его в сервисе с непредсказуемой нагрузкой?',
    answer:
      'Нужно уметь объяснить refill rate, burst, что хранить в Redis/в памяти и как наблюдать ситуацию при runaway трафике.',
    tags: ['Backend', 'Rate limiting'],
    frequency: 'норма',
    complexity: 'middle'
  },
  {
    id: 'event-vs-request',
    question: 'Event-driven или request/response: как выбрать коммуникацию между сервисами?',
    answer:
      'Сравнить согласованность, наблюдаемость, обратную совместимость, топологию и влияние на конечную задержку.',
    tags: ['Architecture', 'Messaging'],
    frequency: 'норма',
    complexity: 'senior'
  },
  {
    id: 'product-discovery-interviews',
    question: 'Как вы проводите пользовательские интервью, чтобы команда не влюблялась в решение?',
    answer:
      'Говорим про подготовку сценария, активное слушание, synthesis и как результаты превращаются в гипотезы.',
    tags: ['Discovery', 'Product', 'Customer Research'],
    frequency: 'редко',
    complexity: 'junior'
  },
  {
    id: 'observability-pillars',
    question: 'Что включают три столпа наблюдаемости и как их связать в единую историю для онколла?',
    answer:
      'Показать связь метрик, логов и трассировок, построить storytelling и договориться о runbooks для команды.',
    tags: ['Observability', 'Incident Response'],
    frequency: 'часто',
    complexity: 'junior'
  },
  {
    id: 'experiment-design',
    question: 'Как сформулировать эксперимент так, чтобы инженерная команда понимала критерии успеха?',
    answer:
      'Разобрать постановку гипотезы, метрику успеха, минимальный срез и кто принимает решение о rollout.',
    tags: ['Experimentation', 'Product'],
    frequency: 'норма',
    complexity: 'middle'
  },
  {
    id: 'retro-outcomes',
    question: 'Как сделать ретро после инцидента полезным, а не списком виноватых?',
    answer:
      'Говорим про blameless подход, action items с owners, закрытие контекстов и связь с roadmap.',
    tags: ['Team', 'Postmortem'],
    frequency: 'редко',
    complexity: 'junior'
  }
];

const normalizeText = (value: string) => value.toLowerCase();

const fuzzyMatch = (query: string, text: string) => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  const haystack = text.toLowerCase();

  return tokens.every((token) => {
    if (haystack.includes(token)) return true;
    let lastIndex = 0;
    for (const char of token) {
      const found = haystack.indexOf(char, lastIndex);
      if (found === -1) {
        return false;
      }
      lastIndex = found + 1;
    }
    return true;
  });
};

const InterviewQuestionsSection = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>(defaultQuestions);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState<Frequency | 'all'>('all');
  const [complexityFilter, setComplexityFilter] = useState<Complexity | 'all'>('all');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [feedback, setFeedback] = useState<{ tone: 'info' | 'success' | 'error'; message: string } | null>(null);
  const [syncState, setSyncState] = useState<'idle' | 'loading'>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const storedQuestions = window.localStorage.getItem(DATA_STORAGE_KEY);
      if (storedQuestions) {
        const parsed = JSON.parse(storedQuestions) as QuestionInput[];
        const sanitized = parsed
          .map((item) => sanitizeQuestion(item))
          .filter((item): item is InterviewQuestion => Boolean(item));
        if (sanitized.length > 0) {
          setQuestions(sanitized);
        }
      }
    } catch {
      // ignore parsing error
    }
    try {
      const storedCompleted = window.localStorage.getItem(COMPLETED_STORAGE_KEY);
      if (storedCompleted) {
        const parsed = JSON.parse(storedCompleted) as Record<string, boolean>;
        if (parsed && typeof parsed === 'object') {
          setCompleted(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const toggleCompletion = useCallback((id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const filteredQuestions = useMemo(() => {
    const searchable = questions.map((question) => ({
      ...question,
      searchText: normalizeText(
        [question.question, question.answer, question.tags.join(' '), question.source]
          .filter(Boolean)
          .join(' ')
      )
    }));

    let result = searchable.filter((item) => fuzzyMatch(search, item.searchText));

    if (frequencyFilter !== 'all') {
      result = result.filter((item) => item.frequency === frequencyFilter);
    }

    if (complexityFilter !== 'all') {
      result = result.filter((item) => item.complexity === complexityFilter);
    }

    if (sortMode === 'complexity') {
      result = [...result].sort((a, b) => {
        const diff = complexityWeight[a.complexity] - complexityWeight[b.complexity];
        return diff === 0 ? frequencyWeight[a.frequency] - frequencyWeight[b.frequency] : diff;
      });
    } else if (sortMode === 'frequency') {
      result = [...result].sort((a, b) => {
        const diff = frequencyWeight[a.frequency] - frequencyWeight[b.frequency];
        return diff === 0 ? complexityWeight[a.complexity] - complexityWeight[b.complexity] : diff;
      });
    }

    return result;
  }, [questions, search, frequencyFilter, complexityFilter, sortMode]);

  const completedCount = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed]
  );

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImportChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result;
        if (typeof text !== 'string') {
          throw new Error('Формат файла не поддерживается.');
        }
        const parsed = JSON.parse(text) as QuestionInput[];
        const sanitized = parsed
          .map((item) => sanitizeQuestion(item))
          .filter((item): item is InterviewQuestion => Boolean(item));
        if (sanitized.length === 0) {
          throw new Error('В файле нет валидных вопросов.');
        }
        setQuestions(sanitized);
        setFeedback({ tone: 'success', message: `Импортировано ${sanitized.length} вопросов.` });
      } catch (error) {
        setFeedback({
          tone: 'error',
          message:
            error instanceof Error ? error.message : 'Не удалось импортировать файл.'
        });
      }
    };
    reader.onerror = () => {
      setFeedback({ tone: 'error', message: 'Ошибка чтения файла.' });
    };
    reader.readAsText(file);
    event.target.value = '';
  }, []);

  const handleExport = useCallback(async () => {
    const payload = JSON.stringify(questions, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setFeedback({ tone: 'success', message: 'JSON сохранён в буфере обмена.' });
      return;
    } catch {
      // ignore clipboard failure
    }

    try {
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'interview-questions.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setFeedback({ tone: 'success', message: 'Файл с вопросами скачан.' });
    } catch (error) {
      setFeedback({
        tone: 'error',
        message:
          error instanceof Error ? error.message : 'Не удалось экспортировать вопросы.'
      });
    }
  }, [questions]);

  const handleSync = useCallback(async () => {
    const endpoint = process.env.NEXT_PUBLIC_QUESTIONS_SYNC_URL;
    if (!endpoint) {
      setFeedback({
        tone: 'error',
        message: 'Не задан NEXT_PUBLIC_QUESTIONS_SYNC_URL, синхронизация недоступна.'
      });
      return;
    }

    setSyncState('loading');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions,
          completed: Object.entries(completed)
            .filter(([, done]) => done)
            .map(([id]) => id),
          updatedAt: new Date().toISOString()
        })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Сервер ответил статусом ${response.status}`);
      }
      setFeedback({ tone: 'success', message: 'Синхронизировано с облаком.' });
    } catch (error) {
      setFeedback({
        tone: 'error',
        message:
          error instanceof Error ? error.message : 'Не удалось синхронизировать вопросы.'
      });
    } finally {
      setSyncState('idle');
    }
  }, [questions, completed]);

  const handleReset = useCallback(() => {
    setQuestions(defaultQuestions);
    setFeedback({ tone: 'info', message: 'Вернулся дефолтный набор вопросов.' });
  }, []);

  return (
    <section id="questions" className="section questions-section">
      <div className="section-shell questions-shell">
        <div className="section-heading">
          <h2>Вопросы с собеседований</h2>
          <p>
            Здесь собраны темы, которые всплывают на технических и продуктовых интервью. Отмечайте, что уже разобрали, фильтруйте
            по частоте и сложности, а при необходимости — синхронизируйте набор с командой.
          </p>
        </div>

        <div className="questions-toolbar glass">
          <div className="questions-search">
            <label htmlFor="questions-search" className="sr-only">
              Поиск по вопросам
            </label>
            <input
              id="questions-search"
              type="search"
              placeholder="Поиск или быстрый фильтр..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <span className="questions-count">
              {filteredQuestions.length} из {questions.length} • готово {completedCount}
            </span>
          </div>
          <div className="questions-controls">
            <fieldset className="filter-group">
              <legend>Частота</legend>
              <button
                type="button"
                className={frequencyFilter === 'all' ? 'is-active' : undefined}
                onClick={() => setFrequencyFilter('all')}
              >
                Все
              </button>
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={frequencyFilter === option.value ? 'is-active' : undefined}
                  onClick={() => setFrequencyFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </fieldset>
            <fieldset className="filter-group">
              <legend>Сложность</legend>
              <button
                type="button"
                className={complexityFilter === 'all' ? 'is-active' : undefined}
                onClick={() => setComplexityFilter('all')}
              >
                Любая
              </button>
              {complexityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={complexityFilter === option.value ? 'is-active' : undefined}
                  onClick={() => setComplexityFilter(option.value)}
                  title={option.hint}
                >
                  {option.label}
                </button>
              ))}
            </fieldset>
            <label className="sort-select">
              <span className="sr-only">Сортировка</span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="questions-actions">
            <button type="button" onClick={handleImportClick}>
              Импорт JSON
            </button>
            <button type="button" onClick={handleExport}>
              Экспорт JSON
            </button>
            <button type="button" onClick={handleSync} disabled={syncState === 'loading'}>
              {syncState === 'loading' ? 'Синхронизация…' : 'Синхронизировать с облаком'}
            </button>
            <button type="button" className="link-inline" onClick={handleReset}>
              Сбросить к пресету
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="sr-only"
              onChange={handleImportChange}
            />
          </div>
          {feedback && (
            <p className={`questions-feedback questions-feedback-${feedback.tone}`}>
              {feedback.message}
            </p>
          )}
        </div>

        <div className="questions-list">
          {filteredQuestions.map((question) => {
            const isDone = completed[question.id];
            return (
              <article
                key={question.id}
                className="question-card glass"
                data-completed={isDone ? 'true' : undefined}
              >
                <header className="question-card-header">
                  <h3>{question.question}</h3>
                  <div className="question-badges">
                    <span
                      className="badge badge-frequency"
                      data-frequency={question.frequency}
                    >
                      {frequencyOptions.find((option) => option.value === question.frequency)?.label}
                    </span>
                    <span
                      className="badge badge-complexity"
                      data-complexity={question.complexity}
                    >
                      {complexityOptions.find((option) => option.value === question.complexity)?.label}
                    </span>
                  </div>
                </header>
                {question.answer && <p className="question-answer">{question.answer}</p>}
                {question.tags.length > 0 && (
                  <ul className="question-tags">
                    {question.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                {question.source && (
                  <p className="question-source">
                    Источник: <a href={question.source}>{question.source}</a>
                  </p>
                )}
                <label className="question-complete">
                  <input
                    type="checkbox"
                    checked={Boolean(isDone)}
                    onChange={() => toggleCompletion(question.id)}
                  />
                  <span>Отметить как проработанный</span>
                </label>
              </article>
            );
          })}
          {filteredQuestions.length === 0 && (
            <div className="questions-empty glass">
              <p>Нет вопросов по заданным условиям. Попробуйте изменить фильтры или поиск.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InterviewQuestionsSection;
