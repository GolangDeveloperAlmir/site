'use client';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent
} from 'react';
import { ArrowUp, MessageCircle, Sparkles } from 'lucide-react';
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
import QRCodeBadge from './QRCodeBadge';

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
  const [editorOpen, setEditorOpen] = useState(false);
  const navItems = useMemo<NavItem[]>(
    () => [
      {
        href: '#hero',
        label: 'Главная',
        accent: { from: '#6366f1', to: '#8b5cf6' }
      },
      {
        href: '#about',
        label: 'Обо мне',
        accent: { from: '#f97316', to: '#facc15' }
      },
      {
        href: '#mission',
        label: 'Миссия',
        accent: { from: '#ec4899', to: '#f97316' }
      },
      {
        href: '#skills',
        label: 'Навыки',
        accent: { from: '#22c55e', to: '#84cc16' }
      },
      {
        href: '#projects',
        label: 'Проекты',
        accent: { from: '#22d3ee', to: '#0ea5e9' }
      },
      {
        href: '#questions',
        label: 'Вопросы',
        accent: { from: '#a855f7', to: '#6366f1' }
      },
      {
        href: '#timeline',
        label: 'Таймлайн',
        accent: { from: '#10b981', to: '#14b8a6' }
      },
      {
        href: '#contact',
        label: 'Контакты',
        accent: { from: '#f43f5e', to: '#ec4899' }
      }
    ],
    []
  );
  const [activeLink, setActiveLink] = useState(
    navItems[0]?.href ?? '#hero'
  );
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState<CSSProperties>();
  const [navScrollable, setNavScrollable] = useState(false);
  const [navScrollPosition, setNavScrollPosition] = useState<
    'none' | 'start' | 'middle' | 'end'
  >('none');
  const linksWrapperRef = useRef<HTMLDivElement | null>(null);
  const linksListRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

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

  return (
    <DesignContext.Provider value={{ openEditor: openDesignEditor }}>
      <>
      <Analytics />
      <ReadingProgress />
      <AnnouncementBar />
      <header className="header">
        <div className="header-shell glass">
          <nav className="nav" aria-label="Основная навигация">
            <span className="logo">Almir</span>
            <div
              ref={linksWrapperRef}
              className="nav-links-wrapper"
              data-scrollable={navScrollable ? 'true' : undefined}
              data-scroll-position={navScrollPosition}
            >
              <ul ref={linksListRef} className="links">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link${
                        activeLink === item.href ? ' is-active' : ''
                      }`}
                      aria-current={
                        activeLink === item.href ? 'page' : undefined
                      }
                      onClick={(event) => handleNavClick(event, item.href)}
                      onMouseEnter={() => setHoveredLink(item.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onFocus={() => setHoveredLink(item.href)}
                      onBlur={() => setHoveredLink(null)}
                      style={
                        {
                          '--accent-from': item.accent.from,
                          '--accent-to': item.accent.to,
                          '--link-accent': item.accent.to
                        } as CSSProperties
                      }
                      ref={(element) => {
                        linkRefs.current[item.href] = element;
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {underlineStyle && (
                  <span
                    aria-hidden="true"
                    className="nav-underline"
                    style={underlineStyle}
                  />
                )}
              </ul>
            </div>
            <div className="nav-actions">
              <GlobalSearch />
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
                onClick={openDesignEditor}
              >
                Edit design
              </button>
              <a
                className="donate-button"
                href={donateHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            </div>
          </nav>
        </div>
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
      <div
        className="floating-controls"
        role="group"
        aria-label="Быстрые действия"
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
        <QRCodeBadge />
        <nav aria-label="Карта сайта" className="footer-sitemap">
          <ul>
            {navItems.map((item) => (
              <li key={`footer-${item.href}`}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleInPageNavigation(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-links">
          <a href="/rss.xml">RSS</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a
            className="donate-link"
            href={donateHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Поддержать проект
          </a>
        </div>
        <p className="footer-credit">Built with Next.js</p>
      </footer>
      <CookieConsent />
      <KeyboardHints />
      </>
    </DesignContext.Provider>
  );
};

export default Layout;
