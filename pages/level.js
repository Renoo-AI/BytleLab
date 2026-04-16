import { state } from '../core/state.js';
import { engine } from '../core/engine.js';
import { firestore } from '../core/firebase.js';

export class Level {
  constructor(params) {
    this.world = parseInt(params.world);
    this.step = parseInt(params.step);
    this.levelId = `${this.world}.${this.step}`;
    this.level = null;
    this.isLoading = true;
    this.isSubmitting = false;
    this.error = null;
    this.success = false;
  }

  async onMount() {
    // 1. Load level data
    this.level = await firestore.getLevel(this.levelId);
    
    if (!this.level) {
      this.error = "Level not found.";
      this.isLoading = false;
      this.updateUI();
      return;
    }

    // 2. Progression Check
    if (this.levelId !== "0.0") {
      const prevStep = this.step - 1;
      const prevId = `${this.world}.${prevStep}`;
      
      // Special case: 0.0 doesn't require completion, but others do
      if (prevStep >= 0 && !state.user?.completed?.includes(prevId) && prevId !== "0.0") {
        // Find last unlocked level
        const completed = state.user?.completed || [];
        let lastUnlocked = "0.0";
        // Simple logic for now: find highest step in current world
        const worldLevels = completed.filter(id => id.startsWith(`${this.world}.`));
        if (worldLevels.length > 0) {
          const steps = worldLevels.map(id => parseInt(id.split('.')[1]));
          const maxStep = Math.max(...steps);
          lastUnlocked = `${this.world}.${maxStep + 1}`;
        } else {
          lastUnlocked = "0.1"; // 0.0 is always open, so 0.1 is the first "locked" one
        }
        
        window.app.router.navigate(`/levels/${this.world}/${lastUnlocked.split('.')[1]}`);
        return;
      }
    }

    this.isLoading = false;
    this.updateUI();
  }

  updateUI() {
    const container = document.getElementById('level-container');
    if (container) container.innerHTML = this.renderContent();
  }

  async handleAction() {
    if (this.level.type === 'entry') {
      this.completeLevel();
      return;
    }

    // For other levels, we might need a flag or specific action
    const input = document.getElementById('level-input');
    if (!input || this.isSubmitting) return;

    this.isSubmitting = true;
    this.error = null;
    this.updateUI();

    const value = input.value.trim();
    const isValid = await engine.validateLevel(this.world, this.step, value);

    this.isSubmitting = false;
    if (isValid) {
      this.success = true;
      this.updateUI();
    } else {
      this.error = "Access Denied. Invalid credentials or payload.";
      this.updateUI();
    }
  }

  async completeLevel() {
    this.success = true;
    this.updateUI();

    // The backend now handles progression, but we can call it for 0.0 which is an 'entry' level
    if (this.level.type === 'entry') {
      await engine.validateLevel(this.world, this.step, '');
    }
  }

  render() {
    setTimeout(() => this.onMount(), 100);

    return `
      <div id="level-container" class="min-h-screen bg-[#0a0a0a] text-[#00ff00] font-mono p-4 md:p-8">
        <div class="flex items-center justify-center h-[60vh]">
          <div class="space-y-4 text-center">
            <div class="w-12 h-12 border-2 border-[#00ff00] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p class="text-xs uppercase tracking-[0.3em]">Initializing System...</p>
          </div>
        </div>
      </div>
    `;
  }

  renderContent() {
    if (this.isLoading) {
      return `
        <div class="flex items-center justify-center h-[60vh]">
          <div class="space-y-4 text-center">
            <div class="w-12 h-12 border-2 border-[#00ff00] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p class="text-xs uppercase tracking-[0.3em]">Loading Level ${this.levelId}...</p>
          </div>
        </div>
      `;
    }

    if (this.error) {
      return `
        <div class="max-w-2xl mx-auto space-y-8 py-20">
          <div class="border border-red-500/50 bg-red-500/10 p-8 rounded-lg text-center space-y-4">
            <span class="material-symbols-outlined text-5xl text-red-500">error</span>
            <h2 class="text-2xl font-black text-red-500 uppercase tracking-tighter">System Error</h2>
            <p class="text-red-400 font-medium">${this.error}</p>
            <button onclick="window.app.router.navigate('/')" class="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase text-xs font-bold">Return to Base</button>
          </div>
        </div>
      `;
    }

    if (this.success) {
      const nextStep = this.step + 1;
      return `
        <div class="max-w-2xl mx-auto space-y-12 py-20 animate-fade-in">
          <div class="text-center space-y-6">
            <div class="w-24 h-24 bg-[#00ff00]/20 rounded-full flex items-center justify-center mx-auto border border-[#00ff00]/50 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
              <span class="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <div class="space-y-2">
              <h2 class="text-4xl font-black uppercase tracking-tighter">Level Cleared</h2>
              <p class="text-[#00ff00]/60 font-medium">Progression updated. System access granted.</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="border border-[#00ff00]/20 p-6 rounded-xl bg-[#00ff00]/5 text-center">
              <div class="text-[10px] uppercase tracking-widest opacity-50 mb-1">XP Earned</div>
              <div class="text-2xl font-black">+${this.level.points || 100}</div>
            </div>
            <div class="border border-[#00ff00]/20 p-6 rounded-xl bg-[#00ff00]/5 text-center">
              <div class="text-[10px] uppercase tracking-widest opacity-50 mb-1">Status</div>
              <div class="text-2xl font-black">UNLOCKED</div>
            </div>
          </div>

          <button onclick="window.app.router.navigate('/levels/${this.world}/${nextStep}')" class="w-full py-5 bg-[#00ff00] text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#00cc00] transition-all active:scale-95 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            Initialize Next Step
          </button>
        </div>
      `;
    }

    return `
      <div class="max-w-4xl mx-auto space-y-12 py-8 animate-fade-in">
        <!-- Header -->
        <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#00ff00]/20 pb-8">
          <div class="space-y-2">
            <div class="flex items-center gap-3 text-[#00ff00]/60">
              <span class="text-xs font-bold uppercase tracking-widest">World ${this.world}</span>
              <span class="w-1 h-1 bg-[#00ff00]/30 rounded-full"></span>
              <span class="text-xs font-bold uppercase tracking-widest">Step ${this.step}</span>
            </div>
            <h1 class="text-5xl font-black uppercase tracking-tighter">${this.level.title}</h1>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <div class="text-[10px] uppercase tracking-widest opacity-50">System Integrity</div>
              <div class="text-xl font-black">98.4%</div>
            </div>
            <div class="w-12 h-12 border border-[#00ff00]/20 rounded-lg flex items-center justify-center">
              <span class="material-symbols-outlined">security</span>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2 space-y-8">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-black uppercase tracking-widest text-[#00ff00]/60">Lab Environment</h3>
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse"></span>
                  <span class="text-[10px] font-bold uppercase tracking-widest opacity-50">Live Instance</span>
                </div>
              </div>
              <div class="aspect-video bg-black border-2 border-[#00ff00]/20 rounded-2xl overflow-hidden relative group">
                <iframe src="/levels/${this.world}/${this.step}/index.html" class="w-full h-full border-none" id="lab-iframe"></iframe>
                <div class="absolute inset-0 pointer-events-none border border-[#00ff00]/5 group-hover:border-[#00ff00]/20 transition-all"></div>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-xs font-black uppercase tracking-widest text-[#00ff00]/60">Briefing</h3>
              <div class="bg-[#00ff00]/5 border border-[#00ff00]/10 p-8 rounded-2xl leading-relaxed text-lg">
                ${this.level.description}
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-xs font-black uppercase tracking-widest text-[#00ff00]/60">Terminal Input</h3>
              <div class="space-y-4">
                ${this.level.type === 'entry' ? `
                  <button onclick="window.currentLevel.handleAction()" class="w-full py-6 border-2 border-[#00ff00] text-[#00ff00] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#00ff00] hover:text-black transition-all active:scale-95">
                    Initialize Connection
                  </button>
                ` : `
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-6 flex items-center pointer-events-none text-[#00ff00]/40 group-focus-within:text-[#00ff00] transition-colors">
                      <span class="material-symbols-outlined">terminal</span>
                    </div>
                    <input type="text" id="level-input" placeholder="Enter override code..." 
                           class="w-full bg-black border-2 border-[#00ff00]/20 rounded-2xl pl-16 pr-8 py-6 focus:border-[#00ff00] focus:ring-4 focus:ring-[#00ff00]/10 transition-all outline-none text-xl font-bold">
                  </div>
                  ${this.error ? `<p class="text-red-500 text-sm font-bold ml-2 animate-shake">${this.error}</p>` : ''}
                  <button onclick="window.currentLevel.handleAction()" 
                          class="w-full py-6 bg-[#00ff00] text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#00cc00] transition-all active:scale-95 shadow-[0_0_20px_rgba(0,255,0,0.2)] ${this.isSubmitting ? 'opacity-70 cursor-wait' : ''}"
                          ${this.isSubmitting ? 'disabled' : ''}>
                    ${this.isSubmitting ? '<div class="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>' : 'Execute Payload'}
                  </button>
                `}
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-8">
            <div class="border border-[#00ff00]/10 rounded-2xl p-6 space-y-6">
              <div class="space-y-4">
                <h4 class="text-[10px] font-black uppercase tracking-widest opacity-50">Network Status</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center text-xs">
                    <span>Latency</span>
                    <span class="font-bold">14ms</span>
                  </div>
                  <div class="flex justify-between items-center text-xs">
                    <span>Encryption</span>
                    <span class="font-bold text-blue-400">AES-256</span>
                  </div>
                  <div class="flex justify-between items-center text-xs">
                    <span>Uptime</span>
                    <span class="font-bold">99.99%</span>
                  </div>
                </div>
              </div>

              <div class="h-px bg-[#00ff00]/10"></div>

              <div class="space-y-4">
                <h4 class="text-[10px] font-black uppercase tracking-widest opacity-50">System Logs</h4>
                <div class="font-mono text-[10px] space-y-1 opacity-40">
                  <p>> Connection established</p>
                  <p>> Handshake successful</p>
                  <p>> Awaiting authorization...</p>
                </div>
              </div>
            </div>

            <div class="bg-[#00ff00]/5 border border-[#00ff00]/10 rounded-2xl p-6 space-y-3">
              <div class="flex items-center gap-2 text-[#00ff00]">
                <span class="material-symbols-outlined text-sm">lightbulb</span>
                <span class="text-[10px] font-black uppercase tracking-widest">Hint</span>
              </div>
              <p class="text-xs leading-relaxed opacity-70 italic">
                ${this.level.hint || 'No hints available for this step. Use your intuition.'}
              </p>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  afterRender() {
    window.currentLevel = this;
    
    // Listen for messages from the lab iframe
    window.addEventListener('message', async (event) => {
      if (event.data?.type === 'LEVEL_COMPLETE') {
        const { world, step, value } = event.data;
        if (world === this.world && step === this.step && !this.success) {
          console.log(`Received completion signal for ${world}.${step}`);
          const isValid = await engine.validateLevel(this.world, this.step, value || '');
          if (isValid) {
            this.success = true;
            this.updateUI();
          }
        }
      }
    });
  }
}
