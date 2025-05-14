type Locale = "es" | "en";

interface MetadataConfig {
  title: string;
  description: string;
  locale: string;
  keywords: string[];
}

export const metadataByLocale: Record<Locale, MetadataConfig> = {
  es: {
    title: "Stop LaLiga - Contra la censura en Internet",
    description:
      "LaLiga está bloqueando webs legítimas e infraestructuras críticas en España con la excusa de la piratería. Denuncia la censura.",
    locale: "es_ES",
    keywords: [
      "laliga",
      "bloqueo",
      "censura digital",
      "libertad de expresión",
      "España",
      "internet",
      "dns",
      "cloudflare",
      "netlify",
      "piratería",
    ],
  },
  en: {
    title: "Stop LaLiga - Fight Internet Censorship in Spain",
    description:
      "LaLiga is blocking legitimate websites and critical infrastructure in Spain due to overreaching anti-piracy efforts. Join the resistance.",
    locale: "en_US",
    keywords: [
      "laliga",
      "censorship",
      "ip blocking",
      "internet freedom",
      "Spain",
      "dns",
      "piracy",
      "cloudflare",
      "netlify",
      "freedom of speech",
    ],
  },
};

/**
 * Get the SEO metadata for the given locale.
 * @param locale - The locale to get the metadata for.
 * @returns The SEO metadata.
 */
export function getSeoMetadata(locale: Locale) {
  const meta = metadataByLocale[locale];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(", "),
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: meta.locale,
      siteName: "Stop LaLiga",
      url: "https://stoplaliga.com",
      type: "website",
      images: [
        {
          url: "https://stoplaliga.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Stop LaLiga - Internet Blocked",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: "@drexpected",
      images: ["https://stoplaliga.com/og-image.jpg"],
    },
  };
}
