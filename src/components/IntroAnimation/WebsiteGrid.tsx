'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface WebsiteGridProps {
  visible: boolean;
}

// Define website data
const websites = [
  { id: 'github', name: 'GitHub', logo: '/brands/github.svg', color: '#161614' },
  { id: 'cloudflare', name: 'Cloudflare', logo: '/brands/cloudflare.svg', color: '#F38020' },
  { id: 'steam', name: 'Steam', logo: '/brands/steam.svg', color: '#1b2838' },
  { id: 'twitter', name: 'Twitter', logo: '/brands/x.svg', color: '#000000' },
  { id: 'twitch', name: 'Twitch', logo: '/brands/twitch.svg', color: '#5A3E85' },
  { id: 'youtube', name: 'YouTube', logo: '/brands/youtube.svg', color: '#FF0000' },
  { id: 'reddit', name: 'Reddit', logo: '/brands/reddit.svg', color: '#FF4500' },
  { id: 'rae', name: 'RAE', logo: '/brands/rae.svg', color: '#FFCC00' }
];

/**
 * WebsiteGrid Component
 * 
 * A brutalist grid of website icons with hover effects and animations
 */
const WebsiteGrid: React.FC<WebsiteGridProps> = ({ visible }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Initialize animations
  useEffect(() => {
    if (!gridRef.current || !visible) return;
    
    // Create a timeline for the grid animation
    const tl = gsap.timeline();
    
    // Animate grid items
    tl.fromTo(
      '.website-item',
      { 
        opacity: 0,
        y: 20,
        scale: 0.8
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      }
    );
    
    // Create breathing animation for grid items
    gsap.to('.website-item', {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });
    
    // Cleanup function
    return () => {
      tl.kill();
      gsap.killTweensOf('.website-item');
    };
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <div 
      ref={gridRef}
      className="website-grid w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4"
      aria-label="Grid of website icons"
    >
      {websites.map((site) => (
        <div 
          key={site.id}
          className="website-item relative aspect-square flex flex-col items-center justify-center p-4 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={{ 
            backgroundColor: site.id === 'twitter' ? '#ffffff' : `${site.color}15` 
          }}
        >
          <div className="relative w-full h-3/4 flex items-center justify-center">
            <Image
              src={site.logo}
              alt={`${site.name} logo`}
              width={80}
              height={80}
              className="object-contain max-h-full website-logo"
            />
          </div>
          <div className="website-name mt-2 font-brutalist-mono text-sm md:text-base text-center font-bold">
            {site.name}
          </div>
          
          {/* Brutalist decorative elements */}
          <div className="absolute top-2 right-2 w-3 h-3 bg-black"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-black"></div>
        </div>
      ))}
    </div>
  );
};

export default WebsiteGrid;
