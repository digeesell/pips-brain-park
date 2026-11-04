(() => {
  let ctx = null;

  function audio() {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type, vol) {
    const ac = audio();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(vol, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  function play(kind) {
    try {
      const ac = audio();
      const t = ac.currentTime;
      if (kind === "tap") tone(620, t, 0.08, "triangle", 0.05);
      else if (kind === "ok") {
        tone(523, t, 0.14, "triangle", 0.07);
        tone(659, t + 0.1, 0.16, "triangle", 0.07);
        tone(784, t + 0.2, 0.22, "sine", 0.08);
      } else if (kind === "star") {
        tone(784, t, 0.12, "sine", 0.07);
        tone(1046, t + 0.1, 0.22, "sine", 0.08);
      } else if (kind === "miss") {
        tone(262, t, 0.18, "sine", 0.05);
        tone(220, t + 0.12, 0.2, "triangle", 0.04);
      } else if (kind === "fanfare") {
        [523, 659, 784, 1046].forEach((f, i) => tone(f, t + i * 0.11, 0.22, "triangle", 0.08));
      }       else if (kind === "pop") {
        tone(880, t, 0.1, "square", 0.03);
        tone(1320, t + 0.04, 0.12, "sine", 0.05);
      } else if (kind === "tick") {
        tone(880, t, 0.05, "square", 0.035);
      } else if (kind === "tock") {
        tone(520, t, 0.05, "square", 0.03);
      } else if (kind === "urgent") {
        tone(980, t, 0.06, "square", 0.05);
        tone(980, t + 0.09, 0.06, "square", 0.05);
      } else if (kind === "timesup") {
        tone(392, t, 0.16, "triangle", 0.06);
        tone(294, t + 0.14, 0.22, "sine", 0.05);
      }
    } catch (_) {
      /* sound is optional */
    }
  }

  window.MeadowAudio = { play, wake: audio };
})();
