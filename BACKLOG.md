# Design System Gaps Backlog

Tracks tokens/patterns/bugs found while documenting hubble-ds in Storybook that have **no fix possible from the docs side** — either because the token doesn't exist in code (Figma vs. code mismatch) or because the bug lives in hubble-ds's own component source (`C:\Users\GabrielSilva\Desktop\CLAUDE\hubble-ds`, read-only). This file is informational only — nothing here has been or should be added to/changed in hubble-ds; it's for the hubble-ds team to triage.

## Typography

- **C2 caption (10px)** — Figma defines two caption styles, C1 (12px) and C2 (10px). Only C1 exists in code, as `typo-caption` (`assets/app.css` + `base.registry.ts`, both define the exact same 8 `typo-*` utilities: heading-1 through heading-5, body-bold, paragraph, caption). There is no 10px text utility anywhere in the repo — checked `app.css`, `base.registry.ts`, and every `.tsx` file under `registry/default/ui/` for any `text-[10px]`/`text-2xs`-style usage. Found: 2026-06-24.

## Data Table / Table

- **Column header font size doesn't match Figma (12px / C1 caption token)** — `registry/default/ui/table/table.tsx`, both `TableHeader` (line 27) and `TableHead` (line 79) use `text-base` (16px), not `typo-caption`/12px. Confirmed this is what `DataTable`'s rendered headers actually use too (`data-table.tsx`'s `DataTable` function renders headers through `<TableHead>` directly, no override). Found: 2026-06-25.

## Toggle

- **Typo breaks `whitespace-nowrap`** — `registry/default/ui/toggle/toggle.tsx` line 8: the base class string has `"font-medium white space-nowrap"` — that's two broken classes (`white`, `space-nowrap`, neither is a real Tailwind utility) instead of the intended single `whitespace-nowrap`. Toggle labels can wrap unexpectedly as a result. Found: 2026-06-25.
- **Missing press-down (`active:`) feedback** — `Button`/`IconButton` both have `active:not-aria-[haspopup]:not-disabled:translate-y-px` (a tactile press-down shift on click) in their base classes (`button.tsx` line 11). `Toggle` has no equivalent `active:` class at all, so it feels visually inconsistent/static next to the rest of the button family when clicked. Checked the `aria-pressed:bg-muted` base class too (toggle.tsx line 10) against the variant's `data-[state=on]:bg-ghost-hover`/`bg-outline-active` — confirmed via compiled CSS that the variant rule wins on cascade order (same specificity, declared later), so that part is dead/harmless, not a visible bug. Found: 2026-06-25.

## Overlays / Backdrop

- **Drawer's overlay bypasses the semantic `backdrop` token** — `registry/default/ui/drawer/drawer.tsx`'s `DrawerOverlay` uses a raw `bg-black-alpha-10`, while `Dialog`/`AlertDialog`'s overlays both use the semantic `bg-backdrop` token (`black-alpha-30`). Different opacity (10 vs 30) and skips the named token entirely — likely should use `bg-backdrop` for consistency with the other two modal-style overlays. Found: 2026-06-27.
- **Dialog's overlay has a redundant `blur-light` class** — `dialog.tsx`'s `DialogOverlay` applies both a plain `blur-light` (CSS `filter: blur()`, on the overlay element itself) *and* `supports-backdrop-filter:backdrop-blur-light`. The plain `blur-light` is visually inert (blurring a flat semi-transparent color has no perceptible effect) and isn't present on `AlertDialogOverlay`, which only has the backdrop-filter variant. Likely a leftover/copy-paste artifact. Found: 2026-06-27.

## Radius

- **`radius-3xl`/`radius-4xl` are smaller than `radius-2xl`, breaking the scale's own ordering** — `assets/app.css`. The main scale (lines 36-44, all multiples of `--radius: 4px`) is `xs`=2px, `sm`=4px, `md`=8px, `lg`=12px, `xl`=16px, `2xl`=24px, `full`=pill. Two more entries are defined separately further down the same `@theme` block (lines 232-233): `radius-3xl: calc(var(--radius) * 2.2)` = **8.8px** and `radius-4xl: calc(var(--radius) * 2.6)` = **10.4px** — both smaller than `radius-md` (8px) and far smaller than `radius-2xl` (24px). By the scale's own naming convention, `3xl`/`4xl` should be the largest values, not smaller than `md`. Checked usage: `rounded-3xl`/`rounded-4xl` aren't used anywhere in the codebase yet, so this is dormant — it'll misbehave the first time someone reaches for either expecting "bigger than 2xl". Likely the multipliers (2.2, 2.6) were meant to be something else, or these were never intended to slot into this naming sequence. Found: 2026-06-28.

## Carousel

- **Vertical orientation can't actually scroll** — `registry/default/ui/carousel/carousel.tsx`'s `CarouselContent` hardcodes `className="overflow-hidden"` on its scroll-viewport div (the one with `data-slot="carousel-content"`) with no prop to forward a height to it. Embla needs that viewport shorter than its content to have anything to clip/scroll; without a height hook, vertical carousels just render all items stacked with no real scrolling. Worked around it from the docs side with a scoped CSS override targeting the stable `data-slot="carousel-content"` attribute (see `DESIGNSYSTEM/stories/Carousel.stories.tsx`), but the real fix belongs in the component — e.g. accept a `className`/style forwarded to that div, or default it to `h-full`. Found: 2026-06-25.
