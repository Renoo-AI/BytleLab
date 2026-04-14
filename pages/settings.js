import { state } from '../core/state.js';

export class Settings {
  render() {
    return `
      <div class="container animate-fade-in space-y-8 py-8">
        <header class="flex items-center gap-4">
          <button onclick="history.back()" class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 class="text-2xl font-black tracking-tight text-on-surface">Settings</h2>
        </header>

        <!-- Preferences Section -->
        <section class="space-y-4">
          <h3 class="text-xs font-black text-on-surface-variant uppercase tracking-widest px-2">Preferences</h3>
          <div class="bg-surface-container-low rounded-2xl overflow-hidden">
            <div class="flex items-center justify-between p-5 border-b border-outline-variant/10">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined">volume_up</span>
                </div>
                <div>
                  <p class="font-bold text-on-surface">Sound Effects</p>
                  <p class="text-xs text-on-surface-variant">Feedback sounds during labs</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div class="flex items-center justify-between p-5">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span class="material-symbols-outlined">vibration</span>
                </div>
                <div>
                  <p class="font-bold text-on-surface">Haptic Feedback</p>
                  <p class="text-xs text-on-surface-variant">Vibrate on success/error</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <!-- Account Section -->
        <section class="space-y-4">
          <h3 class="text-xs font-black text-on-surface-variant uppercase tracking-widest px-2">Account</h3>
          <div class="bg-surface-container-low rounded-2xl overflow-hidden">
            <button class="w-full flex items-center justify-between p-5 border-b border-outline-variant/10 group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <span class="material-symbols-outlined">mail</span>
                </div>
                <div class="text-left">
                  <p class="font-bold text-on-surface">Email Address</p>
                  <p class="text-xs text-on-surface-variant">${state.user?.email || 'Not set'}</p>
                </div>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
            <button class="w-full flex items-center justify-between p-5 group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <span class="material-symbols-outlined">lock</span>
                </div>
                <div class="text-left">
                  <p class="font-bold text-on-surface">Change Password</p>
                  <p class="text-xs text-on-surface-variant">Last changed 3 months ago</p>
                </div>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
          </div>
        </section>

        <!-- Danger Zone -->
        <section class="space-y-4">
          <h3 class="text-xs font-black text-error uppercase tracking-widest px-2">Danger Zone</h3>
          <div class="bg-error/5 border border-error/10 rounded-2xl overflow-hidden">
            <button onclick="app.logout()" class="w-full flex items-center gap-4 p-5 text-error group">
              <div class="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center">
                <span class="material-symbols-outlined">logout</span>
              </div>
              <span class="font-bold">Logout Session</span>
            </button>
          </div>
        </section>

        <footer class="text-center py-8 space-y-4">
          <img src="https://dropshare.42web.io/1/files/n3cWyiNBjO.png" alt="Question Mascot" class="w-24 h-24 mx-auto opacity-20 grayscale">
          <div class="space-y-1">
            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">ByteLearn v2.4.0</p>
            <p class="text-[10px] text-on-surface-variant/60">Made with ❤️ for the community</p>
          </div>
        </footer>
      </div>
    `;
  }
}
