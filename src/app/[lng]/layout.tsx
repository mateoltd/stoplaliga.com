import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { languages, type Language } from "@/dictionaries";
import { getSeoMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate static routes for our languages
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// Generates the metadata for the page
export async function generateMetadata({ params: paramsFromProps }: { params: { lng: string } }): Promise<Metadata> {
  const params = await paramsFromProps; // Temporary fix until I figure out what's going on
  const locale = params.lng === "en" ? "en" : "es";
  return getSeoMetadata(locale);
}

export default async function LangLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: Language }>; // Type params as a Promise
}) {
  const { lng } = await paramsPromise; // Await and destructure lng


  // The lng variable is available if needed for other purposes here.
  return <>{children}</>;
} 