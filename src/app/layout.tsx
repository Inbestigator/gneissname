import "./globals.css";
import { Suspense } from "react";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";

import { Providers } from "./providers";

export const viewport: Viewport[] = [
  { themeColor: "(prefers-color-scheme: light)", colorScheme: "light" },
  { themeColor: "(prefers-color-scheme: dark)", colorScheme: "dark" },
];

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="container mx-auto grow px-6 pt-16">
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
