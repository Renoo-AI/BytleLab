import { state } from '../core/state.js';
import { engine } from '../core/engine.js';

export class Challenge {
  constructor(params) {
    this.id = params.id;
    this.challenge = null;
    this.isSubmitting = false;
    this.error = null;
    this.success = false;
  }

  async onMount() {
    // In a real app, we'd fetch challenge data from Firestore
    const challenges = {
      'web-basics-1': {
        title: 'View Source',
        description: 'The flag is hidden in the HTML source code of this page. Can you find it?',
        hint: 'Right-click and select "View Page Source" or use DevTools (F12).',
        difficulty: 'Easy',
        points: 100
      },
      'web-basics-2': {
        title: 'Hidden Comments',
        description: 'Developers often leave sensitive information in HTML comments. Find the comment containing the flag.',
        hint: 'Look for <!-- ... --> tags in the source.',
        difficulty: 'Easy',
        points: 100
      },
      'web-basics-3': {
        title: 'Robots.txt',
        description: 'The robots.txt file tells search engines which pages they can or cannot visit. Sometimes it reveals hidden directories.',
        hint: 'Try navigating to /robots.txt',
        difficulty: 'Easy',
        points: 100
      }
    };

    this.challenge = challenges[this.id] || {
      title: 'Unknown Challenge',
      description: 'This challenge does not exist yet.',
      difficulty: '???',
      points: 0
    };

    engine.startChallenge(this.id);
    this.updateUI();
  }

  updateUI() {
    const container = document.getElementById('challenge-container');
    if (container) container.innerHTML = this.renderContent();
  }

  async submitFlag() {
    console.log('Submitting flag for challenge:', this.challengeId);
    const input = document.getElementById('flag-input');
    if (!input || this.isSubmitting) return;

    this.isSubmitting = true;
    this.error = null;
    this.updateUI();

    const flag = input.value.trim();
    const isValid = await engine.validateFlag(this.id, flag);

    this.isSubmitting = false;
    if (isValid) {
      this.success = true;
    } else {
      this.error = 'Invalid flag. Try again!';
    }
    this.updateUI();
  }

  render() {
    setTimeout(() => this.onMount(), 100);

    return `
      <div id="challenge-container" class="container animate-fade-in">
        <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-on-surface-variant font-medium">Loading challenge...</p>
        </div>
      </div>
    `;
  }

  renderContent() {
    if (this.success) {
      return `
        <div class="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div class="w-24 h-24 bg-tertiary-container rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <span class="material-symbols-outlined text-on-tertiary-container text-6xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
          </div>
          <div class="space-y-2">
            <h2 class="text-3xl font-black text-on-surface">Challenge Solved!</h2>
            <p class="text-on-surface-variant font-medium">You've earned ${this.challenge.points} XP and 1 Flag.</p>
          </div>
          <a href="/map" data-link class="btn-primary w-full max-w-xs">
            <span>Back to Map</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      `;
    }

    return `
      <div class="space-y-8 relative">
        <!-- Background Mascot Accent -->
        <div class="absolute -top-12 -right-4 w-32 h-32 opacity-10 pointer-events-none">
          <img src="https://dropshare.42web.io/1/files/n3cWyiNBjO.png" alt="Bolt" class="w-full h-full object-contain">
        </div>

        <header class="space-y-2 relative z-10">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">${this.challenge.difficulty}</span>
            <span class="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-[10px] font-bold uppercase tracking-widest">${this.challenge.points} XP</span>
          </div>
          <h1 class="text-4xl font-black text-on-surface tracking-tight">${this.challenge.title}</h1>
        </header>

        <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm relative z-10">
          <p class="text-on-surface leading-relaxed">${this.challenge.description}</p>
        </div>

        <div class="space-y-4 relative z-10">
          <div class="space-y-2">
            <label for="flag-input" class="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-2">Enter Flag</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined">flag</span>
              </div>
              <input type="text" id="flag-input" placeholder="FLAG{...}" 
                     class="w-full bg-surface-container-lowest border-2 border-outline-variant rounded-2xl pl-14 pr-6 py-5 font-mono focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none">
            </div>
          </div>
          
          ${this.error ? `<p class="text-error text-sm font-bold ml-2 animate-shake">${this.error}</p>` : ''}

          <button onclick="window.currentChallenge.submitFlag()" 
                  class="btn-primary w-full py-5 rounded-full font-black text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all ${this.isSubmitting ? 'opacity-70 cursor-wait' : ''}"
                  ${this.isSubmitting ? 'disabled' : ''}>
            ${this.isSubmitting ? '<div class="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>' : '<span>Submit Flag</span>'}
          </button>
        </div>

        <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 relative z-10">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-primary text-sm">lightbulb</span>
            <span class="text-xs font-bold uppercase tracking-widest text-primary">Hint</span>
          </div>
          <p class="text-sm text-on-surface-variant italic">${this.challenge.hint || 'No hints available for this challenge.'}</p>
        </div>
      </div>
    `;
  }

  afterRender() {
    window.currentChallenge = this;
  }
}
