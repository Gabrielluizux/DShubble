# Design System Gaps Backlog

Tracks tokens/patterns/bugs found while documenting hubble-ds in Storybook that have **no fix possible from the docs side** — either because the token doesn't exist in code (Figma vs. code mismatch) or because the bug lives in hubble-ds's own component source (`C:\Users\GabrielSilva\Desktop\CLAUDE\hubble-ds`, read-only). This file is informational only — nothing here has been or should be added to/changed in hubble-ds; it's for the hubble-ds team to triage.

> **Line references re-verified against current hubble-ds source on 2026-06-30.** All 9 items below still reproduce; none have been fixed upstream.

## Triage summary

| # | Item | Type | Severity | Effort | Needs design call? |
|---|------|------|----------|--------|--------------------|
| 1 | IconButton SVG fill selector invalid (3 variants) | Bug | **High** | Trivial | No |
| 2 | Toggle/ToggleGroup broken `whitespace-nowrap` | Bug | **High** | Trivial | No |
| 3 | Carousel vertical orientation can't scroll | Bug | **High** | Small–Med | No |
| 4 | Table/DataTable header font size ≠ Figma | Drift | Medium | Small | Yes |
| 5 | Drawer overlay bypasses `backdrop` token | Drift | Medium | Trivial | Yes (opacity) |
| 6 | C2 caption (10px) missing in code | Token gap | Medium | Small | Yes |
| 7 | `radius-3xl`/`4xl` smaller than `2xl` (out of order) | Bug (dormant) | Low | Trivial | Yes (values) |
| 8 | Dialog overlay redundant inert `blur-light` | Cleanup | Low | Trivial | No |

**Suggested sprint order:** ship #1–#2 immediately (one-line fixes, high user-visible impact), then #3. Batch #4–#6 behind a quick design confirmation. #7–#8 are low-risk cleanups for any spare capacity.

---

# P1 — High severity

### 1. IconButton — invalid Tailwind selector breaks SVG fill for `outline`/`secondary`/`ghost`
- **File:** `registry/default/ui/icon-button/icon-button.tsx` lines 18–20
- **Problem:** Those three variants use `[&>_svg]:fill-button-text-secondary`. `[&>_svg]` mixes the `>` direct-child combinator with the `_` descendant syntax in the same arbitrary variant — not valid Tailwind, so it compiles to no usable rule. Only `primary` (line 17) and `destructive` (line 21) use the correct `[&_svg]:…` pattern, matching `Button`'s own convention (`button.tsx` line 14, `[&_svg]:fill-text`).
- **Effect:** Icon color for `outline`/`secondary`/`ghost` IconButtons (3 of 5 variants) never gets the intended `button-text-secondary` token — icon falls back to its default fill/stroke (observed as a stray blue stroke, especially on hover).
- **Suggested fix:** Change `[&>_svg]` → `[&_svg]` in all three variants.
- **Effort:** Trivial. **Found:** 2026-06-29.

### 2. Toggle / ToggleGroup — broken `whitespace-nowrap` lets labels wrap
- **File:** `registry/default/ui/toggle/toggle.tsx` line 8
- **Problem:** The base class string contains `"font-medium white space-nowrap"` — that's two broken classes (`white`, `space-nowrap`, neither is a real Tailwind utility) instead of the intended single `whitespace-nowrap`.
- **Effect:** Toggle labels can wrap unexpectedly. **Propagates to `ToggleGroupItem`** (`registry/default/ui/toggle-group/toggle-group.tsx` reuses `toggleVariants` directly). Confirmed visually while building a module-switcher `ToggleGroup` for the Header Nav guide: multi-word pill labels (e.g. "Melhor Preço") wrap to two lines and overlap neighbors. Worked around from the docs side with inline `whiteSpace: "nowrap"` + `width/height: "auto"`, but the real fix belongs upstream and will propagate to every `toggleVariants` consumer.
- **Suggested fix:** `white space-nowrap` → `whitespace-nowrap` on line 8.
- **Effort:** Trivial. **Found:** 2026-06-25 (propagation confirmed 2026-06-29).
- **Related (same file, lower priority):** `Toggle` has no `active:` press-down feedback, while `Button`/`IconButton` both have `active:not-aria-[haspopup]:not-disabled:translate-y-px` (button.tsx line 11) — feels visually static/inconsistent next to the rest of the button family on click. (The `aria-pressed:bg-muted` base class on toggle.tsx line 10 was checked and is dead/harmless — the variant's `data-[state=on]` rule wins on cascade order, confirmed via compiled CSS.)

### 3. Carousel — vertical orientation can't actually scroll
- **File:** `registry/default/ui/carousel/carousel.tsx` line 151
- **Problem:** `CarouselContent` hardcodes `className="overflow-hidden"` on its scroll-viewport div (`data-slot="carousel-content"`) with no prop to forward a height. Embla needs that viewport shorter than its content to clip/scroll; without a height hook, vertical carousels render all items stacked with no real scrolling.
- **Effect:** Vertical carousels are non-functional. Worked around from the docs side with a scoped CSS override on the stable `data-slot="carousel-content"` attribute (see `DESIGNSYSTEM/stories/Carousel.stories.tsx`).
- **Suggested fix:** Accept a `className`/style forwarded to that div, or default it to `h-full`.
- **Effort:** Small–Medium (minor API decision). **Found:** 2026-06-25.

---

# P2 — Medium severity (design confirmation needed)

### 4. Table / DataTable — column header font size doesn't match Figma
- **File:** `registry/default/ui/table/table.tsx` — `TableHeader` (line 27) and `TableHead` (line 79)
- **Problem:** Both use `text-base` (16px), not the Figma-specified 12px (C1 caption token). `DataTable`'s rendered headers inherit this too (`data-table.tsx` renders through `<TableHead>` with no override).
- **Suggested fix:** Switch header cells to `typo-caption` (12px) — pending design confirmation of the intended token.
- **Effort:** Small. **Found:** 2026-06-25.

### 5. Drawer — overlay bypasses the semantic `backdrop` token
- **File:** `registry/default/ui/drawer/drawer.tsx` line 37 (`DrawerOverlay`)
- **Problem:** Uses raw `bg-black-alpha-10`, while `Dialog`/`AlertDialog` overlays both use the semantic `bg-backdrop` token (`black-alpha-30`). Different opacity (10 vs 30) and skips the named token entirely.
- **Suggested fix:** Use `bg-backdrop` for consistency with the other two modal-style overlays — confirm intended opacity with design.
- **Effort:** Trivial. **Found:** 2026-06-27.

### 6. Typography — C2 caption (10px) missing in code
- **Source:** Figma defines two caption styles, C1 (12px) and C2 (10px). Only C1 exists in code, as `typo-caption` (`assets/app.css` + `base.registry.ts` both define the same 8 `typo-*` utilities: heading-1…5, body-bold, paragraph, caption). No 10px text utility exists anywhere — checked `app.css`, `base.registry.ts`, and every `.tsx` under `registry/default/ui/` for any `text-[10px]`/`text-2xs`-style usage.
- **Effect:** Anyone needing 10px text (e.g. dense badges, table sub-labels) has no token to reach for.
- **Suggested fix:** Add a `typo-caption-sm` / C2 utility — pending design alignment on naming + exact spec.
- **Effort:** Small. **Found:** 2026-06-24.

---

# P3 — Low severity (dormant / cleanup)

### 7. Radius — `radius-3xl`/`radius-4xl` are smaller than `radius-2xl`
- **File:** `assets/app.css`
- **Problem:** The main scale (lines 36–44, all multiples of `--radius: 4px`) is `xs`=2px, `sm`=4px, `md`=8px, `lg`=12px, `xl`=16px, `2xl`=24px, `full`=pill. But `radius-3xl` (line 232) = `calc(var(--radius) * 2.2)` = **8.8px** and `radius-4xl` (line 233) = `calc(var(--radius) * 2.6)` = **10.4px** — both smaller than `radius-md` (8px) and far smaller than `radius-2xl` (24px). By the scale's own naming, `3xl`/`4xl` should be the largest values.
- **Status:** Dormant — `rounded-3xl`/`rounded-4xl` aren't used anywhere yet, so it'll only misbehave the first time someone reaches for either expecting "bigger than 2xl".
- **Suggested fix:** Re-derive the `3xl`/`4xl` multipliers so they exceed `2xl` (or remove them) — needs a design call on intended values.
- **Effort:** Trivial. **Found:** 2026-06-28.

### 8. Dialog — overlay has a redundant inert `blur-light`
- **File:** `registry/default/ui/dialog/dialog.tsx` line 52 (`DialogOverlay`)
- **Problem:** Applies both a plain `blur-light` (CSS `filter: blur()` on the overlay element itself) *and* `supports-backdrop-filter:backdrop-blur-light`. The plain `blur-light` is visually inert (blurring a flat semi-transparent color has no perceptible effect) and isn't present on `AlertDialogOverlay`, which only has the backdrop-filter variant. Likely a leftover/copy-paste artifact.
- **Suggested fix:** Remove the plain `blur-light` class.
- **Effort:** Trivial. **Found:** 2026-06-27.
