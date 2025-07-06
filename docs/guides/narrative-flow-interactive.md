# Interactive Narrative Flow (Code-Driven)

> **Goal**: Deliver an informative, engaging story about LaLiga-initiated web blocks **without relying on bespoke designer assets**. All visuals (except brand logos) are generated with CSS, HTML Canvas, or lightweight React components.

---

## Guiding Principles

1. **Minimal + Brutalist** – Typography and layout convey urgency; we avoid ornamental graphics.
2. **Self-Contained Assets** – Everything is coded (shapes, grids, glitch effects). Brand logos are imported SVGs from `/public`.
3. **Hybrid Flow** – Smooth hand-off between passive narration and interactive simulation.
4. **Accessible** – Reduced-motion variant, keyboard navigation, full i18n via `dictionaries/[lng].json`.

---

## High-Level Sections

| # | Phase | Description | Interaction |
|---|-------|-------------|-------------|
| 1 | **Opening Narration** | Full-viewport text slides introduce context (Dec 2024 → Feb 2025). | None (auto-advance every ~6 s; skip via click) |
| 2 | **Interactive Web Grid** | User explores a faux "internet" – 6×4 tile grid of mini-sites rendered in a mocked browser window. | Tile hover & click |
| 3 | **First Block Event** | On first tile click → grid updates: some tiles flip to **HTTP 451** / DNS errors. Overlay text explains Feb 9 2025 Cloudflare blocks. | User can keep clicking remaining tiles |
| 4 | **Escalation Narration** | Semi-transparent overlay narrates Feb 19 → Mar 26 events while grid animates (incremental tile failures). | Grid remains interactive but failure rate climbs |
| 5 | **Developer Impact Module** | Quick, code-style animation (terminal typing) shows `npm install` failing, `curl` timeouts, etc. | None (auto) |
| 6 | **Second Interactive Beat** | Grid zooms out to reveal Vercel, Netlify, Twitch clusters. Clicking clusters triggers mass outages. | Click clusters |
| 7 | **Final Narration** | Text summarises May → Jul status quo; grid now mostly red-error tiles. | None |
| 8 | **Call to Action** | Clean screen with share + learn-more buttons. | Buttons |

---

## Visual Notes

### Opening Narration
* **Typography-first**: `display: grid; place-items: center;` large variable font (e.g., Inter Tight).  
* Canvas-based **pulse line** beneath text for subtle motion (single JS loop).

### Interactive Web Grid
* 6×4 CSS Grid inside a **mocked browser window** (pure CSS; no external frame image).  
* Each tile = small `<iframe>`-like div with animated favicon + URL (auto-generated).  
* **Healthy tile**: light background, subtle page preview via CSS gradient.  
* **Blocked tile**: turns #111 with red border; center text `ERR_CONNECTION_RESET` (localised).

### Glitch / Failure Effects
* Canvas overlay draws random white bars (scanlines) at 30 fps when blocks increase.  
* Reduced-motion flag disables canvas.

### Developer Impact Module
* Mono-spaced text typed via JS `setInterval`. Examples:
```bash
$ curl vercel.app
DNS_PROBE_FINISHED_NXDOMAIN
```
* Finished lines fade to background so new lines stay in focus.

---

## Component Map

| Component | Type | Responsibility |
|-----------|------|----------------|
| `NarrationOrchestrator` | client | Finite-state machine controlling phases; central store (Zustand). |
| `TextSlide` | server | Renders a single narration slide (date, headline, paragraph). |
| `BrowserWindow` | client | Chrome-like frame built with Tailwind; houses the grid. |
| `WebGrid` | client | Generates tile matrix; exposes `onTileClick`. |
| `Tile` | client | Handles state: healthy → blocked. |
| `DeveloperTerminal` | client | Simulates CLI log. |
| `CTA` | server | Share / Learn-More buttons. |

---

## State Machine Sketch

```txt
INITIAL → SLIDES → GRID_HEALTHY → FIRST_BLOCK → ESCALATION → DEV_IMPACT → GRID_CLUSTER → OUTRO → CTA
```

Transitions stored in `lib/narration.ts` (configurable timings & copy).

---

## Implementation Outline

1. **Set up Orchestrator**  
   * Uses `create` from Zustand: `{ phase: 'INITIAL', advance() }`.
2. **Create Narrative Slides**  
   * Map over array of objects `{ date, headline, body }` (all i18n).
3. **Build BrowserWindow & WebGrid**  
   * CSS Grid of 24 tiles. Generate domain list with faker.
4. **Tile Logic**  
   * On click, call `orchestrator.advance('FIRST_BLOCK')` if first time.  
   * After phase changes, orchestrator pushes list of blocked indices to tiles.
5. **Canvas Effects**  
   * Simple `<canvas>` positioned absolute; draws glitch lines when `phase` >= `ESCALATION`.
6. **CLI Simulation**  
   * Component receives script array; types lines; triggers `advance('GRID_CLUSTER')` on completion.
7. **Finalize CTA**  
   * Native share API + external links.

---

### Performance & Accessibility
* Use React 18 streaming + suspense for quick TTI.  
* Disable canvas + rapid animation if `prefers-reduced-motion`.  
* Ensure text contrast ≥ WCAG AA.

---

## Next Steps
1. **Confirm copy** for each phase (ES & EN).  
2. Scaffold components & store.  
3. Develop tile/block logic & glitch overlay.  
4. QA on reduced-motion + mobile.  
5. Deploy preview & iterate on pacing.

> _"The story is the focus; visuals reinforce, not overshadow."_ 