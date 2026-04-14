/* global GEMINI_API_KEY */
import { state } from '../core/state.js';
import { GoogleGenAI } from "@google/genai";

export class BoltPage {
  constructor() {
    this.messages = [
      {
        role: 'assistant',
        content: `Hi ${state.user.name}! I'm Bolt, your cybersecurity mentor. Stuck on a challenge or just want to learn something new?`,
        timestamp: 'Just now'
      }
    ];
    this.isTyping = false;
    
    // Initialize Gemini
    try {
      // Use process.env.GEMINI_API_KEY as per Vite/React guidelines in the skill
      const apiKey = typeof GEMINI_API_KEY !== 'undefined' ? GEMINI_API_KEY : process.env.GEMINI_API_KEY;
      this.ai = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.error("Gemini initialization failed:", e);
    }
  }

  afterRender() {
    const input = document.getElementById('bolt-input');
    const sendBtn = document.getElementById('bolt-send');
    const suggestions = document.querySelectorAll('.suggestion-btn');

    const handleSend = () => {
      const text = input.value.trim();
      if (text) {
        this.sendMessage(text);
        input.value = '';
      }
    };

    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', handleSend);
    }

    suggestions.forEach(btn => {
      btn.addEventListener('click', () => {
        this.sendMessage(btn.textContent.trim());
      });
    });

    this.scrollToBottom();
  }

  async sendMessage(text) {
    if (this.isTyping) return;

    // Add user message
    this.messages.push({
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.isTyping = true;
    this.updateUI();

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: this.messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are Bolt, a helpful AI assistant for ByteLearn, a cybersecurity learning platform. You help beginners understand security concepts, explain flags, and provide hints for challenges. Keep your tone encouraging, technical but accessible, and slightly futuristic. Use markdown for formatting. If asked about a specific challenge, give a hint rather than the direct answer.",
        }
      });

      const aiText = response.text;
      
      this.messages.push({
        role: 'assistant',
        content: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (error) {
      console.error("Gemini Error:", error);
      this.messages.push({
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting to my neural network. Please try again in a moment.",
        timestamp: 'Error'
      });
    } finally {
      this.isTyping = false;
      this.updateUI();
    }
  }

  updateUI() {
    const container = document.getElementById('messages-container');
    if (!container) return;

    container.innerHTML = this.messages.map(m => `
      <div class="flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in">
        <div class="${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-container-low text-on-surface rounded-tl-none'} p-4 rounded-2xl max-w-[85%] shadow-sm border border-outline-variant/5">
          <div class="prose prose-sm ${m.role === 'user' ? 'prose-invert' : ''} max-w-none font-medium">
            ${this.formatMarkdown(m.content)}
          </div>
        </div>
        <span class="mt-2 mx-1 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
          ${m.role === 'assistant' ? 'Bolt' : 'You'} • ${m.timestamp}
        </span>
      </div>
    `).join('');

    if (this.isTyping) {
      container.innerHTML += `
        <div id="typing-indicator" class="flex flex-col items-start animate-fade-in">
          <div class="bg-surface-container-low p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
            <div class="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
            <div class="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div class="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      `;
    }

    this.scrollToBottom();
  }

  formatMarkdown(text) {
    // Simple markdown-to-html for basic formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-black/10 px-1 rounded">$1</code>')
      .replace(/\n/g, '<br>');
  }

  scrollToBottom() {
    const container = document.getElementById('messages-scroll-area');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  render() {
    return `
      <div class="container animate-fade-in flex flex-col h-full max-h-screen overflow-hidden pb-4">
        <!-- Mascot Section -->
        <div class="relative flex flex-col items-center mt-6 mb-8 shrink-0">
          <div class="w-28 h-28 flex items-center justify-center relative z-10">
            <img src="https://dropshare.42web.io/1/files/qK1kGeEVuF.png" alt="Bolt Mascot" class="w-full h-full object-contain drop-shadow-xl">
          </div>
          <div class="absolute top-0 right-1/2 translate-x-12 bg-tertiary-container p-1.5 rounded-full rotate-12 shadow-md border-2 border-white">
            <span class="material-symbols-outlined text-on-tertiary-container text-sm">auto_awesome</span>
          </div>
        </div>

        <!-- Messages Area -->
        <div id="messages-scroll-area" class="flex-1 overflow-y-auto px-2 space-y-6 scroll-smooth custom-scrollbar">
          <div id="messages-container" class="space-y-6">
            ${this.messages.map(m => `
              <div class="flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in">
                <div class="${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-container-low text-on-surface rounded-tl-none'} p-4 rounded-2xl max-w-[85%] shadow-sm border border-outline-variant/5">
                  <div class="prose prose-sm ${m.role === 'user' ? 'prose-invert' : ''} max-w-none font-medium">
                    ${this.formatMarkdown(m.content)}
                  </div>
                </div>
                <span class="mt-2 mx-1 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
                  ${m.role === 'assistant' ? 'Bolt' : 'You'} • ${m.timestamp}
                </span>
              </div>
            `).join('')}
          </div>

          <!-- Quick Suggestions -->
          <div class="flex flex-wrap gap-2 pt-4">
            <button class="suggestion-btn px-4 py-2 bg-white/50 hover:bg-white border border-outline-variant/20 rounded-full text-primary font-bold transition-all active:scale-95 text-[11px] shadow-sm backdrop-blur-sm">
              How do flags work?
            </button>
            <button class="suggestion-btn px-4 py-2 bg-white/50 hover:bg-white border border-outline-variant/20 rounded-full text-primary font-bold transition-all active:scale-95 text-[11px] shadow-sm backdrop-blur-sm">
              Explain URL parameters
            </button>
            <button class="suggestion-btn px-4 py-2 bg-white/50 hover:bg-white border border-outline-variant/20 rounded-full text-primary font-bold transition-all active:scale-95 text-[11px] shadow-sm backdrop-blur-sm">
              Give me a hint
            </button>
          </div>
        </div>

        <!-- Sticky Input Area -->
        <div class="mt-6 w-full bg-white/80 backdrop-blur-2xl p-2 rounded-2xl shadow-[0_20px_50px_rgba(76,64,223,0.15)] flex items-center gap-2 border border-primary/10 group focus-within:border-primary/30 transition-all">
          <input id="bolt-input" class="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 font-bold text-sm" placeholder="Ask Bolt anything..." type="text"/>
          <button id="bolt-send" class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-lg hover:brightness-110 active:scale-90 transition-all">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">send</span>
          </button>
        </div>
      </div>
    `;
  }
}
