import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Свадьба Ани и Марка | 14.08.2026",
  description:
    "Приглашение на свадьбу Ани и Марка: программа вечера, дресс-код, локация и RSVP.",
  keywords: [
    "свадьба",
    "приглашение",
    "Аня и Марк",
    "Forest Park",
    "RSVP"
  ],
  openGraph: {
    title: "Свадьба Ани и Марка | 14.08.2026",
    description: "Добро пожаловать на нашу свадьбу в Forest Park.",
    type: "website",
    locale: "ru_RU",
    url: "https://example.com",
    siteName: "Свадьба Ани и Марка",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Свадьба Ани и Марка"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Свадьба Ани и Марка | 14.08.2026",
    description: "Приглашение на свадьбу в Forest Park",
    images: ["/opengraph-image"]
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
