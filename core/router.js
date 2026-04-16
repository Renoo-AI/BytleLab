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
    const isMobile = window.isMobile !== undefined ? window.isMobile : (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024);
    const isPC = !isMobile;
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

    const publicRoutes = ['/login', '/signup', '/splash', '/qr-login', '/onboarding'];
    const isPublic = publicRoutes.includes(path);

    // 2. Authentication Guard
    if (!state.isAuthReady) {
      // Show a loading state or just wait
      this.container.innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-on-surface-variant font-medium">Verifying Session...</p>
        </div>
      `;
      return;
    }

    if (!state.isAuthenticated && !isPublic) {
      const defaultLogin = isPC ? '/qr-login' : '/login';
      window.history.replaceState({}, '', defaultLogin);
      this.handleRoute();
      return;
    }

    // 3. Onboarding Guard
    const onboardingComplete = localStorage.getItem('onboarding_complete') === 'true';
    if (state.isAuthenticated && !onboardingComplete && path !== '/onboarding') {
      this.navigate('/onboarding');
      return;
    }

    // 4. Authenticated Redirect (prevent login loops)
    if (state.isAuthenticated && (path === '/login' || path === '/signup' || path === '/qr-login')) {
      this.navigate('/');
      return;
    }

    // 4. Dynamic Route Matching
    let routeKey = path;
    let params = {};

    // Simple dynamic route matching
    if (path.startsWith('/challenge/')) {
      routeKey = '/challenge/:id';
      params.id = path.split('/')[2];
    } else if (path.startsWith('/levels/')) {
      const parts = path.split('/');
      if (parts.length >= 4) {
        routeKey = '/levels/:world/:step';
        params.world = parts[2];
        params.step = parts[3];
      }
    }

    const route = this.routes[routeKey] || this.routes['/'];
    
    if (!this.routes[routeKey] && routeKey !== '/') {
      console.warn(`Route ${routeKey} not found, falling back to home.`);
      window.history.replaceState({}, '', '/');
    }

    this.currentPath = path;
    
    try {
      const page = await route(params);
      window.app.currentPage = page;
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

  async update() {
    if (window.app.currentPage && this.container) {
      this.container.innerHTML = window.app.currentPage.render();
      if (window.app.currentPage.afterRender) window.app.currentPage.afterRender();
      
      // Trigger global UI update for shell visibility
      const event = new CustomEvent('routeChange', { detail: { path: window.location.pathname } });
      document.dispatchEvent(event);
    } else {
      await this.handleRoute();
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
