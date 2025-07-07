'use client';

import { useRouter, usePathname } from 'next/navigation';
import { type Language } from '@/dictionaries/client';

interface LanguageSwitcherProps {
  currentLanguage: Language;
}

export default function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLang: Language) => {
    const segments = pathname.split('/');
    // The first segment is empty, the second is the language
    segments[1] = newLang;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-1 bg-gray-900 border border-gray-700 rounded-none">
      <button
        onClick={() => switchLanguage('es')}
        aria-label="Switch to Spanish"
        aria-pressed={currentLanguage === 'es'}
        className={`px-3 py-2 text-sm font-mono uppercase transition-colors ${
          currentLanguage === 'es'
            ? 'bg-red-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        ES
      </button>
      <div className="w-px h-6 bg-gray-700"></div>
      <button
        onClick={() => switchLanguage('en')}
        aria-label="Switch to English"
        aria-pressed={currentLanguage === 'en'}
        className={`px-3 py-2 text-sm font-mono uppercase transition-colors ${
          currentLanguage === 'en'
            ? 'bg-red-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        EN
      </button>
    </div>
  );
}
