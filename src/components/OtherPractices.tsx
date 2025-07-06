'use client';

import Link from 'next/link';

interface Case {
  title: string;
  abstract: string;
  linkText: string;
}

interface OtherPracticesProps {
  content: {
    title: string;
    subtitle: string;
    cases: Case[];
  };
  lng: string;
}

export default function OtherPractices({ content, lng }: OtherPracticesProps) {
  return (
    <div className="bg-gray-950 border-t-4 border-b-4 border-red-500 py-16 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-4">
          {content.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-12">
          {content.subtitle}
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {content.cases.map((caseItem, index) => (
          <div key={index} className="bg-black border-2 border-red-800 p-8 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-300 flex flex-col">
            <h3 className="text-2xl font-bold mb-4 text-red-400">
              {caseItem.title}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 flex-grow">
              {caseItem.abstract}
            </p>
            <Link href={`/${lng}/controversies`} className="text-red-400 hover:text-red-200 transition-colors duration-200 font-semibold self-start">
              {caseItem.linkText} &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 