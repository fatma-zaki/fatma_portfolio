import type { Metadata, Viewport } from "next";
import { Cinzel, JetBrains_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { brand } from "@/lib/brand";

// Display / brand voice — used for the wordmark and section titles only.
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// UI voice — everything else.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Technical voice — indices, categories, stack labels and annotations.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-tech",
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteTitle = `${brand.fullName} — ${brand.title}`;

export const metadata: Metadata = {
  title: siteTitle,
  description: brand.tagline,
  keywords: [
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Engineering",
    brand.fullName,
  ],
  authors: [{ name: brand.fullName, url: brand.site }],
  openGraph: {
    title: siteTitle,
    description: brand.tagline,
    type: "website",
    locale: "en_US",
    siteName: `${brand.fullName} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: brand.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F5F1" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1326" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${montserrat.variable} ${jetbrains.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
