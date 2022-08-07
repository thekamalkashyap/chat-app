import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
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
        <meta
          name="description"
          content="RealTime chat app using nextjs, tailwindcss and firebase"
        />
        <meta name="author" content="kamal kashyap" />
        <link rel="icon" href="/logo.ico" type="image/x-ico" />
        <meta property="og:image" content="/ogLogo.webp" />
      </Head>
      <AuthProvider>
        <Header />
        <div className=" max-w-4xl m-auto">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </>
  );
}

export default MyApp;
