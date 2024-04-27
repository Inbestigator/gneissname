import { ThemeProvider } from "@/components/theme-provider";
import "../styles/globals.css";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Gneissname</title>
        <meta name="og:title" content="Gneissname" />
        <meta property="og:image" content="/cdn/icon.png" />
        <meta name="theme-color" content="#020202" />
        <meta
          name="og:description"
          content="Your favorite geology YouTuber."
        ></meta>
        <meta
          name="description"
          content="Your favorite geology YouTuber."
        ></meta>
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
