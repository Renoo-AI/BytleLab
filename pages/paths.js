import { state } from '../core/state.js';

export class Paths {
  constructor() {
    this.levels = [];
    this.isLoading = true;
  }

  async onMount() {
    const { firestore } = await import('../core/firebase.js');
    this.levels = await firestore.getLevels();
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
            <h2 class="text-5xl font-black tracking-tighter text-on-surface">Learning Worlds.</h2>
            <p class="text-on-surface-variant max-w-xl leading-relaxed font-medium">Master the art of defense and exploration through curated technical worlds designed for the next generation of security experts.</p>
          </div>
        </section>

        <div id="paths-container" class="space-y-12">
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

    if (this.levels.length === 0) {
      return `<p class="text-on-surface-variant italic">No worlds available yet.</p>`;
    }

    // Group levels by world
    const worlds = {};
    this.levels.forEach(level => {
      if (!worlds[level.world]) worlds[level.world] = [];
      worlds[level.world].push(level);
    });

    return Object.keys(worlds).map(worldId => {
      const worldLevels = worlds[worldId];
      const worldTitle = this.getWorldTitle(worldId);
      
      return `
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span class="font-black text-lg">${worldId}</span>
            </div>
            <h3 class="text-2xl font-black uppercase tracking-tighter">${worldTitle}</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${worldLevels.map(level => {
              const isCompleted = state.user?.completed?.includes(level.id);
              const [currentWorld, currentStep] = (state.user?.currentLevel || "0.0").split('.');
              const isLocked = level.world > parseInt(currentWorld) || (level.world === parseInt(currentWorld) && level.step > parseInt(currentStep));
              
              return `
                <div class="group relative bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 transition-all hover:border-primary/50 flex flex-col justify-between gap-6 overflow-hidden ${isLocked ? 'opacity-60 grayscale' : ''}">
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Step ${level.step}</span>
                      ${isCompleted ? '<span class="material-symbols-outlined text-green-500 text-sm">check_circle</span>' : ''}
                    </div>
                    <h4 class="text-lg font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">${level.title}</h4>
                    <p class="text-xs text-on-surface-variant line-clamp-2">${level.description}</p>
                  </div>

                  <div class="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                    <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">${level.points} XP</span>
                    ${isLocked ? `
                      <span class="material-symbols-outlined text-sm opacity-30">lock</span>
                    ` : `
                      <a href="/levels/${level.world}/${level.step}" data-link class="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Enter Lab</a>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  getWorldTitle(worldId) {
    const titles = {
      '0': 'Basics & Fundamentals',
      '1': 'Reconnaissance',
      '2': 'Web Vulnerabilities',
      '3': 'Network Attacks',
      '4': 'Social Engineering',
      '5': 'Post-Exploitation'
    };
    return titles[worldId] || `World ${worldId}`;
  }
}
