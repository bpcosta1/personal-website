# Project Overview: Personal Website

A personal website for Bruno Costa, built with modern web technologies and focused on performance and minimalism. It features a blog (writings), a "uses" page, and a clean, typography-focused design.

## Tech Stack

- **Framework:** [Astro v6](https://astro.build/)
- **UI Components:** [Svelte v5](https://svelte.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Content:** [MDX](https://mdxjs.com/) with Astro Content Collections
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Deployment:** Docker (Nginx), Traefik (Proxy), GitHub Actions

## Architecture

- `src/content/`: Contains MDX files for the "writings" collection.
- `src/pages/`: Astro routes. Supports `.astro` and `.ts` files (e.g., `robots.txt.ts`).
- `src/components/`: Reusable components, organized by category (e.g., `layout`, `writings`). Uses both Astro and Svelte.
- `src/layouts/`: Base Astro layouts (e.g., `Layout.astro`).
- `src/styles/`: Global CSS and Tailwind configuration.
- `public/`: Static assets like icons and images.

## Building and Running

### Prerequisites
- Node.js (>=22.12.0)
- pnpm

### Development
```bash
pnpm install
pnpm dev
```

### Production
```bash
pnpm build
pnpm preview
```

### Deployment
The project is containerized using Docker.
- `Dockerfile`: Multi-stage build (Node for building, Nginx for serving).
- `docker-compose.yaml`: Configured for Traefik proxy.

## Development Conventions

### Content
- **Writings:** Add new posts to `src/content/writings/` as `.mdx` files.
- **Schema:** All posts must follow the schema defined in `src/content.config.ts`:
  - `title`: string
  - `date`: Date
  - `lastUpdated`: Date (optional)
  - `description`: string (optional)
  - `draft`: boolean (default: false)
  - `readTime`: number (minutes)
  - `tags`: string[] (optional)

### Styling
- Use Tailwind CSS v4 utility classes.
- Custom theme variables (like `--color-brand`) are defined in `src/styles/global.css`.
- Prefer typography-focused design using the `@tailwindcss/typography` plugin for markdown content.

### Components
- Use **Astro components** (`.astro`) for static parts and layouts.
- Use **Svelte components** (`.svelte`) for interactive elements (e.g., `Navigation.svelte`).

### Icons
- Icons are managed via `astro-icon` and Iconify sets (e.g., `@iconify-json/lucide`).
