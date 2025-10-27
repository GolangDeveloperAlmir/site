'use client';

const tools = [
  {
    name: 'GoLand',
    description: 'Основная IDE для Go проектов.',
    url: 'https://www.jetbrains.com/go/'
  },
  {
    name: 'Warp',
    description: 'Терминал с совместной работой и сниппетами.',
    url: 'https://www.warp.dev/'
  },
  {
    name: 'Linear',
    description: 'Управление проектами и roadmap.',
    url: 'https://linear.app/'
  },
  {
    name: 'Notion',
    description: 'Хранилище заметок и базы знаний команды.',
    url: 'https://www.notion.so/'
  }
];

const ToolsSection = () => (
  <section
    id="tools"
    className="section tools"
    data-search-entry="true"
    data-search-title="Tools"
    data-search-description="Daily tools with descriptions"
    tabIndex={-1}
  >
    <header className="section__header">
      <h2>Рабочие инструменты</h2>
      <p>Постоянные спутники в ежедневной работе.</p>
    </header>
    <ul className="tools__list">
      {tools.map((tool) => (
        <li key={tool.name}>
          <h3>{tool.name}</h3>
          <p>{tool.description}</p>
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            Открыть
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default ToolsSection;
