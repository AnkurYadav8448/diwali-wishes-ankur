import React, { useState } from 'react';
import { ArrowRight, Sparkles, User, CheckSquare, Square, AlertCircle, Loader2 } from 'lucide-react';
import { playChimeSound } from '../utils/audioSynth';
import { recordVisitorEntry } from '../firebase/visitorService';

export default function VisitorForm({ onContinue }) {
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name to unlock your personalized wish.');
      return;
    }

    if (trimmed.length > 40) {
      setError('Name cannot exceed 40 characters.');
      return;
    }

    if (!consent) {
      setError('Please check the consent box below to record your greeting.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      // Record visitor entry to Cloud Firestore collection: visitorEntries
      await recordVisitorEntry(trimmed, consent);
      playChimeSound();
      onContinue(trimmed);
    } catch (err) {
      console.error('Visitor submission error:', err);
      // If Firestore blocks due to offline/permission, display actionable error
      setError(err.message || 'Unable to record your greeting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="visitor-name-section"
      style={{
        padding: '10px 16px 50px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container-diwali" style={{ maxWidth: '640px' }}>
        <div
          className="card-luxury"
          style={{
            padding: 'clamp(24px, 5vw, 38px) clamp(16px, 4vw, 32px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Subtle gold corner accents */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              width: '18px',
              height: '18px',
              borderTop: '2px solid #E5C07B',
              borderLeft: '2px solid #E5C07B'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '18px',
              height: '18px',
              borderTop: '2px solid #E5C07B',
              borderRight: '2px solid #E5C07B'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              width: '18px',
              height: '18px',
              borderBottom: '2px solid #E5C07B',
              borderLeft: '2px solid #E5C07B'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              width: '18px',
              height: '18px',
              borderBottom: '2px solid #E5C07B',
              borderRight: '2px solid #E5C07B'
            }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(229, 184, 66, 0.12)',
              border: '1px solid rgba(229, 184, 66, 0.35)',
              marginBottom: '14px',
              color: '#F5E6BE'
            }}
          >
            <User size={22} />
          </div>

          <h3
            className="font-serif"
            style={{
              fontSize: 'clamp(1.22rem, 3.2vw, 1.62rem)',
              color: '#F5E6BE',
              marginBottom: '8px',
              fontWeight: 700,
              lineHeight: 1.3
            }}
          >
            Unlock Your Personalized Diwali Blessing
          </h3>

          <p
            style={{
              fontSize: 'clamp(0.88rem, 2vw, 0.95rem)',
              color: '#D4C4DE',
              marginBottom: '24px',
              lineHeight: 1.6
            }}
          >
            Enter your name below so Ankur can send you a dedicated festive card and personalized wishes for the year ahead.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ position: 'relative', marginBottom: '16px', textAlign: 'left' }}>
              <label
                htmlFor="visitor-name-input"
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#F5E6BE',
                  marginBottom: '8px',
                  letterSpacing: '0.04em'
                }}
              >
                YOUR FULL NAME OR NICKNAME (MAX 40 CHARS)
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  id="visitor-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isSubmitting}
                  placeholder="e.g. Priyanshu, Tanya, Rohan..."
                  maxLength={40}
                  autoComplete="name"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    borderRadius: '12px',
                    border: error ? '1.5px solid #FF5C5C' : '1.5px solid rgba(229, 184, 66, 0.32)',
                    background: 'rgba(12, 3, 20, 0.75)',
                    color: '#FFF6E0',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#F5E6BE';
                    e.currentTarget.style.boxShadow =
                      '0 0 16px rgba(229, 184, 66, 0.35), inset 0 2px 4px rgba(0,0,0,0.6)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = error
                      ? '#FF5C5C'
                      : 'rgba(229, 184, 66, 0.32)';
                    e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.6)';
                  }}
                />
                <Sparkles
                  size={18}
                  color="#E5C07B"
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0.8
                  }}
                />
              </div>
            </div>

            {/* Explicit Mandatory Consent Checkbox */}
            <div
              style={{
                marginBottom: '20px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={() => {
                setConsent(!consent);
                if (error) setError('');
              }}
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={consent}
                aria-label="Consent to submit name for Diwali greeting"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '2px 0 0 0',
                  color: consent ? '#E5C07B' : '#7C6789',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {consent ? <CheckSquare size={20} /> : <Square size={20} />}
              </button>
              <label
                style={{
                  fontSize: '0.84rem',
                  color: consent ? '#F5E6BE' : '#A994B6',
                  lineHeight: 1.5,
                  cursor: 'pointer'
                }}
              >
                I consent to record my name in the visitor guestbook for Diwali Wishes — Ankur Edition 1.0. (Firestore stores strictly your name, consent, and server timestamp. The application stores no email, phone, or tracking data. GitHub Pages processes standard hosting access and security logs).
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  color: '#FF7373',
                  fontSize: '0.84rem',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textAlign: 'left',
                  background: 'rgba(255, 60, 60, 0.12)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 100, 100, 0.3)'
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold-primary"
              style={{
                width: '100%',
                padding: '15px 20px',
                fontSize: 'clamp(0.92rem, 2.2vw, 1.02rem)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                boxSizing: 'border-box'
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Recording Blessing...</span>
                </>
              ) : (
                <>
                  <span>Continue to Your Diwali Wish</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
