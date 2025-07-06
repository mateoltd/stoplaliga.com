'use client';

import { getDictionary, type Language } from '@/dictionaries/client';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

interface Source {
  title: string;
  publisher: string;
  date: string;
  url: string;
}

interface SourcesDict {
  sources: {
    title: string;
    subtitle: string;
    entries: Source[];
  };
}

export default function SourcesPage({ params: paramsPromise }: { params: Promise<{ lng: Language }> }) {
  const [dict, setDict] = useState<SourcesDict | null>(null);
  const [lng, setLng] = useState<Language>('es');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { lng: language } = await paramsPromise;
        const dictionary = await getDictionary(language);
        setLng(language);
        setDict(dictionary);
      } catch (error) {
        console.error('Failed to load page content:', error);
      }
    };
    loadContent();
  }, [paramsPromise]);

  if (!dict) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-red-500 text-2xl">LOADING...</div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lng === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-4 border-red-500 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-4">
              {dict.sources.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              {dict.sources.subtitle}
            </p>
          </div>
          <LanguageSwitcher currentLanguage={lng} />
        </div>
      </div>

      {/* Sources List */}
      <div className="p-8">
        <div className="space-y-8">
          {dict.sources.entries.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-900 border-2 border-gray-700 p-6 hover:border-red-500 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 group"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-red-100 transition-colors">
                {source.title}
              </h3>
              <div className="flex items-center text-sm text-gray-400">
                <span className="font-semibold">{source.publisher}</span>
                <span className="mx-2 text-red-500">|</span>
                <span>{formatDate(source.date)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-4 border-red-500 p-8 text-center">
        <Link href={`/${lng}`} className="text-red-400 hover:text-red-200 transition-colors duration-200">
          &larr; {lng === 'es' ? 'Volver a la cronología' : 'Back to timeline'}
        </Link>
      </div>
    </div>
  );
} 