/**
 * Global State Management
 * Holds user progress, XP, levels, and current state.
 */

// Internal state that is not directly exported as a mutable object
let _state = {
  isAuthenticated: false,
  user: null,
  completed: [],
  progress: {
    currentPath: 'Web Basics',
    paths: [
      { id: 'web-basics', title: 'Web Basics', status: 'in-progress', progress: 0, lessons: 12, difficulty: 'Easy', icon: 'language' },
      { id: 'input-tampering', title: 'Input Tampering', status: 'locked', progress: 0, lessons: 8, difficulty: 'Medium', icon: 'keyboard' },
      { id: 'file-discovery', title: 'File Discovery', status: 'locked', progress: 0, lessons: 15, difficulty: 'Medium', icon: 'folder_open' },
      { id: 'web-attacks', title: 'Web Attacks', status: 'locked', progress: 0, lessons: 24, difficulty: 'Hard', icon: 'security' }
    ]
  },
  settings: {
    theme: 'light',
    notifications: true
  }
};

// Export a read-only proxy of the state to prevent direct mutation
export const state = new Proxy(_state, {
  get: (target, prop) => {
    return target[prop];
  },
  set: () => {
    console.error('Direct state mutation is forbidden. Use updateState().');
    return false;
  }
});

export function updateState(path, value) {
  const keys = path.split('.');
  let current = _state;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  
  const lastKey = keys[keys.length - 1];
  
  // Basic validation
  if (path === 'completed' && !Array.isArray(value)) return;

  // Only update if value changed to prevent loops
  if (JSON.stringify(current[lastKey]) === JSON.stringify(value)) return;

  current[lastKey] = value;
  
  document.dispatchEvent(new CustomEvent('stateChange', { detail: { path, value } }));
}

export function resetState(newState) {
  if (newState) {
    _state = { ..._state, ...newState };
  }
}
