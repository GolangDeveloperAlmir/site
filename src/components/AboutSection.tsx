'use client';

import { useMemo, useState } from 'react';

const ensureHttps = (value?: string) => {
  if (!value) return undefined;
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }
  return `https://${value}`;
};

const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);
  const facts = useMemo(
    () => [
      'Руковожу распределёнными командами и помогаю им расти без потери скорости.',
      'Люблю превращать сложные технические отчёты в понятные истории для бизнеса.',
      'Регулярно провожу архитектурные ревью и наставляю инженеров по карьерным трекам.'
    ],
    []
  );
  const extraDetails = useMemo(
    () => [
      'Начинал карьеру как backend-разработчик на Go, позже переключился на продуктовую инженерию и построение платформенных решений. Меня вдохновляет момент, когда команда начинает уверенно экспериментировать и может доказать ценность каждой идеи данными.',
      'В свободное время собираю локальное комьюнити, делюсь практиками ведения инженерных дневников и документирую инсайты в виде публичных таймлайнов — загляните в раздел таймлайна, если хочется больше хронологии.'
    ],
    []
  );

  const photoUrl = ensureHttps(process.env.NEXT_PUBLIC_ABOUT_PHOTO);

  return (
    <section id="about" className="section about-section">
      <div className="section-shell">
        <div className="about-grid glass">
          <div className="about-content">
            <div className="section-heading">
              <h2>Обо мне</h2>
              <p>
                Я Алмир — инженер и продакт, который объединяет людей вокруг сложных
                платформенных задач. За последние годы я запускал сервисы, выводил
                монолиты в облако и собирал процессы, в которых метрики поддерживают
                командные решения.
              </p>
            </div>
            <p>
              Мне важно создавать среду, где дизайнеры, аналитики и инженеры говорят на
              одном языке и видят общий север. Поэтому я уделяю время наставничеству,
              фасилитации дискавери-сессий и прозрачной коммуникации.
            </p>
            <ul className="about-facts">
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <button
              type="button"
              className="link-button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls="about-more"
            >
              {expanded ? 'Свернуть' : 'Читать дальше'}
            </button>
            <div
              id="about-more"
              className="about-extra"
              data-expanded={expanded ? 'true' : 'false'}
            >
              {extraDetails.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
              <a className="link-inline" href="#timeline">
                Перейти к карьерному таймлайну
              </a>
            </div>
          </div>
          <figure className="about-photo">
            {photoUrl ? (
              <img src={photoUrl} alt="Портрет Алмира" loading="lazy" />
            ) : (
              <div className="about-photo-fallback" role="img" aria-label="Портрет Алмира">
                <span>Almir</span>
              </div>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

