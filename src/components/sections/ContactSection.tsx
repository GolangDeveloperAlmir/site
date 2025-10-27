'use client';

import type { ComponentType } from 'react';
import { Facebook, Github, Instagram, Linkedin, Mail, Send, Gamepad2, MessageCircle, Youtube } from 'lucide-react';

const withHttps = (url?: string | null) => {
  if (!url) return null;
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};

type ContactItem = {
  label: string;
  href: string | null;
  icon: ComponentType<{ size?: number }>;
};

type ContactGroup = {
  title: string;
  items: ContactItem[];
};

const groups: ContactGroup[] = [
  {
    title: 'Social',
    items: [
      { label: 'Facebook', href: withHttps(process.env.NEXT_PUBLIC_FACEBOOK || null), icon: Facebook },
      { label: 'Instagram', href: withHttps(process.env.NEXT_PUBLIC_INSTAGRAM || null), icon: Instagram },
      { label: 'YouTube', href: withHttps(process.env.NEXT_PUBLIC_YOUTUBE || null), icon: Youtube }
    ]
  },
  {
    title: 'Professional',
    items: [
      {
        label: 'Email',
        href: process.env.NEXT_PUBLIC_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_EMAIL}` : null,
        icon: Mail
      },
      { label: 'LinkedIn', href: withHttps(process.env.NEXT_PUBLIC_LINKEDIN || null), icon: Linkedin },
      { label: 'GitHub', href: withHttps(process.env.NEXT_PUBLIC_GITHUB || null), icon: Github },
      { label: 'Telegram', href: withHttps(process.env.NEXT_PUBLIC_TELEGRAM || null), icon: Send }
    ]
  },
  {
    title: 'Gaming',
    items: [
      { label: 'Steam', href: withHttps(process.env.NEXT_PUBLIC_STEAM || null), icon: Gamepad2 },
      { label: 'Discord', href: withHttps(process.env.NEXT_PUBLIC_DISCORD || null), icon: MessageCircle }
    ]
  }
];

const ContactSection = () => (
  <section
    id="contact"
    className="section contact"
    data-search-entry="true"
    data-search-title="Contact"
    data-search-description="Grouped social, professional and gaming links"
    tabIndex={-1}
  >
    <header className="section__header">
      <h2>Где меня найти</h2>
      <p>Пишите там, где вам удобнее. Я отвечаю быстро.</p>
    </header>
    <div className="contact__groups">
      {groups.map((group) => (
        <article key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item.label}>
                <item.icon size={18} />
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <span className="contact__placeholder">скоро</span>
                )}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default ContactSection;
