/**
 * LocalStorage Wrapper
 * Handles persistence of user state.
 */

const STORAGE_KEY = 'bytelearn_state';
const SECRET_SALT = 'bytelearn_v1_secure_salt_2024';

function sign(data) {
  const str = JSON.stringify(data);
  // Simple obfuscation/hashing for client-side integrity
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return btoa(hash.toString() + SECRET_SALT);
}

export const storage = {
  save(state) {
    try {
      const data = {
        payload: state,
        timestamp: Date.now(),
        signature: sign(state)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  },

  load() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) return null;
      
      const { payload, signature, timestamp } = JSON.parse(serialized);
      
      // 1. Expiration check (1 hour)
      if (Date.now() - timestamp > 3600000) {
        this.clear();
        return null;
      }

      // 2. Verify integrity
      if (sign(payload) !== signature) {
        console.warn('State integrity check failed. Resetting state.');
        this.clear();
        return null;
      }
      
      return payload;
    } catch (e) {
      console.error('Failed to load state:', e);
      return null;
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
