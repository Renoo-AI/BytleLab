import { state } from '../core/state.js';

export class Map {
  render() {
    if (!state.user) {
      return `
        <div class="container animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-on-surface-variant font-medium">Loading map...</p>
        </div>
      `;
    }

    const levels = [
      { id: 'web-basics-1', title: 'View Source', icon: 'visibility', module: 'Foundations' },
      { id: 'web-basics-2', title: 'Hidden Comments', icon: 'comment', module: 'Foundations' },
      { id: 'web-basics-3', title: 'Robots.txt', icon: 'smart_toy', module: 'Foundations' },
      { id: 'input-tampering-1', title: 'URL Params', icon: 'link', module: 'Interception' },
      { id: 'input-tampering-2', title: 'Hidden Fields', icon: 'visibility_off', module: 'Interception' }
    ];

    return `
      <div class="container animate-fade-in">
        <!-- Path Header -->
        <div class="mb-12 text-center relative">
          <h1 class="text-4xl font-extrabold tracking-tight text-on-surface mb-2">${state.progress.currentPath}</h1>
          <p class="text-on-surface-variant font-medium">Learn the art of digital inspection</p>
          <div class="absolute -right-4 -top-8 w-24 h-24">
            <img src="https://dropshare.42web.io/1/files/n3cWyiNBjO.png" alt="Bolt Mascot" class="w-full h-full object-contain">
          </div>
        </div>

        <!-- The Winding Path Container -->
        <div class="relative flex flex-col items-center gap-16 pb-20">
          <!-- SVG Continuous Path Background -->
          <svg class="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1]" preserveAspectRatio="none" viewBox="0 0 400 1000">
            <path d="M 216 110 L 216 170 C 216 170, 216 190, 190 200 L 160 210 C 140 215, 120 230, 120 260 L 120 330 C 120 330, 120 360, 160 380 L 210 405 C 250 425, 260 450, 260 480 L 260 550 C 260 550, 260 580, 230 600 L 200 620 C 180 635, 165 650, 165 680 L 165 750 C 165 750, 165 780, 200 800 L 240 825" fill="none" stroke="#e3d7ff" stroke-linecap="round" stroke-width="14"></path>
          </svg>

          ${this.renderLevels(levels)}
        </div>
      </div>
    `;
  }

  renderLevels(levels) {
    let currentModule = '';
    const completed = state.user.completed || [];

    return levels.map((level, index) => {
      let html = '';
      if (level.module !== currentModule) {
        currentModule = level.module;
        html += `
          <div class="w-full py-4 px-6 bg-surface-container-low rounded-xl text-center z-10">
            <span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Module: ${currentModule}</span>
          </div>
        `;
      }

      const isCompleted = completed.includes(level.id);
      const isLocked = index > 0 && !completed.includes(levels[index - 1].id);
      const isActive = !isCompleted && !isLocked;
      
      const xOffset = (index % 2 === 0 ? 1 : -1) * (index * 10 + 10);

      html += `
        <div class="relative flex flex-col items-center z-10" style="transform: translateX(${xOffset}px)">
          ${isActive ? `
            <div class="absolute -left-16 top-0 animate-bounce">
              <span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1;">bolt</span>
            </div>
          ` : ''}
          
          <a href="${isLocked ? '#' : `/challenge/${level.id}`}" data-link class="
            relative w-24 h-24 rounded-full flex items-center justify-center transition-all
            ${isCompleted ? 'bg-tertiary-container shadow-[0_8px_0_#005e36] hover:translate-y-1' : ''}
            ${isActive ? 'bg-gradient-to-br from-primary to-primary-container shadow-[0_8px_0_#32284f] ring-4 ring-primary/20 ring-offset-4 animate-pulse' : ''}
            ${isLocked ? 'bg-surface-variant shadow-[0_8px_0_#b3a6d5] opacity-60 cursor-not-allowed' : ''}
          ">
            <span class="material-symbols-outlined text-4xl ${isCompleted ? 'text-on-tertiary-container' : (isActive ? 'text-white' : 'text-on-surface-variant')}" 
                  style="font-variation-settings: 'FILL' 1;">
              ${isCompleted ? 'check_circle' : (isLocked ? 'lock' : level.icon)}
            </span>
          </a>
          <span class="mt-4 font-bold ${isLocked ? 'text-on-surface-variant' : 'text-on-surface'}">${level.title}</span>
        </div>
      `;

      return html;
    }).join('');
  }
}
