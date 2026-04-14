import { state } from '../core/state.js';

export class Paths {
  constructor() {
    this.challenges = [];
    this.isLoading = true;
  }

  async onMount() {
    const { firestore } = await import('../core/firebase.js');
    this.challenges = await firestore.getChallenges();
    this.isLoading = false;
    const container = document.getElementById('paths-container');
    if (container) container.innerHTML = this.renderPaths();
  }

  render() {
    setTimeout(() => this.onMount(), 100);

    return `
      <div class="container animate-fade-in space-y-12 py-8">
        <section class="space-y-4 relative">
          <div class="absolute -top-6 -right-4 w-32 h-32 opacity-20 pointer-events-none hidden md:block">
            <img src="https://dropshare.42web.io/1/files/pLqv9ufnPa.png" alt="Read Book Mascot" class="w-full h-full object-contain">
          </div>
          <div class="flex items-center gap-2 text-primary">
            <span class="material-symbols-outlined text-sm">terminal</span>
            <span class="text-xs font-bold uppercase tracking-widest">System Roadmap</span>
          </div>
          <div class="space-y-2">
            <h2 class="text-5xl font-black tracking-tighter text-on-surface">Learning Paths.</h2>
            <p class="text-on-surface-variant max-w-xl leading-relaxed font-medium">Master the art of defense and exploration through curated technical tracks designed for the next generation of security experts.</p>
          </div>
        </section>

        <div id="paths-container" class="space-y-6">
          ${this.renderPaths()}
        </div>
      </div>
    `;
  }

  renderPaths() {
    if (this.isLoading) {
      return `
        <div class="flex flex-col items-center justify-center py-20">
          <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-on-surface-variant font-bold uppercase tracking-widest text-xs">Syncing Roadmap...</p>
        </div>
      `;
    }

    if (this.challenges.length === 0) {
      return `<p class="text-on-surface-variant italic">No challenges available yet.</p>`;
    }

    return this.challenges.map(path => {
      const isCompleted = state.user?.completed?.includes(path.id);
      const isLocked = false; // For now, let's keep them unlocked if they exist
      
      return `
        <div class="group relative bg-surface-container-low border border-outline-variant/30 rounded-2xl p-8 transition-all hover:border-primary/50 flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden ${isLocked ? 'opacity-60 grayscale' : ''}">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-4xl">${path.icon || 'terminal'}</span>
            </div>
            <div class="space-y-1">
              <h3 class="text-2xl font-black text-on-surface tracking-tight">${path.title}</h3>
              <div class="flex items-center gap-3">
                <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container-high px-2 py-1 rounded">${path.difficulty}</span>
                <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">${path.points} XP</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col md:items-end gap-4 min-w-[200px]">
            ${isCompleted ? `
              <div class="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                <span class="text-xs font-black uppercase tracking-widest">Completed</span>
              </div>
            ` : `
              <a href="/challenge/${path.id}" data-link class="inline-flex items-center justify-center gap-2 bg-on-surface text-surface px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-on-primary transition-all active:scale-95">
                <span>Enter Track</span>
                <span class="material-symbols-outlined text-xs">login</span>
              </a>
            `}
          </div>
        </div>
      `;
    }).join('');
  }
}
