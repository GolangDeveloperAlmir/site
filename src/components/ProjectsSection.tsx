'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { projects, Project } from '../data/projects';

const INITIAL_VISIBLE = 6;

const useDateFormatter = () =>
  useMemo(
    () =>
      new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
        year: 'numeric'
      }),
    []
  );

const formatDate = (formatter: Intl.DateTimeFormat, value: string) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return formatter.format(date);
};

const ProjectsSection = () => {
  const formatter = useDateFormatter();
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(INITIAL_VISIBLE, projects.length)
  );

  const visibleProjects = projects.slice(0, visibleCount);
  const hiddenCount = projects.length - visibleProjects.length;
  const hasMore = hiddenCount > 0;

  const handleShowMore = () => {
    setVisibleCount((current) => Math.min(projects.length, current + 3));
  };

  const cardLabel = (project: Project) => {
    if (project.link) {
      switch (project.link.type) {
        case 'github':
          return 'Открыть GitHub';
        case 'demo':
          return 'Открыть демо';
        case 'docs':
          return 'Перейти к документации';
        case 'article':
          return 'Читать кейс';
        default:
          return 'Подробнее';
      }
    }
    return 'Подробнее';
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="section-shell projects-shell">
        <div className="section-heading">
          <h2>Проекты</h2>
          <p>
            Я помогаю командам быстро запускать инфраструктуру, повышать наблюдаемость
            и договариваться о прозрачных процессах. Ниже — рабочие инструменты и
            side-проекты, которые родились из реальных запросов.
          </p>
        </div>
        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="project-card glass"
              data-placeholder={project.isPlaceholder ? 'true' : undefined}
            >
              {project.isPlaceholder && (
                <span className="project-placeholder-badge">
                  Placeholder из .env
                </span>
              )}
              <header className="project-card-header">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </header>
              {project.tags.length > 0 && (
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag} className="project-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <footer className="project-meta">
                <span className="project-updated">
                  Обновлено: {formatDate(formatter, project.lastUpdated)}
                </span>
                {project.link ? (
                  <a
                    className="project-link"
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title}: ${cardLabel(project)}`}
                  >
                    {project.link.label}
                  </a>
                ) : (
                  <span className="project-note">
                    {project.note ?? (project.isPlaceholder ? 'Скоро поделюсь' : 'Поверьте на слово')}
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>
        <div className="projects-actions">
          {hasMore && (
            <button type="button" className="btn projects-show-more" onClick={handleShowMore}>
              Показать ещё {hiddenCount < 3 ? hiddenCount : 3}
            </button>
          )}
          <Link href="/projects" className="link-button projects-all-link">
            Все проекты
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
