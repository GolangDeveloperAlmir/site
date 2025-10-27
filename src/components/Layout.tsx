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

type NavItem = {
  href: string;
  label: string;
  accent: {
    from: string;
    to: string;
  };
};

const themes: Theme[] = ['dark', 'light', 'sepia'];

const withHttps = (url?: string) => {
  if (!url) return '#';
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;
};

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
  const donateHref = useMemo(
    () => withHttps(process.env.NEXT_PUBLIC_DONATE_URL),
    []
  );
  const handleInPageNavigation = useCallback(
    (href: string) => {
      setActiveLink(href);
      if (typeof window === 'undefined') return;

      const target = document.querySelector(href) as HTMLElement | null;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (typeof window.history.replaceState === 'function') {
          window.history.replaceState(null, '', href);
        }
      } else {
        window.location.hash = href.replace('#', '');
      }
    },
    []
  );

  const handleNavClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();
      handleInPageNavigation(href);
    },
    [handleInPageNavigation]
  );

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window.history.replaceState === 'function') {
      window.history.replaceState(null, '', '#hero');
    }
    setActiveLink('#hero');
  }, []);

  const openDesignEditor = useCallback(() => setEditorOpen(true), [setEditorOpen]);

  const handleContactShortcut = useCallback(() => {
    handleInPageNavigation('#contact');
  }, [handleInPageNavigation]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) {
      setActiveLink(window.location.hash);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = navItems
      .map((item) =>
        document.querySelector(item.href)
      )
      .filter((element): element is Element => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const newActive = `#${visible[0].target.id}`;
        setActiveLink((prev) => (prev !== newActive ? newActive : prev));
      },
      {
        rootMargin: '-50% 0px -40% 0px',
        threshold: [0.25, 0.5, 0.75]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [navItems]);

  const updateUnderline = useCallback(
    (href: string) => {
      const target = linkRefs.current[href];
      const list = linksListRef.current;
      const item = navItems.find((navItem) => navItem.href === href);
      if (!target || !list || !item) return;

      const style: CSSProperties = {
        width: `${target.offsetWidth}px`,
        transform: `translateX(${target.offsetLeft}px)`,
        '--accent-from': item.accent.from,
        '--accent-to': item.accent.to,
        opacity: 1
      };

      setUnderlineStyle(style);
    },
    [navItems]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const frame = window.requestAnimationFrame(() => {
      updateUnderline(hoveredLink ?? activeLink);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeLink, hoveredLink, updateUnderline, font]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      updateUnderline(hoveredLink ?? activeLink);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeLink, hoveredLink, updateUnderline, font]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wrapper = linksWrapperRef.current;
    const list = linksListRef.current;
    if (!wrapper || !list) return;

    const updateOverflowState = () => {
      const isScrollable = list.scrollWidth - 1 > wrapper.clientWidth;
      setNavScrollable(isScrollable);
      if (!isScrollable) {
        setNavScrollPosition('none');
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = wrapper;
      const atStart = scrollLeft <= 1;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      if (atStart && atEnd) {
        setNavScrollPosition('none');
      } else if (atStart) {
        setNavScrollPosition('start');
      } else if (atEnd) {
        setNavScrollPosition('end');
      } else {
        setNavScrollPosition('middle');
      }
    };

    updateOverflowState();

    const handleScroll = () => updateOverflowState();
    wrapper.addEventListener('scroll', handleScroll, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => updateOverflowState())
        : null;
    resizeObserver?.observe(wrapper);
    resizeObserver?.observe(list);

    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
      resizeObserver?.disconnect();
    };
  }, [navItems.length, font]);

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
    <DesignContext.Provider value={{ openEditor: openDesignEditor }}>
      <>
      <Analytics />
      <ReadingProgress />
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
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Вернуться наверх"
          title="Наверх"
        >
          <ArrowUp size={18} aria-hidden="true" />
          <span className="sr-only">Наверх</span>
        </button>
        <button
          type="button"
          onClick={handleContactShortcut}
          aria-label="Перейти к контактам"
          title="К контактам"
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span className="sr-only">Контакты</span>
        </button>
        <button
          type="button"
          onClick={openDesignEditor}
          aria-label="Открыть редактор дизайна"
          title="Редактор"
        >
          <Sparkles size={18} aria-hidden="true" />
          <span className="sr-only">Редактор дизайна</span>
        </button>
      </div>
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
