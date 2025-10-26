'use client';

import { useEffect, useState } from 'react';

const clamp = (value: number) => Math.min(100, Math.max(0, value));

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
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
    </div>
  );
};

export default ReadingProgress;
