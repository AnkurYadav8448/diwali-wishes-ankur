import React from 'react';

export default function FestiveDecorations() {
  return (
    <div style={{ pointerEvents: 'none' }} aria-hidden="true">
      {/* Decorative Traditional Toran / Marigold Garland at the top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '52px',
          overflow: 'hidden',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          opacity: 0.95
        }}
      >
        <svg
          viewBox="0 0 1200 52"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.7))' }}
        >
          <defs>
            <linearGradient id="marigoldYellow3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="45%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>

            <linearGradient id="marigoldOrange3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA000" />
              <stop offset="60%" stopColor="#F4511E" />
              <stop offset="100%" stopColor="#BF360C" />
            </linearGradient>

            <linearGradient id="leafGrad3D" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7CB342" />
              <stop offset="60%" stopColor="#33691E" />
              <stop offset="100%" stopColor="#1B3E0A" />
            </linearGradient>

            <pattern id="toranPattern3D" width="70" height="52" patternUnits="userSpaceOnUse">
              {/* Mango Leaf (Aam ke patte) */}
              <path d="M 35,2 C 43,18 41,36 35,42 C 29,36 27,18 35,2 Z" fill="url(#leafGrad3D)" />
              <line x1="35" y1="4" x2="35" y2="40" stroke="#9CCC65" strokeWidth="0.8" opacity="0.75" />

              {/* Golden Garland Twine */}
              <path d="M 0,6 Q 35,18 70,6" stroke="#D4AF37" strokeWidth="2.8" fill="none" />
              <path d="M 0,6 Q 35,18 70,6" stroke="#FFF275" strokeWidth="1" strokeDasharray="3,3" fill="none" />

              {/* Alternating Marigold Flowers */}
              <circle cx="35" cy="24" r="8.5" fill="url(#marigoldOrange3D)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
              <circle cx="35" cy="24" r="5.2" fill="url(#marigoldYellow3D)" />
              <circle cx="35" cy="24" r="2.2" fill="#FFFFFF" opacity="0.9" />

              <circle cx="0" cy="6" r="4.5" fill="url(#marigoldYellow3D)" />
              <circle cx="70" cy="6" r="4.5" fill="url(#marigoldYellow3D)" />
            </pattern>
          </defs>
          <rect width="100%" height="52" fill="url(#toranPattern3D)" />
        </svg>
      </div>

      {/* Top Left Hanging 3D Kandil / Festive Lantern */}
      <div
        className="animate-float-3d"
        style={{
          position: 'fixed',
          top: 0,
          left: 'clamp(8px, 2.5vw, 24px)',
          width: 'clamp(46px, 6vw, 64px)',
          height: 'clamp(120px, 16vw, 150px)',
          zIndex: 8,
          opacity: 0.9
        }}
      >
        <svg viewBox="0 0 70 170" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 14px rgba(255,160,0,0.4))' }}>
          <defs>
            <linearGradient id="kandilGold3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9E0" />
              <stop offset="50%" stopColor="#E5C07B" />
              <stop offset="100%" stopColor="#8A630A" />
            </linearGradient>

            <linearGradient id="kandilPlum3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7B25" />
              <stop offset="65%" stopColor="#7B1143" />
              <stop offset="100%" stopColor="#3E0528" />
            </linearGradient>
          </defs>

          {/* Hanging Golden Chain */}
          <line x1="35" y1="0" x2="35" y2="36" stroke="#E5C07B" strokeWidth="2.2" strokeDasharray="2,2" />
          <circle cx="35" cy="36" r="3.2" fill="#FFF275" />

          {/* Main Diamond Prism */}
          <polygon points="35,36 64,68 35,100 6,68" fill="url(#kandilPlum3D)" stroke="url(#kandilGold3D)" strokeWidth="3" />

          {/* Internal Radiating Light Core */}
          <circle cx="35" cy="68" r="14" fill="#FFF9D2" opacity="0.9" filter="drop-shadow(0 0 10px #FF9900)" />
          <circle cx="35" cy="68" r="7" fill="#FFFFFF" />

          {/* Triangular Corner Accents */}
          <polygon points="35,36 50,22 50,46" fill="url(#kandilGold3D)" opacity="0.95" />
          <polygon points="35,36 20,22 20,46" fill="url(#kandilGold3D)" opacity="0.95" />
          <polygon points="6,68 -4,56 -4,80" fill="url(#kandilGold3D)" opacity="0.95" />
          <polygon points="64,68 74,56 74,80" fill="url(#kandilGold3D)" opacity="0.95" />

          {/* Swaying Silk Tassels */}
          <g opacity="0.95">
            <line x1="20" y1="100" x2="17" y2="152" stroke="#F5E6BE" strokeWidth="2" />
            <line x1="27" y1="100" x2="26" y2="162" stroke="#E5C07B" strokeWidth="2.2" />
            <line x1="35" y1="100" x2="35" y2="168" stroke="#FF7B25" strokeWidth="2.6" />
            <line x1="43" y1="100" x2="44" y2="162" stroke="#E5C07B" strokeWidth="2.2" />
            <line x1="50" y1="100" x2="53" y2="152" stroke="#F5E6BE" strokeWidth="2" />
            <circle cx="17" cy="152" r="2.2" fill="#FFF275" />
            <circle cx="26" cy="162" r="2.5" fill="#FFB300" />
            <circle cx="35" cy="168" r="3" fill="#FF7B25" />
            <circle cx="44" cy="162" r="2.5" fill="#FFB300" />
            <circle cx="53" cy="152" r="2.2" fill="#FFF275" />
          </g>
        </svg>
      </div>

      {/* Top Right Hanging 3D Kandil / Festive Lantern */}
      <div
        className="animate-float-3d"
        style={{
          position: 'fixed',
          top: 0,
          right: 'clamp(8px, 2.5vw, 24px)',
          width: 'clamp(46px, 6vw, 64px)',
          height: 'clamp(120px, 16vw, 150px)',
          zIndex: 8,
          opacity: 0.9,
          animationDelay: '-2.5s'
        }}
      >
        <svg viewBox="0 0 70 170" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 14px rgba(255,160,0,0.4))' }}>
          <line x1="35" y1="0" x2="35" y2="36" stroke="#E5C07B" strokeWidth="2.2" strokeDasharray="2,2" />
          <circle cx="35" cy="36" r="3.2" fill="#FFF275" />
          <polygon points="35,36 64,68 35,100 6,68" fill="url(#kandilPlum3D)" stroke="url(#kandilGold3D)" strokeWidth="3" />
          <circle cx="35" cy="68" r="14" fill="#FFF9D2" opacity="0.9" filter="drop-shadow(0 0 10px #FF9900)" />
          <circle cx="35" cy="68" r="7" fill="#FFFFFF" />
          <polygon points="35,36 50,22 50,46" fill="url(#kandilGold3D)" opacity="0.95" />
          <polygon points="35,36 20,22 20,46" fill="url(#kandilGold3D)" opacity="0.95" />
          <polygon points="6,68 -4,56 -4,80" fill="url(#kandilGold3D)" opacity="0.95" />
          <polygon points="64,68 74,56 74,80" fill="url(#kandilGold3D)" opacity="0.95" />
          <g opacity="0.95">
            <line x1="20" y1="100" x2="17" y2="152" stroke="#F5E6BE" strokeWidth="2" />
            <line x1="27" y1="100" x2="26" y2="162" stroke="#E5C07B" strokeWidth="2.2" />
            <line x1="35" y1="100" x2="35" y2="168" stroke="#FF7B25" strokeWidth="2.6" />
            <line x1="43" y1="100" x2="44" y2="162" stroke="#E5C07B" strokeWidth="2.2" />
            <line x1="50" y1="100" x2="53" y2="152" stroke="#F5E6BE" strokeWidth="2" />
            <circle cx="17" cy="152" r="2.2" fill="#FFF275" />
            <circle cx="26" cy="162" r="2.5" fill="#FFB300" />
            <circle cx="35" cy="168" r="3" fill="#FF7B25" />
            <circle cx="44" cy="162" r="2.5" fill="#FFB300" />
            <circle cx="53" cy="152" r="2.2" fill="#FFF275" />
          </g>
        </svg>
      </div>

      {/* Floating 3D Marigold Petals (Simulating festive floral atmosphere) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
          overflow: 'hidden'
        }}
      >
        {[
          { left: '10%', delay: '0s', dur: '12s', size: 14 },
          { left: '25%', delay: '4s', dur: '15s', size: 18 },
          { left: '45%', delay: '1.5s', dur: '13s', size: 12 },
          { left: '70%', delay: '5s', dur: '14s', size: 16 },
          { left: '88%', delay: '2s', dur: '16s', size: 14 }
        ].map((petal, i) => (
          <div
            key={`petal-${i}`}
            style={{
              position: 'absolute',
              top: '-30px',
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              background: 'radial-gradient(ellipse at 40% 30%, #FFE082 0%, #FF9800 65%, #E65100 100%)',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              opacity: 0.55,
              animation: `float3D ${petal.dur} linear infinite`,
              animationDelay: petal.delay,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
            }}
          />
        ))}
      </div>
    </div>
  );
}
