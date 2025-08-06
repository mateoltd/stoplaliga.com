type Locale = "es" | "en";

interface MetadataConfig {
  title: string;
  description: string;
  locale: string;
  keywords: string[];
  canonicalUrl?: string;
}

export const metadataByLocale: Record<Locale, MetadataConfig> = {
  es: {
    title: "StopLaLiga - Contra la censura en Internet",
    description:
      "LaLiga está bloqueando webs legítimas e infraestructuras críticas en España con la excusa de la piratería. Únete a la resistencia.",
    locale: "es_ES",
    keywords: [
      // Primary terms
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
      // Long-tail keywords
      "laliga bloqueo sitios web",
      "laliga censura internet españa",
      "cloudflare bloqueado españa",
      "vercel bloqueado laliga",
      "netlify bloqueado españa",
      "censura internet españa 2025",
      "bloqueo ip masivo españa",
      "laliga vs cloudflare demanda",
      "libertad internet españa",
      "censura digital españa",
      // Technical terms
      "bloqueo ip españa",
      "dns bloqueo españa",
      "censura web españa",
      "derechos digitales españa",
      "infraestructura web bloqueada",
      // News-related long-tail
      "laliga bloquea cloudflare 2025",
      "vercel censurado españa",
      "twitch bloqueado laliga",
      "matthew prince laliga",
      "guillermo rauch vercel laliga",
    ],
  },
  en: {
    title: "StopLaLiga - Fight Internet Censorship in Spain",
    description:
      "LaLiga is blocking legitimate websites and critical infrastructure in Spain due to overreaching anti-piracy efforts. Join the resistance.",
    locale: "en_US",
    keywords: [
      // Primary terms
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
      // Long-tail keywords
      "laliga blocking websites spain",
      "laliga internet censorship 2025",
      "cloudflare blocked spain laliga",
      "vercel blocked spain",
      "netlify blocked laliga",
      "internet censorship spain 2025",
      "mass ip blocking spain",
      "laliga vs cloudflare lawsuit",
      "spain internet freedom",
      "digital censorship spain",
      // Technical terms
      "ip blocking spain",
      "dns blocking spain",
      "web censorship spain",
      "digital rights spain",
      "web infrastructure blocked",
      // News-related long-tail
      "laliga blocks cloudflare 2025",
      "vercel censored spain",
      "twitch blocked laliga",
      "matthew prince laliga statement",
      "guillermo rauch vercel laliga",
      "spain football censorship",
    ],
  },
};

// Page-specific metadata configurations
export const pageMetadata = {
  controversies: {
    es: {
      title: "Controversias de LaLiga - Historial de Vigilancia y Censura",
      description: "Descubre el historial completo de controversias de LaLiga: desde la app espía de 2018 hasta la vigilancia biométrica en estadios.",
      keywords: [
        "laliga controversias",
        "laliga app espia",
        "laliga vigilancia biometrica",
        "laliga multa gdpr",
        "laliga reconocimiento facial",
        "laliga privacidad usuarios",
        "laliga microfono app",
        "laliga surveillance app 2018",
        "aepd laliga multa",
        "laliga facial recognition fine",
      ]
    },
    en: {
      title: "LaLiga Controversies - History of Surveillance and Censorship",
      description: "Discover LaLiga's complete history of controversies: from the 2018 spy app to biometric surveillance in stadiums.",
      keywords: [
        "laliga controversies",
        "laliga spy app",
        "laliga biometric surveillance", 
        "laliga gdpr fine",
        "laliga facial recognition",
        "laliga user privacy",
        "laliga microphone app",
        "laliga surveillance app 2018",
        "spanish data protection agency fine",
        "laliga facial recognition penalty",
      ]
    }
  },
  sources: {
    es: {
      title: "Fuentes y Referencias - Documentación del Caso StopLaLiga",
      description: "Fuentes periodísticas y documentación oficial sobre los bloqueos de LaLiga a infraestructuras críticas de internet en España.",
      keywords: [
        "fuentes laliga bloqueo",
        "referencias censura internet españa",
        "documentacion laliga cloudflare",
        "noticias laliga bloqueo",
        "prensa laliga censura",
        "articulos laliga internet",
        "medios laliga bloqueo web",
      ]
    },
    en: {
      title: "Sources and References - StopLaLiga Case Documentation", 
      description: "Journalistic sources and official documentation about LaLiga's blocking of critical internet infrastructure in Spain.",
      keywords: [
        "laliga blocking sources",
        "spain internet censorship references",
        "laliga cloudflare documentation",
        "laliga blocking news",
        "laliga censorship press",
        "laliga internet articles",
        "laliga web blocking media",
      ]
    }
  }
};

interface JsonLdGraph {
  "@context": string;
  "@graph": unknown[];
}

interface BreadcrumbList {
  "@type": "BreadcrumbList";
  "@id": string;
  "itemListElement": Array<{
    "@type": "ListItem";
    "position": number;
    "name": string;
    "item": string;
  }>;
}

/**
 * Get the SEO metadata for the given locale and page
 * @param locale - The locale to get the metadata for.
 * @param page - Optional page type for specific metadata
 * @returns The SEO metadata.
 */
export function getSeoMetadata(locale: Locale, page?: 'controversies' | 'sources') {
  const meta = page ? pageMetadata[page][locale] : metadataByLocale[locale];
  const baseMeta = metadataByLocale[locale];
  
  // Use page-specific metadata if available, otherwise fall back to base metadata
  const title = meta.title || baseMeta.title;
  const description = meta.description || baseMeta.description;
  const keywords = meta.keywords ? [...baseMeta.keywords, ...meta.keywords] : baseMeta.keywords;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      locale: baseMeta.locale,
      siteName: "StopLaLiga",
      url: `https://stoplaliga.com${page ? `/${locale}/${page}` : ''}`,
      type: "website",
      images: [
        {
          url: "https://stoplaliga.com/og-image.webp", // Fixed extension
          width: 1200,
          height: 630,
          alt: "StopLaLiga - Internet Blocked",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@drexpected",
      images: ["https://stoplaliga.com/og-image.webp"], // Fixed extension
    },
    // Add canonical URL and hreflang
    alternates: {
      canonical: `https://stoplaliga.com${page ? `/${locale}/${page}` : `/${locale}`}`,
      languages: {
        'es-ES': `https://stoplaliga.com${page ? `/es/${page}` : '/es'}`,
        'en-US': `https://stoplaliga.com${page ? `/en/${page}` : '/en'}`,
        'x-default': `https://stoplaliga.com${page ? `/${page}` : ''}`, // Content negotiated root
      }
    }
  };
}

/**
 * Generate JSON-LD structured data for the website
 */
export function getStructuredData(locale: Locale, page?: 'controversies' | 'sources'): JsonLdGraph {
  const baseData: JsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://stoplaliga.com/#organization",
        "name": "StopLaLiga",
        "url": "https://stoplaliga.com",
        "sameAs": [
          "https://twitter.com/drexpected"
        ],
        "logo": {
          "@type": "ImageObject",
          "url": "https://stoplaliga.com/og-image.webp"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://stoplaliga.com/#website", 
        "url": "https://stoplaliga.com",
        "name": "StopLaLiga",
        "description": locale === 'es' 
          ? "Documentando la censura de LaLiga en internet y sus efectos en la infraestructura web de España"
          : "Documenting LaLiga's internet censorship and its effects on Spain's web infrastructure",
        "publisher": {
          "@id": "https://stoplaliga.com/#organization"
        },
        "inLanguage": locale === 'es' ? 'es-ES' : 'en-US'
      }
    ]
  };

  // Add breadcrumb navigation
  const breadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `https://stoplaliga.com${page ? `/${locale}/${page}` : `/${locale}`}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'es' ? "Inicio" : "Home",
        "item": `https://stoplaliga.com/${locale}`
      }
    ]
  };

  if (page) {
    breadcrumbs.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": page === 'controversies' 
        ? (locale === 'es' ? "Controversias" : "Controversies")
        : (locale === 'es' ? "Fuentes" : "Sources"),
      "item": `https://stoplaliga.com/${locale}/${page}`
    });
  }

  baseData["@graph"].push(breadcrumbs);

  // Add page-specific structured data
  if (page === 'controversies') {
    baseData["@graph"].push({
      "@type": "Article",
      "@id": `https://stoplaliga.com/${locale}/controversies#article`,
      "headline": locale === 'es' 
        ? "Controversias de LaLiga - Historial de Vigilancia y Censura"
        : "LaLiga Controversies - History of Surveillance and Censorship",
      "description": locale === 'es'
        ? "Historial completo de controversias de LaLiga incluyendo vigilancia de usuarios y censura en internet"
        : "Complete history of LaLiga controversies including user surveillance and internet censorship",
      "author": {
        "@id": "https://stoplaliga.com/#organization"
      },
      "publisher": {
        "@id": "https://stoplaliga.com/#organization"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://stoplaliga.com/${locale}/controversies`
      },
      "inLanguage": locale === 'es' ? 'es-ES' : 'en-US',
      "about": [
        {
          "@type": "Thing",
          "name": "LaLiga",
          "description": locale === 'es' ? "Liga española de fútbol" : "Spanish football league"
        },
        {
          "@type": "Thing", 
          "name": locale === 'es' ? "Censura de Internet" : "Internet Censorship"
        }
      ]
    });
  }

  return baseData;
}
