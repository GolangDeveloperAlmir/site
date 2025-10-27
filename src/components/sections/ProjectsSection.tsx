'use client';

import { useMemo, useState } from 'react';

type Project = {
  name: string;
  description: string;
  tags: string[];
  url?: string;
  updatedAt: string;
  note?: string;
};

const parseProjectsFromEnv = (): Project[] => {
  const raw = process.env.NEXT_PUBLIC_PROJECTS;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Project[];
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
};

const fallbackProjects: Project[] = [
  {
    name: 'Observa',
    description: 'Платформа для внутреннего мониторинга и ответов на инциденты.',
    tags: ['Go', 'Grafana', 'On-call'],
    url: 'https://github.com/example/observa',
    updatedAt: '2024-11-20'
  },
  {
    name: 'Driftless',
    description: 'Инструмент миграций для микросервисов с декларативными сценариями.',
    tags: ['Go', 'Kubernetes'],
    note: 'believe me',
    updatedAt: '2024-08-12'
  },
  {
    name: 'PulseHub',
    description: 'Консоль для управления экспериментами и сбора обратной связи.',
    tags: ['TypeScript', 'DX'],
    url: 'https://github.com/example/pulsehub',
    updatedAt: '2025-01-05'
  },
  {
    name: 'Telemetry School',
    description: 'Образовательный курс по наблюдаемости для внутренних инженеров.',
    tags: ['Education', 'Prometheus'],
    note: 'believe me',
    updatedAt: '2024-05-18'
  },
  {
    name: 'Stargaze',
    description: 'Виджет для сайта, который показывает свежие звёзды на репозиториях.',
    tags: ['Next.js', 'API'],
    url: 'https://github.com/example/stargaze',
    updatedAt: '2024-12-02'
  }
];

const ProjectsSection = () => {
  const envProjects = useMemo(parseProjectsFromEnv, []);
  const allProjects = envProjects.length ? envProjects : fallbackProjects;
  const [limit, setLimit] = useState(6);

  const visibleProjects = allProjects.slice(0, limit);
  const canShowMore = limit < allProjects.length;

  return (
    <section
      id="projects"
      className="section projects"
      data-search-entry="true"
      data-search-title="Projects"
      data-search-description="Highlighted projects with tags, dates and external links"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Проекты</h2>
        <p>Шесть последних инициатив. Остальные ждут встречи на отдельной странице.</p>
      </header>
      <div className="projects__grid">
        {visibleProjects.map((project) => (
          <article key={project.name} className="project-card">
            <header>
              <h3>{project.name}</h3>
              <span className="project-card__date">{project.updatedAt}</span>
            </header>
            <p>{project.description}</p>
            <ul className="project-card__tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="project-card__actions">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              ) : (
                <span className="project-card__note">{project.note || 'believe me'}</span>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="projects__footer">
        {canShowMore && (
          <button type="button" onClick={() => setLimit((value) => value + 3)}>
            Показать ещё
          </button>
        )}
        <a href="/projects" className="link-like">
          Все проекты →
        </a>
      </div>
    </section>
  );
};

export default ProjectsSection;
