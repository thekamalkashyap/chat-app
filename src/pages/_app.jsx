import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
import { useEffect } from 'react';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Gosheep</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
          maximum-scale="1"
        />
      </Head>
      <AuthProvider>
        <div className=" max-w-2xl m-auto">
          <Header />
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </>
  );
}

export default MyApp;
