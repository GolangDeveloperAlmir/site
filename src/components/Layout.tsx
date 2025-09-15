'use client';
import { ReactNode, useEffect, useState } from 'react';
import { DesignContext } from '../context/DesignContext';
import Link from 'next/link';
import DesignEditor from './DesignEditor';
import AnnouncementBar from './AnnouncementBar';
import CookieConsent from './CookieConsent';
import VisitorCounter from './VisitorCounter';
import KeyboardHints from './KeyboardHints';
import Analytics from './Analytics';

interface Props {
  children: ReactNode;
}

type Theme = 'dark' | 'light' | 'sepia';

const themes: Theme[] = ['dark', 'light', 'sepia'];

const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [font, setFont] = useState('sans-serif');
  const [editorOpen, setEditorOpen] = useState(false);

  // load initial config from storage
  useEffect(() => {
    const stored = localStorage.getItem('designConfig');
    if (stored) {
      try {
        const cfg = JSON.parse(stored) as { theme?: Theme; font?: string };
        if (cfg.theme) setTheme(cfg.theme);
        if (cfg.font) setFont(cfg.font);
      } catch {
        // ignore
      }
    }
  }, []);

  // apply config and persist changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty('--font', font);
    localStorage.setItem(
      'designConfig',
      JSON.stringify({ theme, font })
    );
  }, [theme, font]);

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];

  return (
    <DesignContext.Provider value={{ openEditor: () => setEditorOpen(true) }}>
      <>
      <Analytics />
      <AnnouncementBar />
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
            type="button"
            aria-label={`Switch to ${nextTheme} mode`}
            onClick={() => setTheme(nextTheme)}
          >
            Switch to {nextTheme} mode
          </button>
          <button
            className="design-open"
            type="button"

            aria-controls="design-editor"
            aria-expanded={editorOpen}
            onClick={() => setEditorOpen(true)}
          >
            Edit design
          </button>
        </nav>
      </header>
      <main>{children}</main>
      {editorOpen && (
        <DesignEditor
          theme={theme}
          setTheme={setTheme}
          font={font}
          setFont={setFont}
          onClose={() => setEditorOpen(false)}
        />
      )}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
      <footer className="footer">
        <VisitorCounter />
        <p>Built with Next.js</p>
        <a href="/rss.xml">RSS</a>
      </footer>
      <CookieConsent />
      <KeyboardHints />
      </>
    </DesignContext.Provider>
  );
};

export default Layout;
