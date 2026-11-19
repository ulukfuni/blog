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
- Local default: `ws://127.0.0.1:9876/ws` (no env var needed; `.env.development`).
- Prod: `.env.production` points at the Cloudflare worker.
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

## Git workflow
- Never push directly to `master`. Always create a feature branch and open a PR to `master`.
- Branch naming: `feature/<short-description>`, `fix/<short-description>`.
- Commit messages: imperative, concise, describe the "why".

## Learned User Preferences
- Open pull requests as drafts unless the user asks for a ready-to-merge PR.
- When writing or editing posts, follow `docs/blog-style-guide.md`: first person, conversational, and clear enough for a broad audience on technical posts. Leave `draft: true` until the user says to publish.

## Learned Workspace Facts
- Google Analytics is `gatsby-plugin-google-gtag`. The tracking ID is the Netlify build env `GA_TRACKING_ID`. Gatsby inlines it at build time, so changing it requires a new production deploy.
- `/now` and `/work` are standalone markdown pages (`content/blog/now/index.md`, `content/blog/work/index.md`) rendered by `src/templates/now.js` and `src/templates/work.js`. `gatsby-node.js` special-cases them before the draft guard. `isStandalonePageSlug` in `src/utils/posts.js` omits them from the home list, RSS, `posts.json`, category archives, and prev/next. Keep `/work` in the same prose layout as `/now`.
- New posts come from `npm run new-post` (`node scripts/create-post.js "Title"`), which writes `content/blog/<slug>/index.md` and starts as a draft. Frontmatter follows `docs/blog-style-guide.md`.
