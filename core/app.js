import { state, updateState, resetState } from './state.js';
import { storage } from './storage.js';
import { Router } from './router.js';
import { auth } from './auth.js';
import { firestore } from './firebase.js';

// Pages
import { Home } from '../pages/home.js';
import { Paths } from '../pages/paths.js';
import { Profile } from '../pages/profile.js';
import { BoltPage } from '../pages/bolt-page.js';
import { Splash } from '../pages/splash.js';
import { QRLogin } from '../pages/qr-login.js';
import { Login } from '../pages/login.js';
import { Signup } from '../pages/signup.js';
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
  '/paths': () => new Paths(),
  '/profile': () => new Profile(),
  '/bolt': () => new BoltPage(),
  '/splash': () => new Splash(),
  '/qr-login': () => new QRLogin(),
  '/login': () => new Login(),
  '/signup': () => new Signup(),
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
    // Auth initialized
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
      router.navigate('/qr-login');
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
        alert('Authorization Successful!');
      } else {
        alert('Authorization failed.');
      }
    }
  });

  // 7. UI Sync
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

  // 8. Challenge Communication
  window.addEventListener('message', (e) => {
    if (e.origin !== window.location.origin) return;
    const { type, payload } = e.data;
    if (type === 'challenge_complete') {
      import('./engine.js').then(({ engine }) => {
        engine.validateFlag(payload.id, payload.flag);
      });
    }
  });

  updateGlobalUI();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function updateGlobalUI() {
  const statsContainers = document.querySelectorAll('.user-stats');
  const avatarContainers = document.querySelectorAll('.user-avatar-container');
  const appNameElements = document.querySelectorAll('.app-name');
  
  const bottomNav = document.getElementById('phone-nav');
  const sideNav = document.getElementById('pc-nav');
  const topBar = document.getElementById('app-top-bar');

  // Update App Name
  appNameElements.forEach(el => {
    el.textContent = state.appName;
  });

  // Hide/Show Shell UI based on route
  const hiddenOn = ['/splash', '/login', '/signup', '/qr-login', '/onboarding', '/scan', '/creator-super-banana-private123012'];
  const isHidden = hiddenOn.includes(window.location.pathname);
  
  if (bottomNav) bottomNav.style.display = isHidden ? 'none' : 'flex';
  if (sideNav) sideNav.style.display = isHidden ? 'none' : 'flex';
  if (topBar) topBar.style.display = isHidden ? 'none' : 'flex';

  avatarContainers.forEach(container => {
    if (state.user) {
      container.innerHTML = `<img src="${state.user.avatar}" alt="User Profile" class="w-full h-full object-cover">`;
    } else {
      container.innerHTML = '';
    }
  });

  statsContainers.forEach(container => {
    container.textContent = state.isAuthenticated ? `${state.user.level} LVL • ${state.user.xp} XP` : '';
  });
}
