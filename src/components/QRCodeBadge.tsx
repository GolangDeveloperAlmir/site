'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const resolveUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return '';
};

const QRCodeBadge = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(resolveUrl());
  }, []);

  if (!url) return null;

  return (
    <div className="qr-code" aria-label="QR-код для быстрого доступа">
      <QRCodeSVG value={url} size={96} includeMargin fgColor="currentColor" />
      <p>Отсканируйте, чтобы открыть сайт</p>
    </div>
  );
};

export default QRCodeBadge;
