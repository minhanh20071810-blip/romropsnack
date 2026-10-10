// Web Audio API synthesized crunchy snack sounds
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCrunchSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Generate crisp crunch burst using shaped noise + tone
    const bufferSize = ctx.sampleRate * 0.12; // 120ms burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Noise with sharp decay
      const decay = Math.exp(-i / (ctx.sampleRate * 0.025));
      data[i] = (Math.random() * 2 - 1) * decay;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Highpass filter for crispy snap
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2200, ctx.currentTime);

    // Bandpass for crackle resonance
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(3400, ctx.currentTime);
    bandpass.Q.setValueAtTime(3.0, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    noiseNode.connect(filter);
    filter.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start();
  } catch {
    // Ignore audio errors gracefully if user hasn't interacted
  }
}

export function playCelebrationSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.08);
      osc.stop(ctx.currentTime + index * 0.08 + 0.25);
    });
  } catch {
    // Ignore
  }
}
