// Define the supported languages
export const languages = ['es', 'en'] as const;
export type Language = (typeof languages)[number];

// Define the dictionaries for client-side use
const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

const sources = () => import('./sources.json').then((module) => module.default);

export const getDictionary = async (locale: Language) => {
  try {
    const [languageDictionary, sourcesDictionary] = await Promise.all([
      dictionaries[locale](),
      sources(),
    ]);

    const processedSources: { [key: string]: any } = {};
    for (const topic in sourcesDictionary) {
      if (Object.prototype.hasOwnProperty.call(sourcesDictionary, topic)) {
        const sourceTopic = sourcesDictionary[topic as keyof typeof sourcesDictionary];
        processedSources[topic] = {
          title: sourceTopic.title[locale],
          subtitle: sourceTopic.subtitle[locale],
          entries: sourceTopic.entries.map((entry: any) => ({
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
