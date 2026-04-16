import { state } from '../core/state.js';

export class Profile {
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
      <div class="container animate-fade-in space-y-10 py-8">
        <!-- Profile Header -->
        <section class="relative">
          <div class="bg-surface-container-low rounded-2xl p-8 flex flex-col items-center text-center space-y-4 overflow-hidden relative">
            <!-- Mascot Background -->
            <div class="absolute -top-6 -right-6 w-32 h-32 opacity-10 rotate-12">
              <img src="https://dropshare.42web.io/1/files/UlGS73JZET.png" alt="Rich Mascot" class="w-full h-full object-contain">
            </div>
            
            <div class="relative">
              <div class="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-primary-container shadow-xl">
                <div class="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center overflow-hidden border-4 border-surface">
                  <img src="${state.user.avatar}" alt="User Profile" class="w-full h-full object-cover">
                </div>
              </div>
              <div class="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-surface">
                LVL ${state.user.level}
              </div>
            </div>

            <div class="space-y-1">
              <h2 class="text-2xl font-black tracking-tight text-on-surface">${state.user.name}</h2>
              <p class="text-sm text-on-surface-variant font-medium">${state.user.rank}</p>
            </div>

            <div class="flex gap-2">
              <button class="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-[0_4px_0_#32284f] active:translate-y-1 transition-all">
                Edit Profile
              </button>
              <button class="bg-surface-container-highest text-on-surface-variant text-xs font-bold px-6 py-2.5 rounded-full active:translate-y-1 transition-all">
                Settings
              </button>
            </div>
          </div>
        </section>

        <!-- Stats Grid -->
        <section class="grid grid-cols-3 gap-4">
          <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center text-center">
            <span class="text-xl font-black text-primary">${state.user.xp}</span>
            <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">XP</span>
          </div>
          <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center text-center">
            <span class="text-xl font-black text-secondary">${state.user.flags || 0}</span>
            <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Flags</span>
          </div>
          <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center text-center">
            <span class="text-xl font-black text-tertiary">${state.user?.completed?.length || 0}</span>
            <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Missions</span>
          </div>
        </section>

        <!-- Achievements -->
        <section class="space-y-4">
          <div class="flex items-center justify-between px-2">
            <h3 class="font-bold text-on-surface">Achievements</h3>
            <span class="text-xs font-bold text-primary">View All</span>
          </div>
          <div class="grid grid-cols-4 gap-4">
            ${this.renderAchievements()}
          </div>
        </section>

        <!-- Account Actions -->
        <section class="space-y-3">
          <button class="w-full flex items-center justify-between p-4 rounded-xl bg-surface-container-low group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <span class="material-symbols-outlined">qr_code_2</span>
              </div>
              <span class="font-bold text-on-surface">Login on PC</span>
            </div>
            <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
          <button class="w-full flex items-center justify-between p-4 rounded-xl bg-surface-container-low group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-error/10 group-hover:text-error transition-colors">
                <span class="material-symbols-outlined">logout</span>
              </div>
              <span class="font-bold text-on-surface">Logout</span>
            </div>
            <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
        </section>
      </div>
    `;
  }

  renderAchievements() {
    const achievements = [
      { id: 'first-flag', title: 'First Contact', icon: 'flag' },
      { id: 'streak-7', title: 'Consistent', icon: 'bolt' },
      { id: 'web-novice', title: 'Web Novice', icon: 'public' },
      { id: 'locked', title: 'Locked', icon: 'lock', locked: true }
    ];

    return achievements.map(ach => `
      <div class="flex flex-col items-center gap-2">
        <div class="w-14 h-14 rounded-2xl ${ach.locked ? 'bg-surface-container-highest/50 grayscale' : 'bg-surface-container-highest'} flex items-center justify-center text-on-surface-variant">
          <span class="material-symbols-outlined ${ach.locked ? 'text-xl opacity-30' : 'text-2xl'}">${ach.icon}</span>
        </div>
        <span class="text-[8px] font-black text-center uppercase tracking-widest text-on-surface-variant truncate w-full">${ach.title}</span>
      </div>
    `).join('');

  }
}
