import type { Metadata } from "next";
import "./globals-old.css";

import {
  DM_Sans,
  DM_Mono,
  Cormorant_Garamond,
} from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Gonomadigo — Hitchhiking Nomad",
  description: "Premium adventure travel experiences across India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}