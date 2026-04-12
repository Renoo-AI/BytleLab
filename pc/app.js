import { state, updateState, resetState } from '../core/state.js';
import { storage } from '../core/storage.js';
import { Router } from '../core/router.js';
import { auth } from '../core/auth.js';

// Pages
import { Home } from '../pages/home.js';
import { Paths } from '../pages/paths.js';
import { Map } from '../pages/map.js';
import { Profile } from '../pages/profile.js';
import { BoltPage } from '../pages/bolt-page.js';
import { Upgrade } from '../pages/upgrade.js';
import { Splash } from '../pages/splash.js';
import { QRLogin } from '../pages/qr-login.js';
import { Challenge } from '../pages/challenge.js';

const routes = {
  '/': () => new Home(),
  '/paths': () => new Paths(),
  '/map': () => new Map(),
  '/profile': () => new Profile(),
  '/bolt': () => new BoltPage(),
  '/upgrade': () => new Upgrade(),
  '/splash': () => new Splash(),
  '/qr-login': () => new QRLogin(),
  '/challenge/:id': (params) => new Challenge(params),
  '/practice': () => new Home(), // Placeholder
};

const init = () => {
  // 1. Initialize State
  const savedState = storage.load();
  if (savedState) resetState(savedState);

  // 2. Initialize Router
  const router = new Router(routes, 'main-content');
  
  // 3. Handle Initial Navigation - Show splash first with fixed timeout
  router.navigate('/splash');
  
  // 4. Initialize Auth
  auth.init((userData) => {
    if (userData && (window.location.pathname === '/qr-login' || window.location.pathname === '/splash')) {
      router.navigate('/');
    }
  });

  // Fixed time-based splash transition (1.5 seconds max, no async blocking)
  setTimeout(() => {
    if (window.location.pathname === '/splash') {
      if (!state.isAuthenticated) {
        router.navigate('/qr-login');
      } else {
        router.navigate('/');
      }
    }
  }, 1500);

  // 5. Global App Methods
  window.app = {
    onLoginSuccess: (userId, userData) => {
      updateState('isAuthenticated', true);
      updateState('user', userData);
      router.navigate('/');
    },
    logout: async () => {
      await auth.logout();
      router.navigate('/qr-login');
    }
  };

  // 6. UI Sync
  document.addEventListener('stateChange', () => {
    storage.save(state);
    updateGlobalUI();
  });

  document.addEventListener('routeChange', () => {
    updateGlobalUI();
  });

  // 7. Secure postMessage for Challenge Communication
  window.addEventListener('message', (e) => {
    if (e.origin !== window.location.origin) return;
    const { type, payload } = e.data;
    if (type === 'challenge_complete') {
      import('../core/engine.js').then(({ engine }) => {
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
  const avatarContainer = document.getElementById('user-avatar-container');
  const statsContainer = document.getElementById('user-stats');
  const pcNav = document.getElementById('pc-nav');
  const topBar = document.querySelector('header');

  // Hide/Show Shell UI based on route
  const hiddenOn = ['/splash', '/login', '/signup', '/qr-login'];
  const isHidden = hiddenOn.includes(window.location.pathname);
  
  if (pcNav) pcNav.style.display = isHidden ? 'none' : 'flex';
  if (topBar) topBar.style.display = isHidden ? 'none' : 'flex';

  if (avatarContainer && state.user) {
    avatarContainer.innerHTML = `<img src="${state.user.avatar}" alt="User Profile" class="w-full h-full object-cover">`;
  } else if (avatarContainer) {
    avatarContainer.innerHTML = '';
  }

  if (statsContainer) {
    statsContainer.textContent = state.isAuthenticated ? `${state.user.level} LVL • ${state.user.xp} XP` : '';
  }
}
