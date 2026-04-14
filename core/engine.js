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

  async getChallenge(challengeId) {
    const challenges = await this.loadChallenges();
    return challenges.find(c => c.id === challengeId);
  },

  async loadChallenges() {
    const { firestore } = await import('./firebase.js');
    return await firestore.getChallenges();
  },

  async validateFlag(challengeId, flag) {
    this._attempts++;
    
    const { state } = await import('./state.js');
    if (!state.isAuthenticated || !state.user) return false;

    // Progression check: Ensure previous level is completed
    const levels = [
      'web-basics-1', 'web-basics-2', 'web-basics-3',
      'input-tampering-1', 'input-tampering-2'
    ];
    const currentIndex = levels.indexOf(challengeId);
    if (currentIndex > 0) {
      const prevId = levels[currentIndex - 1];
      if (!state.user.completed?.includes(prevId)) {
        console.warn('Progression violation: Previous level not completed.');
        return false;
      }
    }

    const { auth } = await import('./firebase.js');
    const idToken = await auth.currentUser.getIdToken();

    try {
      const response = await fetch('/api/validate-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId, flag, idToken })
      });

      const result = await response.json();
      
      if (result.success) {
        this._finalizeCompletion(challengeId);
        return true;
      } else {
        console.error('Validation failed:', result.error);
        return false;
      }
    } catch (error) {
      console.error('API Error:', error);
      return false;
    }
  },

  _finalizeCompletion(challengeId) {
    // Local state will be updated by the Firestore listener automatically
    console.log(`Challenge ${challengeId} validated by backend.`);
  }
};
