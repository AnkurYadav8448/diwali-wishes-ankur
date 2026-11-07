import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, ADMIN_UID, isFirebaseConfigured } from './config.js';

/**
 * Perform Google Sign-In via popup
 */
export async function signInWithGoogle() {
  if (!isFirebaseConfigured() || !auth || !googleProvider) {
    throw new Error(
      'Firebase is not yet configured. Please set your Firebase credentials in .env.local.'
    );
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. The Google popup was closed before completion.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error(
        `This domain is not authorized in Firebase Console. Go to Firebase Console -> Authentication -> Settings -> Authorized Domains and add 'localhost'.`
      );
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked by your browser. Please allow popups for this site.');
    }
    throw error;
  }
}

/**
 * Sign out current authenticated user
 */
export async function signOutUser() {
  if (!auth) return;
  await signOut(auth);
}

/**
 * Subscribe to Firebase authentication state changes
 */
export function subscribeToAuthState(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Strictly check whether the given user matches the configured Administrator UID
 */
export function isAuthorizedAdmin(user) {
  if (!user || !user.uid) return false;
  if (!ADMIN_UID || ADMIN_UID === 'PLACEHOLDER_SET_AFTER_FIRST_LOGIN') {
    return false;
  }
  return user.uid.trim() === ADMIN_UID.trim();
}
