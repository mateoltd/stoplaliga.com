'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface BrowserWindowProps {
  website: {
    id: string;
    name: string;
    logo: string;
    color: string;
  };
  visible: boolean;
  onComplete?: () => void;
}

/**
 * BrowserWindow Component
 * 
 * A component that simulates a browser window opening a specific website
 */
const BrowserWindow: React.FC<BrowserWindowProps> = ({ 
  website, 
  visible, 
  onComplete 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize animations
  useEffect(() => {
    if (!containerRef.current || !visible) return;
    
    // Create a timeline for the browser window animation
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
    
    // Animate browser window
    tl.fromTo(
      containerRef.current,
      { 
        opacity: 0,
        scale: 0.8,
        y: 20
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }
    );
    
    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [visible, onComplete]);
  
  if (!visible) return null;
  
  return (
    <div 
      ref={containerRef}
      className="browser-window w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-300"
      aria-label={`Browser window showing ${website.name}`}
    >
      {/* Browser UI */}
      <div className="browser-ui bg-gray-100 border-b border-gray-300 p-2">
        {/* Browser tabs */}
        <div className="browser-tabs flex space-x-1 mb-2">
          <div className="browser-tab flex items-center bg-white rounded-t-lg px-4 py-1 border border-gray-300 border-b-0">
            <div className="w-4 h-4 mr-2 relative">
              <Image
                src={website.logo}
                alt={`${website.name} favicon`}
                width={16}
                height={16}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium truncate">{website.name}</span>
          </div>
          <div className="browser-tab flex items-center bg-gray-200 rounded-t-lg px-4 py-1 border border-gray-300 border-b-0 opacity-70">
            <span className="text-sm truncate">New Tab</span>
          </div>
        </div>
        
        {/* Address bar */}
        <div className="browser-address-bar flex items-center bg-white rounded-md border border-gray-300 px-3 py-1">
          <div className="w-4 h-4 mr-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-sm text-gray-600 flex-1">{`${website.name.toLowerCase()}.com`}</div>
        </div>
      </div>
      
      {/* Browser content */}
      <div 
        className="browser-content p-6 h-64 flex items-center justify-center"
        style={{ backgroundColor: `${website.color}15` }}
      >
        <div className="relative w-32 h-32">
          <Image
            src={website.logo}
            alt={`${website.name} logo`}
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BrowserWindow;
