# Visual Narrative Flow

This document outlines each stage of the proposed visual narration, combining the timeline you supplied with additional creative direction.  
The goal is to keep viewers **engaged**, **informed**, and **motivated to take action**, while preserving a minimalist, brutalist aesthetic.

---

## Above-the-Fold Hook  
*Minimalist landing — single interaction to start*

| Element | Purpose |
|---------|---------|
| **Glowing Digital Particle**<br>`digital-ash-particle.svg` (subtle pulse) | Intrigues users and hints at a larger story. |
| **Title**<br>`"The Web We Weave"` | Evokes curiosity; frames the narrative without giving away details. |
| **Instruction (faded)**<br>`"Click anywhere to begin"` | Replaces a friction-filled button with a full-viewport trigger. |

**Interaction**: The moment the user clicks anywhere on the screen, the particle *bursts* and the narration timeline begins.

---

## Scene 1 – *The Spark*  
**Date:** 18 Dec 2024  
**Key Event:** LaLiga granted legal authority to request IP blocking.

**Visual Treatment**
* The burst resolves into a **gavel icon** striking a surface.  
* A monochrome *shockwave* ripples outward.

**Text Snippet**
> "Barcelona court grants LaLiga power to block IP addresses hosting pirate streams."


---

## Scene 2 – *First Impact*  
**Date:** 9 Feb 2025  
**Key Event:** LaLiga begins blocking Cloudflare IPs.

**Visual Treatment**
* Shockwave collides with a **Cloudflare logo** which distorts & flickers.  
* Nearby generic *website tiles* fade to black to show collateral damage.

**On-screen Stat**
``20 % of the global web relies on Cloudflare``

---

## Scene 3 – *The Resistance*  
**Date:** 19 Feb 2025  
**Key Event:** Cloudflare + RootedCON file lawsuit.

**Visual Treatment**
* Cloudflare logo emits a **beam of light** forging a *legal-document icon* in mid-air.  
* Surface balances between dark vs. light tones — hinting at confrontation.

**Text Snippet**
> "Cloudflare challenges LaLiga: blanket blocks harm millions of legitimate sites."


---

## Scene 4 – *The Setback*  
**Date:** 26 Mar 2025  
**Key Event:** Court rejects Cloudflare appeal.

**Visual Treatment**
* The **gavel** smashes the glowing legal document; shards scatter.  
* Shockwave intensifies and darkens the scene.

**Tone**: Heightened tension, music swells.

---

## Scene 5 – *Contagion Spreads*  
**Dates:** 12–15 Apr 2025  
**Key Events:** LaLiga targets Vercel; Guillermo Rauch responds.

**Visual Treatment**
* Shockwave strikes a **Vercel triangle**; ripple lines map across connected dev icons.  
* Overlays a metric:
``9 million sites deployed on Vercel``

**Quote Overlay**
> _"Our developers and customers are suffering unnecessary downtime."_ — Guillermo Rauch

---

## Scene 6 – *Escalation*  
**Dates:** 4 May & 20-27 May 2025  
**Key Events:** Twitch, Netlify & others affected; Matthew Prince sounds alarm.

**Visual Treatment**
* Multiple logos (**Twitch**, **Netlify**, etc.) flicker off sequentially, like a cascading blackout.  
* Pop-up speech bubble from **X (formerly Twitter)** displays:
> _"This is bonkers — blanket IP blocks risk emergency services."_

---

## Scene 7 – *Unresolved Present*  
**Period:** Jun → 6 Jul 2025  
**Key State:** Blocks continue; no meaningful resolution.

**Visual Treatment**
* The screen fills with a chaotic **web of glitching nodes**.  
* Date ticker increments with no change, reinforcing ongoing disruption.

**Emotional Beat**: Viewer senses stalemate & mounting frustration.

---

## Scene 8 – *Call to Action*  

| Option | Action |
|--------|--------|
| **Share This Story** | Opens native share dialog or copies URL. |
| **Learn More / Support Open Internet** | Links to educational resources, petitions, or donation pages. |

**Visual Treatment**
* Chaos fades; clean, high-contrast screen appears.  
* CTA buttons subtly animate (breathing effect) to encourage interaction.

---

### Localization Notes
* All *date strings*, *quotations*, and *metrics* will be pulled from `dictionaries/[lng].json` for seamless multilingual support.
* Non-translatable assets (logos, icons) remain universal.

### Accessibility & Performance
* Motion-reduced variant: disables shockwave & flicker effects.  
* All key visuals described via `aria-label` or `alt`.  
* Images served in **WebP** with intrinsic sizing & lazy loading.

---

## Next Steps
1. **Finalize assets**: Ensure SVGs for all logos/icons are available in `/public`.  
2. **Implement scene components** under `src/components/scenes/*`.  
3. **Configure `lib/narration.ts`** with timing & asset refs matching this flow.  
4. **Build `NarrationOrchestrator.tsx`** to drive state + transitions.

> Once the above foundations are in place, we can iterate on micro-interactions, audio cues, and performance tuning. 