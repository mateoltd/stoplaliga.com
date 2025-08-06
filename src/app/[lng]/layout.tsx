import type { Metadata } from "next";
import "../globals.css";
import { languages, type Language } from "@/dictionaries";
import { getSeoMetadata, getStructuredData } from "@/lib/seo";

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
  params: Promise<{ lng: Language }>;
}) {
  const params = await paramsPromise; // Await the params (lng is available in the component if needed)
  const locale = params.lng === "en" ? "en" : "es";
  const structuredData = getStructuredData(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {children}
    </>
  );
} 