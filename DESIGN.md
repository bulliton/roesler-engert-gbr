# Design System — Rösler & Engert GbR

## Product Context
- **What this is:** B2B jewelry and diamond manufactory site for partner jewelers
- **Who it's for:** Independent jewelers and retail partners in Germany and internationally
- **Space/industry:** Luxury jewelry wholesale / atelier manufacturing
- **Project type:** Marketing site with lead capture (no shop in v1)

## Aesthetic Direction
- **Direction:** Quiet Atelier — luxury/refined, minimal decoration
- **Decoration level:** Minimal — typography, warm surfaces, and photography carry the mood
- **Mood:** Quiet confidence, craft under one roof, partner-to-partner
- **Reference:** Institutional teal heritage from the original brand; gold as rare accent

## Typography
- **Display/Hero:** Lora — editorial serif, heritage continuity
- **Body/UI:** Source Sans 3 — quiet grotesque, readable in DE/EN
- **Headline scale (h1–h4):** CSS variables `--headline-size-h1` … `--headline-size-h4` on global heading elements
- **h1:** up to 4.5rem · **h2:** up to 3rem · **h3:** up to 2rem · **h4:** up to 1.375rem
- Use the `Headline` component with `as="h1"|"h2"|"h3"|"h4"` — do not override font-size in className unless intentional

## Color
- **Approach:** Restrained — warm paper canvas, teal institutional, gold accent
- **Canvas:** `#f7f4ef` — warm paper page background
- **Primary:** `#004646` — headings, institutional bands
- **Secondary:** `#2a6a6a` — links, hover (desaturated, does not compete with gold)
- **Accent gold:** `#b8956b` — eyebrows, hairlines, primary CTAs on light surfaces
- **Accent gold light:** `#d4b896` — button hover
- **Ink:** `#171717` — body text
- **Muted:** `#6b6560` — warm gray secondary text
- **Semantic:** success `#3d6b5a`, warning `#8a7344`, error `#8b4444`, info `#2a6a6a`

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable / spacious
- **Section padding:** `clamp(4rem, 8vw, 6.5rem)` vertical; `clamp(1rem, 4vw, 2rem)` horizontal
- **Content gap:** `clamp(2.75rem, 4vw, 3.5rem)`

## Layout
- **Approach:** Grid-disciplined editorial
- **Max content width:** 90rem
- **Hero budget:** Brand signal + one headline + one sentence + CTA group + full-bleed media. No stats or secondary promos in first viewport.
- **Border radius:** `sm` 2px for buttons; avoid uniform bubbly radii

## Motion
- **Approach:** Minimal-functional — loading mark, hero reveal, selective scroll fade
- **Avoid:** Staggered fade-up on every section
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for entrances; `0.35s` for hovers
- **Reduced motion:** Always respect `prefers-reduced-motion`

## Components
- **Buttons:** Sentence case, light tracking; gold primary on light; inverse on teal/photo
- **Eyebrows:** Gold on heroes; muted uppercase on interior pages
- **Sections:** Warm canvas default; teal contrast bands sparingly; diamond pattern rare
- **Cards:** Avoid unless required for interaction

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-16 | Quiet Atelier direction | Differentiate from corporate teal SaaS; elevate craft and gold |
| 2026-07-16 | Source Sans 3 replaces Lato | Quieter body voice without losing readability |
| 2026-07-16 | Warm paper canvas | Luxury warmth vs flat clinical white |
