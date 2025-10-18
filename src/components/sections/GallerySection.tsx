'use client';

import { useMemo, useState } from 'react';

const parseGalleryFromEnv = (): string[] => {
  const raw = process.env.NEXT_PUBLIC_GALLERY_URLS;
  if (!raw) return [];
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
];

const GallerySection = () => {
  const images = useMemo(() => {
    const env = parseGalleryFromEnv();
    return env.length ? env : fallbackImages;
  }, []);
  const [view, setView] = useState<'grid' | 'slideshow'>('grid');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextSlide = () => setSlideIndex((index) => (index + 1) % images.length);
  const prevSlide = () => setSlideIndex((index) => (index - 1 + images.length) % images.length);

  return (
    <section
      id="gallery"
      className="section gallery"
      data-search-entry="true"
      data-search-title="Gallery"
      data-search-description="Image gallery with grid and slideshow view"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Галерея</h2>
        <p>Моменты, которые хочется пересматривать.</p>
      </header>
      <div className="gallery__controls">
        <span>Вид:</span>
        <button
          type="button"
          className={view === 'grid' ? 'active' : ''}
          onClick={() => setView('grid')}
        >
          Сетка
        </button>
        <button
          type="button"
          className={view === 'slideshow' ? 'active' : ''}
          onClick={() => setView('slideshow')}
        >
          Слайд-шоу
        </button>
      </div>
      {images.length === 0 && <p>пока тут пусто</p>}
      {view === 'grid' && (
        <div className="gallery__grid">
          {images.slice(0, 9).map((src, index) => (
            <button
              type="button"
              key={src + index}
              className="gallery__item"
              onClick={() => openLightbox(index)}
            >
              <img src={src} alt={`Галерея ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
      {view === 'slideshow' && images.length > 0 && (
        <div className="gallery__slideshow">
          <button type="button" onClick={prevSlide} aria-label="Предыдущее изображение">
            ←
          </button>
          <img src={images[slideIndex]} alt={`Слайд ${slideIndex + 1}`} />
          <button type="button" onClick={nextSlide} aria-label="Следующее изображение">
            →
          </button>
        </div>
      )}
      {lightboxIndex !== null && (
        <div className="gallery__lightbox" role="dialog" aria-modal="true">
          <button className="gallery__lightbox-close" onClick={closeLightbox} aria-label="Закрыть">
            ×
          </button>
          <button
            className="gallery__lightbox-nav gallery__lightbox-nav--prev"
            onClick={() =>
              setLightboxIndex((index) =>
                index === null ? 0 : (index - 1 + images.length) % images.length
              )
            }
            aria-label="Предыдущее"
          >
            ‹
          </button>
          <img src={images[lightboxIndex]} alt={`Просмотр ${lightboxIndex + 1}`} />
          <button
            className="gallery__lightbox-nav gallery__lightbox-nav--next"
            onClick={() =>
              setLightboxIndex((index) => (index === null ? 0 : (index + 1) % images.length))
            }
            aria-label="Следующее"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
