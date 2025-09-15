'use client';
import { useMemo } from 'react';
import {
  Mail,
  Send,
  MessageCircle,
  Facebook,
  Gamepad2,
  Github
} from 'lucide-react';
import { useDesignContext } from '../context/DesignContext';

const quotes = [
  'The journey of a thousand miles begins with one step.',
  'The only limit to our realization of tomorrow is our doubts of today.',
  'Stay hungry, stay foolish.'
];

const withHttps = (url?: string) => {
  if (!url) return '#';
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;
};

const Hero = () => {
  const { openEditor } = useDesignContext();
  const quote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    []
  );

  const socials = [
    {
      href: process.env.NEXT_PUBLIC_EMAIL
        ? `mailto:${process.env.NEXT_PUBLIC_EMAIL}`
        : '#',
      label: 'Email',
      Icon: Mail
    },
    {
      href: withHttps(process.env.NEXT_PUBLIC_TELEGRAM),
      label: 'Telegram',
      Icon: Send
    },
    {
      href: withHttps(process.env.NEXT_PUBLIC_DISCORD),
      label: 'Discord',
      Icon: MessageCircle
    },
    {
      href: withHttps(process.env.NEXT_PUBLIC_FACEBOOK),
      label: 'Facebook',
      Icon: Facebook
    },
    {
      href: withHttps(process.env.NEXT_PUBLIC_STEAM),
      label: 'Steam',
      Icon: Gamepad2
    },
    {
      href: withHttps(process.env.NEXT_PUBLIC_GITHUB),
      label: 'GitHub',
      Icon: Github
    }
  ];

  return (
    <section
      className="hero"
      style={{ padding: '4rem 1rem', textAlign: 'center' }}
    >
      <h1>Almir</h1>
      <p className="tagline">Personal space on the web</p>
      <p className="quote">"{quote}"</p>
      <div
        className="socials"
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
      >
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon />
          </a>
        ))}
      </div>
      <div className="actions" style={{ marginTop: '1rem' }}>
        <a href="#contact" className="btn" style={{ marginRight: '0.5rem' }}>
          Contact
        </a>
        <button className="btn" onClick={openEditor}>
          Edit design
        </button>
      </div>
    </section>
  );
};

export default Hero;

