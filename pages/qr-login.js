import { firestore } from '../core/firebase.js';
import qrcode from 'qrcode-generator';

export class QRLogin {
  constructor() {
    this.sessionId = Math.random().toString(36).substring(2, 15);
    this.unsubscribe = null;
  }

  async onMount() {
    const qrContainer = document.getElementById('qr-code-area');
    const sessionIdDisplay = document.getElementById('session-id-display');
    if (!qrContainer) return;

    // 1. Create session in Firestore
    await firestore.createSession(this.sessionId);
    if (sessionIdDisplay) sessionIdDisplay.textContent = this.sessionId;

    // 2. Expiration timer (2 minutes)
    this.expirationTimer = setTimeout(async () => {

      if (this.unsubscribe) this.unsubscribe();
      if (qrContainer) {
        qrContainer.innerHTML = `
          <div class="flex flex-col items-center gap-2 text-on-surface-variant">
            <span class="material-symbols-outlined text-4xl">timer_off</span>
            <p class="text-xs font-bold uppercase tracking-widest">Expired</p>
            <button onclick="window.location.reload()" class="text-primary font-bold text-xs hover:underline">Refresh</button>
          </div>
        `;
      }
    }, 120000);

    // 3. Generate QR Code
    const qr = qrcode(0, 'M');
    qr.addData(JSON.stringify({
      type: 'bytelearn-auth',
      sessionId: this.sessionId
    }));
    qr.make();
    qrContainer.innerHTML = qr.createImgTag(6);

    // 3. Listen for approval
    this.unsubscribe = firestore.listenToSession(this.sessionId, async (data) => {
      if (data.status === 'approved' && data.userId) {

        
        // Use userData from session if available (PC is not authenticated)
        let userData = data.userData;
        
        if (!userData) {
          try {
            userData = await firestore.getUserData(data.userId);
          } catch (e) {
            console.error('Failed to fetch user data directly:', e);
          }
        }
        
        if (userData) {
          window.app.onLoginSuccess(data.userId, userData);
        } else {
          console.error('No user data available for session');
        }
      }
    });
  }

  onUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    if (this.expirationTimer) clearTimeout(this.expirationTimer);
  }

  render() {
    // Auto-trigger onMount after a short delay to ensure DOM is ready
    setTimeout(() => this.onMount(), 100);

    return `
      <div class="auth-page-bg container animate-fade-in flex flex-col items-center min-h-screen overflow-hidden relative">
        <!-- Top App Bar -->
        <header class="w-full top-0 flex items-center justify-center px-6 py-8 relative z-10">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings: 'FILL' 1">shield_with_heart</span>
            <span class="text-2xl font-bold bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent tracking-tight leading-relaxed font-headline">ByteLearn</span>
          </div>
        </header>

        <main class="w-full px-6 pb-12 flex flex-col grow justify-center items-center text-center">
          <div class="relative mb-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <span class="material-symbols-outlined text-sm">desktop_windows</span>
              PC Authorization
            </div>
            <h1 class="text-4xl font-extrabold text-on-surface tracking-tight mb-2">Scan QR to Login</h1>
            <p class="text-on-surface-variant font-medium">Use the ByteLearn mobile app to authorize this session.</p>
          </div>

          <!-- QR Code Area -->
          <div class="relative group mb-8">
            <div class="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-xl group-hover:bg-primary/10 transition-all duration-500"></div>
            <div class="relative bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-2xl border-2 border-primary/10 flex items-center justify-center overflow-hidden">
              <div id="qr-code-area" class="w-48 h-48 flex items-center justify-center relative z-10">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
              <!-- Decorative corner accents -->
              <div class="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary/20 rounded-tl-xl"></div>
              <div class="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary/20 rounded-tr-xl"></div>
              <div class="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary/20 rounded-bl-xl"></div>
              <div class="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary/20 rounded-br-xl"></div>
            </div>
          </div>

          <div class="mb-10 w-full max-w-xs">
            <p class="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-3 opacity-60">Secure Session ID</p>
            <div id="session-id-display" class="relative group">
              <div class="absolute inset-0 bg-primary/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative px-6 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl font-mono font-black text-primary tracking-[0.3em] text-lg shadow-inner flex items-center justify-center">
                Generating...
              </div>
            </div>
          </div>

          <div class="space-y-4 w-full max-w-xs">
            <div class="flex items-center gap-4 py-4">
              <div class="h-[1px] grow bg-outline-variant opacity-30"></div>
              <span class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Instructions</span>
              <div class="h-[1px] grow bg-outline-variant opacity-30"></div>
            </div>

            <div class="grid grid-cols-1 gap-3 text-left">
              <div class="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">1</div>
                <p class="text-sm font-medium text-on-surface">Open ByteLearn on your phone</p>
              </div>
              <div class="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">2</div>
                <p class="text-sm font-medium text-on-surface">Go to Profile > Scan PC QR</p>
              </div>
            </div>
          </div>
        </main>

        <footer class="w-full py-8 mt-auto text-center">
          <p class="text-on-surface-variant font-medium">
            Don't have the app? 
            <a href="/signup" data-link class="text-primary font-bold hover:underline transition-all cursor-pointer">Download Now</a>
          </p>
        </footer>
      </div>
    `;
  }
}
