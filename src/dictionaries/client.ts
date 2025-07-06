// Define the supported languages
export const languages = ['es', 'en'] as const;
export type Language = (typeof languages)[number];

// Define the dictionaries for client-side use
const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Language) => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error(`Error loading dictionary for locale "${locale}":`, error);
    throw new Error(`Could not load dictionary for locale: ${locale}`);
  }
};
