'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * Returns true if the media query matches
 * 
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null and update after mount to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean>(false);
  
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Create media query list
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Define listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add listener
    media.addEventListener('change', listener);
    
    // Cleanup
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);
  
  return matches;
}

export default useMediaQuery;
