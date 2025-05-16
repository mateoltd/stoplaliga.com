import 'server-only';
import { languages, type Language } from './index';

// Define the dictionaries
const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

// Fallback dictionary to prevent UI errors
const fallbackDictionary = {
  nav: { home: 'Home', about: 'About', contact: 'Contact' },
  common: { welcome: 'Welcome', description: 'Description' },
  buttons: { learnMore: 'Learn More' },
  animation: {
    title: 'Internet Censorship',
    subtitle: 'LaLiga is censoring the internet in Spain',
    dnsError: 'DNS_PROBE_FINISHED_NXDOMAIN',
    dnsErrorMessage: 'This website has been blocked',
    censored: 'CENSORED',
    finalMessage: 'Spain\'s internet is under attack'
  }
};

/**
 * Get dictionary for server components
 * This function is meant to be used only in server components
 */
export const getServerDictionary = async (locale: Language) => {
  // Ensure locale is a valid language
  const validLocale = languages.includes(locale) ? locale : 'en';
  
  try {
    // Safely access the dictionary function
    const dictionaryFn = dictionaries[validLocale];
    if (typeof dictionaryFn === 'function') {
      return await dictionaryFn();
    } else {
      console.error(`Dictionary function for locale "${validLocale}" is not a function`);
      // Fallback to English
      return await dictionaries.en();
    }
  } catch (error) {
    console.error(`Error loading dictionary for locale "${validLocale}":`, error);
    // Return a minimal dictionary to prevent UI errors
    return fallbackDictionary;
  }
};
