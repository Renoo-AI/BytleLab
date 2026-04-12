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
      <div class="container animate-fade-in space-y-8">
        <!-- Profile Header Section -->
        <section class="relative flex flex-col items-center text-center">
          <div class="relative group">
            <div class="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-primary-container shadow-xl">
              <div class="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center overflow-hidden">
                <img src="${state.user.avatar}" alt="User Profile" class="w-full h-full object-cover">
              </div>
            </div>
            <div class="absolute -bottom-2 -right-2 bg-tertiary-container text-on-tertiary-container text-xs font-bold px-3 py-1 rounded-full shadow-md border-4 border-surface">
              Rank ${state.user.level}
            </div>
          </div>
          <div class="mt-6 space-y-1">
            <h2 class="text-3xl font-extrabold tracking-tight text-on-surface">${state.user.name}</h2>
            <p class="text-on-surface-variant font-medium">${state.user.rank}</p>
          </div>
        </section>

        <!-- Stats Summary -->
        <section class="grid grid-cols-2 gap-4">
          <div class="bg-surface-container-low p-6 rounded-xl flex flex-col items-center justify-center space-y-1">
            <span class="text-primary font-black text-2xl tracking-tight">${state.user.xp}</span>
            <span class="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Total XP</span>
          </div>
          <div class="bg-surface-container-low p-6 rounded-xl flex flex-col items-center justify-center space-y-1">
            <span class="text-primary font-black text-2xl tracking-tight">${state.user.flags}</span>
            <span class="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Total Flags</span>
          </div>
        </section>

        <!-- Achievements Section -->
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-on-surface">Achievements</h3>
            <button class="text-primary text-sm font-bold">View All</button>
          </div>
          <div class="flex overflow-x-auto gap-4 no-scrollbar pb-2">
            ${this.renderAchievements()}
          </div>
        </section>

        <!-- Action List -->
        <section class="bg-surface-container-lowest rounded-xl p-2 space-y-1">
          <button onclick="const sid = prompt('Enter Session ID from PC:'); if(sid) window.app.approveSession(sid)" class="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 transition-colors rounded-lg group border border-primary/10">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">qr_code_scanner</span>
              </div>
              <div class="text-left">
                <span class="block font-bold text-primary">Scan PC QR</span>
                <span class="text-[10px] text-primary/60 uppercase font-black tracking-widest">Authorize Session</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
          
          <button class="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors rounded-lg group">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">person_edit</span>
              </div>
              <span class="font-semibold text-on-surface">Edit Profile</span>
            </div>
            <span class="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
          <button class="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors rounded-lg group">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">military_tech</span>
              </div>
              <span class="font-semibold text-on-surface">Achievements</span>
            </div>
            <span class="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        </section>
      </div>
    `;
  }

  renderAchievements() {
    const achievements = [
      { id: 'first-flag', title: 'First Flag', icon: 'flag', color: 'tertiary' },
      { id: 'streak-7', title: '7-Day Streak', icon: 'bolt', color: 'secondary' },
      { id: 'web-novice', title: 'Web Novice', icon: 'public', color: 'primary' }
    ];

    return achievements.map(ach => `
      <div class="flex-shrink-0 w-28 flex flex-col items-center space-y-2">
        <div class="w-20 h-20 rounded-full bg-${ach.color}-container/30 flex items-center justify-center">
          <span class="material-symbols-outlined text-${ach.color} text-4xl" style="font-variation-settings: 'FILL' 1;">${ach.icon}</span>
        </div>
        <span class="text-[11px] font-bold text-center leading-tight">${ach.title}</span>
      </div>
    `).join('');
  }
}
