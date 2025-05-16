import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo_Black, Space_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { defaultLocale } from "../../middleware";
import { getSeoMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Brutalist fonts for animation
const archivoBlack = Archivo_Black({
  weight: "400", // Only available weight
  variable: "--font-archivo-black",
  subsets: ["latin", "latin-ext"], // Include Latin Extended for Spanish characters
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"], // Regular and Bold
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = getSeoMetadata("es");


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const lang = headerList.get("x-language") || defaultLocale;

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
