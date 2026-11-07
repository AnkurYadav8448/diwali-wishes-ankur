import React from 'react';

export default function RangoliPattern({ size = 260, opacity = 0.75, style = {} }) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: typeof size === 'number' ? `${size}px` : size,
        maxWidth: '100%',
        aspectRatio: '1 / 1',
        pointerEvents: 'none',
        opacity,
        ...style
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        width="100%"
        height="100%"
        style={{
          display: 'block',
          filter: 'drop-shadow(0 0 8px rgba(229, 184, 66, 0.2))'
        }}
      >
        <defs>
          <linearGradient id="rangoliGoldPure" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C2" />
            <stop offset="45%" stopColor="#E5B842" />
            <stop offset="85%" stopColor="#A87B19" />
            <stop offset="100%" stopColor="#755106" />
          </linearGradient>

          <linearGradient id="rangoliSaffron" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFAE34" />
            <stop offset="60%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#A82B00" />
          </linearGradient>
        </defs>

        {/* Outer Sacred Symmetrical Ring with Golden Dots */}
        <circle cx="200" cy="200" r="186" fill="none" stroke="url(#rangoliGoldPure)" strokeWidth="1.5" strokeDasharray="3, 5" />
        <circle cx="200" cy="200" r="176" fill="none" stroke="url(#rangoliGoldPure)" strokeWidth="1" opacity="0.75" />

        {/* 16 Outer Lotus Petals */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
          <g key={`petal-outer-${deg}`} transform={`rotate(${deg} 200 200)`}>
            <path
              d="M 200,24 C 214,75 228,110 200,140 C 172,110 186,75 200,24 Z"
              fill="rgba(229, 184, 66, 0.05)"
              stroke="url(#rangoliGoldPure)"
              strokeWidth="1.2"
            />
            <circle cx="200" cy="24" r="2.4" fill="#FFF275" />
          </g>
        ))}

        {/* Mid Concentric Rings */}
        <circle cx="200" cy="200" r="128" fill="none" stroke="url(#rangoliGoldPure)" strokeWidth="1.6" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="url(#rangoliSaffron)" strokeWidth="1" strokeDasharray="3, 4" opacity="0.8" />

        {/* 8 Inner Floral Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <g key={`petal-inner-${deg}`} transform={`rotate(${deg} 200 200)`}>
            <path
              d="M 200,80 Q 235,135 200,175 Q 165,135 200,80"
              fill="rgba(255, 123, 37, 0.06)"
              stroke="url(#rangoliGoldPure)"
              strokeWidth="1.5"
            />
            {/* Miniature flame tips on the 8-petal bloom */}
            <circle cx="200" cy="80" r="3" fill="#FFAE34" />
            <circle cx="200" cy="80" r="1.5" fill="#FFFFFF" />
          </g>
        ))}

        {/* Center Floral Rosette (subtle open filigree) */}
        <circle cx="200" cy="200" r="50" fill="none" stroke="url(#rangoliGoldPure)" strokeWidth="1.2" strokeDasharray="2, 3" />
        <circle cx="200" cy="200" r="32" fill="none" stroke="url(#rangoliSaffron)" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="16" fill="rgba(229, 184, 66, 0.15)" stroke="url(#rangoliGoldPure)" strokeWidth="1" />
      </svg>
    </div>
  );
}
