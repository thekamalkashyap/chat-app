import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Go-sheep</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
          maximum-scale="1"
        />
        <meta
          name="description"
          content="RealTime chat app using nextjs, tailwindcss and firebase"
        />
        <meta name="author" content="kamal kashyap" />
      </Head>
      <AuthProvider>
        <div className=" max-w-4xl m-auto">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </>
  );
}

export default MyApp;
