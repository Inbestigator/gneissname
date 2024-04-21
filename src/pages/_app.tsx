import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Gneissname</title>
        <meta name="og:title" content="Gneissname" />
        <meta property="og:image" content="cdn/icon.png" />
        <meta name="theme-color" content="#020202" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
