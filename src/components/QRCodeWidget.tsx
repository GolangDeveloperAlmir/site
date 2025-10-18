'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as QRCode from 'qrcode';

const QRCodeWidget = () => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    const url = window.location.href;
    QRCode.toDataURL(url, { width: 160, margin: 1 })
      .then(setDataUrl)
      .catch(() => setDataUrl(''));
  }, []);

  if (!dataUrl) return null;

  return (
    <div className="qr-widget" aria-live="polite">
      <Image
        src={dataUrl}
        alt="QR code linking to this site"
        width={160}
        height={160}
        unoptimized
      />
      <a download="almir-site-qr.png" href={dataUrl} className="qr-widget__download">
        Download QR
      </a>
    </div>
  );
};

export default QRCodeWidget;
