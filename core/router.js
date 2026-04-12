/**
 * Simple SPA Router
 * Handles navigation without page reloads.
 */

import { state } from './state.js';

export class Router {
  constructor(routes, containerId) {
    this.routes = routes;
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.currentPath = null;
    this.isSplashHandled = false;

    window.addEventListener('popstate', () => this.handleRoute());
    
    // Intercept all link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });

    // Listen for state changes to enforce reactive auth protection
    document.addEventListener('stateChange', (e) => {
      if (e.detail.path === 'isAuthenticated') {
        this.handleRoute();
      }
    });
  }

  async navigate(path) {
    if (this.currentPath === path) return;
    window.history.pushState({}, '', path);
    await this.handleRoute();
  }

  async handleRoute() {
    if (!this.container) {
      this.container = document.getElementById(this.containerId);
    }
    
    if (!this.container) {
      console.error(`Router: Container #${this.containerId} not found!`);
      return;
    }

    const path = window.location.pathname;
    const isPC = window.innerWidth >= 768;

    // 1. Platform-Specific Route Protection
    if (isPC) {
      // PC: Block mobile-only auth pages - redirect to QR login
      if (path === '/login' || path === '/signup') {
        window.history.replaceState({}, '', '/qr-login');
        await this.handleRoute();
        return;
      }
    } else {
      // Mobile: Block PC-only QR login page - redirect to login
      if (path === '/qr-login') {
        window.history.replaceState({}, '', '/login');
        await this.handleRoute();
        return;
      }
    }

    const publicRoutes = ['/splash', '/login', '/signup', '/qr-login'];
    const isPublic = publicRoutes.includes(path);

    // 2. Authentication Guard - only for non-public routes
    if (!state.isAuthenticated && !isPublic) {
      const defaultLogin = isPC ? '/qr-login' : '/login';
      window.history.replaceState({}, '', defaultLogin);
      await this.handleRoute();
      return;
    }

    // 3. Authenticated Redirect (prevent login loops)
    if (state.isAuthenticated && (path === '/login' || path === '/signup' || path === '/qr-login')) {
      this.navigate('/');
      return;
    }

    // 4. Dynamic Route Matching
    let routeKey = path;
    let params = {};

    // Simple dynamic route matching for /challenge/:id
    if (path.startsWith('/challenge/')) {
      routeKey = '/challenge/:id';
      params.id = path.split('/')[2];
    }

    let route = this.routes[routeKey];

    // 5. Fallback logic
    if (!route) {
      console.warn(`Route not found: ${path}. Falling back to home.`);
      window.history.replaceState({}, '', '/');
      await this.handleRoute();
      return;
    }
    
    this.currentPath = routeKey === path ? path : window.location.pathname;
    
    try {
      const page = await route(params);
      this.container.innerHTML = page.render();
      if (page.afterRender) page.afterRender();
      
      // Update active state in navigation
      this.updateActiveLinks(path);

      // Trigger global UI update for shell visibility
      const event = new CustomEvent('routeChange', { detail: { path } });
      document.dispatchEvent(event);
    } catch (e) {
      console.error('Routing error:', e);
      this.container.innerHTML = '<h1>Error loading page</h1>';
    }
  }

  updateActiveLinks(path) {
    document.querySelectorAll('[data-link]').forEach(link => {
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  init() {
    const isPC = window.innerWidth >= 768;
    const initialPath = window.location.pathname;

    // 1. If not starting on splash, show splash first but remember where we wanted to go
    if (initialPath !== '/splash') {
      this.isSplashHandled = false;
      window.history.replaceState({ redirectedFrom: initialPath }, '', '/splash');
    }

    this.handleRoute();

    // 2. Enforce 1.5s time-based splash transition (non-blocking)
    setTimeout(() => {
      if (window.location.pathname === '/splash') {
        const stateFromHistory = window.history.state || {};
        const destination = stateFromHistory.redirectedFrom || '/';

        if (!state.isAuthenticated) {
          this.navigate(isPC ? '/qr-login' : '/login');
        } else {
          this.navigate(destination);
        }
        this.isSplashHandled = true;
      }
    }, 1500);
  }
}
