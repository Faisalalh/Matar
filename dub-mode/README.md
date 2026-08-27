# Dub Booth

A from-scratch, fan-made homage to *Choicer Voicer*'s **Dub Mode** on GameBanana:
load a clip, see its soundwave and pitch trace, then record your own voice over
it and get scored on how well your **pitch**, **volume**, and **timing** match
the clip's movement, word by word.

**Once deployed:** https://faisalalh.github.io/Matar/dub-mode/
(The site serves from the `gh-pages` branch, so after merging this to `main`,
copy `dub-mode/` onto `gh-pages` — or just open `index.html` locally; it works
from disk.)

## How it works

1. **Clip** — drop any audio or video file (mp3, wav, m4a, ogg, mp4, webm),
   paste a YouTube link, or press *Use the demo line* for a built-in
   synthesized phrase. YouTube links are fetched in the browser through public
   privacy mirrors (Piped / Invidious): live instances are discovered from
   each network's directory at fetch time, three are raced at once, audio-only
   streams are preferred, and when a mirror only offers the muxed mp4 the AAC
   track is demuxed out client-side (a ~100-line MP4→ADTS extractor) so it
   still decodes. Use it for clips you have the right to use. YouTube actively
   fights these mirrors, so a fetch can fail on some videos or days — the
   fallback is saving the audio yourself (e.g. `yt-dlp -x URL`) and dropping
   the file in. Self-hosters can pin their own mirror before the page loads:
   `window.DUB_YT_SOURCES = {piped:['https://my.instance'], invidious:[]}`.
2. **Booth** — the amber waveform is the clip's loudness; the dotted trace
   under it is the melody of the words. Drag to select the exact line to dub.
3. **Record** — a three-beep count-in, then a playhead sweeps the line while
   you speak: live meters compare your volume against the clip's, and a live
   readout tells you how many semitones high or low you are.
4. **Match** — the take is auto-aligned to the clip and scored: *words &
   timing* (speaking when the clip speaks), *pitch* (mean semitone distance,
   octave-forgiving by default so you can dub in your own range), and *volume*
   (the shape of your loudness curve, not your mic gain). Grades S–D, with a
   coach line naming your biggest gap. Replay the clip, your take, or both
   mixed; nudge sync by ±10/50 ms; download your take as a `.wav`.

## Tech notes

- One self-contained `index.html`; no build step, no dependencies. Network use
  is Google Fonts plus, only when you paste a YouTube link, the public mirrors
  above. Your microphone audio never leaves the browser.
- Pitch tracking is a normalized-autocorrelation (NSDF/MPM-style) detector run
  on a 16 kHz mono downmix, 10 ms frames; loudness is framewise RMS.
- Alignment is envelope cross-correlation (±600 ms), with manual nudge on top.
- Recording captures raw PCM via the Web Audio API with `autoGainControl`
  off (so volume scoring stays honest). Echo cancellation is on by default so
  speaker playback doesn't bleed into the take; flip on *Headphones on* for a
  raw mic signal.
