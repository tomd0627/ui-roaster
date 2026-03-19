# UI Roaster

An AI-powered UI critique tool. Drop a screenshot — get a brutally honest, structured roast of your design's visual quality, UX, accessibility, typography, and layout.

Built with Next.js 15, Tailwind CSS v4, and the Claude Sonnet API.

## Setup

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Anthropic Claude API key — get one at [console.anthropic.com](https://console.anthropic.com/) |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL for OG metadata (defaults to `https://ui-roaster.netlify.app`) |

## Tech Stack

- **Next.js 15** (App Router, TypeScript strict)
- **Tailwind CSS v4**
- **Anthropic Claude Sonnet** — vision API for image analysis
- **react-dropzone** — accessible file upload

## Features

- Drag-and-drop or click-to-upload (PNG, JPG, WebP — max 5 MB)
- Client-side image compression before sending to API
- 8 curated sample UIs via the "Try a Sample" randomizer
- Structured critique across 5 categories: Visual Design, UX, Accessibility, Typography, Layout & Spacing
- Heat Level meter (1–10 severity score)
- Copy-to-clipboard roast export
- WCAG 2.1 AA accessible throughout
- Rate limited (10 req/min per IP)

## Deployment

Deploy to Netlify — the `netlify.toml` is pre-configured with the Next.js plugin and security headers. Add `ANTHROPIC_API_KEY` in the Netlify environment variables dashboard.
