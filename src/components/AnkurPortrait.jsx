import React from 'react';
import { Sparkles } from 'lucide-react';
import { useParallax3D } from '../utils/useParallax3D';

export default function AnkurPortrait() {
  const parallax = useParallax3D(10);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto 24px',
        position: 'relative',
        perspective: '1000px'
      }}
    >
      {/* 3D Interactive Tilting Medallion */}
      <div
        ref={parallax.ref}
        onPointerMove={parallax.onPointerMove}
        onPointerEnter={parallax.onPointerEnter}
        onPointerLeave={parallax.onPointerLeave}
        style={{
          ...parallax.style,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {/* Ambient Subtle Golden Backlight (translateZ 0px) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateZ(0px)',
            width: 'clamp(160px, 30vw, 205px)',
            height: 'clamp(160px, 30vw, 205px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229, 184, 66, 0.16) 0%, rgba(110, 20, 110, 0.08) 50%, transparent 72%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Ornate 3D Golden Medallion Frame (translateZ 25px) */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(135px, 25vw, 170px)',
            height: 'clamp(135px, 25vw, 170px)',
            borderRadius: '50%',
            padding: '5px',
            background: 'linear-gradient(135deg, #FBF3D5 0%, #D4AF37 32%, #8C6615 65%, #D4AF37 88%, #F5E6BE 100%)',
            boxShadow: 
              '0 16px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(229, 184, 66, 0.22), inset 0 2px 4px rgba(255, 255, 255, 0.75)',
            transform: 'translateZ(25px)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Inner concentric dotted gold ring (translateZ 35px) */}
          <div
            style={{
              position: 'absolute',
              inset: '3px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(245, 230, 190, 0.85)',
              transform: 'translateZ(10px)',
              pointerEvents: 'none',
              zIndex: 3
            }}
          />

          {/* Authentic Portrait Photo of Ankur (translateZ 20px) */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#160924',
              position: 'relative',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6)'
            }}
          >
            <img
              src="/ankur-portrait.jpeg"
              alt="Ankur - Diwali Wishes Edition 1.0"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 16%',
                display: 'block'
              }}
              loading="eager"
            />
          </div>

          {/* Cardinal 3D Golden Jewels */}
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#FFF4C2',
              boxShadow: '0 0 6px #FFD700',
              transform: 'translateZ(25px)',
              zIndex: 4
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#FFF4C2',
              boxShadow: '0 0 6px #FFD700',
              transform: 'translateZ(25px)',
              zIndex: 4
            }}
          />
        </div>

        {/* Elevated 3D Pill Badge (translateZ 45px) */}
        <div
          style={{
            marginTop: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(20, 6, 32, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(229, 184, 66, 0.42)',
            borderRadius: '9999px',
            padding: '5px 16px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
            transform: 'translateZ(45px)',
            zIndex: 3
          }}
        >
          <Sparkles size={13} color="#FFD700" />
          <span
            className="font-serif"
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#F5E6BE'
            }}
          >
            Ankur • Host & Edition Creator
          </span>
        </div>
      </div>
    </div>
  );
}
