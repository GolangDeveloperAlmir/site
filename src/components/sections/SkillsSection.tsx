'use client';

import { useMemo } from 'react';

type SkillLevel = 'frequent' | 'occasional' | 'beginner';

type Skill = {
  name: string;
  level: SkillLevel;
};

type SkillGroup = {
  title: string;
  items: Skill[];
};

const groups: SkillGroup[] = [
  {
    title: 'Backend / Go',
    items: [
      { name: 'Go', level: 'frequent' },
      { name: 'gRPC', level: 'frequent' },
      { name: 'PostgreSQL', level: 'occasional' },
      { name: 'Kafka', level: 'occasional' }
    ]
  },
  {
    title: 'Observability',
    items: [
      { name: 'Prometheus', level: 'frequent' },
      { name: 'Grafana', level: 'frequent' },
      { name: 'OpenTelemetry', level: 'occasional' }
    ]
  },
  {
    title: 'Infrastructure',
    items: [
      { name: 'Kubernetes', level: 'frequent' },
      { name: 'Terraform', level: 'occasional' },
      { name: 'GitOps', level: 'occasional' },
      { name: 'CI/CD', level: 'frequent' }
    ]
  }
];

const radarCategories = [
  { label: 'Backend', score: 0.95 },
  { label: 'Observability', score: 0.85 },
  { label: 'Infrastructure', score: 0.9 },
  { label: 'Leadership', score: 0.7 },
  { label: 'Product', score: 0.6 }
];

const languages = ['Русский', 'English', 'Deutsch'];

const currentlyLearning = ['Rust', 'Temporal', 'Product Discovery'];

const levelLabels: Record<SkillLevel, string> = {
  frequent: 'часто',
  occasional: 'иногда',
  beginner: 'начинаю'
};

const levelClass: Record<SkillLevel, string> = {
  frequent: 'skill skill--frequent',
  occasional: 'skill skill--occasional',
  beginner: 'skill skill--beginner'
};

const polarToCartesian = (index: number, total: number, score: number) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const radius = score * 80; // px
  const x = 100 + radius * Math.cos(angle);
  const y = 100 + radius * Math.sin(angle);
  return `${x},${y}`;
};

const SkillsSection = () => {
  const polygonPoints = useMemo(
    () =>
      radarCategories
        .map((category, index) => polarToCartesian(index, radarCategories.length, category.score))
        .join(' '),
    []
  );

  return (
    <section
      id="skills"
      className="section skills"
      data-search-entry="true"
      data-search-title="Skills & Languages"
      data-search-description="Skill categories with levels, radar chart and language badges"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Навыки и языки</h2>
        <p>Понимаю, как устроены сервисы, как их поддерживать и как объяснить это команде.</p>
      </header>
      <div className="skills__grid">
        <div className="skills__groups">
          {groups.map((group) => (
            <article key={group.title} className="skills__group">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((skill) => (
                  <li key={skill.name} className={levelClass[skill.level]}>
                    <span>{skill.name}</span>
                    <span className="skill__level">{levelLabels[skill.level]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="skills__visuals">
          <div className="skills__radar" role="img" aria-label="Radar chart of proficiency">
            <svg viewBox="0 0 200 200">
              <polygon points={polygonPoints} className="skills__radar-fill" />
              {radarCategories.map((category, index) => {
                const [x, y] = polarToCartesian(index, radarCategories.length, 1)
                  .split(',')
                  .map((value) => Number(value));
                return (
                  <g key={category.label}>
                    <line x1="100" y1="100" x2={x} y2={y} className="skills__radar-line" />
                    <text x={x} y={y} className="skills__radar-label" textAnchor="middle">
                      {category.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="skills__languages" aria-label="Languages">
            {languages.map((language) => (
              <span key={language} className="language-badge">
                {language}
              </span>
            ))}
          </div>
          <div className="skills__learning">
            <h4>Сейчас изучаю</h4>
            <ul>
              {currentlyLearning.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
