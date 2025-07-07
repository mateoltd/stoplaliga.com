'use client';

import { getDictionary, type Language } from '@/dictionaries/client';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';
import ControversyVisual from '@/components/ControversyVisual';

interface Case {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  emoji?: string;
  funnyComment?: string;
}

interface ControversiesDict {
  controversiesPage: {
    title: string;
    backLink: string;
    cases: Case[];
  };
}

export default function ControversiesPage({ params: paramsPromise }: { params: Promise<{ lng: Language }> }) {
  const [dict, setDict] = useState<ControversiesDict | null>(null);
  const [lng, setLng] = useState<Language>('es');
  const [activeIndex, setActiveIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { lng: language } = await paramsPromise;
        const dictionary = await getDictionary(language);
        setLng(language);
        setDict(dictionary);
        sectionRefs.current = Array(dictionary.controversiesPage.cases.length).fill(null);
      } catch (error) {
        console.error('Failed to load page content:', error);
        setError('Failed to load content. Please try refreshing the page.');
      }
    };
    loadContent();
  }, [paramsPromise]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // Automatically clear toast after 3 seconds and clean up on unmount
  useEffect(() => {
    if (!toastMessage) return;

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setToastMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toastMessage]);

  useEffect(() => {
    if (!dict) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index > -1) {
              setActiveIndex(index);
              break; 
            }
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const currentRefs = sectionRefs.current;
    for (const ref of currentRefs) {
      if (ref) observer.observe(ref);
    }

    return () => {
      for (const ref of currentRefs) {
        if (ref) observer.unobserve(ref);
      }
    };
  }, [dict]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-500 font-bold">Error Loading Page</p>
          <p className="text-lg mt-2">{error}</p>
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

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-4 border-red-500 p-8 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider">
              {dict.controversiesPage.title}
            </h1>
          </div>
          <LanguageSwitcher currentLanguage={lng} />
        </div>
      </div>

      {/* Mobile Floating Visual */}
      <div
        className="md:hidden fixed bottom-6 right-6 z-20 w-24 h-24 p-2 bg-black/50 backdrop-blur-sm border border-red-500/30 rounded-full cursor-pointer"
        onClick={() => {
          const comment = dict?.controversiesPage.cases[activeIndex]?.funnyComment;
          if (comment) {
            showToast(comment);
          }
        }}
      >
        <ControversyVisual index={activeIndex} />
      </div>

      {toastMessage && (
        <div className="md:hidden fixed bottom-32 right-6 z-30 p-3 max-w-[calc(100%-48px)] bg-gray-800/90 text-white text-sm rounded-lg shadow-lg transition-opacity duration-300">
          {toastMessage}
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="md:grid md:grid-cols-3 md:gap-12">
          <div className="hidden md:block md:sticky md:top-32 self-start" style={{ height: 'calc(100vh - 8rem)' }}>
            <div className="w-full h-full flex items-center justify-center transition-opacity duration-500">
              <ControversyVisual index={activeIndex} />
            </div>
          </div>
          <div className="md:col-span-2">
            {dict.controversiesPage.cases.map((caseItem, index) => (
              <div
                key={caseItem.title}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="min-h-[75vh] flex flex-col justify-center py-16"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-red-400 mb-6">
                  {caseItem.title}
                </h2>
                <div className="space-y-4">
                  {caseItem.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-4 border-red-500 p-8 text-center">
        <Link href={`/${lng}`} className="text-red-400 hover:text-red-200 transition-colors duration-200">
          &larr; {dict.controversiesPage.backLink}
        </Link>
      </div>
    </div>
  );
} 