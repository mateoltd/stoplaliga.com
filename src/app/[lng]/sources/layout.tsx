import type { Metadata } from "next";
import { getSeoMetadata, getStructuredData } from "@/lib/seo";

// Generates the metadata for the sources page
export async function generateMetadata({ params: paramsFromProps }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const params = await paramsFromProps;
  const locale = params.lng === "en" ? "en" : "es";
  return getSeoMetadata(locale, 'sources');
}

export default async function SourcesLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const params = await paramsPromise;
  const locale = params.lng === "en" ? "en" : "es";
  const structuredData = getStructuredData(locale, 'sources');

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