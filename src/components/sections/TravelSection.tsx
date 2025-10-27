'use client';

import { useMemo } from 'react';

type Trip = {
  id: string;
  destination: string;
  date: string;
  note: string;
};

const parseTripsFromEnv = (): Trip[] => {
  const raw = process.env.NEXT_PUBLIC_TRAVEL;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Trip[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const fallbackTrips: Trip[] = [
  { id: 't1', destination: 'Берлин', date: '2024-03-18', note: 'Техконференция и музей синтезаторов.' },
  { id: 't2', destination: 'Хельсинки', date: '2024-07-02', note: 'Кофе на набережной и встреча с командой.' },
  { id: 't3', destination: 'Алматы', date: '2023-10-10', note: 'Горные тропы и встреча с друзьями.' }
];

const TravelSection = () => {
  const trips = useMemo(() => {
    const envTrips = parseTripsFromEnv();
    return envTrips.length ? envTrips : fallbackTrips;
  }, []);

  const grouped = useMemo(() => {
    return trips.reduce<Record<string, Trip[]>>((acc, trip) => {
      const year = new Date(trip.date).getFullYear().toString();
      acc[year] = acc[year] || [];
      acc[year].push(trip);
      return acc;
    }, {});
  }, [trips]);

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <section
      id="travel"
      className="section travel"
      data-search-entry="true"
      data-search-title="Travel"
      data-search-description="Travel grid grouped by year with personal notes"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>Путешествия</h2>
        <p>Места, где заряжаюсь идеями и свежим воздухом.</p>
      </header>
      <div className="travel__grid" role="list">
        {years.length === 0 && <p>пока тут пусто</p>}
        {years.map((year) => (
          <article key={year} className="travel__year" role="listitem">
            <h3>{year}</h3>
            <div className="travel__cards">
              {grouped[year].map((trip) => (
                <div key={trip.id} className="travel__card">
                  <h4>{trip.destination}</h4>
                  <time dateTime={trip.date}>{trip.date}</time>
                  <p>{trip.note}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TravelSection;
