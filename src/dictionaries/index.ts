import 'server-only';

// Define the supported languages
export const languages = ['es', 'en'] as const;
export type Language = (typeof languages)[number];

// Define the dictionaries
const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Language) => dictionaries[locale](); 