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
      <body className={`${inter.variable} ${playfair.variable}`}>
        <div className="side-decor" aria-hidden="true">
          <img src="/decor/stvol-1.png" alt="" className="side-decor__trunk side-decor__trunk--left" />
          <img src="/decor/stvol-1.png" alt="" className="side-decor__trunk side-decor__trunk--right" />
          <img src="/decor/list-1.png" alt="" className="side-decor__leaf side-decor__leaf--left-1" />
          <img src="/decor/list-2.png" alt="" className="side-decor__leaf side-decor__leaf--left-2" />
          <img src="/decor/list-3.png" alt="" className="side-decor__leaf side-decor__leaf--left-3" />
          <img src="/decor/list-2.png" alt="" className="side-decor__leaf side-decor__leaf--left-4" />
          <img src="/decor/list-1.png" alt="" className="side-decor__leaf side-decor__leaf--left-5" />
          <img src="/decor/list-3.png" alt="" className="side-decor__leaf side-decor__leaf--left-6" />
          <img src="/decor/list-1.png" alt="" className="side-decor__leaf side-decor__leaf--right-1" />
          <img src="/decor/list-2.png" alt="" className="side-decor__leaf side-decor__leaf--right-2" />
          <img src="/decor/list-3.png" alt="" className="side-decor__leaf side-decor__leaf--right-3" />
          <img src="/decor/list-2.png" alt="" className="side-decor__leaf side-decor__leaf--right-4" />
          <img src="/decor/list-1.png" alt="" className="side-decor__leaf side-decor__leaf--right-5" />
          <img src="/decor/list-3.png" alt="" className="side-decor__leaf side-decor__leaf--right-6" />
        </div>
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
