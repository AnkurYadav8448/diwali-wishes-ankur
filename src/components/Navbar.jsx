import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Lock } from 'lucide-react';
import { toggleAmbientMusic } from '../utils/audioSynth';

export default function Navbar({ onOpenAdmin }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleAudioToggle = () => {
    const newState = toggleAmbientMusic();
    setIsPlayingMusic(newState);
  };

  return (
    <header
      style={{
        padding: '22px 16px 12px',
        position: 'relative',
        zIndex: 20
      }}
    >
      <div
        className="container-diwali"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              minWidth: '38px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #F5E6BE 0%, #D4AF37 55%, #755106 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(229, 184, 66, 0.45)'
            }}
          >
            <Sparkles size={20} color="#150800" />
          </div>
          <div>
            <div
              className="font-serif"
              style={{
                fontSize: 'clamp(0.96rem, 2.8vw, 1.06rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#F5E6BE',
                lineHeight: 1.2
              }}
            >
              Diwali Wishes
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                opacity: 0.9
              }}
            >
              Ankur Edition 1.0
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Ambient Music Button */}
          <button
            onClick={handleAudioToggle}
            aria-label={isPlayingMusic ? 'Mute festive ambient audio' : 'Play festive ambient audio'}
            style={{
              background: isPlayingMusic ? 'rgba(229, 184, 66, 0.22)' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid',
              borderColor: isPlayingMusic ? 'rgba(229, 184, 66, 0.5)' : 'rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              padding: '7px 15px',
              minHeight: '38px',
              color: isPlayingMusic ? '#F5E6BE' : '#D5C7DD',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: 'clamp(0.78rem, 2vw, 0.84rem)',
              transition: 'all 0.25s ease'
            }}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 size={15} color="#F5E6BE" className="animate-pulse" />
                <span>Audio: On</span>
              </>
            ) : (
              <>
                <VolumeX size={15} />
                <span>Festive Audio</span>
              </>
            )}
          </button>

          {/* Discreet Admin Lock Button */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              aria-label="Open Admin Authentication Portal"
              title="Admin Portal"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(229, 184, 66, 0.25)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(229, 184, 66, 0.2)';
                e.currentTarget.style.borderColor = '#F5E6BE';
                e.currentTarget.style.color = '#F5E6BE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(229, 184, 66, 0.25)';
                e.currentTarget.style.color = '#D4AF37';
              }}
            >
              <Lock size={15} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
