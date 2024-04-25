import { ThemeProvider } from "@/components/theme-provider";
import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Gneissname</title>
        <meta name="og:title" content="Gneissname" />
        <meta property="og:image" content="/cdn/icon.png" />
        <meta name="theme-color" content="#020202" />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
