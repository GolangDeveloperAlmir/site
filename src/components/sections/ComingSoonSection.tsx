'use client';

const upcoming = [
  {
    title: 'Async Ops Manual',
    description: 'Подборка практик для распределённых команд поддержки.'
  },
  {
    title: 'Observability Lab',
    description: 'Интерактивные задания по настройке метрик и алертов.'
  },
  {
    title: 'Rust Playground',
    description: 'Серия заметок о переходе сервисов на Rust.'
  }
];

const ComingSoonSection = () => (
  <section
    id="coming-soon"
    className="section coming-soon"
    data-search-entry="true"
    data-search-title="Coming Soon"
    data-search-description="Upcoming projects with RSS link"
    tabIndex={-1}
  >
    <header className="section__header">
      <h2>Скоро</h2>
      <p>Подпишитесь на RSS, чтобы узнать первыми.</p>
    </header>
    <div className="coming-soon__grid">
      {upcoming.map((item) => (
        <article key={item.title} className="coming-soon__card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href="/rss.xml">RSS →</a>
        </article>
      ))}
    </div>
  </section>
);

export default ComingSoonSection;
