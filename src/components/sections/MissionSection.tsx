'use client';

const pillars = [
  {
    title: 'Практичная инженерия',
    description:
      'Каждая система должна приносить ощутимую пользу людям, которые ею пользуются. Я создаю инструменты, которые ускоряют команды и снимают рутины.'
  },
  {
    title: 'Прозрачная коммуникация',
    description:
      'Команды, где уважают обратную связь и делятся знаниями, быстрее достигают целей. Я строю процессы, которые делают информацию доступной.'
  },
  {
    title: 'Любознательность без страха',
    description:
      'Эксперименты и исследования — топливо для развития. Я поддерживаю культуру, где ошибки — источник инсайтов, а не поводы для тревоги.'
  }
];

const MissionSection = () => (
  <section
    id="mission"
    className="section mission"
    data-search-entry="true"
    data-search-title="Mission & Vision"
    data-search-description="Mission statement with three guiding principles"
    tabIndex={-1}
  >
    <header className="section__header">
      <h2>Миссия и принципы</h2>
      <p>Помогаю командам запускать честные и устойчивые продукты.</p>
    </header>
    <div className="mission__pillars">
      {pillars.map((pillar) => (
        <article key={pillar.title} className="mission__pillar">
          <h3>{pillar.title}</h3>
          <p>{pillar.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default MissionSection;
