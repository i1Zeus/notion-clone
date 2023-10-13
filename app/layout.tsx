import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zotion",
  description: "Notion clone built with Next.js and Tailwind CSS",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/Logo-Dark.svg",
        href: "/Logo-Dark.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/Logo.svg",
        href: "/Logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="zotion-theme"
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
