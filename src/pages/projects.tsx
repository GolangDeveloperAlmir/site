import { NextPage } from 'next';
import Link from 'next/link';
import { projects } from '../data/projects';

const formatDate = (value: string) => {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric'
  });
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return formatter.format(parsed);
};

const ProjectsPage: NextPage = () => {
  return (
    <section className="section projects-archive" aria-labelledby="projects-archive-title">
      <div className="section-shell projects-shell">
        <div className="section-heading">
          <h1 id="projects-archive-title">Все проекты</h1>
          <p>
            Полная подборка инициатив и внутренних инструментов. Здесь собраны как публичные
            репозитории, так и проекты, которые живут на закрытой инфраструктуре. Если какой-то кейс
            интересен — дайте знать, поделюсь подробностями.
          </p>
        </div>
        <div className="projects-grid projects-grid-archive">
          {projects.map((project) => (
            <article
              key={`archive-${project.id}`}
              className="project-card glass"
              data-placeholder={project.isPlaceholder ? 'true' : undefined}
            >
              {project.isPlaceholder && (
                <span className="project-placeholder-badge">Placeholder из .env</span>
              )}
              <header className="project-card-header">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </header>
              {project.tags.length > 0 && (
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={`${project.id}-${tag}`} className="project-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <dl className="project-details">
                <div>
                  <dt>Последнее обновление</dt>
                  <dd>{formatDate(project.lastUpdated)}</dd>
                </div>
                <div>
                  <dt>Статус</dt>
                  <dd>
                    {project.note
                      ? project.note
                      : project.isPlaceholder
                      ? 'Планируется'
                      : 'В проде'}
                  </dd>
                </div>
              </dl>
              <div className="project-meta">
                {project.link ? (
                  <a
                    className="project-link"
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.link.label}
                  </a>
                ) : (
                  <span className="project-note">
                    {project.note ?? (project.isPlaceholder ? 'Скоро поделюсь' : 'Поверьте на слово')}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
        <Link href="/#projects" className="link-inline projects-back-link">
          ← К лэндингу
        </Link>
      </div>
    </section>
  );
};

export default ProjectsPage;
