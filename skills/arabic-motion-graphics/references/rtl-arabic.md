# Arabic & RTL rules

## Shaping
- Arabic letters connect; animating single letters breaks the joins. Animate **words** or **lines**.
- If a letter-level effect is essential (typewriter), render the full word with the hidden part masked (clip-path from right to left) instead of splitting characters into separate elements.
- Never apply `letter-spacing` to Arabic — it disconnects letters. To widen a word, use **kashida/tatweel** (ـ U+0640) between connecting letters, e.g. "عـــزنـــا". Only insert it after letters that connect forward (not after ا د ذ ر ز و ة ء).
- Keep harakat (diacritics) only on display titles; check they don't clip at the top of a box (add top padding ~0.25em).

## Direction
- Set `dir="rtl"` and `lang="ar"` on every text container.
- Words appear in reading order, right to left. Entrance motion comes from the right; exits leave to the left.
- Wipes, pushes and progress bars move right → left.
- Mixed content: wrap Latin/numbers in `<bdi>`; phone numbers, URLs and handles are LTR: `<bdi dir="ltr">@brand</bdi>`.
- Numbered steps in a vertical list: number circle on the **right**, label to its left.

## Fonts (free, Google Fonts)
| Use | Fonts |
|---|---|
| Bold display / kinetic | Lalezar, Changa (800), Alexandria (800–900), Rubik (800), El Messiri (700) |
| UI-like pills and body | Cairo, Tajawal, IBM Plex Sans Arabic, Readex Pro, Noto Kufi Arabic |
| Elegant / heritage | Amiri, Reem Kufi, Aref Ruqaa |
- Load the font and wait before the first frame: Remotion `@remotion/google-fonts/<Font>` `loadFont()`, or `await document.fonts.ready` in HTML capture.
- Line-height 1.3–1.5 for Arabic (taller ascenders/descenders than Latin).

## Digits
- Pick Western (1 2 3) or Arabic-Indic (١ ٢ ٣) and keep it consistent across the video.
- `Intl.NumberFormat('ar-EG')` / `('ar-SA')` produce Arabic-Indic; `'ar-IQ'` may vary by runtime — format explicitly when it matters.

## Safe zones (9:16, 1080x1920)
- Top 250px and bottom 350px are covered by platform UI (handle, caption, buttons). Right side ~120px has like/comment buttons on Reels/TikTok.
- Keep text and logos inside x 80–960, y 250–1570.

## Dialect
- Choose MSA or one dialect per video and stay in it.
- Dialect hooks work best in the first 2 seconds; feature labels can stay short and neutral.
