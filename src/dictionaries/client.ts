// Define the supported languages
export const languages = ['es', 'en'] as const;
export type Language = (typeof languages)[number];

// ---------------------------
// Types
// ---------------------------

// Generic map of localized strings present in JSON files
interface LocalizedString {
  en: string;
  es: string;
}

// Individual source entry inside each topic
interface SourceEntry {
  publisher: string;
  date: string; // ISO date string
  url: string;
  title: LocalizedString;
}

// Structure of each topic within sources.json
interface SourceTopic {
  title: LocalizedString;
  subtitle: LocalizedString;
  entries: SourceEntry[];
}

// Full shape of sources.json (keyed by topic slug)
type SourcesDictionary = Record<string, SourceTopic>;

// After processing for a specific locale we expose this shape to the app
interface ProcessedSourceEntry {
  publisher: string;
  date: string;
  url: string;
  title: string; // Already localized
}

interface ProcessedSourceTopic {
  title: string;
  subtitle: string;
  entries: ProcessedSourceEntry[];
}

type ProcessedSources = Record<string, ProcessedSourceTopic>;

// Define the dictionaries for client-side use
const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

// Cast the imported JSON to the proper dictionary type so we avoid implicit 'any'
const sources = () =>
  import('./sources.json').then((module) => module.default as SourcesDictionary);

export const getDictionary = async (locale: Language) => {
  try {
    const [languageDictionary, sourcesDictionary] = await Promise.all([
      dictionaries[locale](),
      sources(),
    ]);

    const processedSources: ProcessedSources = {};
    for (const topic in sourcesDictionary) {
      if (Object.prototype.hasOwnProperty.call(sourcesDictionary, topic)) {
        const sourceTopic = sourcesDictionary[topic as keyof typeof sourcesDictionary];
        processedSources[topic] = {
          title: sourceTopic.title[locale],
          subtitle: sourceTopic.subtitle[locale],
          entries: sourceTopic.entries.map((entry: SourceEntry): ProcessedSourceEntry => ({
            ...entry,
            title: entry.title[locale],
          })),
        };
      }
    }

    return {
      ...languageDictionary,
      sources: processedSources,
    };
  } catch (error) {
    console.error(`Error loading dictionary for locale "${locale}":`, error);
    throw new Error(`Could not load dictionary for locale: ${locale}`);
  }
};
