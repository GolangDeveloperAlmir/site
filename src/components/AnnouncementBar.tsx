import { useEffect, useState } from 'react';

const AnnouncementBar = () => {
  const message = process.env.NEXT_PUBLIC_ANNOUNCEMENT;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed === 'true') setHidden(true);
  }, []);

  if (!message || hidden) return null;

  return (
    <div className="announcement-bar">
      <span>{message}</span>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          localStorage.setItem('announcementDismissed', 'true');
          setHidden(true);
        }}
      >
        ×
      </button>
    </div>
  );
};

export default AnnouncementBar;
