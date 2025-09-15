import Script from 'next/script';

const Analytics = () => {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      async
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
};

export default Analytics;
