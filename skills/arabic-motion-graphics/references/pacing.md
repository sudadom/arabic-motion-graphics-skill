# Pacing numbers

Measured from a set of high-performing Arabic reels by frame-differencing at 10fps (a frame counts as "moving" when its mean pixel change exceeds a small threshold). Use them as starting values, not laws.

## Overall
| Style | Share of runtime in motion | Typical static hold | Transition length | End card hold |
|---|---|---|---|---|
| Flat explainer (A) | 35–50% | 0.5–2.5s | 0.2–0.8s | 3–7.5s |
| Kinetic collage (B) | 70–90% | almost none | continuous camera moves | 2–3s |
| Occasion (C) | ~40% | 1–4s (final) | 0.8s reveal | 4s |

## Element timings
| Element | Value |
|---|---|
| Word-by-word Arabic text | 120–200ms per word, 60–120ms stagger |
| Pill label entrance (scale-x from right + fade) | 300–450ms |
| Accumulating steps | a new step every 0.6–1.2s |
| Badge / sticker pop (overshoot) | 350–500ms |
| Background blur before a badge | 250–400ms |
| Iris / circle mask transition | 500–700ms |
| Push / slide transition with motion blur | 250–400ms |
| Cross-fade + scale (logo → scene) | 400–500ms |
| Diagonal panel wipe | 400–600ms |
| Character swap (old leaves, new enters overlapping) | 500–700ms |
| End card stagger (logo → tagline → rows → QR) | 250–400ms between items |
| URL "typing" on end card | 40–60ms per character |

## Rhythm rules
- Something new must appear at least every ~1.5s in explainers and every ~0.8s in kinetic reels.
- A hold longer than 2.5s needs secondary motion (drift, rotation, particles) or it feels frozen.
- Cut transitions to the music beat when there is music; otherwise keep transitions in the 0.3–0.7s band.
- The last 3s are for reading and screenshotting: no new information, only the end card.
