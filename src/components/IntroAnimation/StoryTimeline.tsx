'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StoryTimelineProps {
  totalSteps: number;
  currentStep: number;
  label?: string;
}

/**
 * StoryTimeline Component
 * 
 * A visual indicator of story progress
 */
const StoryTimeline: React.FC<StoryTimelineProps> = ({ 
  totalSteps, 
  currentStep,
  label
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Update progress when currentStep changes
  useEffect(() => {
    if (!timelineRef.current) return;
    
    // Calculate progress percentage
    const progress = (currentStep / totalSteps) * 100;
    
    // Animate progress bar
    gsap.to('.timeline-progress', {
      width: `${progress}%`,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // Animate current step indicator
    gsap.to('.timeline-current-step', {
      left: `${progress}%`,
      duration: 0.5,
      ease: 'power2.out'
    });
    
  }, [currentStep, totalSteps]);
  
  return (
    <div 
      ref={timelineRef}
      className="story-timeline fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-4/5 max-w-md"
      aria-label={`Story progress: step ${currentStep} of ${totalSteps}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      {label && (
        <div className="timeline-label text-center mb-2 text-xs font-brutalist-mono text-white bg-black bg-opacity-70 py-1 px-2 rounded-sm inline-block mx-auto">
          {label}
        </div>
      )}
      <div className="timeline-container h-2 bg-gray-300 bg-opacity-30 rounded-full relative">
        {/* Progress bar */}
        <div className="timeline-progress h-full bg-white rounded-full absolute top-0 left-0" style={{ width: '0%' }}></div>
        
        {/* Step indicators */}
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`timeline-step absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${
              index < currentStep ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
            }`}
            style={{ left: `${(index / (totalSteps - 1)) * 100}%` }}
          ></div>
        ))}
        
        {/* Current step indicator */}
        <div className="timeline-current-step absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default StoryTimeline;
