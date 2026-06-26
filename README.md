# hubble-ds-docs

Storybook documentation for [hubble-ds](https://github.com/magazord-plataforma/hubble-ds), Magazord's design system. Component source is imported **live** from a sibling clone of hubble-ds — nothing from hubble-ds is copied or committed into this repo.

## Setup on a new machine

This project requires hubble-ds to be cloned as a **sibling folder**, one level up:

```
CLAUDE/
├── DESIGNSYSTEM/   (this repo)
└── hubble-ds/      (clone separately — private repo, you need access)
```

1. Clone this repo into `CLAUDE/DESIGNSYSTEM`.
2. Clone hubble-ds (private) into `CLAUDE/hubble-ds`:
   ```
   git clone https://github.com/magazord-plataforma/hubble-ds.git
   ```
3. Install dependencies in **both** folders:
   ```
   npm install            # inside DESIGNSYSTEM
   cd ../hubble-ds && npm install   # inside hubble-ds — required for module
                                     # resolution, since component files
                                     # physically live there
   ```
4. Run Storybook:
   ```
   npm run storybook
   ```

## Notes

- hubble-ds is **read-only** from this project's perspective — never push, commit, or modify anything there. See `BACKLOG.md` for tracked gaps between Figma and hubble-ds's actual code (Storybook can't fix those; they're for the hubble-ds team to triage).
- Storybook is pinned to `8.6.18` — newer versions depend on a native binary that needs the Visual C++ Redistributable, which may not be installed on every machine. Confirm that's available before upgrading.
- The global dark-mode toggle (toolbar) and Storybook's own dark UI theme (`.storybook/manager.ts`) are two independent systems — see comments in `.storybook/preview.tsx` / `manager.ts`.
