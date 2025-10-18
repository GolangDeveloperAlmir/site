'use client';

import { useEffect, useState } from 'react';

type Commit = {
  sha: string;
  message: string;
  url: string;
  repo: string;
};

const parseRepos = () => {
  const raw = process.env.NEXT_PUBLIC_GITHUB_WIDGET_REPOS;
  if (!raw) return ['openai/openai-cookbook'];
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const GitHubWidget = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  useEffect(() => {
    const repos = parseRepos();
    if (!repos.length) return;
    setStatus('loading');

    const fetchCommits = async () => {
      try {
        const results = await Promise.all(
          repos.map(async (repo) => {
            const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=3`);
            if (!response.ok) throw new Error('Failed request');
            const data = await response.json();
            return data.map((item: any) => ({
              sha: item.sha,
              message: item.commit.message.split('\n')[0],
              url: item.html_url,
              repo
            }));
          })
        );
        setCommits(results.flat());
        setStatus('idle');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    fetchCommits();
  }, []);

  return (
    <section
      id="github"
      className="section github"
      data-search-entry="true"
      data-search-title="GitHub"
      data-search-description="Recent commits from selected repositories"
      tabIndex={-1}
    >
      <header className="section__header">
        <h2>GitHub</h2>
        <p>Последние коммиты в выбранных репозиториях.</p>
      </header>
      {status === 'loading' && <p>Загружаю данные GitHub…</p>}
      {status === 'error' && <p>Не удалось загрузить коммиты. Попробуйте позже.</p>}
      <ul className="github__list">
        {commits.map((commit) => (
          <li key={commit.sha}>
            <h3>{commit.repo}</h3>
            <a href={commit.url} target="_blank" rel="noopener noreferrer">
              {commit.message}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GitHubWidget;
