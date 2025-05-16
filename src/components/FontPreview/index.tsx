import React from 'react';

interface FontPreviewProps {
  dictionary: {
    animation: {
      title: string;
      subtitle: string;
      dnsError: string;
      dnsErrorMessage: string;
      censored: string;
      finalMessage: string;
    };
  };
}

/**
 * Component to preview the brutalist fonts selected for the animation
 * This is for development/preview purposes only
 */
const FontPreview: React.FC<FontPreviewProps> = ({ dictionary }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl mb-8 font-brutalist">Brutalist Font Preview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Archivo Black Preview */}
        <div className="bg-black p-6 rounded-sm border-2 border-red-600">
          <h2 className="text-white mb-4 text-xl">Archivo Black (Headings)</h2>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">Regular - 24px</h3>
            <p className="font-brutalist text-2xl text-white">{dictionary.animation.title}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">Regular - 36px</h3>
            <p className="font-brutalist text-3xl text-white">{dictionary.animation.censored}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">Regular - 48px</h3>
            <p className="font-brutalist text-4xl text-white">{dictionary.animation.finalMessage}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">Regular with Red - 36px</h3>
            <p className="font-brutalist text-3xl text-red-600">{dictionary.animation.censored}</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Spanish Characters</h3>
            <p className="font-brutalist text-2xl text-white">España, Año, Niño, Mañana</p>
          </div>
        </div>
        
        {/* Space Mono Preview */}
        <div className="bg-black p-6 rounded-sm border-2 border-red-600">
          <h2 className="text-white mb-4 text-xl">Space Mono (Technical/Body)</h2>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">Regular - 16px</h3>
            <p className="font-brutalist-mono text-base text-white">{dictionary.animation.subtitle}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">Bold - 16px</h3>
            <p className="font-brutalist-mono font-bold text-base text-white">{dictionary.animation.subtitle}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">Regular - 20px</h3>
            <p className="font-brutalist-mono text-xl text-white">{dictionary.animation.dnsErrorMessage}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">DNS Error Style</h3>
            <div className="bg-black p-3 border border-red-600">
              <p className="font-brutalist text-red-600 text-xl mb-1">{dictionary.animation.dnsError}</p>
              <p className="font-brutalist-mono text-gray-300 text-sm">{dictionary.animation.dnsErrorMessage}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Spanish Characters</h3>
            <p className="font-brutalist-mono text-base text-white">España, Año, Niño, Mañana</p>
          </div>
        </div>
      </div>
      
      {/* Glitch Effect Preview */}
      <div className="mt-8 bg-black p-6 rounded-sm border-2 border-red-600">
        <h2 className="text-white mb-4 text-xl">Glitch Text Effect</h2>
        
        <div className="glitch-text-container">
          <p className="glitch-text text-3xl">{dictionary.animation.censored}</p>
        </div>
        
        <style jsx>{`
          @keyframes glitch {
            0% {
              text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                          -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                          -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            }
            14% {
              text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                          -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                          -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            }
            15% {
              text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                          0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                          -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
            }
            49% {
              text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                          0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                          -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
            }
            50% {
              text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                          0.05em 0 0 rgba(0, 255, 0, 0.75),
                          0 -0.05em 0 rgba(0, 0, 255, 0.75);
            }
            99% {
              text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                          0.05em 0 0 rgba(0, 255, 0, 0.75),
                          0 -0.05em 0 rgba(0, 0, 255, 0.75);
            }
            100% {
              text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                          -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                          -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
            }
          }

          .glitch-text {
            font-family: var(--font-brutalist);
            color: white;
            animation: glitch 1s linear infinite;
            position: relative;
          }
        `}</style>
      </div>
      
      {/* Font Combinations Preview */}
      <div className="mt-8 bg-black p-6 rounded-sm border-2 border-red-600">
        <h2 className="text-white mb-4 text-xl">Font Combinations</h2>
        
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">Heading + Body Text</h3>
          <h4 className="font-brutalist text-2xl text-white mb-2">{dictionary.animation.title}</h4>
          <p className="font-brutalist-mono text-base text-gray-300">{dictionary.animation.subtitle}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">Error Message</h3>
          <div className="bg-black p-4 border border-red-600">
            <h4 className="font-brutalist text-xl text-red-600 mb-2">{dictionary.animation.dnsError}</h4>
            <p className="font-brutalist-mono text-sm text-gray-300">{dictionary.animation.dnsErrorMessage}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-400 mb-2">Final Message</h3>
          <h4 className="font-brutalist text-3xl text-red-600 mb-2">{dictionary.animation.finalMessage}</h4>
          <p className="font-brutalist-mono text-base text-gray-300">LaLiga vs. Internet Freedom</p>
        </div>
      </div>
    </div>
  );
};

export default FontPreview;
