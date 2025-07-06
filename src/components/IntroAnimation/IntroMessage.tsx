'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import VisualNarration from './VisualNarration';
import { getSceneByMessage } from './narrationScenes';

interface IntroMessageProps {
  messages: string[];
  currentMessageIndex: number;
  visible: boolean;
  onComplete?: () => void;
  onMessageChange?: (index: number) => void;
  finalPosition?: 'top' | 'center';
  timelineLabel?: string;
  disableVisualNarration?: boolean;
}

/**
 * IntroMessage Component
 *
 * A film-style introduction text with fade-in animation and support for multiple messages
 */
const IntroMessage: React.FC<IntroMessageProps> = ({
  messages,
  currentMessageIndex,
  visible,
  onComplete,
  onMessageChange,
  finalPosition = 'center',
  timelineLabel,
  disableVisualNarration = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const prevMessageIndex = useRef<number>(currentMessageIndex);
  const [currentScene, setCurrentScene] = useState(
    getSceneByMessage(messages[currentMessageIndex] || '')
  );

  // Update current scene when message changes
  useEffect(() => {
    if (visible && messages[currentMessageIndex]) {
      setCurrentScene(getSceneByMessage(messages[currentMessageIndex]));
    }
  }, [visible, messages, currentMessageIndex]);

  // Handle message transitions
  useEffect(() => {
    if (!containerRef.current || !visible || !messageRef.current) return;

    const isFirstMessage = currentMessageIndex === 0 && prevMessageIndex.current === 0;
    const isLastMessage = currentMessageIndex === messages.length - 1;
    const isMovingForward = currentMessageIndex > prevMessageIndex.current;

    // Create a timeline for the message animation
    const tl = gsap.timeline({
      onComplete: () => {
        // If this is the last message and we need to transition to the next phase
        if (isLastMessage && onComplete) {
          // If we need to move the message to the top
          if (finalPosition === 'top') {
            const finalTl = gsap.timeline({
              onComplete: onComplete
            });

            finalTl.to(messageRef.current, {
              y: '-40vh',
              scale: 0.7,
              duration: 1,
              ease: 'power2.inOut'
            });
          } else {
            onComplete();
          }
        }

        prevMessageIndex.current = currentMessageIndex;
      }
    });

    // If it's the first message or we're moving forward
    if (isFirstMessage || isMovingForward) {
      // Fade out previous message if not the first one
      if (!isFirstMessage) {
        tl.to('.message-text', {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in'
        });
      }

      // Fade in new message
      tl.fromTo(
        '.message-text',
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        },
        isFirstMessage ? 0 : '>'
      );

      // If it's the last message, prepare for transition to next phase
      if (isLastMessage) {
        tl.to('.message-text', {
          delay: 1.5,
          opacity: finalPosition === 'top' ? 1 : 0,
          duration: finalPosition === 'top' ? 0 : 0.5,
          ease: 'power2.in'
        });
      } else {
        // If not the last message, prepare for next message after a delay
        tl.to({}, {
          duration: 2,
          onComplete: () => {
            if (onMessageChange) {
              onMessageChange(currentMessageIndex + 1);
            }
          }
        });
      }
    }

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [visible, currentMessageIndex, messages.length, onComplete, onMessageChange, finalPosition]);

  if (!visible) return null;

  // Get current message
  const currentMessage = messages[currentMessageIndex] || '';

  return (
    <div
      ref={containerRef}
      className={`intro-message ${finalPosition === 'top' ? 'transition-ready' : ''}`}
      aria-label="Story message"
    >
      {/* Visual Narration */}
      <VisualNarration
        scene={currentScene}
        visible={visible}
        disabled={disableVisualNarration}
      />

      <div
        ref={messageRef}
        className="message-container"
      >
        <h1 className="message-text">
          {currentMessage}
        </h1>
      </div>

      {/* Story Timeline */}
      {timelineLabel && (
        <div className="story-timeline-container">
          <div className="timeline-steps">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`timeline-step ${index <= currentMessageIndex ? 'active' : ''}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="timeline-label">{timelineLabel}</div>
        </div>
      )}
    </div>
  );
};

export default IntroMessage;
