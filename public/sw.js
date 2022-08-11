if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const r =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[r]) return;
    let t = {};
    const c = (e) => n(e, r),
      o = { module: { uri: r }, exports: t, require: c };
    s[r] = Promise.all(a.map((e) => o[e] || c(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-6a1bf588'], function (e) {
  'use strict';
  importScripts('fallback-Ue6-YPVQaw7LTbIGqF9Ip.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/Ue6-YPVQaw7LTbIGqF9Ip/_buildManifest.js',
          revision: '0852025e085e1def462f76105826aadf',
        },
        {
          url: '/_next/static/Ue6-YPVQaw7LTbIGqF9Ip/_middlewareManifest.js',
          revision: 'fb2823d66b3e778e04a3f681d0d2fb19',
        },
        {
          url: '/_next/static/Ue6-YPVQaw7LTbIGqF9Ip/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/main-0f3ac939ef7f7807.js',
          revision: '0f3ac939ef7f7807',
        },
        {
          url: '/_next/static/chunks/pages/404-7b103a47b979f37d.js',
          revision: '7b103a47b979f37d',
        },
        {
          url: '/_next/static/chunks/pages/_app-3db4f268e03a2278.js',
          revision: '3db4f268e03a2278',
        },
        {
          url: '/_next/static/chunks/pages/_error-49f0f5318dc60976.js',
          revision: '49f0f5318dc60976',
        },
        {
          url: '/_next/static/chunks/pages/_offline-519e6973a81bb3f3.js',
          revision: '519e6973a81bb3f3',
        },
        {
          url: '/_next/static/chunks/pages/chat/%5Bid%5D-e280f882e9887e93.js',
          revision: 'e280f882e9887e93',
        },
        {
          url: '/_next/static/chunks/pages/index-b017db952429a7dd.js',
          revision: 'b017db952429a7dd',
        },
        {
          url: '/_next/static/chunks/polyfills-5cd94c89d3acac5f.js',
          revision: '99442aec5788bccac9b2f0ead2afdd6b',
        },
        {
          url: '/_next/static/chunks/webpack-9b312e20a4e32339.js',
          revision: '9b312e20a4e32339',
        },
        {
          url: '/_next/static/css/002e3588cd4e2f8a.css',
          revision: '002e3588cd4e2f8a',
        },
        {
          url: '/_next/static/media/google.4554318a.png',
          revision: '3e26049d9396f49912688a986b4027b8',
        },
        { url: '/_offline', revision: 'Ue6-YPVQaw7LTbIGqF9Ip' },
        { url: '/google.png', revision: '3e26049d9396f49912688a986b4027b8' },
        {
          url: '/icons/icon-128x128.png',
          revision: '564c1e3ae1efc904e1ebd3467b4b6716',
        },
        {
          url: '/icons/icon-144x144.png',
          revision: 'a23880a48193020801d25e5c1e8f1026',
        },
        {
          url: '/icons/icon-152x152.png',
          revision: '267f4313adcc3975f27bd3c28fde1531',
        },
        {
          url: '/icons/icon-192x192.png',
          revision: '638a3f6b8834291e01ff7d8ae015bb30',
        },
        {
          url: '/icons/icon-384x384.png',
          revision: '8d48a5456788b8ec41b822f33602ae0b',
        },
        {
          url: '/icons/icon-48x48.png',
          revision: 'a4e0d99db85599d332b072879ac6bca2',
        },
        {
          url: '/icons/icon-512x512.png',
          revision: 'fbaf37d2c7316b97f1577eb1cba43848',
        },
        {
          url: '/icons/icon-72x72.png',
          revision: 'ca38deff18926643e80dc471799b7548',
        },
        {
          url: '/icons/icon-96x96.png',
          revision: 'c0e73f4177ae616dce7b9d250f4a3c24',
        },
        { url: '/logo.ico', revision: 'c5b5ae7e754255305f3229744e0ff79d' },
        { url: '/manifest.json', revision: '84ae5cdf8bb239ae2c211da3f619b64e' },
        { url: '/ogLogo.webp', revision: '25fd83198faa0302411d6f1231a38f9d' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET'
    );
});
