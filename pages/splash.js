export class Splash {
  render() {
    return `
      <div class="container page animate-fade-in flex flex-col items-center justify-center overflow-hidden">
        <!-- Central Content Canvas -->
        <div class="relative z-10 flex flex-col items-center justify-center px-8 text-center w-full">
          <!-- The 'Bolt' Mascot Presentation -->
          <div class="relative mb-8 group animate-bounce-slow">
            <div class="absolute inset-0 bg-primary/10 rounded-full scale-125 opacity-20 blur-3xl group-hover:opacity-40 transition-all duration-700"></div>
            <div class="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
              <img alt="Bolt Mascot" class="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(50,40,79,0.1)]" src="https://dropshare.42web.io/1/files/IVTYQwSCOX.png">
              <div class="absolute -bottom-2 -right-2 bg-gradient-to-br from-primary to-primary-container text-white p-3 rounded-full shadow-xl border-4 border-surface ring-4 ring-primary/10">
                <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1">bolt</span>
              </div>
            </div>
          </div>

          <!-- Branding Section -->
          <div class="space-y-2 mb-12">
            <h1 class="text-4xl font-black tracking-tighter text-on-surface flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1">shield_with_heart</span>
              ByteLearn
            </h1>
            <p class="text-xs font-bold text-on-surface-variant uppercase tracking-[0.3em] opacity-60">Master the Craft</p>
          </div>

          <!-- Loading/Progress Indicator -->
          <div class="w-full max-w-[200px] space-y-4">
            <div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden p-[1px]">
              <div class="h-full w-1/3 bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_12px_rgba(76,64,223,0.5)] animate-pulse"></div>
            </div>
            <p class="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">Initializing...</p>
          </div>
        </div>
      </div>
    `;
  }
}
