import React, { useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Share2,
  Copy,
  Check,
  Sparkles,
  Heart,
  RotateCcw,
  Edit3,
  Save
} from 'lucide-react';
import { getPersonalizedWish, diwaliQuotes } from '../data/wishesData';
import { playChimeSound } from '../utils/audioSynth';

export default function PersonalizedWishModal({ visitorName, onClose, onUpdateName }) {
  const [currentName, setCurrentName] = useState(visitorName || 'Friend');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editInputValue, setEditInputValue] = useState(visitorName || '');
  const [copied, setCopied] = useState(false);

  const wish = getPersonalizedWish(currentName);
  const quote = diwaliQuotes[0];

  const triggerCelebration = useCallback(() => {
    playChimeSound();

    const count = 220;
    const defaults = {
      origin: { y: 0.62 },
      colors: ['#F5E6BE', '#E5C07B', '#FF7B25', '#FF4D4D', '#FFFFFF', '#D4AF37', '#FFA040']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  useEffect(() => {
    triggerCelebration();

    // Close on Escape key press for accessibility
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerCelebration, onClose]);

  const handleSaveName = (e) => {
    e.preventDefault();
    const trimmed = editInputValue.trim();
    if (trimmed) {
      setCurrentName(trimmed);
      if (onUpdateName) onUpdateName(trimmed);
      setIsEditingName(false);
      triggerCelebration();
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🪔✨ *Happy Diwali!* ✨🪔\n\n` +
      `Here is a special Diwali blessing for *${wish.recipient}* from *Ankur*:\n\n` +
      `"${wish.message}"\n\n` +
      `_Diwali Wishes — Ankur Edition 1.0_\n` +
      `Wishing you joy, health, and prosperity! 🌟`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    const text =
      `🪔 Happy Diwali, ${wish.recipient}! 🪔\n\n` +
      `${wish.message}\n\n` +
      `— With heartfelt blessings from Ankur (Diwali Wishes — Ankur Edition 1.0)`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wish-card-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 1, 7, 0.86)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 60,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 36px) clamp(12px, 3vw, 20px)',
        perspective: '1200px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-luxury"
        style={{
          width: '100%',
          maxWidth: '680px',
          margin: 'auto',
          padding: 'clamp(24px, 4.5vw, 40px) clamp(16px, 4vw, 36px)',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(26, 7, 38, 0.94) 0%, rgba(14, 4, 22, 0.96) 100%)',
          border: '1.5px solid rgba(229, 192, 123, 0.38)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 45px rgba(229,184,66,0.14)',
          boxSizing: 'border-box',
          transform: 'translateZ(30px)',
          animation: 'flameAuraPulse 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top Header Actions: Replay & Close */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px'
          }}
        >
          {/* Replay Button */}
          <button
            onClick={triggerCelebration}
            aria-label="Replay greeting celebration and fireworks"
            style={{
              background: 'rgba(229, 184, 66, 0.12)',
              border: '1px solid rgba(229, 184, 66, 0.35)',
              borderRadius: '9999px',
              padding: '6px 15px',
              color: '#F5E6BE',
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(229,184,66,0.22)';
              e.currentTarget.style.borderColor = '#F5E6BE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(229, 184, 66, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(229, 184, 66, 0.35)';
            }}
          >
            <RotateCcw size={14} />
            <span>Replay Greeting 🎆</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close personalized wish card"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F5E6BE',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(229,184,66,0.25)';
              e.currentTarget.style.borderColor = '#F5E6BE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Card Header & Title */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#D4AF37',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            <Sparkles size={14} />
            <span>Auspicious Diwali Blessing</span>
          </div>

          <h2
            id="wish-card-title"
            className="font-serif text-gold-gradient"
            style={{
              fontSize: 'clamp(1.4rem, 4.2vw, 2.2rem)',
              lineHeight: 1.25,
              fontWeight: 800,
              wordBreak: 'break-word',
              padding: '0 4px'
            }}
          >
            {wish.title}
          </h2>

          {/* Name Editing Section */}
          <div style={{ marginTop: '10px' }}>
            {isEditingName ? (
              <form
                onSubmit={handleSaveName}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(229, 184, 66, 0.45)'
                }}
              >
                <input
                  type="text"
                  value={editInputValue}
                  onChange={(e) => setEditInputValue(e.target.value)}
                  placeholder="Enter name..."
                  maxLength={30}
                  autoFocus
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#F5E6BE',
                    fontSize: '0.9rem',
                    padding: '4px 8px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
                <button
                  type="submit"
                  aria-label="Save updated name"
                  style={{
                    background: '#D4AF37',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '5px 12px',
                    color: '#150800',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Save size={13} />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#D4C4DE',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setEditInputValue(currentName);
                  setIsEditingName(true);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#D4AF37',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  textDecoration: 'underline',
                  opacity: 0.88
                }}
              >
                <Edit3 size={13} />
                <span>Change Name</span>
              </button>
            )}
          </div>
        </div>

        {/* Sacred Sanskrit Shloka Box */}
        <div
          style={{
            background: 'rgba(229, 184, 66, 0.07)',
            border: '1px dashed rgba(229, 184, 66, 0.32)',
            borderRadius: '14px',
            padding: 'clamp(14px, 3vw, 18px)',
            marginBottom: '20px',
            textAlign: 'center'
          }}
        >
          <div
            className="font-serif"
            style={{
              fontSize: 'clamp(0.96rem, 2.5vw, 1.1rem)',
              color: '#F5E6BE',
              letterSpacing: '0.02em',
              lineHeight: 1.6,
              marginBottom: '6px'
            }}
          >
            {quote.shloka}
          </div>
          <div
            style={{
              fontSize: 'clamp(0.78rem, 2vw, 0.85rem)',
              color: '#D4C4DE',
              fontStyle: 'italic',
              lineHeight: 1.5
            }}
          >
            "{quote.meaning}" — {quote.source}
          </div>
        </div>

        {/* Personal Diwali Message */}
        <div
          style={{
            fontSize: 'clamp(0.94rem, 2vw, 1.02rem)',
            color: '#F4EEF8',
            lineHeight: 1.78,
            marginBottom: '22px',
            textAlign: 'left'
          }}
        >
          <p style={{ marginBottom: '16px' }}>{wish.message}</p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '16px clamp(12px, 3vw, 18px)',
              border: '1px solid rgba(229, 184, 66, 0.2)'
            }}
          >
            <div
              style={{
                fontSize: '0.82rem',
                color: '#F5E6BE',
                fontWeight: 600,
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Four Auspicious Blessings:
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {wish.highlights.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: 'clamp(0.86rem, 2vw, 0.94rem)',
                    color: '#EDE3F2',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    lineHeight: 1.5
                  }}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Signature & Seal of Ankur */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(229, 184, 66, 0.25)',
            paddingTop: '14px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.76rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Special Edition
            </div>
            <div style={{ fontSize: '0.88rem', color: '#FFF4D4', fontWeight: 600 }}>
              Ankur Edition 1.0
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F5E6BE' }}>
            <span style={{ fontSize: '0.88rem' }}>With love,</span>
            <span className="font-serif" style={{ fontSize: '1.08rem', fontWeight: 700, color: '#D4AF37' }}>
              Ankur
            </span>
            <Heart size={15} color="#FF7B25" fill="#FF7B25" />
          </div>
        </div>

        {/* Action Buttons: WhatsApp & Copy */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px'
          }}
        >
          <button
            onClick={handleShareWhatsApp}
            aria-label="Share Diwali wish on WhatsApp"
            style={{
              background: '#25D366',
              color: '#072513',
              fontWeight: 700,
              fontSize: '0.92rem',
              border: 'none',
              borderRadius: '9999px',
              padding: '13px 20px',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)',
              boxSizing: 'border-box'
            }}
          >
            <Share2 size={17} />
            <span>Share to WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            aria-label="Copy greeting text to clipboard"
            style={{
              background: 'rgba(229, 184, 66, 0.16)',
              color: '#F5E6BE',
              border: '1px solid rgba(229, 184, 66, 0.42)',
              fontWeight: 600,
              fontSize: '0.92rem',
              borderRadius: '9999px',
              padding: '13px 20px',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box'
            }}
          >
            {copied ? (
              <>
                <Check size={17} color="#6EE7B7" />
                <span style={{ color: '#6EE7B7' }}>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={17} />
                <span>Copy Greeting</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
