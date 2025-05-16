'use client';

import { useEffect, useRef } from 'react';

interface SoundEffectProps {
  src: string;
  play: boolean;
  volume?: number;
  loop?: boolean;
  onEnded?: () => void;
}

const SoundEffect: React.FC<SoundEffectProps> = ({
  src,
  play,
  volume = 1,
  loop = false,
  onEnded
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    
    if (onEnded) {
      audio.addEventListener('ended', onEnded);
    }
    
    audioRef.current = audio;
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (onEnded) {
          audioRef.current.removeEventListener('ended', onEnded);
        }
      }
    };
  }, [src, volume, loop, onEnded]);

  // Handle play state changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (play) {
      // Reset the audio to the beginning if it was already played
      audioRef.current.currentTime = 0;
      
      // Play the audio
      const playPromise = audioRef.current.play();
      
      // Handle play promise (required for modern browsers)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
    } else {
      // Pause the audio
      audioRef.current.pause();
    }
  }, [play]);

  // This component doesn't render anything visible
  return null;
};

export default SoundEffect;
