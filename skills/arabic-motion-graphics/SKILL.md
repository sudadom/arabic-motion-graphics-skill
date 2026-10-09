---
name: arabic-motion-graphics
description: Use when asked to make motion graphics with Arabic text — animated reels, explainer/promo videos, logo reveals, kinetic typography, intros/outros or animated social posts — built as code (Remotion or HTML+GSAP) and rendered to MP4/GIF, with correct RTL handling.
---

# Arabic Motion Graphics

Build motion graphics as code, preview them, and render a finished video. Built for Arabic-first social content (Reels, TikTok, Shorts, Stories) with correct RTL text, Arabic typography and pacing that holds attention.

Read the reference files when the step calls for them:

| File | Read when |
|---|---|
| `references/styles.md` | choosing the visual style (step 2) |
| `references/structures.md` | writing the storyboard (step 3) |
| `references/pacing.md` | setting durations and holds (step 3–4) |
| `references/transitions.md` | choosing scene transitions (step 4) |
| `references/rtl-arabic.md` | before writing any text animation (always) |
| `templates/remotion/` | building with Remotion — copy components instead of rewriting them |

## 1. Brief (ask only what's missing, max 3 questions)
- **Goal**: promo/explainer for a product or service · hook/awareness reel · occasion/brand piece · logo reveal.
- **Format**: 1080x1920 (9:16, default) · 1080x1350 (4:5) · 1080x1080 · 1920x1080.
- **Duration**: logo reveal 3–5s · occasion piece 8–12s · hook reel 15–35s · explainer 25–40s (60s+ only for horizontal/YouTube).
- **Content**: hook line, problem, solution/features, CTA (website, handle, WhatsApp, QR), logo, product screenshots.
- **Brand**: colors (hex), font, mood. **Dialect**: Modern Standard Arabic or a local dialect — keep one per video.
- **Audio**: none, a provided track, or a voice-over script (then timing follows the voice).
If the person isn't there to answer, choose defaults, state them at the top, and continue.

## 2. Pick the style and the engine
Pick one style from `references/styles.md`: **Flat illustrated explainer**, **Kinetic collage**, or **Heritage/occasion**. Do not mix styles in one video.

Engine:
- **Remotion (default)** — multi-scene videos, reusable client templates, voice-over sync.
  `npx create-video@latest --blank` → copy `templates/remotion/src/components` → `npx remotion render <id> out/video.mp4 --codec=h264`.
- **HTML + GSAP + capture** — single scene or logo reveal: one HTML page, capture frames with Puppeteer at fixed fps, then `ffmpeg -framerate 30 -i frames/%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 out.mp4`.
- **Lottie** — only for animation that ships inside an app or website.
Check `node -v`, `ffmpeg -version` and a Chromium first; install what's missing.

## 3. Storyboard before animating
Pick a structure from `references/structures.md` and write a beat sheet with timestamps:
```
0.0–2.0s   HOOK      question in the viewer's words, word-by-word
2.0–6.0s   PROBLEM   character + "؟" thought bubble, pain in one line
6.0–8.0s   REVEAL    logo/product enters (iris or push transition)
8.0–20.0s  VALUE     3–4 features as accumulating pills, one every ~1s
20.0–23.0s PROOF     "✓ الأمور سهلة" badge pop, background blurred
23.0–30.0s END CARD  logo → tagline → handle/site → QR, hold ≥ 3s
```
Rules: one idea per scene; first 2 seconds must contain motion **and** words; every readable line stays ≥ 1.5s; the end card holds 3–7s.

## 4. Animate
- Follow `references/rtl-arabic.md` for all text. Never animate Arabic letter-by-letter.
- Use the measured numbers in `references/pacing.md`: entrances 300–600ms, transitions 300–800ms, stagger 60–150ms.
- Easing is never linear: `spring()` in Remotion, or GSAP `power3.out`/`expo.out` in, `power2.in` out. Badges and stickers get overshoot (`back.out(1.7)` / low-damping spring).
- Keep secondary motion alive on every hold: slow background drift or zoom (1 → 1.04), rotating decorative rings, floating particles. A fully frozen frame reads as a bug.
- Max 2 fonts, 1 dominant + 1 accent color + neutrals. Text contrast ≥ 4.5:1.
- 30fps default.

## 5. Common building blocks (see `templates/remotion/src/components`)
- `WordByWord` — RTL word reveal with rise + fade.
- `Pill` — rounded capsule label, optional icon circle on the right.
- `StepsList` — numbered pills that accumulate (1 → 2 → 3 → 4), earlier ones stay.
- `IrisTransition` — circular mask that closes on one scene and opens the next.
- `PushTransition` — new scene pushes in from top/right with motion blur.
- `BadgePop` — sticker/badge with spring overshoot and sparkles, background blurs behind it.
- `EndCard` — logo, tagline, handle/site rows and QR staggered in, then held.
Make brand values (colors, fonts, logo, texts) props so the same template serves the next client.

## 6. Render & verify
- H.264 MP4, `yuv420p`, CRF 18–20, AAC audio if any. Export a poster PNG of the end card.
- GIF preview: `ffmpeg -i out.mp4 -vf "fps=15,scale=400:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" -loop 0 out.gif`
- Before delivering, extract frames (`ffmpeg -ss <t> -frames:v 1`) at the hook, each transition and the end card, and look at them: Arabic shaping intact, nothing outside the safe zone, no frozen frames, end card readable. Confirm duration and resolution with `ffprobe`.

## 7. Deliver
Send the MP4 and the poster PNG. Keep the project so edits (text, colors, timing) are quick re-renders. Offer one concrete next step, e.g. a 4:5 cut, a 15s cutdown, or a second hook variant for A/B testing.

## Analysing reference videos
When the person shares videos to imitate, extract a contact sheet (`fps=1,tile=8x4`) and a motion profile (frame-difference per 0.1s) before deciding anything; describe the style, structure, pacing and transitions in the terms above, then build an original piece using those techniques. Never copy another creator's characters, illustrations, logos or footage into the output.
