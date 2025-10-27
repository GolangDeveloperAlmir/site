/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use default server output to run with `next start`
  eslint: {
    // Linting errors should fail CI, but not block builds in production containers
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' " + (process.env.NEXT_PUBLIC_FARO_URL ? new URL(process.env.NEXT_PUBLIC_FARO_URL).origin : ''),
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].filter(Boolean);

    const headers = [
      { key: 'Content-Security-Policy', value: cspDirectives.join('; ') },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-DNS-Prefetch-Control', value: 'off' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
    ];

    return [
      {
        source: '/:path*',
        headers,
      },
    ];
  },
};

module.exports = nextConfig;
