import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Restore your old face photos and keep the memories alive."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="photo restore, photo enhancement, photo quality improvement"
        />
        <meta name="author" content="Syed Asar Aman" />
        <meta property="og:site_name" content="old-photo-restore.vercel.com" />
        <meta
          property="og:description"
          content="Restore your old face photos and keep the memories alive."
        />
        <meta property="og:title" content="Face Photo Restorer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Face Photo Restorer" />
        <meta
          name="twitter:description"
          content="Restore your old photos and keep the memories alive."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
