import { state } from '../core/state.js';
import { firestore } from '../core/firebase.js';

export class Home {
  constructor() {
    this.leaderboard = [];
    this.challenges = [];
    this.isLoadingLeaderboard = true;
    this.isLoadingChallenges = true;
  }

  async onMount() {
    this.leaderboard = await firestore.getLeaderboard(5);
    this.isLoadingLeaderboard = false;
    
    this.challenges = await firestore.getChallenges();
    this.isLoadingChallenges = false;

    const lbContainer = document.getElementById('leaderboard-container');
    if (lbContainer) lbContainer.innerHTML = this.renderLeaderboard();

    const tracksContainer = document.getElementById('tracks-container');
    if (tracksContainer) tracksContainer.innerHTML = this.renderTracks();
  }

  render() {
    if (!state.user) {
      return `
        <div class="container animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-on-surface-variant font-medium">Loading your profile...</p>
        </div>
      `;
    }

    setTimeout(() => this.onMount(), 100);

    const currentPath = this.challenges.find(p => p.id === state.progress.currentPathId) || this.challenges[0] || { title: 'No Active Mission', icon: 'terminal' };
    const isCompleted = state.user?.completed?.includes(currentPath.id);
    const progress = isCompleted ? 100 : 0;

    return `
      <div class="container animate-fade-in space-y-10 py-8">
        <!-- Header Section -->
        <header class="flex justify-between items-end border-b border-outline-variant pb-6 relative">
          <div class="absolute -top-12 -left-4 w-24 h-24 opacity-10 pointer-events-none">
            <img src="https://dropshare.42web.io/1/files/yCYAur1GZq.png" alt="Welcome Mascot" class="w-full h-full object-contain">
          </div>
          <div class="space-y-1">
            <h1 class="text-4xl font-black tracking-tighter text-on-surface">Console.</h1>
            <p class="text-on-surface-variant font-mono text-xs uppercase tracking-widest">User: ${state.user.name} | Session: Active</p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-mono font-black text-primary">${state.user.xp || 0}</div>
            <div class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total XP Earned</div>
          </div>
        </header>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Active Path Card -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span class="material-symbols-outlined text-[160px]">${currentPath.icon || 'terminal'}</span>
              </div>
              
              <div class="relative z-10 space-y-8">
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-primary">
                    <span class="material-symbols-outlined text-sm">terminal</span>
                    <span class="text-xs font-bold uppercase tracking-widest">Active Mission</span>
                  </div>
                  <h2 class="text-3xl font-black text-on-surface tracking-tight">${currentPath.title}</h2>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-end font-mono text-xs">
                    <span class="text-on-surface-variant uppercase tracking-widest">Progress Analysis</span>
                    <span class="text-primary font-bold">${progress}%</span>
                  </div>
                  <div class="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div class="h-full bg-primary transition-all duration-1000" style="width: ${progress}%"></div>
                  </div>
                </div>

                <a href="/paths" data-link class="inline-flex items-center gap-3 bg-on-surface text-surface px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95">
                  <span>Resume Operations</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 flex flex-col justify-between h-32">
                <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Level Status</span>
                <div class="text-3xl font-black text-on-surface">${state.user.level}</div>
              </div>
              <div class="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 flex flex-col justify-between h-32">
                <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Flags Captured</span>
                <div class="text-3xl font-black text-on-surface">${state.user.flags || 0}</div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            <!-- Leaderboard -->
            <div class="space-y-4">
              <div class="flex items-center justify-between px-2">
                <h3 class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Global Leaderboard</h3>
                <span class="material-symbols-outlined text-sm text-on-surface-variant">leaderboard</span>
              </div>
              <div id="leaderboard-container" class="space-y-2">
                ${this.renderLeaderboard()}
              </div>
            </div>

            <!-- Categories -->
            <div class="space-y-4">
              <div class="flex items-center justify-between px-2">
                <h3 class="text-xs font-black text-on-surface-variant uppercase tracking-widest">Available Tracks</h3>
                <a href="/paths" data-link class="text-[10px] font-bold text-primary uppercase hover:underline">View All</a>
              </div>
              
              <div id="tracks-container" class="space-y-3">
                ${this.renderTracks()}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderTracks() {
    if (this.isLoadingChallenges) {
      return `
        <div class="p-4 text-center">
          <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <span class="text-[10px] text-on-surface-variant uppercase font-bold">Loading Tracks...</span>
        </div>
      `;
    }

    if (this.challenges.length === 0) {
      return `<p class="text-xs text-on-surface-variant italic px-2">No tracks available.</p>`;
    }

    return this.challenges.slice(0, 3).map(path => `
      <a href="/paths" data-link class="flex items-center gap-4 p-4 bg-surface-container-low border border-outline-variant/20 rounded-xl hover:border-primary/30 transition-all group">
        <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-xl">${path.icon || 'terminal'}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-bold text-on-surface truncate">${path.title}</div>
          <div class="text-[10px] text-on-surface-variant uppercase tracking-tighter">${path.difficulty}</div>
        </div>
        <span class="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors">chevron_right</span>
      </a>
    `).join('');
  }

  renderLeaderboard() {
    if (this.isLoadingLeaderboard) {
      return `
        <div class="p-4 text-center">
          <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <span class="text-[10px] text-on-surface-variant uppercase font-bold">Syncing...</span>
        </div>
      `;
    }

    if (this.leaderboard.length === 0) {
      return `<p class="text-xs text-on-surface-variant italic px-2">No public agents found.</p>`;
    }

    return this.leaderboard.map((user, index) => `
      <div class="flex items-center gap-3 p-3 bg-surface-container-low border border-outline-variant/10 rounded-xl">
        <div class="w-6 h-6 flex items-center justify-center font-mono text-xs font-bold ${index === 0 ? 'text-primary' : 'text-on-surface-variant'}">
          ${index + 1}
        </div>
        <img src="${user.avatar}" class="w-8 h-8 rounded-full border border-outline-variant/20" alt="${user.name}">
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold text-on-surface truncate">${user.name}</div>
          <div class="text-[10px] text-on-surface-variant font-mono">${user.xp} XP</div>
        </div>
      </div>
    `).join('');
  }
}
