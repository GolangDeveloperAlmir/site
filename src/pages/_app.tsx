import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

// Load FaroInit only on client to avoid SSR issues
const FaroInit = dynamic(() => import('../components/FaroInit'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <FaroInit />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
