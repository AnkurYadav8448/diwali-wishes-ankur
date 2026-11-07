import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Safe environment variable resolution across Vite and Node test runners
const env = (typeof import.meta !== 'undefined' && import.meta.env)
  ? import.meta.env
  : (typeof process !== 'undefined' && process.env ? process.env : {});

// Verified Firebase Project Configuration for Diwali Wishes (diwali-wishes-ankur)
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyChTFwBavAI2PH03wkR6TBlNWux0w6dwoo',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'diwali-wishes-ankur.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'diwali-wishes-ankur',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'diwali-wishes-ankur.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '776575298445',
  appId: env.VITE_FIREBASE_APP_ID || '1:776575298445:web:438c91dafa6acaf2946bc4'
};

export const ADMIN_UID = env.VITE_ADMIN_UID || 'kAyEZzqc3PPPVLE53awnCvg4wD62';

/**
 * Check whether valid Firebase credentials have been configured
 */
export const isFirebaseConfigured = () => {
  return (
    Boolean(firebaseConfig.apiKey) &&
    firebaseConfig.apiKey !== 'your_firebase_api_key_here' &&
    Boolean(firebaseConfig.projectId)
  );
};

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  } catch (err) {
    console.error('Firebase initialization error for diwali-wishes-ankur:', err);
  }
}

export { app, auth, db, googleProvider };
