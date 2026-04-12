export class Login {
  render() {
    return `
      <div class="container animate-fade-in flex flex-col items-center min-h-screen relative overflow-hidden">
        <!-- Background Decorative Glows -->
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none"></div>

        <!-- Top App Bar -->
        <header class="w-full top-0 flex items-center justify-center px-6 py-8 relative z-10">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings: 'FILL' 1">shield_with_heart</span>
            <span class="text-2xl font-bold bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent tracking-tight leading-relaxed font-headline">ByteLab</span>
          </div>
        </header>

        <main class="w-full px-6 pb-12 flex flex-col grow justify-center">
          <!-- Hero Branding Area -->
          <div class="relative mb-10 text-center">
            <h1 class="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Welcome Back</h1>
            <p class="text-on-surface-variant font-medium">Continue your journey to mastery.</p>
          </div>

          <!-- Login Form -->
          <div class="space-y-6">
            <div class="space-y-4">
              <div class="relative">
                <label class="block text-sm font-bold text-on-surface mb-2 ml-4">Email</label>
                <div class="flex items-center bg-surface-container-low border-2 border-transparent rounded-xl px-4 py-4 transition-all duration-300 focus-within:bg-surface-container-lowest focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/10 group">
                  <span class="material-symbols-outlined text-on-surface-variant mr-3 group-focus-within:text-primary transition-colors">mail</span>
                  <input class="bg-transparent border-none focus:ring-0 w-full p-0 text-on-surface placeholder:text-outline/60 font-medium" placeholder="name@example.com" type="email">
                </div>
              </div>
              <div class="relative">
                <div class="flex justify-between items-center mb-2 ml-4 mr-4">
                  <label class="block text-sm font-bold text-on-surface">Password</label>
                  <a class="text-sm font-bold text-primary hover:opacity-80 transition-opacity" href="#">Forgot Password?</a>
                </div>
                <div class="flex items-center bg-surface-container-low border-2 border-transparent rounded-xl px-4 py-4 transition-all duration-300 focus-within:bg-surface-container-lowest focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/10 group">
                  <span class="material-symbols-outlined text-on-surface-variant mr-3 group-focus-within:text-primary transition-colors">lock</span>
                  <input class="bg-transparent border-none focus:ring-0 w-full p-0 text-on-surface placeholder:text-outline/60 font-medium" placeholder="••••••••" type="password">
                  <span class="material-symbols-outlined text-on-surface-variant ml-3 cursor-pointer hover:text-primary transition-colors">visibility_off</span>
                </div>
              </div>
            </div>

            <!-- Primary Action -->
            <button onclick="window.app.loginWithGoogle()" class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-5 rounded-full shadow-[0px_4px_12px_rgba(76,64,223,0.3)] active:scale-[0.98] transition-transform duration-200 text-lg">
              Login
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-4 py-4">
              <div class="h-[1px] grow bg-outline-variant opacity-30"></div>
              <span class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Or continue with</span>
              <div class="h-[1px] grow bg-outline-variant opacity-30"></div>
            </div>

            <!-- Social Logins -->
            <div class="grid grid-cols-1 gap-4">
              <button onclick="window.app.loginWithGoogle()" class="flex items-center justify-center gap-3 bg-surface-container-low py-4 rounded-xl font-bold text-on-surface active:scale-[0.96] transition-transform">
                <img alt="Google" class="w-5 h-5" src="https://dropshare.42web.io/1/files/UfdnhaRxF6.png">
                Sign in with Google
              </button>
            </div>
          </div>
        </main>

        <!-- Footer Sign Up -->
        <footer class="w-full py-8 mt-auto text-center">
          <p class="text-on-surface-variant font-medium">
            Don't have an account? 
            <a href="/signup" data-link class="text-primary font-bold hover:underline transition-all cursor-pointer">Sign Up</a>
          </p>
        </footer>
      </div>
    `;
  }
}
