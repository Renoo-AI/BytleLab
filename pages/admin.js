import { state } from '../core/state.js';
import { firestore } from '../core/firebase.js';

export class Admin {
  constructor() {
    this.activeTab = 'challenges';
  }

  render() {
    return `
      <div class="min-h-screen bg-[#0a051a] text-white animate-fade-in p-8">
        <div class="max-w-6xl mx-auto space-y-8">
          <!-- Header -->
          <header class="flex items-center justify-between">
            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-purple-400 text-3xl">admin_panel_settings</span>
                <h1 class="text-3xl font-black tracking-tighter uppercase">Creator Control Center</h1>
              </div>
              <p class="text-white/40 text-xs font-bold tracking-widest uppercase">System Override • Private Access</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 text-[10px] font-black uppercase tracking-widest">
                Admin Session Active
              </div>
              <button onclick="window.app.router.navigate('/')" class="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          </header>

          <!-- Tabs -->
          <nav class="flex items-center gap-2 p-1 bg-white/5 rounded-2xl w-fit">
            <button onclick="window.admin.setTab('challenges')" class="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${this.activeTab === 'challenges' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}">Challenges</button>
            <button onclick="window.admin.setTab('paths')" class="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${this.activeTab === 'paths' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}">Paths</button>
            <button onclick="window.admin.setTab('settings')" class="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${this.activeTab === 'settings' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}">App Settings</button>
          </nav>

          <!-- Content -->
          <main id="admin-content" class="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 min-h-[500px]">
            ${this.renderTabContent()}
          </main>
        </div>
      </div>
    `;
  }

  renderTabContent() {
    switch (this.activeTab) {
      case 'challenges':
        return this.renderChallenges();
      case 'paths':
        return this.renderPaths();
      case 'settings':
        return this.renderSettings();
      default:
        return '';
    }
  }

  renderChallenges() {
    return `
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-black uppercase tracking-tight">Manage Challenges</h2>
          <button onclick="window.admin.addChallenge()" class="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
            <span class="material-symbols-outlined text-sm">add</span>
            New Challenge
          </button>
        </div>
        
        <div class="grid grid-cols-1 gap-4" id="challenges-list">
          <div class="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <span class="material-symbols-outlined">code</span>
              </div>
              <div>
                <h4 class="font-black">View Source</h4>
                <p class="text-xs text-white/40">ID: web-basics-1 • Easy • 100 XP</p>
              </div>
            </div>
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="p-2 hover:text-purple-400 transition-colors"><span class="material-symbols-outlined">edit</span></button>
              <button class="p-2 hover:text-red-400 transition-colors"><span class="material-symbols-outlined">delete</span></button>
            </div>
          </div>
          <!-- More challenges would be mapped here -->
        </div>
      </div>
    `;
  }

  renderPaths() {
    return `
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-black uppercase tracking-tight">Learning Paths</h2>
          <button onclick="window.admin.addPath()" class="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
            <span class="material-symbols-outlined text-sm">add</span>
            New Path
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${state.progress.paths.map(path => `
            <div class="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <span class="material-symbols-outlined">${path.icon}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button class="p-2 hover:text-purple-400 transition-colors"><span class="material-symbols-outlined text-sm">edit</span></button>
                  <button class="p-2 hover:text-red-400 transition-colors"><span class="material-symbols-outlined text-sm">delete</span></button>
                </div>
              </div>
              <div>
                <h4 class="text-lg font-black">${path.title}</h4>
                <p class="text-xs text-white/40 uppercase tracking-widest font-bold">${path.difficulty} • ${path.lessons} Lessons</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderSettings() {
    return `
      <div class="space-y-12 max-w-2xl">
        <div class="space-y-6">
          <h2 class="text-xl font-black uppercase tracking-tight flex items-center gap-3">
            <span class="material-symbols-outlined text-purple-400">settings_applications</span>
            Global App Configuration
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-white/40 uppercase tracking-widest">Platform Name</label>
              <input type="text" id="app-name-input" value="${state.appName}" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all font-bold">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-white/40 uppercase tracking-widest">Version String</label>
              <input type="text" value="v2.4.0 PRO" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all font-bold opacity-50 cursor-not-allowed" readonly>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black text-white/40 uppercase tracking-widest">Platform Description</label>
            <textarea id="app-desc-input" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all font-medium h-24">A Duolingo-style cybersecurity learning platform for beginners.</textarea>
          </div>

          <div class="pt-4">
            <button onclick="window.admin.seedData()" class="px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-xs font-bold text-blue-400 hover:bg-blue-600/30 transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">database</span>
              Seed Initial Challenges & Flags
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="text-xl font-black uppercase tracking-tight flex items-center gap-3">
            <span class="material-symbols-outlined text-purple-400">palette</span>
            Visual Identity
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <p class="text-[10px] font-black text-white/40 uppercase tracking-widest">Primary Color</p>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-purple-600 shadow-lg shadow-purple-900/40"></div>
                <span class="font-mono text-xs font-bold">#7C3AED</span>
              </div>
            </div>
            <div class="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <p class="text-[10px] font-black text-white/40 uppercase tracking-widest">Surface Color</p>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#0a051a] border border-white/10"></div>
                <span class="font-mono text-xs font-bold">#0A051A</span>
              </div>
            </div>
            <div class="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <p class="text-[10px] font-black text-white/40 uppercase tracking-widest">Accent Color</p>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-fuchsia-500 shadow-lg shadow-fuchsia-900/40"></div>
                <span class="font-mono text-xs font-bold">#D946EF</span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="text-xl font-black uppercase tracking-tight flex items-center gap-3">
            <span class="material-symbols-outlined text-purple-400">smart_toy</span>
            Mascot Assets
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${['zVYAUZDpex', 'UlGS73JZET', 'yCYAur1GZq', 'Y1SVHlnZRG'].map(id => `
              <div class="aspect-square bg-white/5 border border-white/10 rounded-2xl p-4 group relative overflow-hidden">
                <img src="https://dropshare.42web.io/1/files/${id}.png" class="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity">
                <button class="absolute inset-0 bg-purple-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="text-[10px] font-black uppercase tracking-widest">Replace</span>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-8 border-t border-white/10">
          <button onclick="window.admin.saveSettings()" class="w-full bg-purple-600 hover:bg-purple-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-purple-900/40 active:scale-[0.98]">
            Commit System Overrides
          </button>
        </div>
      </div>
    `;
  }

  afterRender() {
    window.admin = {
      setTab: (tab) => {
        this.activeTab = tab;
        window.app.router.update();
      },
      saveSettings: async () => {
        const name = document.getElementById('app-name-input').value;
        const desc = document.getElementById('app-desc-input').value;
        try {
          await firestore.saveSettings({ appName: name, description: desc });
          alert(`System Update: Platform renamed to ${name}. Changes persisted to cloud.`);
        } catch (error) {
          alert('Failed to save settings: ' + error.message);
        }
      },
      seedData: async () => {
        if (!confirm('This will seed the database with initial challenges and flags. Continue?')) return;
        
        const challenges = [
          { id: 'web-basics-1', title: 'View Source', description: 'The flag is hidden in the HTML source code of this page. Can you find it?', hint: 'Right-click and select "View Page Source" or use DevTools (F12).', difficulty: 'Easy', points: 100, order: 0 },
          { id: 'web-basics-2', title: 'Hidden Comments', description: 'Developers often leave sensitive information in HTML comments. Find the comment containing the flag.', hint: 'Look for <!-- ... --> tags in the source.', difficulty: 'Easy', points: 100, order: 1 },
          { id: 'web-basics-3', title: 'Robots.txt', description: 'The robots.txt file tells search engines which pages they can or cannot visit. Sometimes it reveals hidden directories.', hint: 'Try navigating to /robots.txt', difficulty: 'Easy', points: 100, order: 2 },
          { id: 'input-tampering-1', title: 'URL Params', description: 'URL parameters can sometimes be manipulated to access unauthorized data. Try changing the \'id\' parameter in the URL.', hint: 'Look at the URL of the challenge page.', difficulty: 'Medium', points: 150, order: 3 },
          { id: 'input-tampering-2', title: 'Hidden Fields', description: 'HTML forms often use hidden input fields to store data that shouldn\'t be edited by the user. Can you find and modify one?', hint: 'Inspect the form elements in the DevTools.', difficulty: 'Medium', points: 150, order: 4 }
        ];

        const flags = {
          'web-basics-1': 'FLAG{web_basics_master}',
          'web-basics-2': 'FLAG{cookie_monster_123}',
          'web-basics-3': 'FLAG{hidden_in_plain_sight}',
          'input-tampering-1': 'FLAG{input_is_not_trusted}',
          'input-tampering-2': 'FLAG{client_side_is_a_lie}'
        };

        try {
          for (const c of challenges) {
            await firestore.saveChallenge(c.id, c);
          }
          for (const [id, flag] of Object.entries(flags)) {
            await firestore.saveFlag(id, flag);
          }
          alert('Database seeded successfully!');
        } catch (error) {
          alert('Seed failed: ' + error.message);
        }
      },
      addChallenge: () => {
        alert('Challenge Creator: This feature is restricted to the Root Administrator.');
      },
      addPath: () => {
        alert('Path Creator: This feature is restricted to the Root Administrator.');
      }
    };
  }
}
