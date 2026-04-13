import { updateState, state } from './state.js';

export const auth = {
  init(onUserLoaded) {
    if (state.isAuthenticated && state.user) {
      if (onUserLoaded) onUserLoaded(state.user);
    }
  },

  async loginWithGoogle() {
    const mockUser = {
      uid: 'local-user',
      name: 'Local Explorer',
      email: 'explorer@bytelearn.local',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=local',
      rank: 'Junior Pentester',
      level: 1,
      xp: 0,
      flags: 0,
      completed: [],
      role: 'user'
    };

    updateState('user', mockUser);
    updateState('isAuthenticated', true);
    return true;
  },

  async logout() {
    updateState('isAuthenticated', false);
    updateState('user', null);
    updateState('completed', []);
    updateState('xp', 0);
    updateState('level', 0);
  },

  async approvePCLogin() {
    return true;
  }
};
