'use client';

export default function ControversyVisual({ index }: { index: number }) {
  if (index === 0) {
    // Visual for "The Spy App"
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-2/3 h-2/3 flex items-center justify-center relative">
          {/* Outer pinging ring */}
          <div className="absolute w-full h-full border-2 border-red-500/30 rounded-full animate-ping-slow"></div>
          {/* Inner pulsing ring */}
          <div className="absolute w-3/4 h-3/4 border-2 border-red-500/50 rounded-full animate-pulse"></div>
          <svg className="w-16 h-16 text-red-400 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-label="Security lock icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
      </div>
    );
  }
  // Visual for "Biometric Surveillance"
  return (
    <div className="w-full h-full flex items-center justify-center p-4 group">
      <div className="w-2/3 h-2/3 flex items-center justify-center relative">
        <div className="w-full h-full border border-red-500/20 absolute -z-10 transition-transform duration-500 group-hover:scale-110" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }}></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 animate-pulse-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-label="Surveillance eye icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
    </div>
  );
}; 