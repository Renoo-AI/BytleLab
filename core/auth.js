import { firebaseAuth, firestore } from './firebase.js';
import { updateState, state } from './state.js';
import { storage } from './storage.js';

export const auth = {
  // Initialize auth state
  init(onUserLoaded) {
    return firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        // Start listening to Firestore (Source of Truth)
        firestore.listenToUser(user.uid, (userData) => {
          updateState('user', userData);
          updateState('isAuthenticated', true);
          updateState('isAuthReady', true);
          if (onUserLoaded) onUserLoaded(userData);
        });

        // Ensure user document exists (one-time check)
        const existingData = await firestore.getUserData(user.uid);
        if (!existingData) {
          const newProfile = {
            uid: user.uid,
            name: user.displayName || 'Explorer',
            email: user.email,
            avatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
            rank: 'Junior Pentester',
            level: 1,
            xp: 0,
            flags: 0,
            completed: [],
            role: 'user',
            isPublic: true
          };
          await firestore.saveUserData(user.uid, newProfile);
        }
      } else {
        updateState('isAuthenticated', false);
        updateState('user', null);
        updateState('isAuthReady', true);
      }
    });
  },

  async loginWithGoogle() {
    try {
      await firebaseAuth.signInWithGoogle();
      return true;
    } catch (error) {
      console.error('Auth Error:', error);
      return false;
    }
  },

  async logout() {
    await firebaseAuth.logout();
    updateState('isAuthenticated', false);
    updateState('user', null);
    storage.clear();
  },

  async approvePCLogin(sessionId) {
    if (!state.isAuthenticated || !state.user) return false;
    try {
      const userData = JSON.parse(JSON.stringify(state.user));
      await firestore.approveSession(sessionId, state.user.uid, userData);
      return true;
    } catch (error) {
      console.error('Approval Error:', error);
      return false;
    }
  }
};
