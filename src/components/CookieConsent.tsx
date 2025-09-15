'use client';
import { useEffect, useState } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookie-consent='));
    if (!hasConsent) setVisible(true);
  }, []);

  const accept = () => {
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    document.cookie = `cookie-consent=true; path=/; expires=${expiry.toUTCString()}; SameSite=Lax; Secure`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <span>We use cookies to enhance your experience.</span>
      <button type="button" onClick={accept}>
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
