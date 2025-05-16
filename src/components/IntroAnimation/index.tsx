'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getDictionary, type Language } from '@/dictionaries';
import WebsiteGrid from './WebsiteGrid';
import SoundEffect from './SoundEffect';
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

  // State for sound effects
  const [playGavelSound, setPlayGavelSound] = useState(false);
  const [playGlitchSound, setPlayGlitchSound] = useState(false);

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

    // Set initial state
    setAnimationState(AnimationState.INITIAL);

    // Create a timeline for the initial animation
    const initialTimeline = gsap.timeline({
      onComplete: () => {
        // After the initial animation completes, we're ready for scroll-based progression
        console.log('Initial animation complete');
      }
    });

    // Animate the background to white (bright web)
    initialTimeline.to(containerRef.current, {
      backgroundColor: '#ffffff',
      duration: 1.5,
      ease: 'power2.inOut'
    });

    // Animate text color to black
    initialTimeline.to('.scene-1 h1, .scene-1 p', {
      color: '#000000',
      duration: 1,
      ease: 'power2.inOut'
    }, '-=1');

    // Add subtle animations to the website grid
    initialTimeline.to('.website-item', {
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      duration: 1,
      stagger: 0.05,
      ease: 'power2.inOut'
    }, '-=0.5');

    // Store the timeline for cleanup
    if (timelineRef.current) {
      timelineRef.current.add(initialTimeline);
    }
  };

  // Trigger gavel slam animation
  const triggerGavelSlam = (nextState: AnimationState) => {
    if (!containerRef.current) return;

    // Set the next animation state
    setAnimationState(nextState);

    // Play gavel sound effect
    setPlayGavelSound(true);

    // Create a timeline for the gavel slam animation
    const gavelTimeline = gsap.timeline();

    // Determine which websites to affect based on the state
    let websitesToAffect: string[] = [];
    let intensity = 0;

    switch (nextState) {
      case AnimationState.FIRST_GAVEL:
        // First gavel affects a few websites
        websitesToAffect = ['youtube', 'facebook', 'twitch'];
        intensity = 0.3;
        break;
      case AnimationState.SECOND_GAVEL:
        // Second gavel affects more websites
        websitesToAffect = ['youtube', 'facebook', 'twitch', 'tiktok', 'instagram'];
        intensity = 0.6;
        break;
      case AnimationState.THIRD_GAVEL:
        // Third gavel affects almost all websites
        websitesToAffect = ['youtube', 'facebook', 'twitch', 'tiktok', 'instagram', 'netflix', 'spotify', 'reddit'];
        intensity = 0.9;
        break;
    }

    // Shake the screen effect
    gavelTimeline.to(containerRef.current, {
      x: 10,
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Affect the selected websites
    websitesToAffect.forEach(websiteId => {
      const websiteElement = document.querySelector(`[data-website-id="${websiteId}"]`);
      if (websiteElement) {
        // Add glitch effect to the affected websites
        gavelTimeline.to(websiteElement, {
          opacity: 0.5,
          filter: `grayscale(${intensity})`,
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
          duration: 0.5,
          ease: 'power2.inOut'
        }, '-=0.4');
      }
    });

    // Store the timeline for cleanup
    if (timelineRef.current) {
      timelineRef.current.add(gavelTimeline);
    }
  };

  // Trigger final scene animation
  const triggerFinalScene = () => {
    if (!containerRef.current) return;

    // Set the final animation state
    setAnimationState(AnimationState.FINAL);

    // Play glitch sound effect
    setPlayGlitchSound(true);

    // Create a timeline for the final scene animation
    const finalTimeline = gsap.timeline();

    // Fade out all websites
    finalTimeline.to('.website-item', {
      opacity: 0,
      y: -20,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Show final message
    finalTimeline.to('.scene-1 h1', {
      text: dictionary.animation.finalMessage,
      duration: 2,
      ease: 'none'
    }, '-=0.5');

    // Show final subtitle
    finalTimeline.to('.scene-1 p', {
      text: dictionary.animation.finalSubtitle,
      duration: 1.5,
      ease: 'none'
    }, '-=1.5');

    // Add a continue button
    const continueButton = document.createElement('button');
    continueButton.className = 'px-8 py-4 bg-red-600 text-white font-brutalist text-xl hover:bg-red-700 transition-colors mt-8';
    continueButton.textContent = dictionary.animation.continueToSite;
    continueButton.onclick = skipAnimation;

    finalTimeline.call(() => {
      const sceneElement = document.querySelector('.scene-1');
      if (sceneElement) {
        sceneElement.appendChild(continueButton);
      }
    });

    // Store the timeline for cleanup
    if (timelineRef.current) {
      timelineRef.current.add(finalTimeline);
    }
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

      {/* Scene 1: The Bright, Functional Web */}
      <div className="scene scene-1 h-screen w-full flex flex-col items-center justify-center">
        <h1 className="font-brutalist text-4xl text-center mb-8">
          {dictionary.animation.title}
        </h1>
        <p className="font-brutalist-mono text-lg text-center mb-12 max-w-xl">
          {dictionary.animation.subtitle}
        </p>

        {/* Website Grid */}
        <WebsiteGrid
          visible={animationState === AnimationState.LOADING ||
                  animationState === AnimationState.INITIAL}
        />
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

      {/* Sound effects */}
      <SoundEffect
        src="/sounds/gavel.mp3"
        play={playGavelSound}
        onEnded={() => setPlayGavelSound(false)}
      />
      <SoundEffect
        src="/sounds/glitch.mp3"
        play={playGlitchSound}
        onEnded={() => setPlayGlitchSound(false)}
      />
    </div>
  );
};

export default IntroAnimation;
