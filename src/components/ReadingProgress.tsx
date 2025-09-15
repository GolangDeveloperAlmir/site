'use client';

import { useEffect, useState } from 'react';

const clamp = (value: number) => Math.min(100, Math.max(0, value));

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }
      const percentage = (scrollTop / maxScroll) * 100;
      setProgress(clamp(percentage));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgress;
