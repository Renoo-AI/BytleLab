/**
 * Challenge Engine
 * Handles loading and validating challenges.
 */

export const engine = {
  _startTime: null,
  _attempts: 0,

  startChallenge() {
    this._startTime = Date.now();
    this._attempts = 0;
  },

  async loadChallenges() {
    const response = await fetch('/challenges/challenges.json');
    return await response.json();
  },

  async validateFlag(challengeId, flag) {
    this._attempts++;
    
    const challenges = await this.loadChallenges();
    const challenge = challenges.find(c => c.id === challengeId);

    if (!challenge) return false;

    const isValid = challenge.flag === flag;
    
    if (isValid) {
      await this._finalizeCompletion(challengeId);
    }
    
    return isValid;
  },

  async _finalizeCompletion(challengeId) {
    const { state, updateState } = await import('./state.js');
    if (!state.completed.includes(challengeId)) {
      const newCompleted = [...state.completed, challengeId];
      updateState('completed', newCompleted);
      updateState('xp', (state.xp || 0) + 100);
      updateState('level', (state.level || 0) + 1);
    }
  }
};
