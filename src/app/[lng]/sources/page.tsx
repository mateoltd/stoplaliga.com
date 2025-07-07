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

interface SourceTopic {
  title: string;
  subtitle: string;
  entries: Source[];
}

interface SourcesDict {
  sources: {
    [topic: string]: SourceTopic;
  };
}

export default function SourcesPage({ params: paramsPromise }: { params: Promise<{ lng: Language }> }) {
  const [dict, setDict] = useState<SourcesDict | null>(null);
  const [lng, setLng] = useState<Language>('es');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { lng: language } = await paramsPromise;
        const dictionary = await getDictionary(language);
        setLng(language);
        setDict(dictionary);
      } catch (error) {
        console.error('Failed to load page content:', error);
        setError(error as Error);
      }
    };
    loadContent();
  }, [paramsPromise]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-red-500 text-2xl">
          {lng === 'es' ? 'Error al cargar el contenido.' : 'Error loading content.'}
        </div>
      </div>
    );
  }

  if (!dict) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-red-500 text-2xl">LOADING...</div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return lng === 'es' ? 'Fecha no válida' : 'Invalid Date';
    }
    return date.toLocaleDateString(lng === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-4 border-red-500 p-8 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider">
              {lng === 'es' ? 'Fuentes' : 'Sources'}
            </h1>
          </div>
          <LanguageSwitcher currentLanguage={lng} />
        </div>
      </div>

      {/* Sources List */}
      <div className="p-8">
        {Object.keys(dict.sources).map((topicKey) => {
          const topic = dict.sources[topicKey];
          return (
            <section key={topicKey} className="mb-16">
              <div className="border-l-4 border-red-500 pl-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {topic.title}
                </h2>
                <p className="text-lg text-gray-400">{topic.subtitle}</p>
              </div>
              <div className="space-y-8">
                {topic.entries.map((source, index) => (
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
            </section>
          );
        })}
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