/**
 * Bolt Assistant Logic
 * Handles hints and guidance.
 */

export const bolt = {
  getHint(challengeId, level) {
    const hints = {
      'view-source': [
        'Try right-clicking on the page.',
        'Look for a "View Page Source" option in your browser.',
        'The flag is hidden in a comment like <!-- FLAG{...} -->'
      ]
    };
    return hints[challengeId]?.[level] || "I don't have a hint for that yet!";
  },

  speak(message) {
    console.log(`Bolt: ${message}`);
    // Trigger UI update for Bolt's speech bubble
  }
};
