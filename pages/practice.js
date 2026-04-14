export class Practice {
  render() {
    return `
      <div class="container animate-fade-in space-y-10 py-8">
        <!-- Daily Drill Section -->
        <section>
          <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-container p-8 shadow-lg group">
            <div class="relative z-10 max-w-[70%]">
              <span class="inline-block px-3 py-1 bg-surface-container-lowest/20 rounded-full text-white text-xs font-bold tracking-wider mb-4">DAILY SPECIAL</span>
              <h2 class="text-3xl font-extrabold text-white leading-tight mb-2">Take Today's Quiz</h2>
              <p class="text-on-primary/90 text-sm mb-6">Sharpen your skills and earn a +50 XP bonus for a perfect streak.</p>
              <button class="bg-surface-container-lowest text-primary font-bold px-8 py-3 rounded-full shadow-[0_4px_0_#32284f] active:translate-y-1 transition-all">
                Start Drill
              </button>
            </div>
            <!-- Mascot Integration -->
            <div class="absolute -right-4 -bottom-6 w-48 h-48 opacity-90 group-hover:scale-110 transition-transform duration-500">
              <img alt="Bolt Mascot" class="w-full h-full object-contain" src="https://dropshare.42web.io/1/files/Y1SVHlnZRG.png">
            </div>
          </div>
        </section>

        <!-- Weak Spots - Bento Style -->
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-headline font-bold text-lg text-on-surface">Weak Spots</h3>
            <span class="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Needs Attention</span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 sm:col-span-1 p-6 rounded-xl bg-surface-container-low flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
              <div class="z-10">
                <div class="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center mb-4 text-error">
                  <span class="material-symbols-outlined">link</span>
                </div>
                <h4 class="font-bold text-lg leading-snug">URL Params</h4>
                <p class="text-sm text-on-surface-variant">Focus on injection points</p>
              </div>
              <div class="mt-4 z-10">
                <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div class="h-full bg-error w-[35%]"></div>
                </div>
              </div>
              <span class="absolute -right-4 -bottom-4 opacity-5 text-8xl material-symbols-outlined">link</span>
            </div>
            <div class="col-span-2 sm:col-span-1 p-6 rounded-xl bg-surface-container-low flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
              <div class="z-10">
                <div class="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center mb-4 text-secondary">
                  <span class="material-symbols-outlined">cookie</span>
                </div>
                <h4 class="font-bold text-lg leading-snug">Cookie Basics</h4>
                <p class="text-sm text-on-surface-variant">Session security flaws</p>
              </div>
              <div class="mt-4 z-10">
                <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div class="h-full bg-secondary w-[48%]"></div>
                </div>
              </div>
              <span class="absolute -right-4 -bottom-4 opacity-5 text-8xl material-symbols-outlined">cookie</span>
            </div>
          </div>
        </section>

        <!-- Recent Challenges -->
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-headline font-bold text-lg text-on-surface">Recent Challenges</h3>
            <button class="text-primary text-sm font-bold hover:underline">View History</button>
          </div>
          <div class="space-y-3">
            <!-- Challenge Item 1 -->
            <div class="flex items-center justify-between p-5 rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(50,40,79,0.04)] group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                  <span class="material-symbols-outlined">security</span>
                </div>
                <div>
                  <h5 class="font-bold text-on-surface">Header Manipulation</h5>
                  <p class="text-xs text-on-surface-variant">Last practiced 2h ago</p>
                </div>
              </div>
              <button class="bg-surface-container-low text-on-surface-variant font-bold px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all active:scale-95">
                Retry
              </button>
            </div>
            <!-- Challenge Item 2 -->
            <div class="flex items-center justify-between p-5 rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(50,40,79,0.04)] group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined">terminal</span>
                </div>
                <div>
                  <h5 class="font-bold text-on-surface">Command Injection 101</h5>
                  <p class="text-xs text-on-surface-variant">Last practiced yesterday</p>
                </div>
              </div>
              <button class="bg-surface-container-low text-on-surface-variant font-bold px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all active:scale-95">
                Retry
              </button>
            </div>
            <!-- Challenge Item 3 -->
            <div class="flex items-center justify-between p-5 rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(50,40,79,0.04)] group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span class="material-symbols-outlined">data_object</span>
                </div>
                <div>
                  <h5 class="font-bold text-on-surface">JSON Web Tokens</h5>
                  <p class="text-xs text-on-surface-variant">Last practiced 3d ago</p>
                </div>
              </div>
              <button class="bg-surface-container-low text-on-surface-variant font-bold px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all active:scale-95">
                Retry
              </button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}
