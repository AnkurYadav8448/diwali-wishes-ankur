import React from 'react';
import { Sparkles, Heart, Flame } from 'lucide-react';
import DiyaCard from './DiyaCard';
import AnkurPortrait from './AnkurPortrait';

export default function HeroSection({ onDiyaClick }) {
  const scrollToDiya = () => {
    const diyaElem = document.getElementById('diya-experience-section');
    if (diyaElem) {
      diyaElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        textAlign: 'center',
        padding: 'clamp(20px, 4vw, 36px) 16px 20px',
        position: 'relative',
        zIndex: 10,
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container-diwali" style={{ maxWidth: '860px' }}>
        {/* Cinematic Festive Top Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(229, 184, 66, 0.08)',
            border: '1px solid rgba(229, 184, 66, 0.28)',
            borderRadius: '9999px',
            padding: '7px 22px',
            marginBottom: '16px',
            fontSize: '0.82rem',
            color: '#F5E6BE',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
          }}
        >
          <Sparkles size={14} color="#D4AF37" />
          <span>Shubh Deepavali • शुभ दीपावली</span>
        </div>

        {/* Large Elegant Hero Headline */}
        <h1
          className="font-display text-gold-gradient"
          style={{
            fontSize: 'clamp(2.1rem, 5.6vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.16,
            marginBottom: '14px',
            letterSpacing: '0.02em',
            padding: '0 8px'
          }}
        >
          A Festival of Light & Happiness
        </h1>

        {/* Subtitle */}
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(1.1rem, 2.6vw, 1.55rem)',
            color: '#F5E6BE',
            fontWeight: 600,
            marginBottom: '26px',
            letterSpacing: '0.03em'
          }}
        >
          A Special Diwali Wish from Ankur
        </h2>

        {/* Section 3: Ankur's Royal 3D Medallion Portrait */}
        <AnkurPortrait />

        {/* Heartfelt intro letter card (with signature fully visible) */}
        <div
          className="card-luxury"
          style={{
            padding: 'clamp(22px, 4vw, 32px)',
            margin: '0 auto 12px',
            maxWidth: '680px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 5
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
              lineHeight: 1.8,
              color: '#EDE3F2',
              fontWeight: 400
            }}
          >
            "On this sacred occasion of lights, may our hearts be filled with compassion,
            our homes with laughter, and every step forward illuminated by joy and prosperity.
            This edition was crafted with deep warmth to share heartfelt blessings with you and your loved ones."
          </p>

          {/* Signature: Warmly, ANKUR ❤️ */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '18px',
              color: '#D4AF37',
              fontSize: '0.96rem',
              fontWeight: 600
            }}
          >
            <span>Warmly,</span>
            <span
              className="font-serif"
              style={{
                fontSize: '1.12rem',
                color: '#F5E6BE',
                fontWeight: 700,
                borderBottom: '1.5px solid rgba(229,184,66,0.6)',
                paddingBottom: '2px',
                letterSpacing: '0.06em'
              }}
            >
              ANKUR
            </span>
            <Heart size={16} color="#FF7B25" fill="#FF7B25" />
          </div>
        </div>

        {/* Cinematic Call to Action: Scroll to 3D Diya & Blessings */}
        <div style={{ marginTop: '20px', marginBottom: '8px' }}>
          <button
            onClick={scrollToDiya}
            className="btn-gold-primary"
            style={{ fontSize: '0.94rem' }}
            aria-label="Proceed to 3D Diya Experience and unlock greetings"
          >
            <Flame size={16} color="#FF7B25" />
            <span>Kindle the Sacred Light</span>
            <Sparkles size={16} />
          </button>
        </div>

        {/* Section 2: 3D Diya Experience (with Layered 3D Lotus Rangoli) */}
        <div id="diya-experience-section">
          <DiyaCard onDiyaClick={onDiyaClick} />
        </div>
      </div>
    </section>
  );
}
