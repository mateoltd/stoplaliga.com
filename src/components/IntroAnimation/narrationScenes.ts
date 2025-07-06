import { NarrationScene } from './VisualNarration';

// Define narration scenes for each message
export const narrationScenes: NarrationScene[] = [
  // Scene 0: "Once upon a time..."
  {
    id: 'scene-once-upon-a-time',
    elements: [
      {
        id: 'storybook',
        type: 'image',
        src: '/narration/storybook.svg',
        initialPosition: { x: '50%', y: '60%' },
        initialStyle: { 
          opacity: 0,
          scale: 0.5,
          xPercent: -50,
          yPercent: -50
        },
        animation: 'scale',
        animationConfig: {
          startScale: 0.5,
          endScale: 1,
          startOpacity: 0,
          endOpacity: 1,
          duration: 1.5,
          ease: 'back.out(1.7)'
        }
      },
      {
        id: 'sparkles',
        type: 'image',
        src: '/narration/sparkles.svg',
        initialPosition: { x: '50%', y: '60%' },
        initialStyle: { 
          opacity: 0,
          scale: 0.8,
          xPercent: -50,
          yPercent: -50
        },
        animation: 'fade',
        animationConfig: {
          duration: 1,
          delay: 1
        }
      }
    ],
    duration: 3
  },
  
  // Scene 1: "The internet was free and open"
  {
    id: 'scene-internet-free',
    elements: [
      {
        id: 'network',
        type: 'shape',
        initialPosition: { x: '50%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          xPercent: -50,
          yPercent: -50
        },
        animation: 'network',
        animationConfig: {
          nodeCount: 20,
          duration: 4
        }
      },
      {
        id: 'globe',
        type: 'image',
        src: '/narration/globe.svg',
        initialPosition: { x: '50%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          scale: 0.5,
          xPercent: -50,
          yPercent: -50
        },
        animation: 'scale',
        animationConfig: {
          startScale: 0.5,
          endScale: 1,
          startOpacity: 0,
          endOpacity: 1,
          duration: 1.5,
          delay: 1
        }
      }
    ],
    duration: 4
  },
  
  // Scene 2: "People could access any website they wanted"
  {
    id: 'scene-access-websites',
    elements: [
      {
        id: 'website-icons',
        type: 'image',
        src: '/narration/website-icons.svg',
        initialPosition: { x: '50%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          scale: 0.8,
          xPercent: -50,
          yPercent: -50
        },
        animation: 'scale',
        animationConfig: {
          startScale: 0.8,
          endScale: 1,
          startOpacity: 0,
          endOpacity: 1,
          duration: 1
        }
      },
      {
        id: 'cursor',
        type: 'image',
        src: '/narration/cursor.svg',
        initialPosition: { x: '30%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          xPercent: -50,
          yPercent: -50
        },
        animation: 'path',
        animationConfig: {
          path: [
            { x: '30%', y: '50%' },
            { x: '40%', y: '40%' },
            { x: '60%', y: '60%' },
            { x: '70%', y: '45%' }
          ],
          duration: 3,
          delay: 1
        }
      }
    ],
    duration: 4
  },
  
  // Scene 3: "But then LaLiga came along"
  {
    id: 'scene-laliga-came',
    elements: [
      {
        id: 'laliga-shadow',
        type: 'shape',
        initialPosition: { x: '100%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          xPercent: -50,
          yPercent: -50
        },
        animation: 'fade',
        animationConfig: {
          duration: 2
        }
      },
      {
        id: 'laliga-text',
        type: 'text',
        content: 'LaLiga',
        initialPosition: { x: '120%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          color: '#ff0000',
          fontSize: '4rem',
          fontWeight: 'bold',
          xPercent: -50,
          yPercent: -50
        },
        animation: 'fade',
        animationConfig: {
          duration: 1,
          delay: 1
        }
      }
    ],
    duration: 4
  },
  
  // Scene 4: "And they managed to get away with censoring it"
  {
    id: 'scene-censorship',
    elements: [
      {
        id: 'censorship-bars',
        type: 'shape',
        initialPosition: { x: '50%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          width: '80%',
          height: '80%',
          xPercent: -50,
          yPercent: -50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        },
        animation: 'fade',
        animationConfig: {
          duration: 0.5
        }
      },
      {
        id: 'censorship-bar-1',
        type: 'shape',
        initialPosition: { x: '0%', y: '30%' },
        initialStyle: { 
          opacity: 0,
          width: '0%',
          height: '40px',
          backgroundColor: '#ff0000'
        },
        animation: 'fade',
        animationConfig: {
          duration: 0.5
        }
      },
      {
        id: 'censorship-bar-2',
        type: 'shape',
        initialPosition: { x: '0%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          width: '0%',
          height: '40px',
          backgroundColor: '#ff0000'
        },
        animation: 'fade',
        animationConfig: {
          duration: 0.5,
          delay: 0.2
        }
      },
      {
        id: 'censorship-bar-3',
        type: 'shape',
        initialPosition: { x: '0%', y: '70%' },
        initialStyle: { 
          opacity: 0,
          width: '0%',
          height: '40px',
          backgroundColor: '#ff0000'
        },
        animation: 'fade',
        animationConfig: {
          duration: 0.5,
          delay: 0.4
        }
      }
    ],
    duration: 4
  },
  
  // Scene 5: "Internet Censorship"
  {
    id: 'scene-internet-censorship',
    elements: [
      {
        id: 'censorship-title',
        type: 'text',
        content: 'CENSORSHIP',
        initialPosition: { x: '50%', y: '50%' },
        initialStyle: { 
          opacity: 0,
          color: '#ff0000',
          fontSize: '5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          xPercent: -50,
          yPercent: -50
        },
        animation: 'glitch',
        animationConfig: {
          duration: 0.3,
          repeat: 5,
          repeatDelay: 0.2
        }
      },
      {
        id: 'censorship-particles',
        type: 'shape',
        initialPosition: { x: '50%', y: '50%' },
        initialStyle: { 
          opacity: 0
        },
        animation: 'particles',
        animationConfig: {
          particleCount: 30
        }
      }
    ],
    duration: 3
  }
];

// Function to get a scene by index
export const getSceneByIndex = (index: number): NarrationScene | null => {
  if (index < 0 || index >= narrationScenes.length) {
    return null;
  }
  return narrationScenes[index];
};

// Function to get a scene by message content (for flexibility)
export const getSceneByMessage = (message: string): NarrationScene | null => {
  // Map common message fragments to scene indices
  if (message.includes('Once upon a time')) return narrationScenes[0];
  if (message.includes('internet was free')) return narrationScenes[1];
  if (message.includes('access any website')) return narrationScenes[2];
  if (message.includes('LaLiga came')) return narrationScenes[3];
  if (message.includes('censoring it')) return narrationScenes[4];
  if (message.includes('Internet Censorship')) return narrationScenes[5];
  
  // Default to null if no match
  return null;
};
