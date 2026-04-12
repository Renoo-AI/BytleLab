export class Signup {
  render() {
    return `
      <div class="container page animate-fade-in flex flex-col items-center justify-center relative overflow-hidden">
        <!-- Top Bar Component -->
        <header class="w-full flex items-center justify-between py-6 absolute top-0 z-10">
          <button onclick="window.history.back()" class="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-90">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1">shield_with_heart</span>
            <span class="text-xl font-extrabold tracking-tight bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent">ByteLearn</span>
          </div>
          <div class="w-12"></div>
        </header>

        <main class="w-full pt-20 flex flex-col gap-8">
          <!-- Welcome Hero Section with Mascot -->
          <section class="relative flex flex-col items-start gap-2 pt-8">
            <div class="absolute -top-12 -right-4 w-32 h-32 z-10">
              <img alt="Bolt Mascot" class="w-full h-full object-contain" src="https://dropshare.42web.io/1/files/zVYAUZDpex.png">
            </div>
            <h1 class="text-4xl font-extrabold tracking-tight text-on-surface leading-tight">Create Account</h1>
            <p class="text-on-surface-variant font-medium">Start your journey into the world of ethical security today.</p>
          </section>

          <!-- Form Section -->
          <section class="flex flex-col gap-5">
            <!-- Input Fields -->
            <div class="flex flex-col gap-4">
              <div class="relative group">
                <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <span class="material-symbols-outlined">person</span>
                </div>
                <input class="w-full pl-14 pr-6 py-5 rounded-xl bg-surface-container-low border-2 border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/10 focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/50 text-on-surface font-medium outline-none" placeholder="Username" type="text">
              </div>
              <div class="relative group">
                <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <span class="material-symbols-outlined">mail</span>
                </div>
                <input class="w-full pl-14 pr-6 py-5 rounded-xl bg-surface-container-low border-2 border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/10 focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/50 text-on-surface font-medium outline-none" placeholder="Email Address" type="email">
              </div>
              <div class="relative group">
                <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <span class="material-symbols-outlined">lock</span>
                </div>
                <input class="w-full pl-14 pr-14 py-5 rounded-xl bg-surface-container-low border-2 border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/10 focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/50 text-on-surface font-medium outline-none" placeholder="Password" type="password">
                <button class="absolute inset-y-0 right-5 flex items-center text-on-surface-variant hover:text-primary transition-colors">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <!-- Terms Checkbox -->
            <label class="flex items-start gap-3 px-1 cursor-pointer group">
              <div class="relative flex items-center mt-1">
                <input class="peer appearance-none w-6 h-6 rounded-md bg-surface-container-low checked:bg-primary border-none transition-all cursor-pointer" type="checkbox">
                <span class="material-symbols-outlined absolute inset-0 text-white text-[18px] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
              </div>
              <span class="text-sm font-medium text-on-surface-variant leading-tight group-hover:text-on-surface transition-colors">
                I agree to the <span class="text-primary font-bold">Terms of Service</span> and <span class="text-primary font-bold">Privacy Policy</span>.
              </span>
            </label>

            <!-- Sign Up Button -->
            <button class="w-full py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-lg shadow-[0_8px_20px_-6px_rgba(76,64,223,0.4)] active:scale-95 transition-all mt-2">
              Sign Up
            </button>
            
            <button onclick="window.app.loginWithGoogle()" class="w-full py-4 rounded-xl bg-surface-container-low text-on-surface font-bold flex items-center justify-center gap-3 border border-outline-variant/20 hover:bg-surface-container-lowest transition-all">
              <img alt="Google" class="w-5 h-5" src="https://dropshare.42web.io/1/files/UfdnhaRxF6.png">
              Continue with Google
            </button>
          </section>

          <!-- Social Signup Divider -->
          <div class="flex items-center gap-4 px-2">
            <div class="h-[1px] flex-1 bg-outline-variant/30"></div>
            <span class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Or sign up with</span>
            <div class="h-[1px] flex-1 bg-outline-variant/30"></div>
          </div>

          <!-- Social Buttons -->
          <div class="grid grid-cols-2 gap-4">
            <button class="flex items-center justify-center gap-3 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container-low transition-all active:scale-95">
              <img alt="Google" class="w-6 h-6" src="https://dropshare.42web.io/1/files/UfdnhaRxF6.png">
              <span class="font-bold text-on-surface">Google</span>
            </button>
            <button class="flex items-center justify-center gap-3 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container-low transition-all active:scale-95">
              <img alt="Facebook" class="w-6 h-6 rounded-full object-contain" src="https://dropshare.42web.io/1/files/UfwhO8eTYD.png">
              <span class="font-bold text-on-surface">Facebook</span>
            </button>
          </div>

          <!-- Login Link -->
          <footer class="mt-4 text-center">
            <p class="text-on-surface-variant font-medium">
              Already have an account? 
              <a href="/login" data-link class="text-primary font-extrabold ml-1 hover:underline cursor-pointer">Login</a>
            </p>
          </footer>
        </main>
      </div>
    `;
  }
}
