import { state, updateState, resetState } from '../core/state.js';
import { storage } from '../core/storage.js';
import { Router } from '../core/router.js';
import { auth } from '../core/auth.js';
import { firestore } from '../core/firebase.js';

// Pages (Mobile Specific or Shared)
import { Home } from '../pages/home.js';
import { Profile } from '../pages/profile.js';
import { Login } from '../pages/login.js';
import { Signup } from '../pages/signup.js';
import { Splash } from '../pages/splash.js';
import { Challenge } from '../pages/challenge.js';
import { Practice } from '../pages/practice.js';
import { Onboarding } from '../pages/onboarding.js';
import { Settings } from '../pages/settings.js';
import { Upgrade } from '../pages/upgrade.js';
import { Scan } from '../pages/scan.js';
import { Admin } from '../pages/admin.js';
import { Level } from '../pages/level.js';

const routes = {
  '/': () => new Home(),
  '/profile': () => new Profile(),
  '/login': () => new Login(),
  '/signup': () => new Signup(),
  '/splash': () => new Splash(),
  '/challenge/:id': (params) => new Challenge(params),
  '/practice': () => new Practice(),
  '/onboarding': () => new Onboarding(),
  '/settings': () => new Settings(),
  '/upgrade': () => new Upgrade(),
  '/scan': () => new Scan(),
  '/levels/:world/:step': (params) => new Level(params),
  '/creator-super-banana-private123012': () => new Admin(),
};

const init = () => {
  // 1. Initialize State
  const savedState = storage.load();
  if (savedState) resetState(savedState);

  // 2. Initialize Router
  const router = new Router(routes, 'main-content');
  window.app = { router };

  // 3. Handle Initial Navigation
  router.init();

  // 4. Initialize Auth
  auth.init(() => {
    // No need for manual redirect here, router handles it via isAuthReady
  });

  // 5. Initialize Settings Sync
  firestore.listenToSettings((settings) => {
    if (settings.appName) updateState('appName', settings.appName);
    updateState('settings', settings);
  });

  // 6. Global App Methods
  Object.assign(window.app, {
    loginWithGoogle: async () => {
      await auth.loginWithGoogle();
    },
    onLoginSuccess: (userId, userData) => {
      updateState('isAuthenticated', true);
      updateState('user', userData);
      router.navigate('/');
    },
    logout: async () => {
      await auth.logout();
      router.navigate('/login');
    },
    bypassLogin: () => {
      const mockUser = {
        uid: 'guest_' + Math.random().toString(36).substring(7),
        name: 'Guest Explorer',
        email: 'guest@bytelearn.io',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
        level: 1,
        xp: 0,
        flags: 0,
        rank: 'Novice',
        completedChallenges: []
      };
      updateState('isAuthenticated', true);
      updateState('user', mockUser);
      router.navigate('/');
    },
    approveSession: async (sessionId) => {
      const success = await auth.approvePCLogin(sessionId);
      if (success) {
        alert('PC Authorization Successful!');
      } else {
        alert('Authorization failed. Please check the session ID.');
      }
    }
  });

  // 6. UI Sync
  document.addEventListener('stateChange', (e) => {
    storage.save(state);
    updateGlobalUI();
    if (e.detail && e.detail.path === 'isAuthReady' && e.detail.value === true) {
      router.update();
    }
  });

  document.addEventListener('routeChange', () => {
    updateGlobalUI();
  });

  updateGlobalUI();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function updateGlobalUI() {
  const statsContainer = document.getElementById('user-stats');
  const bottomNav = document.querySelector('nav');
  const topBar = document.querySelector('header');
  const appNameElements = document.querySelectorAll('.app-name');

  // Update App Name
  appNameElements.forEach(el => {
    el.textContent = state.appName;
  });

  const hiddenOn = ['/splash', '/login', '/signup', '/onboarding', '/scan', '/creator-super-banana-private123012'];
  const isHidden = hiddenOn.includes(window.location.pathname);
  
  if (bottomNav) bottomNav.style.display = isHidden ? 'none' : 'flex';
  if (topBar) topBar.style.display = isHidden ? 'none' : 'flex';

  if (statsContainer) {
    statsContainer.textContent = state.isAuthenticated ? `${state.user.level} LVL • ${state.user.xp} XP` : '';
  }
}
