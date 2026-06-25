# Portfolio — trann8

Pure client-side portfolio built with **SolidJS**, **Vite**, and **Tailwind CSS v4**. Zero SSR, zero hydration. Designed for static hosting (GitHub Pages / Cloudflare Pages).

## Requirements

- **Node.js** ≥ 20
- **pnpm** (`npm i -g pnpm`)

## Quick Start

```bash
# Install dependencies
pnpm install

# Dev server (port 3000)
pnpm dev

# Production build
pnpm build

# Preview production build locally
pnpm preview
```

## Architecture

### Content Pipeline
Project data is stored as static JSON at `public/content.json`. The client fetches this with `cache: "force-cache"` on mount — **zero parsing in the browser.**

### Hardware-Aware Rendering
`src/hooks/usePerformanceTier.ts` detects device capability using only standard APIs:

| Tier | Detection | Behavior |
|---|---|---|
| `high` | Default (good GPU, fast network) | Web Animations API, staggered transitions |
| `medium` | 3G network or frame-budget miss | CSS-only transforms, shorter duration |
| `low` | `prefers-reduced-motion`, software renderer, save-data | Static layout, zero JS animation loops |

### Design System
- **Font**: Inter (via Google Fonts)
- **Theming**: CSS custom properties + manual dark/light toggle via `[data-theme]` attribute
- **Accessibility**: Visible `:focus-visible` states, semantic HTML, ARIA labels

### Bundle Targets
| Metric | Actual (gzipped) | Target |
|---|---|---|
| Initial JS | ~9 KB | < 30 KB ✅ |
| CSS | ~4.5 KB | < 15 KB ✅ |

## Project Structure

```
├── public/
│   ├── content.json      # Static project data (hand-edited)
│   └── images/           # Project screenshots/assets
├── src/
│   ├── components/       # UI components
│   │   ├── ProjectCard.tsx
│   │   └── RotatingText.tsx
│   ├── hooks/
│   │   ├── usePerformanceTier.ts
│   │   └── useTheme.ts
│   ├── types/
│   │   └── content.ts
│   ├── App.tsx           # Main layout + content fetching
│   ├── index.css         # Tailwind v4 + design tokens
│   └── index.tsx         # Entry point (render → #app)
├── index.html            # Shell (pure CSR, no hydration)
├── vite.config.ts        # Vite + Tailwind + path aliases
└── tsconfig.json         # Strict TS + @/ alias
```

## Deployment

### GitHub Pages
Set `base` in `vite.config.ts`:
```ts
export default defineConfig({
  base: "/trann8.github.io/",
  // ...
});
```

Then push to the `main` branch — GitHub Actions or manual build handles the rest.

### Cloudflare Pages
```bash
pnpm build
# Upload dist/ folder or connect Git repo with:
#   Build command: pnpm build
#   Output dir: dist
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with HMR |
| `pnpm build` | TypeScript check + Vite production build |
| `pnpm preview` | Serve production build locally |
