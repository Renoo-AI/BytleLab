import { state } from '../core/state.js';

export class Home {
  render() {
    if (!state.user) {
      return `
        <div class="container animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-on-surface-variant font-medium">Loading your profile...</p>
        </div>
      `;
    }

    return `
      <div class="container animate-fade-in space-y-8">
        <!-- Welcome Section -->
        <section class="relative">
          <div class="space-y-1">
            <h1 class="text-3xl font-extrabold tracking-tight text-on-surface">Hi ${state.user.name}!</h1>
            <p class="text-lg text-on-surface-variant font-medium">Ready for a new challenge?</p>
          </div>
          <div class="absolute -top-4 -right-2 w-20 h-20 opacity-20 pointer-events-none">
            <span class="material-symbols-outlined text-primary text-6xl" style="font-variation-settings: 'FILL' 1;">bolt</span>
          </div>
        </section>

        <!-- Continue Learning Card -->
        <section>
          <div class="relative overflow-hidden bg-surface-container-lowest rounded-xl p-8 shadow-[0_8px_24px_rgba(50,40,79,0.06)] border border-outline-variant/10">
            <div class="relative z-10 space-y-6">
              <div class="space-y-2">
                <span class="text-xs font-bold uppercase tracking-widest text-primary">Current Path</span>
                <h2 class="text-2xl font-bold text-on-surface">${state.progress.currentPath}</h2>
              </div>
              <div class="space-y-3">
                <div class="flex justify-between items-end">
                  <span class="text-sm font-semibold text-on-surface-variant">65% Completed</span>
                  <span class="text-xs font-bold text-primary">8/12 Modules</span>
                </div>
                <div class="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style="width: 65%"></div>
                </div>
              </div>
              <a href="/map" data-link class="btn-primary w-full">
                <span>Resume Path</span>
                <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
              </a>
            </div>
            <div class="absolute -bottom-4 -right-4 opacity-10">
              <span class="material-symbols-outlined text-[120px]">language</span>
            </div>
          </div>
        </section>

        <!-- Stats Row -->
        <section class="grid grid-cols-2 gap-4">
          <div class="bg-surface-container-low p-6 rounded-xl space-y-2">
            <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">flag</span>
            <div>
              <div class="text-2xl font-black text-on-surface">${state.user.flags}</div>
              <div class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Flags</div>
            </div>
          </div>
          <div class="bg-surface-container-low p-6 rounded-xl space-y-2">
            <span class="material-symbols-outlined text-primary">trending_up</span>
            <div>
              <div class="text-2xl font-black text-on-surface">${state.user.level}</div>
              <div class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Current Level</div>
            </div>
          </div>
        </section>

        <!-- Categories Section -->
        <section class="space-y-4 pb-12">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-on-surface">Challenge Categories</h3>
            <button class="text-sm font-bold text-primary">View All</button>
          </div>
          <div class="space-y-3">
            ${this.renderCategories()}
          </div>
        </section>
      </div>
    `;
  }

  renderCategories() {
    return state.progress.paths.map(path => `
      <a href="/map" data-link class="group flex items-center gap-4 p-4 ${path.status === 'locked' ? 'opacity-60 grayscale pointer-events-none' : 'bg-surface-container-low'} rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer no-underline">
        <div class="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
          <span class="material-symbols-outlined text-2xl">${path.icon}</span>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-on-surface">${path.title}</h4>
          <p class="text-sm text-on-surface-variant">${path.difficulty} • ${path.lessons} Lessons</p>
        </div>
        <span class="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
      </a>
    `).join('');
  }
}
