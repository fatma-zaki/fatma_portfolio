import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fatma Zaki — Frontend Developer",
  description:
    "Frontend Developer specializing in React & Next.js. Building elegant, scalable, and user-focused web applications.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Fatma Zaki",
  ],
  authors: [{ name: "Fatma Zaki", url: "https://fatmazaki.dev" }],
  openGraph: {
    title: "Fatma Zaki — Frontend Developer",
    description:
      "Frontend Developer specializing in React & Next.js. Building elegant, scalable, and user-focused web applications.",
    type: "website",
    locale: "en_US",
    siteName: "Fatma Zaki Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatma Zaki — Frontend Developer",
    description:
      "Frontend Developer specializing in React & Next.js. Building elegant, scalable, and user-focused web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
