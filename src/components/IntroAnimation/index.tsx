'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getDictionary, type Language } from '@/dictionaries';
import '@/styles/intro-animation.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation states
enum AnimationState {
  INITIAL = 'initial',
  WAITING_FOR_INTERACTION = 'waiting_for_interaction',
  LOADING = 'loading',
  FIRST_GAVEL = 'first_gavel',
  SECOND_GAVEL = 'second_gavel',
  THIRD_GAVEL = 'third_gavel',
  FINAL = 'final',
  COMPLETED = 'completed',
}

interface IntroAnimationProps {
  lng: Language;
  onComplete?: () => void;
}

/**
 * IntroAnimation Component
 *
 * This component manages the dark web animation illustrating internet censorship by LaLiga in Spain.
 * It progresses through several states triggered by scroll events and user interactions.
 */
const IntroAnimation: React.FC<IntroAnimationProps> = ({ lng, onComplete }) => {
  // Refs for animation elements
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // State for animation progression and dictionary
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.INITIAL);
  const [dictionary, setDictionary] = useState<any>(null);

  // Load dictionary based on language
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(lng);
        setDictionary(dict);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        // Set a fallback dictionary to prevent UI errors
        setDictionary({
          animation: {
            title: 'Internet Censorship',
            subtitle: 'LaLiga is censoring the internet in Spain',
            dnsError: 'DNS_PROBE_FINISHED_NXDOMAIN',
            dnsErrorMessage: 'This website has been blocked',
            censored: 'CENSORED',
            finalMessage: 'Spain\'s internet is under attack'
          }
        });
      }
    };

    loadDictionary();
  }, [lng]);

  // Initialize animation when dictionary is loaded
  useEffect(() => {
    if (!dictionary || !containerRef.current) return;

    // Set waiting for interaction state
    setAnimationState(AnimationState.WAITING_FOR_INTERACTION);

    // Create main timeline
    const mainTimeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        setAnimationState(AnimationState.COMPLETED);
        if (onComplete) onComplete();
      }
    });

    timelineRef.current = mainTimeline;

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [dictionary, onComplete]);

  // Start animation after user interaction
  const startAnimation = () => {
    if (animationState !== AnimationState.WAITING_FOR_INTERACTION) return;

    // Set loading state
    setAnimationState(AnimationState.LOADING);

    // Setup scroll triggers for animation progression
    setupScrollTriggers();

    // Start initial animation
    startInitialAnimation();

    // Enable scrolling for animation progression
    document.body.style.overflow = 'auto';
  };

  // Setup scroll triggers for animation progression
  const setupScrollTriggers = () => {
    if (!containerRef.current) return;

    // Lock scrolling initially
    document.body.style.overflow = 'hidden';

    // Create markers for each section
    const sections = [
      { id: 'section-1', position: 'top 20%', state: AnimationState.FIRST_GAVEL, label: 'First Gavel' },
      { id: 'section-2', position: 'top -100%', state: AnimationState.SECOND_GAVEL, label: 'Second Gavel' },
      { id: 'section-3', position: 'top -200%', state: AnimationState.THIRD_GAVEL, label: 'Third Gavel' },
      { id: 'section-4', position: 'top -300%', state: AnimationState.FINAL, label: 'Final Scene' }
    ];

    // Create scroll triggers for each section
    sections.forEach((section, index) => {
      // Create marker element for debugging
      const marker = document.createElement('div');
      marker.id = section.id;
      marker.className = 'fixed right-4 z-50 px-2 py-1 bg-red-600 text-white text-xs font-brutalist-mono';
      marker.style.top = `${(index + 1) * 30}px`;
      marker.textContent = section.label;
      marker.style.opacity = '0.7';
      document.body.appendChild(marker);

      // Create scroll trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: section.position,
        onEnter: () => {
          if (section.state === AnimationState.FINAL) {
            triggerFinalScene();
          } else {
            triggerGavelSlam(section.state);
          }

          // Highlight current section marker
          marker.style.opacity = '1';
          marker.style.fontWeight = 'bold';
        },
        onLeaveBack: () => {
          // Reset marker style when scrolling back
          marker.style.opacity = '0.7';
          marker.style.fontWeight = 'normal';
        }
      });
    });

    // Main scroll animation timeline
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing effect
        pin: false, // Don't pin the container
        anticipatePin: 1
      }
    });

    // Add animations to the timeline
    // These will be expanded in Phase 3
    scrollTimeline
      .to('.intro-animation', { backgroundColor: 'rgba(0, 0, 0, 0.3)' }, 0.1)
      .to('.intro-animation', { backgroundColor: 'rgba(0, 0, 0, 0.6)' }, 0.4)
      .to('.intro-animation', { backgroundColor: 'rgba(0, 0, 0, 0.9)' }, 0.7)
      .to('.intro-animation', { backgroundColor: '#000000' }, 1);

    // Store the timeline for cleanup
    if (timelineRef.current) {
      timelineRef.current.add(scrollTimeline);
    }

    // Enable scrolling after setup
    document.body.style.overflow = 'auto';

    // Cleanup function to remove markers
    return () => {
      sections.forEach(section => {
        const marker = document.getElementById(section.id);
        if (marker) {
          marker.remove();
        }
      });
    };
  };

  // Start initial animation (bright, functional web)
  const startInitialAnimation = () => {
    if (!containerRef.current) return;

    // Animation for initial state will be implemented here
    setAnimationState(AnimationState.INITIAL);
  };

  // Trigger gavel slam animation
  const triggerGavelSlam = (nextState: AnimationState) => {
    if (!containerRef.current) return;

    // Animation for gavel slam will be implemented here
    setAnimationState(nextState);
  };

  // Trigger final scene animation
  const triggerFinalScene = () => {
    if (!containerRef.current) return;

    // Animation for final scene will be implemented here
    setAnimationState(AnimationState.FINAL);
  };

  // Skip animation (for development or accessibility)
  const skipAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    setAnimationState(AnimationState.COMPLETED);
    if (onComplete) onComplete();
  };

  // If dictionary is not loaded yet, show loading state
  if (!dictionary) {
    return <div className="h-screen w-full bg-black"></div>;
  }

  return (
    <div
      ref={containerRef}
      className="intro-animation h-[400vh] w-full bg-black text-white relative"
      data-animation-state={animationState}
    >
      {/* Skip button for accessibility */}
      <button
        onClick={skipAnimation}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-red-600 text-white rounded-sm font-brutalist-mono text-sm"
        aria-label="Skip animation"
      >
        {lng === 'es' ? 'Saltar animación' : 'Skip animation'}
      </button>

      {/* Initial interaction trigger */}
      {animationState === AnimationState.WAITING_FOR_INTERACTION && (
        <div className="h-screen w-full flex items-center justify-center flex-col bg-black fixed top-0 left-0 z-40">
          <h1 className="font-brutalist text-4xl text-center mb-8 text-white">
            {dictionary.animation.startTitle}
          </h1>
          <p className="font-brutalist-mono text-lg text-center mb-12 text-gray-300 max-w-xl">
            {dictionary.animation.startDescription}
          </p>
          <button
            onClick={startAnimation}
            className="px-8 py-4 bg-red-600 text-white font-brutalist text-xl hover:bg-red-700 transition-colors"
            aria-label={dictionary.animation.startButton}
          >
            {dictionary.animation.startButton}
          </button>
        </div>
      )}

      {/* Animation content will be implemented in Phase 3 */}
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="font-brutalist text-4xl text-center">
          {dictionary.animation.title}
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-indicator-text">
          {lng === 'es' ? 'Desplázate para continuar' : 'Scroll to continue'}
        </div>
        <div className="scroll-indicator-arrow"></div>
      </div>

      {/* Debug information (remove in production) */}
      <div className="fixed bottom-4 left-4 bg-black/80 p-2 text-xs font-brutalist-mono">
        State: {animationState}
      </div>
    </div>
  );
};

export default IntroAnimation;
