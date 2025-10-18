'use client';

const activities = [
  'Веду воркшоп по Observability для команды поддержки.',
  'Настраиваю новый пайплайн миграций через Temporal.',
  'Собираю плейлист для зимней ретроспективы.'
];

const lastUpdated = '2025-01-04';

const NowSection = () => {
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#now`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="now"
      className="section now"
      data-search-entry="true"
      data-search-title="Now"
      data-search-description="Current activities and shareable update"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Сейчас</h2>
        <p>Что происходит прямо сейчас.</p>
      </header>
      <time className="now__date" dateTime={lastUpdated}>
        Обновлено: {lastUpdated}
      </time>
      <ul className="now__list">
        {activities.map((activity) => (
          <li key={activity}>{activity}</li>
        ))}
      </ul>
      <button type="button" onClick={share} className="now__share">
        Поделиться обновлением
      </button>
    </section>
  );
};

export default NowSection;
