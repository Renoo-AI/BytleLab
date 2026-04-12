/**
 * Simple SPA Router
 * Handles navigation without page reloads.
 */

export class Router {
  constructor(routes, containerId) {
    this.routes = routes;
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.currentPath = null;

    window.addEventListener('popstate', () => this.handleRoute());
    
    // Intercept all link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
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
    const { state } = await import('./state.js');

    // 1. Platform-Specific Route Protection
    if (isPC) {
      // PC: Block mobile-only auth pages
      if (path === '/login' || path === '/signup') {
        this.navigate('/qr-login');
        return;
      }
    } else {
      // Mobile: Block PC-only QR login page
      if (path === '/qr-login') {
        this.navigate('/login');
        return;
      }
    }

    const publicRoutes = ['/login', '/signup', '/splash', '/qr-login'];
    const isPublic = publicRoutes.includes(path);

    // 2. Authentication Guard
    if (!state.isAuthenticated && !isPublic) {
      const defaultLogin = isPC ? '/qr-login' : '/login';
      window.history.replaceState({}, '', defaultLogin);
      this.handleRoute();
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

    const route = this.routes[routeKey] || this.routes['/404'] || this.routes['/'];
    
    this.currentPath = path;
    
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
    this.handleRoute();
  }
}
