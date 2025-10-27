'use client';

const achievements = [
  { title: 'Инцидент < 15 минут', description: 'Среднее MTTR в платформе наблюдаемости' },
  { title: '100+ менторских часов', description: 'Поддержка инженеров в росте' },
  { title: 'Design System Lead', description: 'Внедрил единый UI-кит для внутренних инструментов' },
  { title: 'Async-first Team', description: 'Построил процессы распределённой команды' }
];

const AchievementsSection = () => (
  <section
    id="achievements"
    className="section achievements"
    data-search-entry="true"
    data-search-title="Achievements"
    data-search-description="Badge-style highlights without dates"
    tabIndex={-1}
  >
    <header className="section__header">
      <h2>Достижения</h2>
      <p>Короткие заметки, которыми горжусь.</p>
    </header>
    <div className="achievements__grid">
      {achievements.map((achievement) => (
        <div key={achievement.title} className="achievement">
          <h3>{achievement.title}</h3>
          <p>{achievement.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default AchievementsSection;
