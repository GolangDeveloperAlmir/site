import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

type Theme = 'dark' | 'light' | 'sepia';

const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('dark');

  // load initial theme from storage
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  // apply theme and persist changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const nextTheme = (t: Theme): Theme =>
    t === 'dark' ? 'light' : t === 'light' ? 'sepia' : 'dark';

  const upcoming = nextTheme(theme);

  return (
    <>
      <header className="header glass">
        <nav className="nav">
          <span className="logo">Almir</span>
          <ul className="links">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#projects">Projects</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
          <button
            className="theme-toggle"
            onClick={() => setTheme(upcoming)}
          >
            Switch to {upcoming} mode
          </button>
        </nav>
      </header>
      <main>{children}</main>
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
      <footer className="footer">
        <p>Built with Next.js</p>
        <a href="/rss.xml">RSS</a>
      </footer>
    </>
  );
};

export default Layout;
