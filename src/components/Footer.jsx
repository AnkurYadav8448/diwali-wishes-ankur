import React from 'react';
import { Sparkles, ArrowUp, Lock } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(229, 184, 66, 0.2)',
        padding: '36px 20px 48px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(6, 2, 10, 0.95) 100%)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container-diwali" style={{ maxWidth: '800px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '14px',
            color: '#F5E6BE'
          }}
        >
          <Sparkles size={16} color="#D4AF37" />
          <span className="font-serif" style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.04em' }}>
            Diwali Wishes — Ankur Edition 1.0
          </span>
          <Sparkles size={16} color="#D4AF37" />
        </div>

        <p
          style={{
            fontSize: '0.88rem',
            color: '#A994B6',
            maxWidth: '520px',
            margin: '0 auto 20px',
            lineHeight: 1.6
          }}
        >
          May the divine light of Deepavali illuminate your path with wisdom, peace, prosperity, and joy for you and your family.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(229, 184, 66, 0.3)',
              borderRadius: '9999px',
              padding: '8px 18px',
              color: '#F5E6BE',
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowUp size={14} />
            <span>Back to Top</span>
          </button>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              aria-label="Open Admin Authentication Portal"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(229, 184, 66, 0.2)',
                borderRadius: '9999px',
                padding: '8px 16px',
                color: '#D4AF37',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(229, 184, 66, 0.45)';
                e.currentTarget.style.color = '#F5E6BE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(229, 184, 66, 0.2)';
                e.currentTarget.style.color = '#D4AF37';
              }}
            >
              <Lock size={13} />
              <span>Admin Access</span>
            </button>
          )}
        </div>

        <div
          style={{
            marginTop: '28px',
            fontSize: '0.78rem',
            color: '#7C6789',
            letterSpacing: '0.04em'
          }}
        >
          Designed & Created with Warmth by Ankur • Happy Diwali
        </div>
      </div>
    </footer>
  );
}
