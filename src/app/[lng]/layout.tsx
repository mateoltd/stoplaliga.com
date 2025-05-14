import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { languages, type Language } from "@/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StopLaLiga",
  description: "StopLaLiga application with Next.js",
};

// Generate static routes for our languages
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LangLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: Language }>; // Type params as a Promise
}) {
  const { lng } = await paramsPromise; // Await and destructure lng

  // This layout is now simpler, root layout handles <html> lang attribute.
  // The lng variable is available if needed for other purposes here.
  return <>{children}</>;
} 