# Portfolio Codebase Guide

## Overview

This repository is a small static portfolio site with no build step and no framework runtime.

- `index.html` is the full document structure and content source.
- `styles.css` owns the visual system, layout, animation states, and responsive behavior.
- `script.js` adds the small interactive layer for reveal animations and active navigation highlighting.

The site is meant to be opened directly in a browser or served by a simple static server.

## File Structure

```text
portfolio/
├── AGENTS.md
├── index.html
├── script.js
└── styles.css
```

## Runtime Flow

### 1. Page boot

When the browser loads `index.html`:

- Google Fonts are loaded for `Manrope` and `Space Grotesk`.
- `styles.css` is loaded in the `<head>`.
- The full page markup is rendered immediately because all content is static HTML.
- `script.js` is loaded at the end of `<body>` so DOM elements already exist when the script runs.

### 2. Layout and rendering

`index.html` is organized as a single-page portfolio with anchor navigation:

- Sticky top bar
- Hero section
- About section
- Skills section
- Experience section
- Projects section
- Education and languages grid
- Contact call-to-action

The navigation links point to section ids like `#about`, `#skills`, `#experience`, `#projects`, and `#contact`.

### 3. Styling system

`styles.css` defines the design language through CSS custom properties in `:root`:

- brand colors
- surface colors
- borders
- shadows
- accent tones

The main reusable visual patterns are:

- `.panel` for light glass-style content sections
- `.contact-panel` for the darker closing CTA section
- `.button`, `.button-solid`, and `.button-ghost` for actions
- `.reveal` for entrance animation targets

Responsive behavior is handled entirely with CSS media queries at:

- `1120px`
- `860px`
- `560px`

### 4. Client-side behavior

`script.js` handles two behaviors:

- Reveal animation:
  Elements with `.reveal` get `is-visible` added in a staggered sequence after the page becomes JS-ready.

- Active nav highlighting:
  An `IntersectionObserver` watches sections referenced by the top navigation and applies `.is-active` to the matching nav link while that section is in view.

This means the section ids in HTML and the `href` values in `.topnav a` must stay aligned.

## Content and Ownership

### `index.html`

Owns:

- all copy/content
- section order
- semantic structure
- anchor ids used by navigation
- external links like email, phone, and LinkedIn

Change `index.html` when updating:

- biography text
- experience entries
- projects
- skills
- contact details
- section ordering or adding/removing sections

### `styles.css`

Owns:

- page theme
- typography choices
- spacing
- grid layout
- card/panel appearance
- responsive behavior
- reveal animation states
- active nav visual state

Change `styles.css` when updating:

- colors
- section layout
- breakpoints
- hover/focus treatments
- panel/card styling
- animation timing

### `script.js`

Owns:

- identifying reveal targets
- staggered entrance timing
- observing sections for nav state
- toggling `.is-active` on the nav

Change `script.js` only if interaction rules change. Content-only updates should not require JavaScript edits.

## Safe Extension Rules

When adding a new section:

1. Add a unique section `id` in `index.html`.
2. Add a matching nav link if it should appear in the top navigation.
3. Add `.reveal` if it should animate in with the rest of the page.
4. Reuse existing layout primitives before creating new CSS patterns.

When editing navigation:

- Keep `href="#section-id"` values aligned with real section ids.
- If a nav link points to a missing section, `script.js` will silently ignore it in observer setup, but the link itself will still be broken for users.

When editing styles:

- Prefer changing the `:root` variables first for color and tone updates.
- Preserve the existing breakpoint structure unless a larger layout refactor is intended.

## Constraints

- No package manager or framework conventions exist in this repo today.
- There is no component abstraction layer; repeated structures are managed manually in HTML and CSS.
- The page is content-first and mostly static, so simplicity is more valuable than adding tooling.

## Suggested Local Workflow

For quick checks, use any static server from the repo root, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Change Strategy

Use the smallest change that keeps these relationships intact:

- HTML section ids <-> nav link hrefs
- `.reveal` elements <-> reveal animation styles
- section structure <-> responsive CSS grids

If the repo grows beyond a single-page site, the next clean step would be separating content, styles, and behavior into clearer modules. For now, the current three-file structure is appropriate and easy to maintain.
