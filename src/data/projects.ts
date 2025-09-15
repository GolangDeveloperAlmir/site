export type ProjectLinkType = 'github' | 'demo' | 'docs' | 'article';

export interface ProjectLink {
  label: string;
  href: string;
  type?: ProjectLinkType;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  lastUpdated: string;
  link?: ProjectLink;
  note?: string;
  isPlaceholder?: boolean;
}

type PlaceholderInput = {
  title?: unknown;
  description?: unknown;
  tags?: unknown;
  href?: unknown;
  linkLabel?: unknown;
  lastUpdated?: unknown;
  note?: unknown;
};

const baseProjects: Project[] = [
  {
    id: 'observability-starter',
    title: 'Observability Starter Kit',
    description:
      'Набор шаблонов и Terraform-модулей, который ускоряет запуск наблюдаемости: прометеевские метрики, трассировки и алерты по SLO из коробки.',
    tags: ['Go', 'OpenTelemetry', 'Terraform', 'Grafana'],
    lastUpdated: '2024-05-12',
    link: {
      label: 'GitHub',
      href: 'https://github.com/almirus/observability-starter',
      type: 'github'
    }
  },
  {
    id: 'incident-hub',
    title: 'Incident Retrospective Hub',
    description:
      'Веб-приложение для проведения постмортемов: шаблоны, анализ цепочек событий и выгрузка отчёта в Confluence или Notion одним кликом.',
    tags: ['Next.js', 'PostgreSQL', 'Product Ops'],
    lastUpdated: '2024-03-28',
    link: {
      label: 'Live demo',
      href: 'https://incidents.almir.dev',
      type: 'demo'
    }
  },
  {
    id: 'delivery-pulse',
    title: 'Delivery Pulse Dashboard',
    description:
      'Автоматически собирает сигналы по релизам и выкатам, строит когорты по качеству и помогает договориться о целевых метриках команды.',
    tags: ['Analytics', 'TypeScript', 'D3.js'],
    lastUpdated: '2024-04-19',
    link: {
      label: 'GitHub',
      href: 'https://github.com/almirus/delivery-pulse',
      type: 'github'
    }
  },
  {
    id: 'feature-flag-auditor',
    title: 'Feature Flag Auditor',
    description:
      'CLI-утилита, которая вычищает забытые фичефлаги, считает охват и формирует digest для продуктового менеджера.',
    tags: ['Go', 'CLI', 'Feature Flags'],
    lastUpdated: '2024-02-02',
    note: 'Исходники доступны по запросу — репозиторий приватный.'
  },
  {
    id: 'playbook-catalogue',
    title: 'Playbook Catalogue',
    description:
      'Коллекция фасилитационных сценариев и шаблонов командных ритуалов. Позволяет экспортировать мероприятия в Linear или Jira.',
    tags: ['Notion API', 'Automation', 'Team Enablement'],
    lastUpdated: '2024-01-18',
    link: {
      label: 'Docs',
      href: 'https://playbooks.almir.dev',
      type: 'docs'
    }
  },
  {
    id: 'etl-observer',
    title: 'ETL Observer',
    description:
      'Сервис наблюдаемости для data-pipeline: метрики свежести датасетов, оповещения в Telegram и автоматические runbook-и.',
    tags: ['Python', 'Airflow', 'Monitoring'],
    lastUpdated: '2023-12-11',
    link: {
      label: 'Case study',
      href: 'https://almir.dev/blog/etl-observer',
      type: 'article'
    }
  },
  {
    id: 'career-compass',
    title: 'Career Compass',
    description:
      'Интерактивный гид по развитию инженеров: матрицы компетенций, планирование 1:1 и напоминания о следующих шагах для каждого специалиста.',
    tags: ['Career', 'React', 'Coaching'],
    lastUpdated: '2023-11-07',
    note: 'Пока без публичной ссылки, идёт внутренняя апробация в команде.'
  },
  {
    id: 'service-blueprints',
    title: 'Service Blueprint Generator',
    description:
      'Генератор сервисных blueprints: синхронизирует CJM, Backstage и внутренний портал, чтобы видеть потоки данных end-to-end.',
    tags: ['Systems Design', 'Backstage', 'Diagrams'],
    lastUpdated: '2024-05-30',
    link: {
      label: 'GitHub',
      href: 'https://github.com/almirus/service-blueprints',
      type: 'github'
    }
  }
];

const ensureArray = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
      .filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
};

const parsePlaceholderProjects = (): Project[] => {
  const raw = process.env.NEXT_PUBLIC_PROJECT_PLACEHOLDERS;
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as PlaceholderInput[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item, index): Project | null => {
        if (typeof item !== 'object' || item === null) return null;
        if (typeof item.title !== 'string' || typeof item.description !== 'string') {
          return null;
        }

        const tags = ensureArray(item.tags);
        const href = typeof item.href === 'string' ? item.href : undefined;
        const linkLabel =
          typeof item.linkLabel === 'string' && item.linkLabel.trim()
            ? item.linkLabel.trim()
            : href
            ? 'Подробнее'
            : undefined;

        const lastUpdated =
          typeof item.lastUpdated === 'string' && item.lastUpdated.trim()
            ? item.lastUpdated.trim()
            : new Date().toISOString().slice(0, 10);

        return {
          id: `placeholder-${index}`,
          title: item.title.trim(),
          description: item.description.trim(),
          tags,
          lastUpdated,
          link: href && linkLabel ? { label: linkLabel, href } : undefined,
          note:
            typeof item.note === 'string' && item.note.trim()
              ? item.note.trim()
              : undefined,
          isPlaceholder: true
        } satisfies Project;
      })
      .filter((project): project is Project => Boolean(project));
  } catch {
    return [];
  }
};

export const projects: Project[] = [...baseProjects, ...parsePlaceholderProjects()];

export const projectById = (id: string) => projects.find((project) => project.id === id);
