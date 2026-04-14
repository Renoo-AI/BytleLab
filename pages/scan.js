export class Scan {
  render() {
    return `
      <div class="min-h-screen bg-on-surface flex flex-col animate-fade-in">
        <!-- Header -->
        <header class="p-6 flex items-center justify-between text-surface">
          <button onclick="history.back()" class="w-10 h-10 rounded-full bg-surface/10 flex items-center justify-center">
            <span class="material-symbols-outlined">close</span>
          </button>
          <h2 class="font-black tracking-tight">Scan QR Code</h2>
          <button class="w-10 h-10 rounded-full bg-surface/10 flex items-center justify-center">
            <span class="material-symbols-outlined">flashlight_on</span>
          </button>
        </header>

        <!-- Scanner Area -->
        <div class="flex-1 flex flex-col items-center justify-center p-8 relative">
          <div class="w-72 h-72 border-2 border-primary/50 rounded-3xl relative overflow-hidden">
            <!-- Scanning Animation Line -->
            <div class="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_#6200ee] animate-scan"></div>
            
            <!-- Corner Accents -->
            <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
            <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
            <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
            
            <!-- Camera Placeholder -->
            <div class="w-full h-full bg-surface-container-highest/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-6xl text-surface/20">qr_code_scanner</span>
            </div>
          </div>

          <div class="mt-12 text-center space-y-2">
            <p class="text-surface font-bold text-lg">Align QR Code</p>
            <p class="text-surface/60 text-sm max-w-[200px]">Position the QR code inside the frame to login automatically.</p>
          </div>
        </div>

        <!-- Mascot Tip -->
        <div class="p-8">
          <div class="bg-surface/5 rounded-2xl p-4 flex items-center gap-4 border border-surface/10">
            <div class="w-12 h-12 flex-shrink-0">
              <img src="https://dropshare.42web.io/1/files/6hcKiTzMV7.png" alt="Mechanic Mascot" class="w-full h-full object-contain">
            </div>
            <p class="text-xs text-surface/80 font-medium">Tip: Make sure you're scanning the code shown on your PC screen.</p>
          </div>
        </div>
      </div>
    `;
  }
}
