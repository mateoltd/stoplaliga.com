'use client';

import { getDictionary, type Language } from '@/dictionaries/client';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface TimelineDict {
  timeline: {
    title: string;
    subtitle: string;
    warning: string;
    events: Record<string, {
      title: string;
      description: string;
      impact: string;
      why?: string;
    }>;
  };
}

export default function TimelinePage({ params: paramsPromise }: { params: Promise<{ lng: Language }> }) {
  const [dict, setDict] = useState<TimelineDict | null>(null);
  const [lng, setLng] = useState<Language>('es');
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadContent = async () => {
      const { lng: language } = await paramsPromise;
      const dictionary = await getDictionary(language);
      setLng(language);
      setDict(dictionary);
    };
    loadContent();
  }, [paramsPromise]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleEvents(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const eventElements = document.querySelectorAll('[data-event]');
    eventElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [dict]);

  if (!dict) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-red-500 text-2xl">LOADING...</div>
      </div>
    );
  }
  const events = [
    '2024-12-18',
    '2025-02-09',
    '2025-02-19',
    '2025-03-26',
    '2025-04-12',
    '2025-04-15',
    '2025-05-04',
    '2025-05-20',
    '2025-07-06'
  ];

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
              {dict.timeline.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              {dict.timeline.subtitle}
            </p>
          </div>
          <LanguageSwitcher currentLanguage={lng} />
        </div>
        
        <div className="bg-red-900 border-2 border-red-500 p-4 text-red-100">
          <p className="font-bold">{dict.timeline.warning}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-8">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-red-500"></div>
          
          {events.map((eventKey, index) => {
            const event = dict.timeline.events[eventKey as keyof typeof dict.timeline.events];
            const isLast = index === events.length - 1;
            
            return (
              <div 
                key={eventKey} 
                id={eventKey}
                data-event={eventKey}
                className={`relative mb-16 ${isLast ? 'mb-0' : ''} transition-all duration-700 transform ${
                  visibleEvents.has(eventKey) ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 md:left-10 w-5 h-5 bg-red-500 border-4 border-black rounded-full transition-all duration-500 ${
                  visibleEvents.has(eventKey) ? 'scale-100' : 'scale-0'
                }`}></div>
                
                {/* Content */}
                <div className="ml-20 md:ml-28">
                  {/* Date */}
                  <div className="text-red-400 text-sm md:text-base font-bold mb-2 uppercase tracking-wide">
                    {formatDate(eventKey)}
                  </div>
                  
                  {/* Event card */}
                  <div className="bg-gray-900 border-2 border-gray-700 p-6 hover:border-red-500 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 group">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-red-100 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    
                    {/* Impact */}
                    <div className="border-l-4 border-red-500 pl-4 mb-4 bg-red-900 bg-opacity-10 py-2">
                      <p className="text-red-200 font-semibold">
                        <span className="text-red-400 text-xs uppercase tracking-wide block mb-1">
                          {lng === 'es' ? 'IMPACTO' : 'IMPACT'}
                        </span>
                        {event.impact}
                      </p>
                    </div>
                    
                    {/* Why section if it exists */}
                    {'why' in event && (
                      <div className="mt-4">
                        {eventKey === '2025-02-09' && (
                          <div className="bg-gray-800 border-2 border-red-500 p-4">
                            <div className="text-red-400 text-xs uppercase tracking-wide mb-3 font-bold">
                              {lng === 'es' ? '¿Por qué importa?' : 'Why it matters'}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                              <div className="bg-red-900 bg-opacity-30 border border-red-600 p-3">
                                <div className="text-2xl font-bold text-red-400">240M+</div>
                                <div className="text-xs text-gray-300">
                                  {lng === 'es' ? 'Sitios web' : 'Websites'}
                                </div>
                              </div>
                              <div className="bg-red-900 bg-opacity-30 border border-red-600 p-3">
                                <div className="text-2xl font-bold text-red-400">20%</div>
                                <div className="text-xs text-gray-300">
                                  {lng === 'es' ? 'De la web global' : 'Of global web'}
                                </div>
                              </div>
                              <div className="bg-red-900 bg-opacity-30 border border-red-600 p-3">
                                <div className="text-2xl font-bold text-red-400">∞</div>
                                <div className="text-xs text-gray-300">
                                  {lng === 'es' ? 'Sitios afectados' : 'Sites affected'}
                                </div>
                              </div>
                            </div>
                            <p className="text-red-100 text-sm mt-3 text-center">
                              {event.why}
                            </p>
                          </div>
                        )}
                        
                        {eventKey === '2025-04-12' && (
                          <div className="bg-gray-800 border-2 border-red-500 p-4">
                            <div className="text-red-400 text-xs uppercase tracking-wide mb-3 font-bold">
                              {lng === 'es' ? '¿Por qué importa?' : 'Why it matters'}
                            </div>
                            <div className="flex items-center justify-center space-x-8 mb-3">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-red-400">9M+</div>
                                <div className="text-xs text-gray-300">
                                  {lng === 'es' ? 'Sitios en Vercel' : 'Sites on Vercel'}
                                </div>
                              </div>
                              <div className="text-red-500 text-2xl">×</div>
                              <div className="text-center">
                                <div className="text-3xl font-bold text-red-400">DEV</div>
                                <div className="text-xs text-gray-300">
                                  {lng === 'es' ? 'Enfoque principal' : 'Main focus'}
                                </div>
                              </div>
                            </div>
                            <p className="text-red-100 text-sm text-center">
                              {event.why}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-4 border-red-500 p-8 text-center">
        <div className="text-red-400 text-sm uppercase tracking-wider font-bold">
          {lng === 'es' ? 'Actualizado' : 'Updated'}: {formatDate('2025-07-06')}
        </div>
        <div className="mt-4 text-gray-400">
          <p className="text-sm">
            {lng === 'es' 
              ? 'Esta página documenta los eventos tal como han ocurrido. Los precedentes legales aquí establecidos pueden afectar la política digital futura.' 
              : 'This page documents events as they have occurred. Legal precedents established here may affect future digital policy.'}
          </p>
        </div>
      </div>
    </div>
  );
}
