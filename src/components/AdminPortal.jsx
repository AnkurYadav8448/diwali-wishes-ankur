import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  Copy,
  Check,
  LogOut,
  AlertCircle,
  Lock,
  Flame,
  RefreshCw,
  Trash2,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  signInWithGoogle,
  signOutUser,
  subscribeToAuthState,
  isAuthorizedAdmin
} from '../firebase/authService';
import {
  getVisitorEntries,
  removeVisitorEntry,
  formatToKolkataTime
} from '../firebase/visitorService';
import { isFirebaseConfigured } from '../firebase/config';

export default function AdminPortal({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedUid, setCopiedUid] = useState(false);

  // Visitor Management State
  const [visitors, setVisitors] = useState([]);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(false);
  const [visitorError, setVisitorError] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Cursor-based Pagination State (max 50 per query)
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Table Page Display State
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  const loadVisitors = useCallback(async () => {
    setIsLoadingVisitors(true);
    setVisitorError('');
    setCurrentPage(1);
    try {
      const result = await getVisitorEntries(null, 50);
      const list = Array.isArray(result) ? result : (result.entries || []);
      setVisitors(list);
      setLastDoc(result.lastDoc || null);
      setHasMore(Boolean(result.hasMore));
    } catch (err) {
      console.error('Error fetching visitor records:', err);
      setVisitorError(
        err.message || 'Unable to load visitor entries. Check Firestore permissions.'
      );
    } finally {
      setIsLoadingVisitors(false);
    }
  }, []);

  const handleLoadMore = async () => {
    if (!lastDoc || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const result = await getVisitorEntries(lastDoc, 50);
      const newEntries = Array.isArray(result) ? result : (result.entries || []);
      setVisitors((prev) => [...prev, ...newEntries]);
      setLastDoc(result.lastDoc || null);
      setHasMore(Boolean(result.hasMore));
    } catch (err) {
      setVisitorError(err.message || 'Failed to load additional records.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    setError('');
    const unsubscribe = subscribeToAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // If authorized admin, fetch visitor data
      if (currentUser && isAuthorizedAdmin(currentUser)) {
        loadVisitors();
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, loadVisitors]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError('');
    setActionLoading(true);
    try {
      const signedInUser = await signInWithGoogle();
      if (isAuthorizedAdmin(signedInUser)) {
        loadVisitors();
      }
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSignOut = async () => {
    setActionLoading(true);
    try {
      await signOutUser();
      setUser(null);
      setVisitors([]);
      setError('');
    } catch (err) {
      setError(err.message || 'Error signing out.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCopyUid = () => {
    if (!user?.uid) return;
    navigator.clipboard.writeText(user.uid).then(() => {
      setCopiedUid(true);
      setTimeout(() => setCopiedUid(false), 2400);
    });
  };

  const handleDelete = async (entryId) => {
    setIsDeleting(true);
    try {
      await removeVisitorEntry(entryId);
      setVisitors((prev) => prev.filter((v) => v.id !== entryId));
      setDeleteConfirmId(null);
    } catch (err) {
      setVisitorError(err.message || 'Failed to delete record.');
    } finally {
      setIsDeleting(false);
    }
  };

  const configured = isFirebaseConfigured();
  const isAdmin = isAuthorizedAdmin(user);

  // Pagination calculation
  const totalPages = Math.ceil(visitors.length / PAGE_SIZE) || 1;
  const paginatedVisitors = visitors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-portal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 1, 7, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 70,
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-luxury"
        style={{
          width: '100%',
          maxWidth: isAdmin ? '820px' : '560px',
          padding: 'clamp(22px, 4.5vw, 36px)',
          background: 'linear-gradient(180deg, #180727 0%, #0E0317 100%)',
          border: '1.5px solid rgba(229, 192, 123, 0.4)',
          boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 40px rgba(229, 184, 66, 0.15)',
          position: 'relative',
          boxSizing: 'border-box',
          transition: 'max-width 0.3s ease'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close admin authentication modal"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
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
            transition: 'all 0.2s ease',
            zIndex: 10
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

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              margin: '0 auto 10px',
              borderRadius: '50%',
              background: isAdmin
                ? 'radial-gradient(circle, #F5E6BE 0%, #D4AF37 55%, #755106 100%)'
                : 'radial-gradient(circle, rgba(229, 184, 66, 0.2) 0%, rgba(30, 8, 45, 0.8) 100%)',
              border: '1px solid rgba(229, 184, 66, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(229, 184, 66, 0.3)'
            }}
          >
            {isAdmin ? (
              <ShieldCheck size={26} color="#150800" />
            ) : user ? (
              <ShieldAlert size={26} color="#FF7B25" />
            ) : (
              <Lock size={22} color="#F5E6BE" />
            )}
          </div>

          <h2
            id="admin-portal-title"
            className="font-serif text-gold-gradient"
            style={{
              fontSize: 'clamp(1.35rem, 3.5vw, 1.8rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '4px'
            }}
          >
            {isAdmin ? 'Admin Visitor Management' : user ? 'Access Verification' : 'Admin Portal'}
          </h2>

          <div
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              opacity: 0.9
            }}
          >
            Diwali Wishes — Ankur Edition 1.0
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <Flame size={28} color="#FF7B25" className="animate-flame" />
            <p style={{ marginTop: '12px', fontSize: '0.88rem', color: '#D4C4DE' }}>
              Checking authentication session...
            </p>
          </div>
        )}

        {/* Error Alert Box */}
        {error && (
          <div
            style={{
              background: 'rgba(255, 60, 60, 0.12)',
              border: '1px solid rgba(255, 90, 90, 0.4)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              color: '#FFBABA',
              fontSize: '0.86rem',
              lineHeight: 1.5
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {/* STATE 1: Unauthenticated -> Google Sign-In */}
        {!loading && !user && (
          <div>
            <p
              style={{
                fontSize: '0.92rem',
                color: '#D4C4DE',
                textAlign: 'center',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}
            >
              Sign in with your authorized Google account to view and manage visitor entries for this edition.
            </p>

            <button
              onClick={handleGoogleSignIn}
              disabled={actionLoading || !configured}
              aria-label="Sign in with Google"
              style={{
                width: '100%',
                background: '#FFFFFF',
                color: '#1F2937',
                border: 'none',
                borderRadius: '9999px',
                padding: '13px 20px',
                fontSize: '0.96rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: !configured || actionLoading ? 'not-allowed' : 'pointer',
                opacity: !configured || actionLoading ? 0.6 : 1,
                boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
                transition: 'all 0.25s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span>{actionLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
            </button>

            <div
              style={{
                marginTop: '20px',
                textAlign: 'center',
                fontSize: '0.78rem',
                color: '#8A7A96'
              }}
            >
              🔒 Security: Access is strictly restricted to administrator UID: <code>kAyEZzqc3PPPVLE53awnCvg4wD62</code>.
            </div>
          </div>
        )}

        {/* STATE 2: Authenticated but NOT Authorized Admin */}
        {!loading && user && !isAdmin && (
          <div>
            <div
              style={{
                background: 'rgba(255, 123, 37, 0.1)',
                border: '1px solid rgba(255, 123, 37, 0.4)',
                borderRadius: '14px',
                padding: '16px',
                marginBottom: '20px',
                textAlign: 'left'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FFB834',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '8px'
                }}
              >
                <ShieldAlert size={18} />
                <span>Unauthorized Account (Access Denied)</span>
              </div>

              <p style={{ fontSize: '0.86rem', color: '#EDE3F2', lineHeight: 1.5, marginBottom: '12px' }}>
                You signed in with Google as <strong>{user.email}</strong>, but this account is not registered as the authorized administrator.
              </p>

              <div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: '#D4AF37',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '4px'
                  }}
                >
                  Your Firebase User UID:
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(0,0,0,0.4)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(229, 184, 66, 0.3)',
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    color: '#FFEAA7',
                    wordBreak: 'break-all'
                  }}
                >
                  <span>{user.uid}</span>
                  <button
                    onClick={handleCopyUid}
                    aria-label="Copy your Firebase user UID"
                    style={{
                      background: 'rgba(229, 184, 66, 0.15)',
                      border: '1px solid rgba(229, 184, 66, 0.4)',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      color: '#FFEAA7',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginLeft: '8px',
                      flexShrink: 0,
                      fontSize: '0.75rem'
                    }}
                  >
                    {copiedUid ? <Check size={12} color="#6EE7B7" /> : <Copy size={12} />}
                    <span>{copiedUid ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={actionLoading}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.08)',
                color: '#F5E6BE',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '9999px',
                padding: '12px 20px',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <LogOut size={16} />
              <span>{actionLoading ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </div>
        )}

        {/* STATE 3: Authorized Admin -> Full Visitor Management Dashboard */}
        {!loading && user && isAdmin && (
          <div>
            {/* Top Bar: Admin Info & Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                paddingBottom: '16px',
                marginBottom: '16px',
                borderBottom: '1px solid rgba(229, 184, 66, 0.22)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Admin'}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1.5px solid #D4AF37'
                    }}
                  />
                )}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 700, color: '#F5E6BE', fontSize: '0.94rem' }}>
                      {user.displayName || 'Ankur'}
                    </span>
                    <span
                      style={{
                        background: 'rgba(34, 197, 94, 0.2)',
                        border: '1px solid rgba(34, 197, 94, 0.5)',
                        borderRadius: '9999px',
                        padding: '1px 7px',
                        color: '#4ADE80',
                        fontSize: '0.68rem',
                        fontWeight: 700
                      }}
                    >
                      Admin
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#8A7A96' }}>{user.email}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={loadVisitors}
                  disabled={isLoadingVisitors}
                  aria-label="Refresh visitor records"
                  title="Refresh records"
                  style={{
                    background: 'rgba(229, 184, 66, 0.12)',
                    border: '1px solid rgba(229, 184, 66, 0.35)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    color: '#F5E6BE',
                    cursor: isLoadingVisitors ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <RefreshCw size={14} className={isLoadingVisitors ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleSignOut}
                  disabled={actionLoading}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    color: '#F5E6BE',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem'
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Total Count Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(229, 184, 66, 0.1)',
                  border: '1px solid rgba(229, 184, 66, 0.3)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  fontSize: '0.8rem',
                  color: '#F5E6BE'
                }}
              >
                <Users size={14} color="#D4AF37" />
                <span>
                  <strong>{visitors.length}</strong> Total Visitor Entries
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#8A7A96' }}>
                Timezone: Asia/Kolkata (IST)
              </div>
            </div>

            {/* Visitor Error Display */}
            {visitorError && (
              <div
                style={{
                  background: 'rgba(255, 60, 60, 0.12)',
                  border: '1px solid rgba(255, 90, 90, 0.35)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  marginBottom: '16px',
                  color: '#FFD2D2',
                  fontSize: '0.86rem',
                  lineHeight: 1.5
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <ShieldAlert size={20} color="#FF7B25" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#FFEAA7', marginBottom: '4px' }}>
                      Firestore Permission / Setup Notice
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      {visitorError}
                    </div>
                    {visitorError.includes('Missing or insufficient permissions') && (
                      <div
                        style={{
                          background: 'rgba(0,0,0,0.3)',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          border: '1px solid rgba(229,184,66,0.2)',
                          color: '#EDE3F2',
                          marginTop: '8px'
                        }}
                      >
                        <div style={{ fontWeight: 600, color: '#F5E6BE', marginBottom: '4px' }}>
                          How to activate access in Firebase Console:
                        </div>
                        <ol style={{ margin: '0', paddingLeft: '18px', lineHeight: 1.6 }}>
                          <li>Go to <strong>Firebase Console &rarr; diwali-wishes-ankur &rarr; Firestore Database &rarr; Rules</strong>.</li>
                          <li>Paste the contents of <code>firestore.rules</code> (specifying UID: <code>kAyEZzqc3PPPVLE53awnCvg4wD62</code>).</li>
                          <li>Click <strong>Publish</strong>. Once published, click <strong>Retry Fetch</strong> below.</li>
                        </ol>
                      </div>
                    )}
                    <button
                      onClick={loadVisitors}
                      disabled={isLoadingVisitors}
                      style={{
                        marginTop: '10px',
                        background: 'rgba(229, 184, 66, 0.2)',
                        border: '1px solid rgba(229, 184, 66, 0.5)',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        color: '#F5E6BE',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: isLoadingVisitors ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RefreshCw size={12} className={isLoadingVisitors ? 'animate-spin' : ''} />
                      <span>{isLoadingVisitors ? 'Checking...' : 'Retry Fetch'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Visitor Table / List */}
            {isLoadingVisitors ? (
              <div style={{ textAlign: 'center', padding: '36px 0' }}>
                <Flame size={24} color="#FF7B25" className="animate-flame" />
                <div style={{ marginTop: '10px', fontSize: '0.86rem', color: '#D4C4DE' }}>
                  Loading visitor entries...
                </div>
              </div>
            ) : visitors.length === 0 ? (
              /* Empty State */
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  background: 'rgba(0,0,0,0.25)',
                  borderRadius: '14px',
                  border: '1px dashed rgba(229, 184, 66, 0.25)'
                }}
              >
                <Sparkles size={32} color="#D4AF37" style={{ opacity: 0.7, marginBottom: '8px' }} />
                <h3 className="font-serif" style={{ color: '#F5E6BE', fontSize: '1.05rem', marginBottom: '6px' }}>
                  No Visitor Entries Yet
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#A994B6', maxWidth: '380px', margin: '0 auto' }}>
                  When visitors submit their name with consent on the landing page, their greetings will appear here in real time.
                </p>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '14px',
                    border: '1px solid rgba(229, 184, 66, 0.2)',
                    overflow: 'hidden'
                  }}
                >
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      textAlign: 'left',
                      fontSize: '0.86rem'
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: 'rgba(229, 184, 66, 0.08)',
                          borderBottom: '1px solid rgba(229, 184, 66, 0.2)',
                          color: '#F5E6BE'
                        }}
                      >
                        <th style={{ padding: '10px 14px', fontWeight: 600 }}>Visitor Name</th>
                        <th style={{ padding: '10px 14px', fontWeight: 600 }}>Visit Time (IST)</th>
                        <th style={{ padding: '10px 14px', fontWeight: 600, textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedVisitors.map((entry) => (
                        <tr
                          key={entry.id}
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                            transition: 'background 0.15s ease'
                          }}
                        >
                          <td style={{ padding: '12px 14px', color: '#FFFFFF', fontWeight: 600 }}>
                            {entry.name}
                          </td>
                          <td style={{ padding: '12px 14px', color: '#CDB9DC' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Calendar size={13} color="#D4AF37" />
                              <span>{formatToKolkataTime(entry.createdAt)}</span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                            {deleteConfirmId === entry.id ? (
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <button
                                  onClick={() => handleDelete(entry.id)}
                                  disabled={isDeleting}
                                  style={{
                                    background: '#DC2626',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                  }}
                                >
                                  {isDeleting ? 'Deleting...' : 'Confirm'}
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  disabled={isDeleting}
                                  style={{
                                    background: 'transparent',
                                    color: '#A994B6',
                                    border: 'none',
                                    padding: '4px',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(entry.id)}
                                aria-label={`Delete record for ${entry.name}`}
                                title="Delete entry"
                                style={{
                                  background: 'rgba(255, 60, 60, 0.12)',
                                  border: '1px solid rgba(255, 60, 60, 0.3)',
                                  borderRadius: '6px',
                                  padding: '5px 8px',
                                  color: '#FF8A8A',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '0.75rem',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <Trash2 size={13} />
                                <span>Delete</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '14px',
                      fontSize: '0.82rem',
                      color: '#CDB9DC'
                    }}
                  >
                    <span>
                      Page {currentPage} of {totalPages} ({visitors.length} total)
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        style={{
                          background: 'rgba(229, 184, 66, 0.1)',
                          border: '1px solid rgba(229, 184, 66, 0.3)',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          color: currentPage === 1 ? '#6B5878' : '#F5E6BE',
                          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        style={{
                          background: 'rgba(229, 184, 66, 0.1)',
                          border: '1px solid rgba(229, 184, 66, 0.3)',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          color: currentPage === totalPages ? '#6B5878' : '#F5E6BE',
                          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Cursor-based Firestore Pagination (Load next 50 using startAfter) */}
                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      style={{
                        background: 'rgba(229, 184, 66, 0.15)',
                        border: '1px solid rgba(229, 184, 66, 0.4)',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        color: '#F5E6BE',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: isLoadingMore ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <RefreshCw size={13} className={isLoadingMore ? 'animate-spin' : ''} />
                      <span>{isLoadingMore ? 'Fetching next 50...' : 'Load Next 50 Entries (startAfter)'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
