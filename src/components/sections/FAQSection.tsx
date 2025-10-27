'use client';

import { useMemo, useState } from 'react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Можно ли связаться напрямую?',
    answer: 'Конечно! В разделе "Где меня найти" перечислены все предпочтительные каналы.'
  },
  {
    id: 'faq-2',
    question: 'Вы берёте консультации?',
    answer: 'Да, в ограниченном режиме. Расскажите контекст в Телеграме, и мы выберем формат.'
  },
  {
    id: 'faq-3',
    question: 'Можно ли использовать ваши заметки?',
    answer: 'Пожалуйста, используйте с указанием ссылки. Я рад, если это приносит пользу.'
  }
];

const FAQSection = () => {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(faqItems[0].id);

  const filtered = useMemo(() => {
    if (!query) return faqItems;
    const lower = query.toLowerCase();
    return faqItems.filter((item) =>
      `${item.question} ${item.answer}`.toLowerCase().includes(lower)
    );
  }, [query]);

  return (
    <section
      id="faq"
      className="section faq"
      data-search-entry="true"
      data-search-title="FAQ"
      data-search-description="Frequently asked questions with search and ARIA semantics"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Частые вопросы</h2>
        <p>Первый пункт развёрнут по умолчанию, а поиск моментально фильтрует список.</p>
      </header>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Поиск по вопросам"
        aria-label="Поиск по FAQ"
        className="faq__search"
      />
      <div className="faq__list" role="list">
        {filtered.map((item) => {
          const open = openId === item.id;
          return (
            <article key={item.id} role="listitem" className="faq__item">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${item.id}-content`}
                  onClick={() => setOpenId(open ? '' : item.id)}
                >
                  {item.question}
                </button>
              </h3>
              <div
                id={`${item.id}-content`}
                role="region"
                hidden={!open}
                aria-live="polite"
              >
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
        {filtered.length === 0 && <p>Ничего не найдено.</p>}
      </div>
    </section>
  );
};

export default FAQSection;
