import { state } from '../core/state.js';

export class BoltPage {
  render() {
    return `
      <div class="container animate-fade-in flex flex-col h-full">
        <!-- Mascot Section -->
        <div class="relative flex flex-col items-center mt-8 mb-12">
          <div class="w-32 h-32 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center shadow-xl relative z-10">
            <span class="material-symbols-outlined text-white text-6xl" style="font-variation-settings: 'FILL' 1;">bolt</span>
          </div>
          <div class="absolute -top-4 -right-2 bg-tertiary-container p-2 rounded-full rotate-12 shadow-sm">
            <span class="material-symbols-outlined text-on-tertiary-container">auto_awesome</span>
          </div>
        </div>

        <!-- Messages Container -->
        <div class="space-y-6 flex-1">
          <div class="flex flex-col items-start max-w-[85%]">
            <div class="bg-surface-container-low p-6 rounded-xl rounded-tl-none relative shadow-sm">
              <p class="text-lg leading-relaxed font-medium text-on-surface">
                Hi ${state.user.name}! I'm here to help. Stuck on a challenge or just want to learn something new?
              </p>
            </div>
            <span class="mt-2 ml-1 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Bolt • Just now</span>
          </div>

          <!-- Quick Suggestions -->
          <div class="flex flex-wrap gap-3 mt-4">
            <button class="px-5 py-3 bg-white hover:bg-surface-container-highest border border-outline-variant/20 rounded-full text-primary font-semibold transition-all active:scale-95 text-sm shadow-sm">
              How do flags work?
            </button>
            <button class="px-5 py-3 bg-white hover:bg-surface-container-highest border border-outline-variant/20 rounded-full text-primary font-semibold transition-all active:scale-95 text-sm shadow-sm">
              Explain URL parameters
            </button>
            <button class="px-5 py-3 bg-white hover:bg-surface-container-highest border border-outline-variant/20 rounded-full text-primary font-semibold transition-all active:scale-95 text-sm shadow-sm">
              Give me a hint
            </button>
          </div>
        </div>

        <!-- Sticky Input Area (Fixed at bottom of page content) -->
        <div class="mt-12 w-full bg-surface-container-lowest/90 backdrop-blur-xl p-2 rounded-xl shadow-2xl flex items-center gap-2 border border-outline-variant/10">
          <input class="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 font-medium" placeholder="Ask Bolt anything..." type="text"/>
          <button class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-lg hover:brightness-110 active:translate-y-1 transition-all">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">send</span>
          </button>
        </div>
      </div>
    `;
  }
}
