import { state } from '../core/state.js';

export class Paths {
  render() {
    return `
      <div class="container animate-fade-in space-y-8">
        <section class="relative overflow-visible mb-12">
          <div class="space-y-2">
            <p class="text-on-surface-variant font-semibold tracking-wide uppercase text-xs">Journey Overview</p>
            <h2 class="text-4xl font-extrabold tracking-tight text-on-surface">Your Roadmap.</h2>
            <p class="text-on-surface-variant max-w-[80%] leading-relaxed">Master the art of defense and exploration through curated technical tracks.</p>
          </div>
          <div class="absolute -right-4 -top-4 w-24 h-24 opacity-20 md:opacity-100">
            <span class="material-symbols-outlined text-[80px] text-primary" style="font-variation-settings: 'FILL' 1;">bolt</span>
          </div>
        </section>

        <div class="space-y-6">
          ${this.renderPaths()}
        </div>

        <!-- Daily Challenge -->
        <section class="mt-12">
          <div class="bg-gradient-to-br from-tertiary to-on-tertiary-fixed-variant rounded-xl p-8 text-on-tertiary relative overflow-hidden">
            <div class="relative z-10 space-y-2">
              <h4 class="text-2xl font-black">Daily Challenge</h4>
              <p class="text-sm opacity-90 max-w-[200px]">Unlock a mystery box by completing today's XSS drill.</p>
              <button class="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/30 transition-colors">Start Now</button>
            </div>
            <span class="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-20 rotate-12" style="font-variation-settings: 'FILL' 1;">military_tech</span>
          </div>
        </section>
      </div>
    `;
  }

  renderPaths() {
    return state.progress.paths.map(path => `
      <a href="/map" data-link class="group relative bg-surface-container-low rounded-xl p-6 transition-all hover:bg-surface-container-highest flex flex-col gap-4 overflow-hidden no-underline ${path.status === 'locked' ? 'opacity-70 grayscale-[0.5] pointer-events-none' : ''}">
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-3xl">${path.icon}</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-on-surface">${path.title}</h3>
              <span class="text-xs font-semibold text-on-surface-variant">${path.difficulty} • ${path.lessons} Lessons</span>
            </div>
          </div>
          ${path.status === 'locked' ? 
            '<span class="material-symbols-outlined text-on-surface-variant" style="font-variation-settings: \'FILL\' 1;">lock</span>' : 
            `<div class="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">${path.status === 'in-progress' ? 'In Progress' : 'Started'}</div>`
          }
        </div>
        <div class="space-y-2">
          <div class="flex justify-between items-end">
            <span class="text-xs font-bold text-on-surface-variant">${path.status === 'locked' ? 'Locked' : path.progress + '% Complete'}</span>
            ${path.status === 'in-progress' ? '<span class="material-symbols-outlined text-primary text-sm">trending_up</span>' : ''}
          </div>
          <div class="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style="width: ${path.progress}%"></div>
          </div>
        </div>
      </a>
    `).join('');
  }
}
