import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dixit Saini | Android Developer",
  description: "Senior Android Developer with 3+ years of experience building scalable mobile applications. Expert in Kotlin, Firebase, WebRTC, and modern Android architecture.",
  keywords: ["Android Developer", "Kotlin", "Firebase", "WebRTC", "MVVM", "Jetpack Compose", "Mobile App Development"],
  authors: [{ name: "Dixit Saini" }],
  creator: "Dixit Saini",
  publisher: "Dixit Saini",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dixitsaini.dev",
    title: "Dixit Saini | Android Developer",
    description: "Senior Android Developer with 3+ years of experience building scalable mobile applications.",
    siteName: "Dixit Saini Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dixit Saini | Android Developer",
    description: "Senior Android Developer with 3+ years of experience building scalable mobile applications.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0F" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-primary text-primary">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}