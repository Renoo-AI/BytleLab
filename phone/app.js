import { state, resetState } from '../core/state.js';
import { storage } from '../core/storage.js';
import { Router } from '../core/router.js';
import { auth } from '../core/auth.js';

// Pages (Mobile Specific or Shared)
import { Home } from '../pages/home.js';
import { Profile } from '../pages/profile.js';
import { Login } from '../pages/login.js';
import { Signup } from '../pages/signup.js';
import { Splash } from '../pages/splash.js';
import { Challenge } from '../pages/challenge.js';

const routes = {
  '/': () => new Home(),
  '/profile': () => new Profile(),
  '/login': () => new Login(),
  '/signup': () => new Signup(),
  '/splash': () => new Splash(),
  '/challenge/:id': (params) => new Challenge(params),
  '/progress': () => new Profile(), // Placeholder
  '/settings': () => new Profile(), // Placeholder
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
    if (userData && (window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/splash')) {
      router.navigate('/');
    }
  });

  // Fixed time-based splash transition (1.5 seconds max, no async blocking)
  setTimeout(() => {
    if (window.location.pathname === '/splash') {
      if (!state.isAuthenticated) {
        router.navigate('/login');
      } else {
        router.navigate('/');
      }
    }
  }, 1500);

  // 5. Global App Methods
  window.app = {
    approveSession: async (sessionId) => {
      const success = await auth.approvePCLogin(sessionId);
      if (success) alert('PC Authorized!');
    },
    logout: async () => {
      await auth.logout();
      router.navigate('/login');
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

  const hiddenOn = ['/splash', '/login', '/signup'];
  const isHidden = hiddenOn.includes(window.location.pathname);
  
  if (bottomNav) bottomNav.style.display = isHidden ? 'none' : 'flex';
  if (topBar) topBar.style.display = isHidden ? 'none' : 'flex';

  if (statsContainer) {
    statsContainer.textContent = state.isAuthenticated ? `${state.user.level} LVL • ${state.user.xp} XP` : '';
  }
}
