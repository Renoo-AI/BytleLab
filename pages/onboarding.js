export class Onboarding {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 2;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      window.app.router.update();
    } else {
      this.finish();
    }
  }

  finish() {
    localStorage.setItem('onboarding_complete', 'true');
    window.app.router.navigate('/');
  }

  render() {
    if (this.currentStep === 1) {
      return this.renderStep1();
    } else {
      return this.renderStep2();
    }
  }

  renderStep1() {
    return `
      <div class="min-h-screen bg-surface flex flex-col animate-fade-in">
        <!-- Progress Bar -->
        <div class="p-6">
          <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
            <div class="h-full bg-primary w-1/2 transition-all duration-500"></div>
          </div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-12">
          <!-- Mascot Breaking Container -->
          <div class="relative w-full max-w-xs">
            <div class="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
            <img src="https://dropshare.42web.io/1/files/qK1kGeEVuF.png" alt="Bolt Mascot" class="relative z-10 w-full h-auto drop-shadow-2xl animate-float">
          </div>

          <div class="space-y-4">
            <h1 class="text-4xl font-black tracking-tighter text-on-surface leading-tight">
              Master the Art of <span class="text-primary">Exploitation</span>
            </h1>
            <p class="text-on-surface-variant font-medium max-w-xs mx-auto">
              Learn real-world cybersecurity through interactive, bite-sized challenges.
            </p>
          </div>

          <div class="w-full max-w-xs space-y-4">
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">terminal</span>
              </div>
              <div class="text-left">
                <p class="text-sm font-bold">Interactive Labs</p>
                <p class="text-xs text-on-surface-variant">Real environments in your browser</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-8">
          <button onclick="app.currentPage.nextStep()" class="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-[0_6px_0_#32284f] active:translate-y-1 active:shadow-none transition-all text-lg">
            Get Started
          </button>
        </div>
      </div>
    `;
  }

  renderStep2() {
    return `
      <div class="min-h-screen bg-surface flex flex-col animate-fade-in">
        <!-- Progress Bar -->
        <div class="p-6">
          <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
            <div class="h-full bg-primary w-full transition-all duration-500"></div>
          </div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-12">
          <!-- Mascot -->
          <div class="relative w-full max-w-xs">
            <div class="absolute inset-0 bg-secondary/5 rounded-full blur-3xl"></div>
            <img src="https://dropshare.42web.io/1/files/pLqv9ufnPa.png" alt="Read Book Mascot" class="relative z-10 w-full h-auto drop-shadow-2xl animate-float">
          </div>

          <div class="space-y-4">
            <h1 class="text-4xl font-black tracking-tighter text-on-surface leading-tight">
              Earn Rewards & <span class="text-secondary">Level Up</span>
            </h1>
            <p class="text-on-surface-variant font-medium max-w-xs mx-auto">
              Collect flags, earn XP, and climb the global leaderboard as you learn.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div class="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span class="material-symbols-outlined text-primary mb-2">military_tech</span>
              <p class="text-xs font-bold">Badges</p>
            </div>
            <div class="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span class="material-symbols-outlined text-secondary mb-2">leaderboard</span>
              <p class="text-xs font-bold">Ranking</p>
            </div>
          </div>
        </div>

        <div class="p-8">
          <button onclick="app.currentPage.nextStep()" class="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-[0_6px_0_#32284f] active:translate-y-1 active:shadow-none transition-all text-lg">
            Start Learning
          </button>
        </div>
      </div>
    `;
  }
}
