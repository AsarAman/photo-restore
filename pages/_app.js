import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <Analytics/>
        </SessionProvider>
      </Layout>
    </>
  );
}
