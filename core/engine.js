/**
 * Challenge Engine
 * Handles loading and validating challenges.
 */

export const engine = {
  _startTime: null,
  _attempts: 0,

  startChallenge(challengeId) {
    this._startTime = Date.now();
    this._attempts = 0;
    console.log(`Challenge ${challengeId} started.`);
  },

  async loadChallenges() {
    const response = await fetch('/challenges/challenges.json');
    return await response.json();
  },

  async validateFlag(challengeId, flag) {
    this._attempts++;
    
    // Use a non-global way to get user ID
    const { state } = await import('./state.js');
    if (!state.isAuthenticated || !state.user) return false;

    // Server-side validation simulation via Firestore Submissions
    const { firestore } = await import('./firebase.js');
    const isValid = await firestore.submitChallenge(state.user.uid, challengeId, flag);
    
    if (isValid) {
      this._finalizeCompletion(challengeId);
    }
    
    return isValid;
  },

  _finalizeCompletion(challengeId) {
    const duration = (Date.now() - this._startTime) / 1000;
    
    // Anti-cheat: If solved in less than 2 seconds, it's suspicious
    if (duration < 2) {
      console.warn('Suspiciously fast completion detected.');
    }

    // Update local state (Firestore listener will also sync this)
    import('./state.js').then(({ state }) => {
      if (!state.completed.includes(challengeId)) {
        const newCompleted = [...state.completed, challengeId];
        const newXp = state.user.xp + 100;
        const newFlags = state.user.flags + 1;
        
        // Update Firestore (Source of Truth)
        import('./firebase.js').then(({ firestore }) => {
          firestore.saveUserData(state.user.uid, {
            completed: newCompleted,
            xp: newXp,
            flags: newFlags
          });
        });
      }
    });
  }
};
