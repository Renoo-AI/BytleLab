/**
 * Global State Management
 * Holds user progress, XP, levels, and current state.
 */

// Internal state that is not directly exported as a mutable object
let _state = {
  isAuthReady: false,
  isAuthenticated: false,
  user: null,
  appName: 'ByteLearn',
  settings: {},
  progress: {
    currentPathId: 'web-basics',
    paths: [
      { id: 'web-basics', title: 'Web Basics', status: 'in-progress', progress: 0, lessons: 12, difficulty: 'Easy', icon: 'language' },
      { id: 'input-tampering', title: 'Input Tampering', status: 'locked', progress: 0, lessons: 8, difficulty: 'Medium', icon: 'keyboard' },
      { id: 'file-discovery', title: 'File Discovery', status: 'locked', progress: 0, lessons: 15, difficulty: 'Medium', icon: 'folder_open' },
      { id: 'web-attacks', title: 'Web Attacks', status: 'locked', progress: 0, lessons: 24, difficulty: 'Hard', icon: 'security' }
    ]
  }
};

export const state = _state;

export function updateState(path, value) {
  const keys = path.split('.');
  let current = _state;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  document.dispatchEvent(new CustomEvent('stateChange', { detail: { path, value } }));
}

export function resetState(newState) {
  Object.assign(_state, newState);
}
