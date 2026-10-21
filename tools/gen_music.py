#!/usr/bin/env python3
"""
Synthwave score for the OpenCrabs self-portrait motion graphic.
Pure stdlib (wave + math + array). No numpy needed.

Everything is derived from a single 120 BPM grid so the Remotion
visuals can lock motion to the beat (1 beat = 0.5s = 15 frames @30fps).
"""
import math
import wave
import array
import random

SR = 44100
BPM = 120.0
BEAT = 60.0 / BPM          # 0.5s
BAR = BEAT * 4             # 2.0s
DURATION = 56.0
N = int(SR * DURATION)     # total samples

random.seed(1337)

# master mix buffer
buf = array.array("f", [0.0]) * N


def midi(m):
    return 440.0 * (2.0 ** ((m - 69) / 12.0))


def add(start_sec, samples, vol):
    """Add a float sample list into the master buffer at start_sec."""
    i0 = int(start_sec * SR)
    end = min(i0 + len(samples), N)
    for k in range(end - i0):
        buf[i0 + k] += samples[k] * vol


def tone(freq, dur, waveform="sine", detune=0.0):
    """Render a periodic tone by tiling one precomputed cycle (fast)."""
    n = int(dur * SR)
    if n <= 0 or freq <= 0:
        return []
    cyc = max(1, int(SR / freq))
    table = [0.0] * cyc
    f = freq * (1.0 + detune)
    for i in range(cyc):
        ph = (i / cyc) % 1.0
        if waveform == "sine":
            table[i] = math.sin(2 * math.pi * ph)
        elif waveform == "square":
            table[i] = 1.0 if ph < 0.5 else -1.0
        elif waveform == "saw":
            table[i] = 2.0 * ph - 1.0
        elif waveform == "tri":
            table[i] = 4.0 * abs(ph - 0.5) - 1.0
    out = [0.0] * n
    for i in range(n):
        out[i] = table[i % cyc]
    return out


def envelope(samples, attack, decay, sustain_level=0.7, release=0.05):
    """Apply an ADSR-ish envelope in place and return it."""
    n = len(samples)
    a = int(attack * SR)
    r = int(release * SR)
    d = int(decay * SR)
    for i in range(n):
        if i < a:
            g = i / a if a else 1.0
        elif i < a + d:
            t = (i - a) / d if d else 1.0
            g = 1.0 - (1.0 - sustain_level) * t
        elif i > n - r:
            t = (n - i) / r if r else 1.0
            g = sustain_level * t
        else:
            g = sustain_level
        samples[i] *= g
    return samples


def kick(start, vol=1.0):
    dur = 0.16
    n = int(dur * SR)
    s = [0.0] * n
    for i in range(n):
        t = i / SR
        # pitch sweep 160 -> 48 Hz
        f = 48 + (160 - 48) * math.exp(-t * 28)
        env = math.exp(-t * 22)
        s[i] = math.sin(2 * math.pi * f * t) * env
        s[i] += math.sin(2 * math.pi * f * 0.5 * t) * env * 0.4  # sub layer
    add(start, s, vol)


def snare(start, vol=0.7):
    dur = 0.18
    n = int(dur * SR)
    s = [0.0] * n
    for i in range(n):
        t = i / SR
        env = math.exp(-t * 26)
        noise = (random.random() * 2 - 1)
        body = math.sin(2 * math.pi * 190 * t)
        s[i] = (noise * 0.7 + body * 0.5) * env
    add(start, s, vol)


def hat(start, vol=0.25, open_=False):
    dur = 0.09 if open_ else 0.035
    n = int(dur * SR)
    s = [0.0] * n
    for i in range(n):
        t = i / SR
        env = math.exp(-t * (60 if not open_ else 22))
        s[i] = (random.random() * 2 - 1) * env
    # crude high-pass: subtract a smoothed version
    add(start, s, vol)


def clap(start, vol=0.4):
    for off in (0.0, 0.012, 0.026):
        dur = 0.06
        n = int(dur * SR)
        s = [0.0] * n
        for i in range(n):
            t = i / SR
            env = math.exp(-t * 40)
            s[i] = (random.random() * 2 - 1) * env
        add(start + off, s, vol * 0.6)


# ---- musical data -------------------------------------------------------
# 4-bar loop: Am | F | C | G
PROG = [
    (45, [57, 60, 64]),   # Am: bass A2, chord A3 C4 E4
    (41, [53, 57, 60]),   # F:  bass F2, chord F3 A3 C4
    (36, [48, 52, 55]),   # C:  bass C2, chord C3 E3 G3
    (43, [55, 59, 62]),   # G:  bass G2, chord G3 B3 D4
]

total_bars = int(DURATION / BAR)  # 15


def bar_section(bar):
    """Energy arrangement: 0=intro, 1=build, 2+=full."""
    if bar == 0:
        return "intro"
    if bar == 1:
        return "build"
    if bar >= total_bars - 1:
        return "outro"
    return "full"


for bar in range(total_bars):
    t_bar = bar * BAR
    section = bar_section(bar)
    bass_midi, chord = PROG[bar % 4]
    bass_f = midi(bass_midi)

    # ---- pad (sustained chord, atmospheric) ----
    pad_dur = BAR * 1.02
    for cm in chord:
        pf = midi(cm - 12)  # one octave down for warmth
        p = tone(pf, pad_dur, "saw")
        p2 = tone(pf, pad_dur, "saw", detune=0.004)
        for i in range(len(p)):
            p[i] = (p[i] + p2[i]) * 0.5
        envelope(p, 0.4, 0.2, 0.8, 0.5)
        add(t_bar, p, 0.06)

    # ---- bass (driving 8th notes) ----
    if section in ("build", "full", "outro"):
        for eighth in range(8):
            t = t_bar + eighth * (BEAT / 2)
            bf = bass_f if eighth % 2 == 0 else bass_f * 2  # octave pump
            b = tone(bf, BEAT * 0.48, "saw")
            envelope(b, 0.005, 0.05, 0.6, 0.05)
            add(t, b, 0.30)

    # ---- arp (16th notes cycling chord tones, square) ----
    if section in ("intro", "build", "full", "outro"):
        arp_notes = chord + [chord[0] + 12]
        for sixt in range(16):
            t = t_bar + sixt * (BEAT / 4)
            note = arp_notes[sixt % len(arp_notes)] + 12
            af = midi(note)
            a = tone(af, BEAT * 0.22, "square")
            envelope(a, 0.004, 0.03, 0.4, 0.03)
            vol = 0.10 if section == "intro" else 0.14
            add(t, a, vol)

    # ---- drums ----
    for beat_i in range(4):
        t = t_bar + beat_i * BEAT
        if section in ("full", "outro") or (section == "build" and beat_i % 2 == 0):
            kick(t, 1.0)
        if section in ("full", "outro") and beat_i in (1, 3):
            snare(t, 0.75)
            clap(t, 0.35)
        # hats on 8ths
        if section in ("build", "full", "outro"):
            for h in range(2):
                th = t + h * (BEAT / 2)
                hat(th, 0.16 if h == 0 else 0.22, open_=(h == 1 and beat_i == 3 and section == "full"))

# ---- intro riser (bar 0 -> 1) ----
riser_dur = BAR * 1.5
rn = int(riser_dur * SR)
riser = [0.0] * rn
for i in range(rn):
    t = i / SR
    f = 200 + 1800 * (t / riser_dur) ** 2
    env = (t / riser_dur) * 0.5
    riser[i] = (random.random() * 2 - 1) * env * 0.3
add(0.0, riser, 0.25)

# ---- impacts: WHAT'S NEW downbeat (bar 17), outro downbeat (bar 25), last bar ----
CRASH_BARS = (16, 24)
for crash_t in tuple(b * BAR for b in CRASH_BARS) + ((total_bars - 1) * BAR,):
    cdur = 1.4
    cn = int(cdur * SR)
    crash = [0.0] * cn
    for i in range(cn):
        t = i / SR
        env = math.exp(-t * 3.0)
        crash[i] = (random.random() * 2 - 1) * env
    add(crash_t, crash, 0.5)
    kick(crash_t, 1.2)

# ---- master: soft clip + normalize -------------------------------------
# gentle tail fade so the last crash decays instead of cutting dead
fade_n = int(0.7 * SR)
for i in range(max(0, N - fade_n), N):
    buf[i] *= (N - i) / fade_n

peak = 0.0
for i in range(N):
    v = math.tanh(buf[i] * 1.4)  # soft saturation
    buf[i] = v
    if abs(v) > peak:
        peak = abs(v)

gain = 0.92 / peak if peak > 0 else 1.0

out_path = "audio/score.wav"
wf = wave.open(out_path, "wb")
wf.setnchannels(2)  # stereo
wf.setsampwidth(2)
wf.setframerate(SR)
frames = array.array("h")
for i in range(N):
    s = int(buf[i] * gain * 32767)
    if s > 32767:
        s = 32767
    if s < -32768:
        s = -32768
    frames.append(s)  # L
    frames.append(s)  # R (mono source, duplicated)
wf.writeframes(frames.tobytes())
wf.close()

print(f"Wrote {out_path}: {DURATION}s @ {SR}Hz stereo, {BPM} BPM, peak={peak:.3f}")
print(f"Bars={total_bars}, beat={BEAT}s, bar={BAR}s")
