'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const websites = [
  { id: 'youtube', name: 'YouTube', logo: '/brands/youtube.svg', size: 'large' },
  { id: 'netflix', name: 'Netflix', logo: '/brands/netflix.svg', size: 'medium' },
  { id: 'facebook', name: 'Facebook', logo: '/brands/facebook.svg', size: 'medium' },
  { id: 'instagram', name: 'Instagram', logo: '/brands/instagram.svg', size: 'small' },
  { id: 'twitch', name: 'Twitch', logo: '/brands/twitch.svg', size: 'medium' },
  { id: 'spotify', name: 'Spotify', logo: '/brands/spotify.svg', size: 'small' },
  { id: 'tiktok', name: 'TikTok', logo: '/brands/tiktok.svg', size: 'medium' },
  { id: 'reddit', name: 'Reddit', logo: '/brands/reddit.svg', size: 'small' },
  { id: 'steam', name: 'Steam', logo: '/brands/steam.svg', size: 'medium' },
  { id: 'x', name: 'X', logo: '/brands/x.svg', size: 'small' },
];

interface WebsiteGridProps {
  visible: boolean;
}

const WebsiteGrid: React.FC<WebsiteGridProps> = ({ visible }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize animations
  useEffect(() => {
    if (!gridRef.current) return;

    // Create a timeline for the animations
    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

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
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out'
      }
    );

    // Start breathing animation for each item
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

    // Play or pause the timeline based on visibility
    if (visible) {
      timelineRef.current.play();
    } else {
      timelineRef.current.pause(0);
    }

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [visible]);

  // Handle visibility changes
  useEffect(() => {
    if (!timelineRef.current) return;

    if (visible) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [visible]);

  return (
    <div 
      ref={gridRef}
      className={`website-grid w-full max-w-4xl mx-auto grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-8 p-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {websites.map((website) => (
        <div 
          key={website.id}
          className={`website-item relative flex items-center justify-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
            website.size === 'large' ? 'col-span-2 row-span-2' :
            website.size === 'medium' ? 'col-span-1 row-span-2' :
            'col-span-1 row-span-1'
          }`}
          data-website-id={website.id}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={website.logo}
              alt={website.name}
              width={website.size === 'large' ? 120 : website.size === 'medium' ? 80 : 50}
              height={website.size === 'large' ? 120 : website.size === 'medium' ? 80 : 50}
              className="object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebsiteGrid;
