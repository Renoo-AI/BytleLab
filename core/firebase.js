import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, updateDoc, getDoc, getDocFromServer, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();
export { analytics };

// Connection Test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
  }
}
if (typeof window !== 'undefined') {
  testConnection();
}

// Error Handling
export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Auth Helpers
export const firebaseAuth = {
  signInWithGoogle: () => signInWithPopup(auth, googleProvider),
  logout: () => signOut(auth),
  onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback)
};

// Firestore Helpers
export const firestore = {
  createSession: async (sessionId) => {
    const path = `sessions/${sessionId}`;
    try {
      await setDoc(doc(db, 'sessions', sessionId), {
        status: 'pending',
        userId: null,
        userData: null,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },
  
  listenToSession: (sessionId, callback) => {
    const path = `sessions/${sessionId}`;
    return onSnapshot(doc(db, 'sessions', sessionId), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  },
  
  approveSession: async (sessionId, userId, userData) => {
    const path = `sessions/${sessionId}`;
    try {
      await updateDoc(doc(db, 'sessions', sessionId), {
        status: 'approved',
        userId: userId,
        userData: userData // Pass user data to PC via session
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  deleteSession: async (sessionId) => {
    const path = `sessions/${sessionId}`;
    try {
      const { deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'sessions', sessionId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  getUserData: async (userId) => {
    const path = `users/${userId}`;
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  saveUserData: async (userId, data) => {
    const path = `users/${userId}`;
    try {
      await setDoc(doc(db, 'users', userId), data, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  submitChallenge: async (userId, challengeId, flag) => {
    const submissionId = `${userId}_${challengeId}`;
    try {
      await setDoc(doc(db, 'submissions', submissionId), {
        userId,
        challengeId,
        flag,
        timestamp: new Date().toISOString()
      });
      return true;
    } catch (error) {
      // If permission denied, it means the flag was wrong (per security rules)
      console.warn('Submission rejected by server validation:', error.message);
      return false;
    }
  },

  listenToUser: (userId, callback) => {
    const path = `users/${userId}`;
    return onSnapshot(doc(db, 'users', userId), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  },

  getLeaderboard: async (limitCount = 20) => {
    const path = 'users';
    try {
      const q = query(
        collection(db, 'users'),
        where('isPublic', '==', true),
        orderBy('xp', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },
  
  getSettings: async () => {
    const path = 'settings/global';
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'global'));
      return settingsDoc.exists() ? settingsDoc.data() : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  saveSettings: async (data) => {
    const path = 'settings/global';
    try {
      await setDoc(doc(db, 'settings', 'global'), data, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  listenToSettings: (callback) => {
    const path = 'settings/global';
    return onSnapshot(doc(db, 'settings', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  },

  getChallenges: async () => {
    const path = 'challenges';
    try {
      const q = query(collection(db, 'challenges'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  saveChallenge: async (challengeId, data) => {
    const path = `challenges/${challengeId}`;
    try {
      await setDoc(doc(db, 'challenges', challengeId), data, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  saveFlag: async (challengeId, flag) => {
    const path = `flags/${challengeId}`;
    try {
      await setDoc(doc(db, 'flags', challengeId), { challengeId, flag });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  getLevels: async () => {
    const path = 'levels';
    try {
      const q = query(collection(db, 'levels'), orderBy('world', 'asc'), orderBy('step', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  getLevel: async (levelId) => {
    const path = `levels/${levelId}`;
    try {
      const levelDoc = await getDoc(doc(db, 'levels', levelId));
      return levelDoc.exists() ? levelDoc.data() : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  saveLevel: async (levelId, data) => {
    const path = `levels/${levelId}`;
    try {
      await setDoc(doc(db, 'levels', levelId), data, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
};
