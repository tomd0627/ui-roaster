import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ui-roaster.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "UI Roaster — Brutally Honest UI Feedback",
  description:
    "Drop a UI screenshot and get an AI-powered roast of your design's visual quality, UX, accessibility, typography, and layout.",
  openGraph: {
    title: "UI Roaster — Brutally Honest UI Feedback",
    description:
      "Drop a UI screenshot and get an AI-powered roast of your design.",
    url: siteUrl,
    siteName: "UI Roaster",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Roaster — Brutally Honest UI Feedback",
    description:
      "Drop a UI screenshot and get an AI-powered roast of your design.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col" style={{ fontFamily: "var(--font-space-grotesk, var(--font-sans))" }}>
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
