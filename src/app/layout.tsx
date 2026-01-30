import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

export const viewport: Viewport[] = [
  { themeColor: "(prefers-color-scheme: light)", colorScheme: "light" },
  { themeColor: "(prefers-color-scheme: dark)", colorScheme: "dark" },
];

export const metadata: Metadata = {
  title: { default: "Gneissname", template: "%s - Gneissname" },
  description: "I'm a geologist and YouTuber who likes to make things.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("flex min-h-dvh flex-col p-4", inter.className)}>
        <main className="container mx-auto">
          <Providers>{children}</Providers>
        </main>
        <footer className="container mt-auto flex gap-4">
          <Link target="_blank" href="https://youtube.com/@gneissname" className="link-hover">
            YouTube
          </Link>
          <Link
            target="_blank"
            href="https://discord.com/servers/gneiss-server-750062409364013159"
            className="link-hover"
          >
            Discord
          </Link>
        </footer>
      </body>
    </html>
  );
}
