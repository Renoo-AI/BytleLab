import { state } from '../core/state.js';

export class Splash {
  render() {
    return `
      <div class="min-h-screen bg-[#0a051a] flex flex-col items-center justify-center relative overflow-hidden animate-fade-in">
        <!-- Sinking World Background Effect -->
        <div class="absolute inset-0 z-0">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/20 via-transparent to-[#0a051a] opacity-60"></div>
          <div class="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-t from-purple-600/20 to-transparent rounded-full blur-[120px] animate-sink-slow"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1)_0%,transparent_70%)]"></div>
        </div>

        <!-- Floating Particles -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-40" style="animation-delay: 0.5s"></div>
          <div class="absolute top-3/4 left-1/3 w-2 h-2 bg-purple-500 rounded-full animate-float opacity-20" style="animation-delay: 1.2s"></div>
          <div class="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-float opacity-30" style="animation-delay: 0.8s"></div>
        </div>

        <!-- Central Content -->
        <div class="relative z-10 flex flex-col items-center justify-center px-8 text-center w-full">
          <!-- The 'Bolt' Mascot Presentation -->
          <div class="relative mb-12 group">
            <div class="absolute inset-0 bg-purple-600/20 rounded-full scale-150 opacity-0 blur-3xl group-hover:opacity-100 transition-all duration-1000"></div>
            <div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center animate-float">
              <img alt="Bolt Mascot" class="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(124,58,237,0.3)]" src="https://dropshare.42web.io/1/files/zVYAUZDpex.png">
            </div>
          </div>

          <!-- Branding Section -->
          <div class="space-y-4 mb-16">
            <div class="flex flex-col items-center gap-2">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-purple-400 text-5xl animate-pulse" style="font-variation-settings: 'FILL' 1">shield_with_heart</span>
                <h1 class="text-5xl font-black tracking-tighter text-white">
                  ${state.appName}
                </h1>
              </div>
              <div class="h-[1px] w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            <p class="text-sm font-bold text-purple-300/60 uppercase tracking-[0.5em]">The Pro Frontier</p>
          </div>

          <!-- Loading/Progress Indicator -->
          <div class="w-full max-w-[240px] space-y-6">
            <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div class="h-full w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 rounded-full animate-loading-bar shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
            </div>
            <div class="flex items-center justify-center gap-3">
              <span class="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></span>
              <p class="text-[10px] font-black text-purple-400 uppercase tracking-widest">Establishing Secure Uplink</p>
            </div>
          </div>
        </div>

        <!-- Subtle Footer -->
        <footer class="absolute bottom-12 left-0 w-full flex flex-col items-center gap-4 px-6 opacity-40">
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-xs text-purple-400">terminal</span>
              <span class="text-[9px] font-bold tracking-widest uppercase text-white/60">v2.4.0 PRO</span>
            </div>
            <div class="w-1 h-1 bg-purple-500/50 rounded-full"></div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-xs text-purple-400">verified_user</span>
              <span class="text-[9px] font-bold tracking-widest uppercase text-white/60">Encrypted Session</span>
            </div>
          </div>
        </footer>

        <style>
          @keyframes sink-slow {
            0% { transform: translate(-50%, 0%) scale(1); opacity: 0.3; }
            50% { transform: translate(-50%, -10%) scale(1.1); opacity: 0.5; }
            100% { transform: translate(-50%, 0%) scale(1); opacity: 0.3; }
          }
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-sink-slow {
            animation: sink-slow 10s ease-in-out infinite;
          }
          .animate-loading-bar {
            animation: loading-bar 2s ease-in-out infinite;
          }
        </style>
      </div>
    `;
  }

  afterRender() {
    // Splash is purely time-based to ensure app stability
    setTimeout(() => {
      window.app.router.navigate('/');
    }, 2000);
  }
}
