---
name: Lumina Analytics
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#684000'
  on-tertiary: '#ffffff'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-metric:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-metric-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-regular:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-semibold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0em
  body-small:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-uppercase:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system embodies a modern, high-precision corporate aesthetic crafted specifically for executive and operational e-commerce intelligence. It strikes an intentional balance between analytical density and visual clarity, projecting authoritative reliability, speed, and effortless comprehension. 

The aesthetic is anchored in contemporary soft-surface minimalism: light, clean architectural planes paired with deliberate, high-contrast focal points. Key metrics command attention without cognitive fatigue. Micro-visualizations, crisp structural lines, and restrained depth cues evoke an atmosphere of enterprise polish, technological precision, and calm decision-making control.

## Colors
The palette leverages a carefully balanced luminosity scale designed for prolonged dashboard sessions:

- **Primary Canvas Background (`#F8F9FA`):** An ultra-soft, low-glare neutral base that isolates pure white analytical cards.
- **Card & Surface Background (`#FFFFFF`):** High-clarity white for content containers, charts, and metrics displays.
- **Primary Indigo (`#4F46E5`):** Reserved for primary interactive triggers, active tab states, selection boundaries, and hero trendlines.
- **Success Emerald (`#10B981`):** Applied to positive growth metrics, completed transaction states, upward indicators, and healthy system status.
- **Warning Amber (`#F59E0B`):** Highlights inventory alerts, margin warnings, and pending operational tasks.
- **Critical / Danger (`#EF4444`):** Flags churn spikes, abandoned cart anomalies, and API drop-offs.
- **Text & Neutral Contrast:**
  - High-emphasis titles and values: Slate-900 (`#0F172A`).
  - Secondary labels and body metadata: Slate-500 (`#64748B`).
  - Inactive borders and structural grid lines: Slate-100 / Slate-200 (`#F1F5F9` / `#E2E8F0`).

## Typography
The system deploys a dual-typeface typographic pairing:

- **Plus Jakarta Sans** provides structural elegance, modern geo-humanist proportions, and commanding punch for high-level dashboard summaries, top-line metric figures (KPI callouts), and card titles.
- **Inter** handles high-density tabular data, analytical breakdowns, interactive controls, tooltips, and structural body copy. Its vertical metrics and legibility at sub-14px sizes prevent fatigue across data-heavy surfaces.

Numerical data within tables, currency counters, and delta badges must always enforce tabular figures (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during real-time data polling.

## Layout & Spacing
The dashboard operates on a 12-column responsive fluid grid anchored by strict vertical baseline cadence.

- **Desktop (>= 1280px):** 12 columns, 24px (`1.5rem`) gutters, and 32px (`2rem`) canvas outer margins. Metric cards arrange in 4-column (3 cards) or 3-column (4 cards) spans. Main chart views span 8 columns paired with a 4-column operational sidebar feed.
- **Tablet (768px - 1279px):** 6 to 8 columns with 16px (`1rem`) gutters and 24px (`1.5rem`) canvas margins. Metric modules collapse to 2x2 grids. Charts expand to full 6 or 8 column spans.
- **Mobile (< 768px):** Single column fluid flow with 16px (`1rem`) gutters and 16px canvas margins. Multi-metric summaries convert to horizontal swipeable carousels or stacked 100% width units.

A strict 4px/8px incremental scale governs internal card spacing:
- Metric cards utilize `space-lg` (24px) internal padding.
- Dense data tables and micro-chips utilize `space-xs` and `space-sm` for high information density without visual collision.

## Elevation & Depth
Depth is articulated via flat tonal planes, featherweight structural borders, and ambient light-casting:

- **Flat/Base Level (Layer 0):** Canvas canvas surface at `#F8F9FA`.
- **Card Level (Layer 1):** Solid white surface (`#FFFFFF`) with a dual separation technique: a hairline border of `rgba(226, 232, 240, 0.8)` (slate-200 at 80%) coupled with an ambient drop-shadow (`box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`).
- **Hover/Interactive Card Level (Layer 2):** On hover or selection, cards smoothly transition (`duration-200`) to `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)` and border color shifts to `rgba(203, 213, 225, 0.9)`.
- **Popovers, Datepickers & Flyouts (Layer 3):** Solid white backed by `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` with a precise `rgba(226, 232, 240, 1)` perimeter boundary.
- **Modals & Drawers (Layer 4):** Anchored with a soft darkened scrim (`rgba(15, 23, 42, 0.4)` backdrop blur of 4px) to retain spatial awareness while isolating operational tasks.

## Shapes
The visual architecture is built around roundedness level `2`:
- Standard containers and metric cards enforce **12px / 0.75rem (`rounded-xl`)**, delivering a friendly yet structurally disciplined container silhouette.
- Interactive controls including primary buttons, search bars, filter inputs, and dropdown triggers utilize **8px / 0.5rem (`rounded-lg`)**.
- Micro-elements such as delta pills, status badges, and user avatars utilize **9999px (`rounded-full`)** to distinguish qualitative attributes from quantitative surface panels.

## Components

### Buttons
- **Primary:** Background `#4F46E5`, foreground `#FFFFFF`, font weight 600. Subtle shadow `0 1px 2px rgba(79, 70, 229, 0.2)`. On hover, color darkens to `#4338CA`.
- **Secondary / Neutral:** Background `#FFFFFF`, border 1px solid `#E2E8F0`, foreground `#0F172A`. Hover transitions background to `#F8F9FA` with border tint `#CBD5E1`.
- **Ghost / Minimal:** Background transparent, text `#64748B`, hover text `#0F172A`, hover background `rgba(241, 245, 249, 0.8)`.

### Metric Cards & Micro-Charts
- Standard layout: Upper tier contains the metric category in uppercase slate-500 (`label-uppercase`) right-aligned with an icon or filter trigger. Center tier holds the bold metric value (`headline-metric` in `#0F172A`). Lower tier pairs a micro trendline or sparkline with an inline growth badge.
- Sparklines: Stroke width 2px without fill or with a low-opacity linear gradient (`rgba(79, 70, 229, 0.1)` to `rgba(79, 70, 229, 0.0)`).

### Chips & Badges
- **Positive Trend:** Background `rgba(16, 185, 129, 0.1)`, text `#047857`, border `1px solid rgba(16, 185, 129, 0.2)`, paired with a directional chevron.
- **Negative Trend:** Background `rgba(239, 68, 68, 0.1)`, text `#B91C1C`, border `1px solid rgba(239, 68, 68, 0.2)`.
- **Neutral Tag:** Background `#F1F5F9`, text `#475569`, border `1px solid #E2E8F0`.

### Data Tables
- Header: Background `#F8F9FA`, text `#64748B` in `label-uppercase`, 40px height, bottom hairline border `#E2E8F0`.
- Rows: Background `#FFFFFF`, 52px height for comfortable scanning, bottom border `#F1F5F9`, alternating hover row state `#F8FAFC`. All numeric entries right-aligned and set in `data-mono`.

### Form Inputs & Search Fields
- Inset padding `10px 14px`, 1px border `#E2E8F0`, background `#FFFFFF`. Active focus transitions border to `#4F46E5` with an external outline glow `0 0 0 3px rgba(79, 70, 229, 0.15)`. Placeholder text in `#94A3B8`.

### Checkboxes & Radios
- Size 16px x 16px, border 1.5px solid `#CBD5E1`, border-radius 4px (checkbox) or full circular (radio). Active state fills with `#4F46E5` featuring crisp white vector marks.