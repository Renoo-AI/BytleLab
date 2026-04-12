export class Upgrade {
  render() {
    return `
      <div class="container animate-fade-in pb-32">
        <!-- TopAppBar Navigation Shell -->
        <header class="flex items-center px-6 h-16 w-full fixed top-0 z-50 backdrop-blur-xl border-b border-outline-variant/10">
          <div class="flex items-center justify-between w-full">
            <button onclick="window.history.back()" class="text-primary hover:opacity-80 transition-opacity scale-95 active:scale-90 transition-transform">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 class="font-headline font-bold tracking-tight text-on-surface text-lg">Upgrade Plan</h1>
            <div class="w-6"></div> <!-- Spacer for centering -->
          </div>
        </header>

        <main class="pt-20 flex flex-col">
          <!-- Hero Section with Bolt Mascot -->
          <section class="relative mb-12 flex flex-col items-center text-center">
            <div class="relative w-48 h-48 mb-[-20px] z-10">
              <img alt="Bolt Mascot" class="w-full h-full object-contain" src="https://dropshare.42web.io/1/files/UlGS73JZET.png">
            </div>
            <div class="bg-surface-container-low p-8 rounded-xl w-full pt-12">
              <h2 class="text-3xl font-extrabold tracking-tight mb-2 text-on-surface leading-tight">Unlock Your Full Potential</h2>
              <p class="text-on-surface-variant font-medium">Master cybersecurity with Bolt by your side.</p>
            </div>
          </section>

          <!-- Plan Toggle -->
          <section class="flex justify-center mb-8">
            <div class="bg-surface-container p-1.5 rounded-full flex gap-1 items-center shadow-inner">
              <button class="px-8 py-2.5 rounded-full bg-surface-container-lowest shadow-md font-black text-primary text-sm transition-all">Monthly</button>
              <button class="px-8 py-2.5 rounded-full font-bold text-on-surface-variant text-sm hover:text-primary transition-all">Lifetime</button>
            </div>
          </section>

          <!-- Plan Cards -->
          <div class="space-y-6">
            <!-- Free Plan -->
            <div class="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <span class="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Perfect to Start</span>
                  <h3 class="text-2xl font-bold mt-2">Free Plan</h3>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-black">$0</span>
                </div>
              </div>
              <ul class="space-y-4 mb-8">
                <li class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span class="text-sm font-medium">First 20 levels</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span class="text-sm font-medium">Basic Bolt assistant</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span class="text-sm font-medium">XP + streak system</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span class="text-sm font-medium">Progress tracking</span>
                </li>
              </ul>
              <div class="w-full py-4 rounded-full font-black text-primary bg-primary/10 border-2 border-primary/20 flex items-center justify-center gap-3 shadow-inner">
                <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1">check_circle</span>
                Current Plan
              </div>
            </div>

            <!-- Pro Plan (Primary Focus) -->
            <div class="relative rounded-xl p-1 bg-gradient-to-br from-primary to-primary-container shadow-2xl">
              <div class="bg-surface-container-lowest rounded-[2.5rem] p-6 h-full">
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <div class="flex gap-2">
                      <span class="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Best Value</span>
                      <span class="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Pro</span>
                    </div>
                    <h3 class="text-2xl font-bold mt-2">Pro Plan</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-3xl font-black text-primary">$4.99</span>
                    <p class="text-[10px] font-bold text-on-surface-variant uppercase">per month</p>
                  </div>
                </div>
                <ul class="grid grid-cols-1 gap-y-4 mb-8">
                  <li class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary text-lg" style="font-variation-settings: 'FILL' 1">stars</span>
                    <span class="text-sm font-bold">All 60 levels</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary text-lg" style="font-variation-settings: 'FILL' 1">bolt</span>
                    <span class="text-sm font-bold">Bolt Pro (Advanced Hints)</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary text-lg">school</span>
                    <span class="text-sm font-medium">'Teach me' mode</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary text-lg">all_inclusive</span>
                    <span class="text-sm font-medium">Unlimited hints</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary text-lg">refresh</span>
                    <span class="text-sm font-medium">Practice / review mode</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary text-lg">insights</span>
                    <span class="text-sm font-medium">Retry insights</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary text-lg">emoji_events</span>
                    <span class="text-sm font-medium">Achievements & Adv. XP</span>
                  </li>
                </ul>
                <button onclick="alert('Upgrade feature coming soon!')" class="w-full py-5 rounded-full font-black text-white bg-gradient-to-br from-primary via-primary to-primary-container shadow-[0_12px_24px_-8px_rgba(76,64,223,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(76,64,223,0.6)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-inner transition-all duration-300 text-lg animate-shine">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          <!-- Level Packs (Secondary Option) -->
          <section class="mt-16">
            <h3 class="text-lg font-bold mb-6 px-2">Prefer one-time packs?</h3>
            <div class="flex overflow-x-auto gap-4 no-scrollbar pb-6 px-2">
              <!-- Web Pack -->
              <div class="flex-shrink-0 w-44 bg-surface-container-low p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span class="material-symbols-outlined text-primary mb-3">language</span>
                  <h4 class="font-bold text-sm">Web Pack</h4>
                  <p class="text-[11px] text-on-surface-variant mt-1 leading-relaxed">Advanced Web vulnerabilities</p>
                </div>
                <div class="mt-6 flex items-center justify-between">
                  <span class="font-bold text-on-surface">$5</span>
                  <button onclick="alert('Web Pack added to your learning path!')" class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white hover:shadow-md active:scale-90 transition-all">
                    <span class="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
              <!-- Exploitation Pack -->
              <div class="flex-shrink-0 w-44 bg-surface-container-low p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span class="material-symbols-outlined text-primary mb-3">terminal</span>
                  <h4 class="font-bold text-sm">Exploitation Pack</h4>
                  <p class="text-[11px] text-on-surface-variant mt-1 leading-relaxed">Memory & logic bypasses</p>
                </div>
                <div class="mt-6 flex items-center justify-between">
                  <span class="font-bold text-on-surface">$5</span>
                  <button onclick="alert('Exploitation Pack added to your learning path!')" class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white hover:shadow-md active:scale-90 transition-all">
                    <span class="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
              <!-- Full Unlock -->
              <div class="flex-shrink-0 w-44 bg-surface-container-low border-2 border-primary-fixed-dim/30 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span class="material-symbols-outlined text-primary mb-3">lock_open</span>
                  <h4 class="font-bold text-sm">Full Unlock</h4>
                  <p class="text-[11px] text-on-surface-variant mt-1 leading-relaxed">Lifetime access to all</p>
                </div>
                <div class="mt-6 flex items-center justify-between">
                  <span class="font-bold text-on-surface">$15</span>
                  <button onclick="alert('Lifetime access unlocked!')" class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:scale-110 hover:shadow-primary/40 active:scale-90 transition-all">
                    <span class="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer Indicators -->
          <footer class="mt-12 mb-16 text-center">
            <div class="flex justify-center items-center gap-6 mb-4">
              <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px] text-outline">lock</span>
                <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px] text-outline">verified_user</span>
                <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">256-bit Encryption</span>
              </div>
            </div>
            <div class="flex justify-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all">
              <span class="material-symbols-outlined">contactless</span>
              <span class="material-symbols-outlined">credit_card</span>
              <span class="material-symbols-outlined">account_balance_wallet</span>
            </div>
          </footer>
        </main>
      </div>
    `;
  }
}
