import { NextPage } from 'next';
import { useMemo } from 'react';

const quotes = [
  'The journey of a thousand miles begins with one step.',
  'The only limit to our realization of tomorrow is our doubts of today.',
  'Stay hungry, stay foolish.'
];

const Home: NextPage = () => {
  const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  return (
    <section style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>Almir</h1>
      <p className="tagline">Personal space on the web</p>
      <p className="quote">"{quote}"</p>
      <div className="actions" style={{ marginTop: '1rem' }}>
        <a href="#contact" className="btn" style={{ marginRight: '0.5rem' }}>Contact</a>
        <button className="btn">Edit design</button>
      </div>
    </section>
  );
};

export default Home;
