# Transition catalog

Each entry: what it looks like, when to use it, timing, and how to build it.

## Iris (circle mask)
The current scene shrinks into a circle (often around the subject) while the next scene shows around it, or a circle grows to reveal the next scene.
- Use: moving from an intro scene to the problem/character; focusing on one subject.
- Timing: 500–700ms, `power3.inOut`.
- Build: animate `clip-path: circle(r at x y)` on the outgoing layer, or a Remotion `<AbsoluteFill style={{clipPath}}>` with `interpolate` on the radius.

## Push / slide with motion blur
The next scene slides in from the top (or right, for RTL flow) and pushes the old one out; both carry vertical/horizontal motion blur mid-move.
- Use: a change of place or step ("then we deliver to your car").
- Timing: 250–400ms, `expo.out`.
- Build: translate both layers; add `filter: blur(Npx)` peaking at the middle of the move (use a directional blur via SVG `feGaussianBlur stdDeviation="0 12"` for vertical).

## Background blur → badge pop
The whole scene blurs and dims slightly; a badge or sticker pops on top with overshoot and sparkles.
- Use: proof or payoff moments ("✓ الأمور سهلة", "-30%").
- Timing: blur 250–400ms, then pop 350–500ms (spring damping ~10).
- Build: blur on the scene container; badge `scale` 0 → 1.08 → 1 and slight rotation −8° → 0°.

## Cross-fade + scale
Logo or scene fades out while scaling slightly up; next scene fades in from 1.05 → 1.
- Use: from the opening logo to the first scene; gentle brands.
- Timing: 400–500ms.

## Diagonal panel wipe
A solid panel (white or brand color) with a slanted edge sweeps across, carrying the next scene behind it.
- Use: kinetic reels, contrasting two ideas ("the successful ones… and others").
- Timing: 400–600ms, `power2.inOut`. Sweep right → left for RTL.
- Build: `clip-path: polygon(...)` with animated x coordinates and a 10–15° slant.

## Color panel wipe
Two or three full-height color panels slide across in quick succession (white, then brand color) and the new scene appears behind the last one.
- Use: section break before the product reveal.
- Timing: 600–800ms total, panels staggered 80–120ms.

## Character swap
The outgoing character scales down or slides out while the incoming one enters overlapping, same pose position.
- Use: "before vs after", "employee → owner", problem → solution person.
- Timing: 500–700ms.

## Camera pan across a canvas
Not a cut: all scenes live on one large canvas and the camera pans/zooms between them; text placed along the path is read as the camera passes.
- Use: kinetic collage reels.
- Timing: continuous; keep the camera speed slow enough that each word is visible ≥ 0.6s.
- Build: one big container; animate its `translate`/`scale` with keyframes per beat.

## Pull-back reveal
Start on a tight detail (pattern, texture, object), slowly zoom out to reveal the whole scene.
- Use: occasion pieces, product beauty shots.
- Timing: 2–3s, `power2.out`.

## Pixel / mosaic build
The title assembles from blocks of the background pattern before resolving into clean letters.
- Use: heritage and tech-themed titles.
- Timing: 0.8–1.2s.
- Build: a grid of blocks over the text with staggered opacity/scale; reveal the clean text underneath at the end.

## End-card build (not a transition but always the closer)
Logo appears first (scale 0.9 → 1, fade), then tagline pill, then website/handle rows (URL can type in), then QR. Each 250–400ms apart. Hold 3–7s.
