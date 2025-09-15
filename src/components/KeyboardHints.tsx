import { useEffect, useState } from 'react';

const KeyboardHints = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!open) return null;

  return (
    <div className="keyboard-hints" role="dialog" aria-modal="true">
      <div className="keyboard-hints-content">
        <h2>Keyboard shortcuts</h2>
        <ul>
          <li>
            <kbd>/</kbd> Focus search
          </li>
          <li>
            <kbd>?</kbd> Toggle keyboard help
          </li>
        </ul>
        <button type="button" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default KeyboardHints;
