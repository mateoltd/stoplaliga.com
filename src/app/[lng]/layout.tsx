import type { Metadata } from "next";
import "../globals.css";
import { languages, type Language } from "@/dictionaries";
import { getSeoMetadata } from "@/lib/seo";

// Generate static routes for our languages
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// Generates the metadata for the page
export async function generateMetadata({ params: paramsFromProps }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
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
  await paramsPromise; // Await the params (lng is available in the component if needed)

  return <>{children}</>;
} 