'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

// Define animation types
export type AnimationType = 
  | 'fade' 
  | 'scale' 
  | 'rotate' 
  | 'path' 
  | 'typewriter' 
  | 'glitch'
  | 'particles'
  | 'network'
  | 'none';

// Define visual element types
export interface VisualElement {
  id: string;
  type: 'image' | 'svg' | 'text' | 'shape';
  src?: string;
  content?: string;
  initialPosition: { x: number | string, y: number | string };
  initialStyle?: Record<string, any>;
  animation: AnimationType;
  animationConfig?: Record<string, any>;
}

// Define narration scene
export interface NarrationScene {
  id: string;
  elements: VisualElement[];
  duration?: number;
  background?: string;
}

interface VisualNarrationProps {
  scene?: NarrationScene | null;
  visible: boolean;
  disabled?: boolean;
  onComplete?: () => void;
}

/**
 * VisualNarration Component
 * 
 * Provides visual animations to accompany narration text
 */
const VisualNarration: React.FC<VisualNarrationProps> = ({
  scene,
  visible,
  disabled = false,
  onComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  // Initialize animations when scene changes
  useEffect(() => {
    if (!containerRef.current || !visible || !scene || disabled) return;
    
    // Clear any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    // Create a new timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
    
    timelineRef.current = tl;
    
    // Process each element in the scene
    scene.elements.forEach(element => {
      const elementSelector = `#${element.id}`;
      const elementNode = document.querySelector(elementSelector);
      
      if (!elementNode) return;
      
      // Apply initial styles
      if (element.initialStyle) {
        gsap.set(elementNode, element.initialStyle);
      }
      
      // Apply animation based on type
      switch (element.animation) {
        case 'fade':
          tl.fromTo(
            elementNode,
            { opacity: 0 },
            { 
              opacity: 1, 
              duration: element.animationConfig?.duration || 1,
              ease: element.animationConfig?.ease || 'power2.out',
              delay: element.animationConfig?.delay || 0
            }
          );
          break;
          
        case 'scale':
          tl.fromTo(
            elementNode,
            { 
              scale: element.animationConfig?.startScale || 0.5,
              opacity: element.animationConfig?.startOpacity || 0
            },
            { 
              scale: element.animationConfig?.endScale || 1,
              opacity: element.animationConfig?.endOpacity || 1,
              duration: element.animationConfig?.duration || 1,
              ease: element.animationConfig?.ease || 'back.out(1.7)',
              delay: element.animationConfig?.delay || 0
            }
          );
          break;
          
        case 'rotate':
          tl.fromTo(
            elementNode,
            { 
              rotation: element.animationConfig?.startRotation || 0,
              opacity: element.animationConfig?.startOpacity || 0
            },
            { 
              rotation: element.animationConfig?.endRotation || 360,
              opacity: element.animationConfig?.endOpacity || 1,
              duration: element.animationConfig?.duration || 1.5,
              ease: element.animationConfig?.ease || 'power2.out',
              delay: element.animationConfig?.delay || 0
            }
          );
          break;
          
        case 'path':
          // Path animation requires a path to follow
          if (element.animationConfig?.path) {
            tl.to(elementNode, {
              motionPath: {
                path: element.animationConfig.path,
                align: element.animationConfig.path,
                autoRotate: element.animationConfig?.autoRotate || false,
                alignOrigin: [0.5, 0.5]
              },
              duration: element.animationConfig?.duration || 2,
              ease: element.animationConfig?.ease || 'power1.inOut',
              delay: element.animationConfig?.delay || 0
            });
          }
          break;
          
        case 'typewriter':
          // Typewriter effect for text elements
          if (element.type === 'text' && element.content) {
            const chars = element.content.split('');
            
            // Hide all characters initially
            gsap.set(`${elementSelector} .char`, { opacity: 0 });
            
            // Reveal characters one by one
            tl.to(`${elementSelector} .char`, {
              opacity: 1,
              stagger: element.animationConfig?.stagger || 0.05,
              duration: element.animationConfig?.duration || 0.1,
              ease: element.animationConfig?.ease || 'none',
              delay: element.animationConfig?.delay || 0
            });
          }
          break;
          
        case 'glitch':
          // Glitch effect
          tl.to(elementNode, {
            keyframes: {
              x: [0, -5, 5, -5, 5, 0],
              y: [0, 5, -5, 5, -5, 0],
              opacity: [1, 0.8, 1, 0.8, 1],
              scale: [1, 1.02, 0.98, 1.02, 0.98, 1]
            },
            duration: element.animationConfig?.duration || 0.5,
            repeat: element.animationConfig?.repeat || 2,
            repeatDelay: element.animationConfig?.repeatDelay || 1,
            ease: 'none',
            delay: element.animationConfig?.delay || 0
          });
          break;
          
        case 'particles':
          // Particle effect (simplified)
          // In a real implementation, this would use a particle library
          if (element.animationConfig?.particleCount) {
            const count = element.animationConfig.particleCount;
            for (let i = 0; i < count; i++) {
              const particle = document.createElement('div');
              particle.className = 'particle';
              containerRef.current?.appendChild(particle);
              
              gsap.fromTo(
                particle,
                {
                  x: element.initialPosition.x,
                  y: element.initialPosition.y,
                  opacity: 1,
                  scale: Math.random() * 0.5 + 0.5
                },
                {
                  x: `+=${(Math.random() - 0.5) * 200}`,
                  y: `+=${(Math.random() - 0.5) * 200}`,
                  opacity: 0,
                  scale: 0,
                  duration: Math.random() * 2 + 1,
                  delay: Math.random() * 2,
                  onComplete: () => {
                    particle.remove();
                  }
                }
              );
            }
          }
          break;
          
        case 'network':
          // Network effect (simplified)
          // In a real implementation, this would use canvas or SVG for lines
          if (element.animationConfig?.nodeCount) {
            const count = element.animationConfig.nodeCount;
            const nodes: HTMLElement[] = [];
            
            // Create nodes
            for (let i = 0; i < count; i++) {
              const node = document.createElement('div');
              node.className = 'network-node';
              containerRef.current?.appendChild(node);
              nodes.push(node);
              
              gsap.fromTo(
                node,
                {
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                  scale: 0
                },
                {
                  opacity: 0.7,
                  scale: 1,
                  duration: 1,
                  delay: i * 0.1
                }
              );
            }
            
            // Cleanup
            tl.call(() => {
              nodes.forEach(node => {
                gsap.to(node, {
                  opacity: 0,
                  scale: 0,
                  duration: 0.5,
                  onComplete: () => {
                    node.remove();
                  }
                });
              });
            }, [], element.animationConfig?.duration || 5);
          }
          break;
          
        case 'none':
        default:
          // No animation, just show the element
          tl.set(elementNode, { opacity: 1 });
          break;
      }
    });
    
    // Set duration for the entire scene if specified
    if (scene.duration) {
      tl.duration(scene.duration);
    }
    
    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [scene, visible, disabled, onComplete]);
  
  if (!visible || !scene || disabled) return null;
  
  return (
    <div 
      ref={containerRef}
      className="visual-narration fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ backgroundColor: scene.background || 'transparent' }}
      aria-hidden="true"
    >
      {scene.elements.map(element => {
        // Render element based on type
        switch (element.type) {
          case 'image':
            return (
              <div 
                key={element.id}
                id={element.id}
                className="absolute"
                style={{ 
                  top: element.initialPosition.y, 
                  left: element.initialPosition.x,
                  opacity: 0 // Start invisible
                }}
              >
                {element.src && (
                  <Image
                    src={element.src}
                    alt=""
                    width={100}
                    height={100}
                    className="w-auto h-auto"
                  />
                )}
              </div>
            );
            
          case 'text':
            return (
              <div 
                key={element.id}
                id={element.id}
                className="absolute"
                style={{ 
                  top: element.initialPosition.y, 
                  left: element.initialPosition.x,
                  opacity: 0 // Start invisible
                }}
              >
                {element.animation === 'typewriter' && element.content
                  ? element.content.split('').map((char, index) => (
                      <span key={index} className="char">{char}</span>
                    ))
                  : element.content
                }
              </div>
            );
            
          case 'shape':
            return (
              <div 
                key={element.id}
                id={element.id}
                className="absolute"
                style={{ 
                  top: element.initialPosition.y, 
                  left: element.initialPosition.x,
                  opacity: 0 // Start invisible
                }}
              >
                {/* Render a basic shape (can be customized) */}
                <div className="w-10 h-10 bg-white rounded-full"></div>
              </div>
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
};

export default VisualNarration;
