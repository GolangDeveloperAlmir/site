'use client';

import Image from 'next/image';
import { useState } from 'react';

const withHttps = (url?: string | null) => {
  if (!url) return null;
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);
  const photo = withHttps(process.env.NEXT_PUBLIC_ABOUT_PHOTO || null);

  return (
    <section
      id="about"
      className="section about"
      data-search-entry="true"
      data-search-title="About"
      data-search-description="Extended overview of Almir, personal principles and quick facts"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Обо мне</h2>
        <p>Встречайте Альмира: инженер, который одинаково любит организованность и хаос идей.</p>
      </header>
      <div className="about__content">
        <div className="about__text">
          <p>
            Я строю распределённые системы, сочиняю мелодии для внутренних инструментов и исследую
            способы сделать технические команды счастливее. Мои дни проходят между Go-сервисами,
            графиками наблюдаемости и осознанными кофейными паузами. Я верю в деликатное
            сочетание инженерной строгости и человеческого тепла.
          </p>
          <p>
            {expanded
              ? 'Когда появляется свободная минута, я веду дневник экспериментов, собираю плейлисты для командных ретроспектив и обучаюсь новым инструментам. Мне нравится думать о продуктах как о садах: их нужно бережно поливать вниманием, выпускать свежие ростки и вовремя обрезать лишнее.'
              : 'Когда появляется свободная минута, я веду дневник экспериментов и обучаюсь новым инструментам.'}
          </p>
          {!expanded && (
            <button type="button" className="link-like" onClick={() => setExpanded(true)}>
              Read more →
            </button>
          )}
          {expanded && (
            <a className="link-like" href="#career">
              Смотреть карьерную хронологию
            </a>
          )}
          <ul className="about__facts">
            <li>✨ Фанат утренних стендапов, которые заканчиваются раньше, чем заварится чай.</li>
            <li>🛠️ Люблю автоматизировать даже список покупок.</li>
            <li>🎮 В командных играх почти всегда поддержка.</li>
            <li>📚 Читаю технические книги в оригинале и делюсь заметками.</li>
          </ul>
        </div>
        {photo && (
          <figure className="about__photo">
            <Image src={photo} alt="Almir portrait" width={320} height={400} unoptimized />
            <figcaption>Настоящий энтузиаст распределённых систем.</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
