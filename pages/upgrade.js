export class Upgrade {
  render() {
    return `
      <div class="min-h-screen bg-[#0a051a] text-white animate-fade-in pb-20">
        <!-- Hero Section -->
        <section class="relative overflow-hidden pt-20 pb-32 px-8 text-center">
          <div class="absolute inset-0 z-0">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)] blur-[100px]"></div>
          </div>
          
          <div class="relative z-10 space-y-8 max-w-2xl mx-auto">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-black uppercase tracking-[0.2em] animate-pulse">
              <span class="material-symbols-outlined text-sm">workspace_premium</span>
              ByteLearn Elite
            </div>
            <h1 class="text-6xl font-black tracking-tighter leading-none">
              Elevate Your <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Cyber Intelligence</span>
            </h1>
            <p class="text-white/60 font-medium text-lg max-w-md mx-auto">
              Access the world's most advanced interactive labs and master exploitation with zero limits.
            </p>
          </div>
        </section>

        <!-- Pricing Grid -->
        <section class="px-6 -mt-20 relative z-20 max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Daily Plan -->
            <div class="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 hover:border-purple-500/50 transition-all group flex flex-col">
              <div class="space-y-4 mb-8">
                <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-purple-400 transition-colors">
                  <span class="material-symbols-outlined">bolt</span>
                </div>
                <div>
                  <h3 class="text-xl font-black">Daily Pass</h3>
                  <p class="text-xs text-white/40">24-hour full access</p>
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-black">$2</span>
                  <span class="text-white/40 text-sm">/day</span>
                </div>
              </div>
              <ul class="space-y-4 mb-10 flex-grow">
                <li class="flex items-center gap-3 text-xs font-bold text-white/60">
                  <span class="material-symbols-outlined text-purple-500 text-sm">check</span>
                  All Pro Labs
                </li>
                <li class="flex items-center gap-3 text-xs font-bold text-white/60">
                  <span class="material-symbols-outlined text-purple-500 text-sm">check</span>
                  Instant Setup
                </li>
              </ul>
              <button class="w-full bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-2xl transition-all active:scale-95">
                Get Access
              </button>
            </div>

            <!-- Weekly Plan -->
            <div class="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 hover:border-purple-500/50 transition-all group flex flex-col">
              <div class="space-y-4 mb-8">
                <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-purple-400 transition-colors">
                  <span class="material-symbols-outlined">calendar_view_week</span>
                </div>
                <div>
                  <h3 class="text-xl font-black">Weekly</h3>
                  <p class="text-xs text-white/40">Intense sprint access</p>
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-black">$7</span>
                  <span class="text-white/40 text-sm">/week</span>
                </div>
              </div>
              <ul class="space-y-4 mb-10 flex-grow">
                <li class="flex items-center gap-3 text-xs font-bold text-white/60">
                  <span class="material-symbols-outlined text-purple-500 text-sm">check</span>
                  All Pro Labs
                </li>
                <li class="flex items-center gap-3 text-xs font-bold text-white/60">
                  <span class="material-symbols-outlined text-purple-500 text-sm">check</span>
                  Exclusive Badges
                </li>
              </ul>
              <button class="w-full bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-2xl transition-all active:scale-95">
                Get Access
              </button>
            </div>

            <!-- Monthly Plan (Featured) -->
            <div class="bg-gradient-to-b from-purple-600 to-purple-900 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(124,58,237,0.3)] relative overflow-hidden flex flex-col scale-105 z-10">
              <div class="absolute top-0 right-0 bg-white text-purple-900 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">Best Value</div>
              <div class="space-y-4 mb-8 relative z-10">
                <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <span class="material-symbols-outlined">star</span>
                </div>
                <div>
                  <h3 class="text-xl font-black">Monthly</h3>
                  <p class="text-xs text-white/60">Most popular choice</p>
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-black">$12</span>
                  <span class="text-white/60 text-sm">/month</span>
                </div>
              </div>
              <ul class="space-y-4 mb-10 flex-grow relative z-10">
                <li class="flex items-center gap-3 text-xs font-bold text-white">
                  <span class="material-symbols-outlined text-white text-sm">check_circle</span>
                  All Pro Labs
                </li>
                <li class="flex items-center gap-3 text-xs font-bold text-white">
                  <span class="material-symbols-outlined text-white text-sm">check_circle</span>
                  Priority Support
                </li>
                <li class="flex items-center gap-3 text-xs font-bold text-white">
                  <span class="material-symbols-outlined text-white text-sm">check_circle</span>
                  Early Access
                </li>
              </ul>
              <button class="w-full bg-white text-purple-900 font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition-all active:scale-95 relative z-10">
                Go Elite
              </button>
            </div>

            <!-- Yearly Plan -->
            <div class="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 hover:border-purple-500/50 transition-all group flex flex-col">
              <div class="space-y-4 mb-8">
                <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-purple-400 transition-colors">
                  <span class="material-symbols-outlined">workspace_premium</span>
                </div>
                <div>
                  <h3 class="text-xl font-black">Yearly</h3>
                  <p class="text-xs text-white/40">Long-term mastery</p>
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-black">$99</span>
                  <span class="text-white/40 text-sm">/year</span>
                </div>
              </div>
              <ul class="space-y-4 mb-10 flex-grow">
                <li class="flex items-center gap-3 text-xs font-bold text-white/60">
                  <span class="material-symbols-outlined text-purple-500 text-sm">check</span>
                  All Pro Labs
                </li>
                <li class="flex items-center gap-3 text-xs font-bold text-white/60">
                  <span class="material-symbols-outlined text-purple-500 text-sm">check</span>
                  2 Months Free
                </li>
                <li class="flex items-center gap-3 text-xs font-bold text-white/60">
                  <span class="material-symbols-outlined text-purple-500 text-sm">check</span>
                  Physical Swag Pack
                </li>
              </ul>
              <button class="w-full bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-2xl transition-all active:scale-95">
                Get Access
              </button>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="max-w-4xl mx-auto px-6 mt-32 space-y-12">
          <div class="text-center space-y-4">
            <h2 class="text-3xl font-black tracking-tight">Why Choose Elite?</h2>
            <div class="h-1 w-12 bg-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div class="text-center space-y-4">
              <div class="w-16 h-16 mx-auto bg-purple-500/10 rounded-3xl flex items-center justify-center text-purple-400">
                <span class="material-symbols-outlined text-3xl">terminal</span>
              </div>
              <h4 class="font-black">Unlimited Terminal</h4>
              <p class="text-sm text-white/40 font-medium">No session limits. Practice as long as you need to master the exploit.</p>
            </div>
            <div class="text-center space-y-4">
              <div class="w-16 h-16 mx-auto bg-purple-500/10 rounded-3xl flex items-center justify-center text-purple-400">
                <span class="material-symbols-outlined text-3xl">military_tech</span>
              </div>
              <h4 class="font-black">Elite Certifications</h4>
              <p class="text-sm text-white/40 font-medium">Earn verifiable certificates for every path you complete.</p>
            </div>
            <div class="text-center space-y-4">
              <div class="w-16 h-16 mx-auto bg-purple-500/10 rounded-3xl flex items-center justify-center text-purple-400">
                <span class="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h4 class="font-black">Private Discord</h4>
              <p class="text-sm text-white/40 font-medium">Join a community of pro researchers and get direct mentorship.</p>
            </div>
          </div>
        </section>

        <!-- Trust Badges -->
        <footer class="mt-32 py-12 px-8 text-center space-y-8 border-t border-white/5">
          <div class="flex items-center justify-center gap-12 opacity-20 grayscale">
            <span class="material-symbols-outlined text-4xl">verified_user</span>
            <span class="material-symbols-outlined text-4xl">payments</span>
            <span class="material-symbols-outlined text-4xl">lock</span>
          </div>
          <p class="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] max-w-xs mx-auto">Enterprise Grade Security • SSL Encrypted • Stripe Verified</p>
        </footer>
      </div>
    `;
  }
}
