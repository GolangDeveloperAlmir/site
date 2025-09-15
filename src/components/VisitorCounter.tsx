'use client';
import { useEffect, useState } from 'react';

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const current = parseInt(localStorage.getItem('visit-count') || '0', 10) + 1;
      localStorage.setItem('visit-count', String(current));
      setCount(current);
    } catch {
      // ignore
    }
  }, []);

  if (count === null) return null;

  return <span className="visitor-counter">Visits: {count}</span>;
};

export default VisitorCounter;
