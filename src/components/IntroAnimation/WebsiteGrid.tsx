'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface WebsiteGridProps {
  visible: boolean;
  onWebsiteClick?: (website: Website) => void;
  fadeOut?: boolean;
  clickInstructionText?: string;
}

// Define website data type
export interface Website {
  id: string;
  name: string;
  logo: string;
  color: string;
}

// Define website data
export const websites: Website[] = [
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
const WebsiteGrid: React.FC<WebsiteGridProps> = ({
  visible,
  onWebsiteClick,
  fadeOut = false,
  clickInstructionText = 'Click on a website to continue'
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [displayedWebsites, setDisplayedWebsites] = useState<Website[]>(websites);

  // Filter websites for mobile
  useEffect(() => {
    if (isMobile) {
      // Show only first 4 websites on mobile
      setDisplayedWebsites(websites.slice(0, 4));
    } else {
      setDisplayedWebsites(websites);
    }
  }, [isMobile]);

  // Initialize animations
  useEffect(() => {
    if (!gridRef.current || !visible) return;

    // Create a timeline for the grid animation
    const tl = gsap.timeline();

    // Animate grid items - simple fade in without scaling or movement
    tl.fromTo(
      '.website-item',
      {
        opacity: 0
      },
      {
        opacity: 1,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power1.out'
      }
    );

    // Add clickable class to the first item after a delay to draw attention
    setTimeout(() => {
      const firstItem = document.querySelector('.website-item');
      if (firstItem) {
        firstItem.classList.add('clickable');
      }
    }, 1000);

    // Cleanup function
    return () => {
      tl.kill();
      const items = document.querySelectorAll('.website-item');
      items.forEach(item => {
        if (item instanceof HTMLElement) {
          item.classList.remove('clickable');
        }
      });
    };
  }, [visible, displayedWebsites]);

  // Handle fade out animation
  useEffect(() => {
    if (!gridRef.current || !fadeOut) return;

    const tl = gsap.timeline();

    tl.to('.website-item', {
      opacity: 0,
      y: -20,
      scale: 0.8,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power2.in'
    });

    return () => {
      tl.kill();
    };
  }, [fadeOut]);

  if (!visible) return null;

  return (
    <div className="relative">
      <div
        ref={gridRef}
        className="website-grid w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4"
        aria-label="Grid of website icons"
      >
        {displayedWebsites.map((site) => (
          <div
            key={site.id}
            className="website-item relative aspect-square flex flex-col items-center justify-center p-4 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            onClick={() => onWebsiteClick && onWebsiteClick(site)}
            aria-label={`Click to open ${site.name} website`}
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
            <div className="website-item-decorator-1"></div>
            <div className="website-item-decorator-2"></div>
          </div>
        ))}
      </div>

      {/* Click instruction */}
      {visible && onWebsiteClick && (
        <div
          className="click-instruction"
          role="status"
          aria-live="polite"
          style={{
            animation: 'fadeInUp 1s ease-out forwards',
            animationDelay: '3s',
            opacity: 0
          }}
        >
          {clickInstructionText}
        </div>
      )}
    </div>
  );
};

export default WebsiteGrid;
