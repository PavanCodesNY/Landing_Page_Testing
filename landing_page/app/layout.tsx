import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070d",
};

export const metadata: Metadata = {
  title: "N-Mapper | Learning Made Efficient",
  description:
    "Play School Like A Game — Navigate your Canvas courses as a 3D knowledge graph with voice-first navigation.",
  keywords: [
    "Canvas LMS",
    "knowledge graph",
    "3D visualization",
    "voice navigation",
    "student tools",
    "learning efficiency",
  ],
  authors: [{ name: "N-Mapper Team" }],
  openGraph: {
    title: "N-Mapper | Learning Made Efficient",
    description:
      "Navigate your Canvas courses as a 3D knowledge graph with voice-first control.",
    type: "website",
    locale: "en_US",
    siteName: "N-Mapper",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-Mapper | Learning Made Efficient",
    description:
      "Play School Like A Game — Navigate your Canvas courses as a 3D knowledge graph.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
