import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

export const viewport: Viewport[] = [
  { themeColor: "(prefers-color-scheme: light)", colorScheme: "light" },
  { themeColor: "(prefers-color-scheme: dark)", colorScheme: "dark" },
];

export const metadata: Metadata = {
  title: {
    default: "Gneissname",
    template: "%s - Gneissname",
  },
  description: "I'm a geologist and YouTuber who likes to make things.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("px-4", inter.className)}>
        <Providers>
          <main className="container mx-auto mt-16">
            <Suspense
              fallback={
                <div className="flex w-full items-center justify-center">
                  <span className="loading loading-bars loading-lg"></span>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
