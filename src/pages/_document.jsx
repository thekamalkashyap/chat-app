import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <meta
          name="description"
          content="RealTime chat app using nextjs, tailwindcss and firebase"
        />
        <meta name="author" content="kamal kashyap" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.ico" type="image/x-ico" />
        <link rel="apple-touch-icon" href="/logo.ico"></link>
        <meta name="theme-color" content="#1f2937" />
        <meta property="og:image" content="/ogLogo.webp" />
      </Head>
      <body className=" dark:bg-gray-800 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
