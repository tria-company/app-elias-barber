import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#fbb03b",
};

export const metadata: Metadata = {
  title: "Seu Elias - Barbearia",
  description: "Barba, cabelo e bigode desde 1959",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Elias Barber",
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Elias Barber" />
      </head>
      <body
        className={`${plusJakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
