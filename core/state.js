/**
 * Global State Management
 * Simple reactive state container with deep proxy protection.
 */

const DEFAULT_STATE = {
  user: {
    name: 'ByteLearner',
    email: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=local'
  },
  isAuthenticated: false,
  completed: [],
  level: 1,
  xp: 0,
  streak: 0
};

function createDeepProxy(obj, onChange) {
  const handler = {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (value !== null && typeof value === 'object') {
        return createDeepProxy(value, onChange);
      }
      return value;
    },
    set(target, property, value, receiver) {
      const oldValue = target[property];
      if (oldValue !== value) {
        const result = Reflect.set(target, property, value, receiver);
        onChange();
        return result;
      }
      return true;
    }
  };
  return new Proxy(obj, handler);
}

// Initial state load
let internalState = { ...DEFAULT_STATE };
try {
  const saved = localStorage.getItem('bytelearn_state');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Merge with defaults to ensure all keys exist
    internalState = { ...DEFAULT_STATE, ...parsed };
    // Ensure nested objects are also merged
    if (parsed.user) internalState.user = { ...DEFAULT_STATE.user, ...parsed.user };
    if (!Array.isArray(internalState.completed)) internalState.completed = [];
  }
} catch (e) {
  console.warn('Failed to load state, using defaults');
}

export const state = createDeepProxy(internalState, () => {
  localStorage.setItem('bytelearn_state', JSON.stringify(internalState));
  // Emit event for reactivity
  document.dispatchEvent(new CustomEvent('stateChange', { detail: { state: internalState } }));
});

/**
 * Resets state to defaults (logout)
 */
export function logout() {
  Object.keys(internalState).forEach(key => {
    internalState[key] = DEFAULT_STATE[key];
  });
  localStorage.removeItem('bytelearn_state');
  window.location.href = '/splash';
}

/**
 * Updates multiple state properties at once
 */
export function setState(newState) {
  Object.assign(internalState, newState);
  localStorage.setItem('bytelearn_state', JSON.stringify(internalState));
  document.dispatchEvent(new CustomEvent('stateChange', { detail: { state: internalState } }));
}

/**
 * Update single path in state
 */
export function updateState(path, value) {
  const parts = path.split('.');
  let current = internalState;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
  localStorage.setItem('bytelearn_state', JSON.stringify(internalState));
  document.dispatchEvent(new CustomEvent('stateChange', { detail: { state: internalState } }));
}
