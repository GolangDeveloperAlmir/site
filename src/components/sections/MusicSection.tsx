'use client';

const playlists = [
  {
    title: 'Focus Flow',
    description: 'Ambient и лёгкий электро для глубокого фокуса.',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX3PFzdbtx1Us'
  },
  {
    title: 'Retrospective Groove',
    description: 'Лёгкий фанк для ретроспектив и вечерних синков.',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DWVqfgj8NZEp1'
  }
];

const MusicSection = () => (
  <section
    id="music"
    className="section music"
    data-search-entry="true"
    data-search-title="Music"
    data-search-description="Playlists I enjoy with external links"
    tabIndex={-1}
  >
    <header className="section__header">
      <h2>Музыка</h2>
      <p>Плейлисты, которые крутятся в фоне во время работы.</p>
    </header>
    <ul className="music__list">
      {playlists.map((playlist) => (
        <li key={playlist.url}>
          <h3>{playlist.title}</h3>
          <p>{playlist.description}</p>
          <a href={playlist.url} target="_blank" rel="noopener noreferrer">
            Слушать
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default MusicSection;
