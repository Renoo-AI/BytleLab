/**
 * Storage Layer
 * Handles persistence of application state.
 */

const STORAGE_KEY = 'bytelearn_state';

export const storage = {
  save(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  },

  load() {
    try {
      const serializedState = localStorage.getItem(STORAGE_KEY);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
      return undefined;
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
