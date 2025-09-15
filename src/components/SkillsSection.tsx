'use client';

import { useMemo } from 'react';

type SkillLevel = 'frequent' | 'occasional' | 'beginner';

type Skill = {
  name: string;
  level: SkillLevel;
};

type SkillGroup = {
  category: string;
  shortLabel: string;
  summary: string;
  score: number;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    category: 'Backend / Go',
    shortLabel: 'Backend',
    summary:
      'Проектирую устойчивые сервисы, API и интеграции на Go, уделяя внимание наблюдаемости и продуктивности команды.',
    score: 0.9,
    skills: [
      { name: 'Go', level: 'frequent' },
      { name: 'gRPC & protobuf', level: 'frequent' },
      { name: 'PostgreSQL', level: 'frequent' },
      { name: 'Event-driven architecture', level: 'occasional' },
      { name: 'Domain-Driven Design', level: 'occasional' }
    ]
  },
  {
    category: 'Observability & Reliability',
    shortLabel: 'Observability',
    summary:
      'Строю прозрачность систем: собираю метрики, трассировки и логи, чтобы команда понимала, что происходит в проде.',
    score: 0.78,
    skills: [
      { name: 'OpenTelemetry', level: 'frequent' },
      { name: 'Grafana / Prometheus', level: 'frequent' },
      { name: 'Incident response', level: 'occasional' },
      { name: 'Chaos experiments', level: 'beginner' },
      { name: 'SLO & Error budgets', level: 'occasional' }
    ]
  },
  {
    category: 'Infrastructure & Delivery',
    shortLabel: 'Infrastructure',
    summary:
      'Настраиваю платёжеспособные CI/CD и облачную инфраструктуру, чтобы релизы выходили быстро и безопасно.',
    score: 0.74,
    skills: [
      { name: 'Kubernetes', level: 'occasional' },
      { name: 'Terraform', level: 'occasional' },
      { name: 'GitHub Actions', level: 'frequent' },
      { name: 'Helm & Kustomize', level: 'occasional' },
      { name: 'AWS / GCP', level: 'occasional' },
      { name: 'Docker', level: 'frequent' }
    ]
  },
  {
    category: 'Product Discovery',
    shortLabel: 'Discovery',
    summary:
      'Помогаю командам валидировать гипотезы, работать с интервью, картами путешествия пользователя и экспериментами.',
    score: 0.65,
    skills: [
      { name: 'Customer interviews', level: 'occasional' },
      { name: 'Experiment design', level: 'frequent' },
      { name: 'Product analytics', level: 'occasional' },
      { name: 'JTBD mapping', level: 'beginner' },
      { name: 'Story mapping', level: 'occasional' }
    ]
  },
  {
    category: 'Team Enablement',
    shortLabel: 'Enablement',
    summary:
      'Создаю ритуалы, менторство и прозрачные карьерные треки, чтобы команда росла и сохраняла фокус.',
    score: 0.82,
    skills: [
      { name: '1:1 coaching', level: 'frequent' },
      { name: 'Hiring & onboarding', level: 'occasional' },
      { name: 'Knowledge sharing', level: 'frequent' },
      { name: 'Facilitation', level: 'frequent' },
      { name: 'Career frameworks', level: 'occasional' }
    ]
  }
];

const radarMetrics = skillGroups.map(({ shortLabel, score }) => ({
  label: shortLabel,
  value: score
}));

const languages = [
  { label: 'Русский', note: 'родной' },
  { label: 'English', note: 'C1' },
  { label: 'Deutsch', note: 'B1' }
];

const currentlyLearning = ['Rust', 'Temporal', 'Product analytics instrumentation'];

const levelInfo: Record<SkillLevel, { label: string; title: string }> = {
  frequent: { label: 'Frequent', title: 'Использую в ежедневной практике' },
  occasional: { label: 'Occasional', title: 'Подключаю по мере необходимости' },
  beginner: { label: 'Beginner', title: 'На стадии изучения и экспериментов' }
};

const chartLevels = [0.25, 0.5, 0.75, 1];

const SkillsSection = () => {
  const chartSize = 280;
  const center = chartSize / 2;
  const radius = center - 24;
  const angleStep = (2 * Math.PI) / radarMetrics.length;
  const radarSummary = useMemo(
    () =>
      radarMetrics
        .map((metric) => `${metric.label}: ${Math.round(metric.value * 100)}%`)
        .join(', '),
    []
  );

  const pointFor = (ratio: number, index: number) => {
    const safeRatio = Math.max(0, ratio);
    const angle = -Math.PI / 2 + index * angleStep;
    const distance = safeRatio * radius;
    const x = center + Math.cos(angle) * distance;
    const y = center + Math.sin(angle) * distance;
    return { x, y };
  };

  const polygonPoints = radarMetrics
    .map((metric, index) => {
      const { x, y } = pointFor(metric.value, index);
      return `${x},${y}`;
    })
    .join(' ');

  const gridPolygons = chartLevels.map((level) =>
    radarMetrics
      .map((_, index) => {
        const { x, y } = pointFor(level, index);
        return `${x},${y}`;
      })
      .join(' ')
  );

  const axisPoints = radarMetrics.map((_, index) => pointFor(1, index));
  const labelPoints = radarMetrics.map((metric, index) => ({
    ...pointFor(1.15, index),
    label: metric.label
  }));

  return (
    <section id="skills" className="section skills-section">
      <div className="section-shell skills-shell">
        <div className="section-heading">
          <h2>Навыки и языки</h2>
          <p>
            Балансирую между платформенной инженерией и развитием продукта: помогаю
            командам быстро поставлять функциональность, измерять её влияние и учиться на
            каждом релизе.
          </p>
        </div>
        <div className="skills-intro">
          <div className="skills-copy glass">
            <h3>Профессиональный профиль</h3>
            <p>
              Главный фокус — соединить стратегию, дизайн архитектуры и процессы
              командного взаимодействия. Так рождается устойчивая система, в которой
              понятно, куда вкладывать энергию.
            </p>
            <div className="skills-languages">
              <span className="skills-label">Языки</span>
              <div className="language-badges">
                {languages.map((language) => (
                  <span key={language.label} className="language-badge">
                    {language.label}
                    {language.note && <small>{language.note}</small>}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-learning">
              <span className="skills-label">Сейчас изучаю</span>
              <div className="learning-chips">
                {currentlyLearning.map((item) => (
                  <span key={item} className="learning-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="skills-radar glass">
            <h3 id="skills-radar-title">Радар компетенций</h3>
            <svg
              className="radar-chart"
              viewBox={`0 0 ${chartSize} ${chartSize}`}
              role="img"
              aria-labelledby="skills-radar-title skills-radar-desc"
            >
              <desc id="skills-radar-desc">{radarSummary}</desc>
              {gridPolygons.map((points, index) => (
                <polygon key={`grid-${index}`} points={points} className="radar-grid" />
              ))}
              {axisPoints.map(({ x, y }, index) => (
                <line
                  key={`axis-${radarMetrics[index]?.label ?? index}`}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  className="radar-axis"
                />
              ))}
              <polygon points={polygonPoints} className="radar-surface" />
              {radarMetrics.map((metric, index) => {
                const { x, y } = pointFor(metric.value, index);
                return <circle key={metric.label} cx={x} cy={y} r={4} className="radar-dot" />;
              })}
              {labelPoints.map(({ x, y, label }) => (
                <text
                  key={`label-${label}`}
                  x={x}
                  y={y}
                  className="radar-label"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {label}
                </text>
              ))}
            </svg>
          </div>
        </div>
        <div className="skills-categories">
          {skillGroups.map((group) => (
            <article key={group.category} className="skill-card glass">
              <header className="skill-card-heading">
                <h3>{group.category}</h3>
                <p>{group.summary}</p>
              </header>
              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="skill-list-item">
                    <span className="skill-name">{skill.name}</span>
                    <span
                      className="skill-level"
                      data-level={skill.level}
                      title={levelInfo[skill.level].title}
                    >
                      {levelInfo[skill.level].label}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

