'use client';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { DesignContext } from '../context/DesignContext';
import Link from 'next/link';
import DesignEditor from './DesignEditor';
import AnnouncementBar from './AnnouncementBar';
import CookieConsent from './CookieConsent';
import VisitorCounter from './VisitorCounter';
import KeyboardHints from './KeyboardHints';
import Analytics from './Analytics';
import GlobalSearch from './GlobalSearch';
import ReadingProgress from './ReadingProgress';
import QRCodeWidget from './QRCodeWidget';
import FloatingControls from './FloatingControls';
import PomodoroTimer from './PomodoroTimer';

interface Props {
  children: ReactNode;
}

type Theme = 'dark' | 'light' | 'sepia';

const themes: Theme[] = ['dark', 'light', 'sepia'];

const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [font, setFont] = useState('sans-serif');
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
  const [accentColor, setAccentColor] = useState('#22d3ee');
  const [animationPreset, setAnimationPreset] = useState<'calm' | 'float' | 'pulse'>('calm');
  const [editorOpen, setEditorOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pomodoroOpen, setPomodoroOpen] = useState(false);

  // load initial config from storage
  useEffect(() => {
    const stored = localStorage.getItem('designConfig');
    if (stored) {
      try {
        const cfg = JSON.parse(stored) as {
          theme?: Theme;
          font?: string;
          primaryColor?: string;
          accentColor?: string;
          animationPreset?: 'calm' | 'float' | 'pulse';
        };
        if (cfg.theme) setTheme(cfg.theme);
        if (cfg.font) setFont(cfg.font);
        if (cfg.primaryColor) setPrimaryColor(cfg.primaryColor);
        if (cfg.accentColor) setAccentColor(cfg.accentColor);
        if (cfg.animationPreset) setAnimationPreset(cfg.animationPreset);
      } catch {
        // ignore
      }
    }
  }, []);

  // apply config and persist changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty('--font', font);
    document.documentElement.style.setProperty('--primary', primaryColor);
    document.documentElement.style.setProperty('--accent', accentColor);
    document.documentElement.dataset.animationPreset = animationPreset;
    localStorage.setItem(
      'designConfig',
      JSON.stringify({ theme, font, primaryColor, accentColor, animationPreset })
    );
  }, [theme, font, primaryColor, accentColor, animationPreset]);

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const openContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';

      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !isTyping) {
        event.preventDefault();
        openSearch();
      }

      if (
        (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        openSearch();
      }

      if (event.key === 'ArrowUp' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        scrollToTop();
      }

      if (event.key === 't' && event.altKey) {
        event.preventDefault();
        setPomodoroOpen((value) => !value);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openSearch, scrollToTop]);

  const donateUrl = process.env.NEXT_PUBLIC_DONATE_URL;

  const navItems = useMemo(
    () => [
      { href: '#about', label: 'About' },
      { href: '#mission', label: 'Mission' },
      { href: '#skills', label: 'Skills' },
      { href: '#projects', label: 'Projects' },
      { href: '#interview', label: 'Questions' },
      { href: '#travel', label: 'Travel' },
      { href: '#gallery', label: 'Gallery' },
      { href: '#timelines', label: 'Timelines' },
      { href: '#achievements', label: 'Achievements' },
      { href: '#inspiration', label: 'Inspiration' },
      { href: '#github', label: 'GitHub' },
      { href: '#faq', label: 'FAQ' },
      { href: '#now', label: 'Now' },
      { href: '#recommended', label: 'Recommended' },
      { href: '#microblog', label: 'Journal' },
      { href: '#music', label: 'Music' },
      { href: '#coming-soon', label: 'Soon' },
      { href: '#contact', label: 'Contact' }
    ],
    []
  );

  return (
    <DesignContext.Provider value={{ openEditor: () => setEditorOpen(true) }}>
      <>
      <Analytics />
      <AnnouncementBar />
      <ReadingProgress />
      <header className="header glass">
        <nav className="nav">
          <span className="logo">Almir</span>
          <ul className="links">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              className="search-toggle"
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
            >
              Search
            </button>
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
            {donateUrl && (
              <a
                className="donate-link"
                href={donateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      {editorOpen && (
        <DesignEditor
          theme={theme}
          setTheme={setTheme}
          font={font}
          setFont={setFont}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          animationPreset={animationPreset}
          setAnimationPreset={setAnimationPreset}
          onClose={() => setEditorOpen(false)}
        />
      )}
      <button
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
      <footer className="footer">
        <VisitorCounter />
        <p>Built with Next.js</p>
        <a href="/rss.xml">RSS</a>
        <a href="/sitemap.xml">Sitemap</a>
        <QRCodeWidget />
      </footer>
      <CookieConsent />
      <KeyboardHints />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <FloatingControls
        onScrollTop={scrollToTop}
        onOpenContact={openContact}
        onOpenDesign={() => setEditorOpen(true)}
        onTogglePomodoro={() => setPomodoroOpen((value) => !value)}
        onOpenSearch={openSearch}
      />
      <PomodoroTimer open={pomodoroOpen} onClose={() => setPomodoroOpen(false)} />
      </>
    </DesignContext.Provider>
  );
};

export default Layout;
