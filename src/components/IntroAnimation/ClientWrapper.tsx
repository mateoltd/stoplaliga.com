'use client';

import { useState, useEffect } from 'react';
import IntroAnimation from './index';
import type { Language } from '@/dictionaries';

interface ClientWrapperProps {
  lng: Language;
}

/**
 * Client wrapper for IntroAnimation component
 * This handles client-side functionality like callbacks
 */
const IntroAnimationClientWrapper: React.FC<ClientWrapperProps> = ({ lng }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle animation completion
  const handleComplete = () => {
    console.log('Animation completed');
    setIsCompleted(true);
  };

  return (
    <IntroAnimation 
      lng={lng} 
      onComplete={handleComplete} 
    />
  );
};

export default IntroAnimationClientWrapper;
