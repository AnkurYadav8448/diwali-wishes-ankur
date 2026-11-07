import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth, isFirebaseConfigured, ADMIN_UID } from './config.js';

const COLLECTION_NAME = 'visitorEntries';

/**
 * Submit a visitor entry with explicit consent and server timestamp.
 * Saves ONLY: name, consent: true, createdAt: serverTimestamp().
 * Never collects or stores email, phone, IP, or device data.
 */
export async function recordVisitorEntry(rawName, consent) {
  if (!consent) {
    throw new Error('Mandatory consent is required to submit your Diwali greeting.');
  }

  const normalizedName = (rawName || '').trim();
  if (!normalizedName) {
    throw new Error('Please enter a valid name.');
  }

  if (normalizedName.length > 40) {
    throw new Error('Name cannot exceed 40 characters.');
  }

  if (!isFirebaseConfigured() || !db) {
    // If Firebase is offline/unconfigured, return gracefully for the greeting modal
    return {
      id: 'local-' + Date.now(),
      name: normalizedName,
      consent: true,
      createdAt: new Date(),
      offline: true
    };
  }

  const payload = {
    name: normalizedName,
    consent: true,
    createdAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
  return {
    id: docRef.id,
    name: normalizedName,
    consent: true,
    offline: false
  };
}

/**
 * Helper to ensure the current authenticated user's token is synchronized
 * with Firestore's internal auth listener prior to querying.
 */
async function syncAuthToken() {
  if (auth?.currentUser) {
    try {
      await auth.currentUser.getIdToken(false);
    } catch {
      // Ignore background sync errors
    }
  }
}

/**
 * Fetch visitor entries for the admin dashboard.
 * - Collection: visitorEntries
 * - Order: createdAt descending
 * - Explicit limit: 50 records
 * - Pagination: supports startAfterDoc
 */
export async function getVisitorEntries(startAfterDoc = null, limitCount = 50) {
  if (!isFirebaseConfigured() || !db) {
    return { entries: [], lastDoc: null, hasMore: false };
  }

  // Pre-synchronize Auth token to prevent race conditions immediately after sign-in
  await syncAuthToken();

  const buildQuery = (cursor) => {
    if (cursor) {
      return query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc'),
        startAfter(cursor),
        limit(limitCount)
      );
    }
    return query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
  };

  const executeQuery = async (q) => {
    const snapshot = await getDocs(q);
    const entries = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      entries.push({
        id: docSnap.id,
        name: data.name || 'Anonymous',
        consent: Boolean(data.consent),
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt ? new Date(data.createdAt) : null)
      });
    });

    const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
    const hasMore = snapshot.docs.length === limitCount;

    return { entries, lastDoc, hasMore };
  };

  const currentQ = buildQuery(startAfterDoc);

  try {
    return await executeQuery(currentQ);
  } catch (err) {
    // If permission-denied right after Google Sign-In, retry once after a short delay
    // to give Firestore's WebChannel stream time to attach the token.
    if (err.code === 'permission-denied') {
      const isConfiguredAdmin = auth?.currentUser?.uid === ADMIN_UID;
      if (isConfiguredAdmin) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        await syncAuthToken();
        try {
          return await executeQuery(currentQ);
        } catch (retryErr) {
          throw new Error(
            'Missing or insufficient permissions. The security rules in Firebase Console have not been published yet or did not match Admin UID: ' + ADMIN_UID
          );
        }
      } else {
        throw new Error('Access denied. You are not authorized to view visitor records.');
      }
    }
    throw err;
  }
}

/**
 * Delete a visitor entry (Admin privilege only).
 */
export async function removeVisitorEntry(entryId) {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase database is not connected.');
  }

  if (!auth?.currentUser || auth.currentUser.uid !== ADMIN_UID) {
    throw new Error('Unauthorized: Only the verified administrator can delete records.');
  }

  await syncAuthToken();

  try {
    await deleteDoc(doc(db, COLLECTION_NAME, entryId));
  } catch (err) {
    if (err.code === 'permission-denied') {
      throw new Error(
        'Permission denied: Deletion restricted by Firestore Security Rules. Ensure rules are published in Firebase Console.'
      );
    }
    throw err;
  }
}

/**
 * Format a Date to Asia/Kolkata (Indian Standard Time).
 */
export function formatToKolkataTime(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return 'Just now';
  }

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
}
