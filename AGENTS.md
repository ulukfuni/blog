# Agents Guide — The Life I Live (blog)

## Stack
- Gatsby 5 (React 18), Markdown content in `content/blog/<slug>/index.md`.
- Templates: `src/templates/blog-post.js`, `now.js`, `work.js`. Layout: `src/components/layout.js`.

## Chat feature (IRC-style, bottom-right widget)
- Component: `src/components/chat.js` — floating widget, minimizes to a pill on mobile (<768px).
- Embedded in `blog-post.js` (per-post room keyed by path) and `pages/index.js` (`#lobby`).
- Backend: Durable Object per room, hibernatable WebSockets, SQLite history (last 50).
- Two deployable variants:
  - `chat/` — celld (self-hosted). Run: `cd chat && celld dev . --port 9876`.
  - `chat/cloudflare/` — Cloudflare Workers. Deploy: `cd chat/cloudflare && npx wrangler deploy`.
- Prod endpoint: `GATSBY_CHAT_WS_URL` env var (Netlify build). Current prod: `wss://blog-chat.thirteen-game.workers.dev/ws`.
- Local default: `ws://127.0.0.1:9876/ws` (no env var needed).
- Protocol: `{type: msg|nick, ...}`; server broadcasts `{type: msg|action|system|error|history}`.
- `.celld/` local state is gitignored.

## Conventions
- No `defaultProps` on function components (React 18) — use default params.
- SEO component is all-caps (`<SEO />`); `.eslintrc.json` sets `allowAllCaps: true`.
- `src/constants/social.js` exports a named variable (no anonymous default export).

## Dev
- `npm run develop` (port 8000), `npm run build`.
- Clear stale cache: `rm -rf .cache public` if dev queries fail.
- Lint warnings are non-blocking; dev server runs eslint on save.