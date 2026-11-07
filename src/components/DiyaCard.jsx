import React, { useState } from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { playChimeSound } from '../utils/audioSynth';
import RangoliPattern from './RangoliPattern';
import { useParallax3D } from '../utils/useParallax3D';

export default function DiyaCard({ onDiyaClick }) {
  const [litCount, setLitCount] = useState(1);
  const [isSparkling, setIsSparkling] = useState(false);
  const parallax = useParallax3D(12);

  const handleClick = (e) => {
    e.stopPropagation();
    setLitCount((prev) => prev + 1);
    setIsSparkling(true);
    playChimeSound();
    if (onDiyaClick) onDiyaClick();
    setTimeout(() => setIsSparkling(false), 1000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '38px',
        marginBottom: '26px',
        position: 'relative',
        width: '100%',
        perspective: '1200px'
      }}
    >
      {/* 3D Interactive Parallax Stage */}
      <div
        ref={parallax.ref}
        onPointerMove={parallax.onPointerMove}
        onPointerEnter={parallax.onPointerEnter}
        onPointerLeave={parallax.onPointerLeave}
        className="animate-float-3d"
        style={{
          ...parallax.style,
          position: 'relative',
          width: 'clamp(220px, 34vw, 275px)',
          height: 'clamp(220px, 34vw, 275px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D Sacred Diya. Click or tap to kindle blessings"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e)}
      >
        {/* Layer 0: Layered 3D Lotus / Rangoli Geometry (translateZ 0px) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateZ(0px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <RangoliPattern size="100%" opacity={0.82} />
        </div>

        {/* Ambient Warm Golden Ground Glow Reflection */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            width: '65%',
            height: '25%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255, 150, 20, 0.35) 0%, rgba(229, 184, 66, 0.15) 50%, transparent 75%)',
            filter: 'blur(10px)',
            transform: 'translateZ(15px)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Layer 1: Centerpiece 3D Brass Diya with Specular Sheen (translateZ 45px) */}
        <div
          style={{
            position: 'relative',
            transform: 'translateZ(45px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
          }}
        >
          {/* Flame Radiant Aura (translateZ 75px) */}
          <div
            className="animate-flame-aura"
            style={{
              position: 'absolute',
              top: '4%',
              left: '50%',
              transform: 'translateX(-50%) translateZ(75px)',
              width: '155px',
              height: '155px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,185,45,0.42) 0%, rgba(255,110,15,0.18) 45%, transparent 72%)',
              filter: 'blur(9px)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <svg
            viewBox="0 0 240 160"
            style={{
              width: 'clamp(160px, 25vw, 195px)',
              height: 'auto',
              display: 'block',
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(0 16px 24px rgba(0,0,0,0.75))'
            }}
          >
            <defs>
              {/* Metallic 3D Brass Gradient */}
              <linearGradient id="brass3D" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7D6" />
                <stop offset="25%" stopColor="#E5C07B" />
                <stop offset="60%" stopColor="#A87B19" />
                <stop offset="85%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#553A04" />
              </linearGradient>

              {/* Specular Light Reflection Sweep on Diya Rim */}
              <linearGradient id="rimSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A87B19" />
                <stop offset="35%" stopColor="#FFF9E0" />
                <stop offset="50%" stopColor="#E5C07B" />
                <stop offset="80%" stopColor="#FFF9E0" />
                <stop offset="100%" stopColor="#755106" />
              </linearGradient>

              {/* Glowing Sacred Oil Surface */}
              <radialGradient id="innerOil3D" cx="50%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#FFE699" />
                <stop offset="40%" stopColor="#D97706" />
                <stop offset="80%" stopColor="#803800" />
                <stop offset="100%" stopColor="#301501" />
              </radialGradient>

              {/* Flame Outer Radiant Halo */}
              <radialGradient id="flameOuter3D" cx="50%" cy="65%" r="50%">
                <stop offset="0%" stopColor="#FFFBEA" />
                <stop offset="30%" stopColor="#FFAE34" />
                <stop offset="70%" stopColor="#FF4200" />
                <stop offset="100%" stopColor="#8A0000" stopOpacity="0" />
              </radialGradient>

              {/* Thermal Core */}
              <linearGradient id="flameCore3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FFF9D2" />
                <stop offset="80%" stopColor="#FFA62B" />
                <stop offset="100%" stopColor="#7B32F0" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Diya Base Stand */}
            <ellipse cx="120" cy="144" rx="44" ry="8" fill="#3D2503" />
            <path
              d="M 94,138 Q 120,147 146,138 L 139,145 Q 120,150 101,145 Z"
              fill="url(#brass3D)"
            />

            {/* Diya 3D Curved Brass Bowl */}
            <path
              d="M 32,92 C 42,142 198,142 208,92 C 188,110 52,110 32,92 Z"
              fill="url(#brass3D)"
            />

            {/* Embossed Ornamental Filigree Dots */}
            <g fill="#FFF4C2" opacity="0.9">
              <circle cx="65" cy="112" r="2.2" />
              <circle cx="85" cy="120" r="2.6" />
              <circle cx="102" cy="125" r="2.9" />
              <circle cx="120" cy="127" r="3.2" />
              <circle cx="138" cy="125" r="2.9" />
              <circle cx="155" cy="120" r="2.6" />
              <circle cx="175" cy="112" r="2.2" />
            </g>

            {/* Diya Rim with Specular Sheen */}
            <ellipse cx="120" cy="92" rx="88" ry="17" fill="url(#rimSheen)" stroke="#FFF2B2" strokeWidth="1" />
            <ellipse cx="120" cy="91" rx="76" ry="12" fill="url(#innerOil3D)" />

            {/* Cotton Wick / Baati */}
            <ellipse cx="120" cy="87" rx="9" ry="4.5" fill="#2E1603" />
            <line x1="120" y1="87" x2="120" y2="76" stroke="#160901" strokeWidth="3.2" strokeLinecap="round" />

            {/* Multi-frequency Natural Flickering Flame */}
            <g className="animate-flame">
              {/* Outer flame tip */}
              <path
                d="M 120,20 C 140,46 144,66 133,78 C 127,85 113,85 107,78 C 96,66 100,46 120,20 Z"
                fill="url(#flameOuter3D)"
                filter="drop-shadow(0 0 12px #FF7700)"
              />
              {/* Mid saffron body */}
              <path
                d="M 120,34 C 133,52 135,68 129,76 C 125,80 115,80 111,76 C 105,68 107,52 120,34 Z"
                fill="#FFE359"
              />
              {/* White & blue-violet heat core */}
              <path
                d="M 120,50 C 127,60 128,69 125,75 C 123,78 117,78 115,75 C 112,69 113,60 120,50 Z"
                fill="url(#flameCore3D)"
              />
            </g>
          </svg>

          {/* Interactive Particle Burst on Tap */}
          {isSparkling && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                transform: 'translateZ(90px)'
              }}
            >
              <Sparkles
                size={44}
                color="#FFF3B8"
                style={{
                  filter: 'drop-shadow(0 0 16px #FFD700)',
                  animation: 'flameAuraPulse 0.8s ease-out'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Interactive Diya Counter Pill */}
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(22, 6, 36, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(229, 184, 66, 0.42)',
          borderRadius: '9999px',
          padding: '7px 20px',
          cursor: 'pointer',
          marginTop: '16px',
          fontSize: '0.86rem',
          color: '#F5E6BE',
          boxShadow: '0 6px 20px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.15)',
          transition: 'all 0.25s ease',
          zIndex: 4
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#F5E6BE';
          e.currentTarget.style.background = 'rgba(38, 11, 60, 0.95)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(229, 184, 66, 0.42)';
          e.currentTarget.style.background = 'rgba(22, 6, 36, 0.92)';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }}
      >
        <Flame size={15} color="#FF7B25" />
        <span style={{ fontWeight: 600 }}>
          {litCount === 1 ? 'Sacred Diya Lit' : `${litCount} Diyas Radiating Light`}
        </span>
        <span style={{ opacity: 0.65, fontSize: '0.78rem' }}>• Touch to ignite</span>
      </div>
    </div>
  );
}
