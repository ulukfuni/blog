# TODO — Chat feature follow-ups

## Security / abuse (watch list)
- [ ] Per-room connection cap in the Durable Object (mitigate socket flooding). Cloudflare enforces per-IP limits at the edge; celld self-host does not.
- [ ] Content moderation: optional profanity/blocklist filter on incoming messages.
- [ ] Admin-only commands (e.g. `/clear`, `/kick`) for room moderation.
- [ ] Message deletion / retention policy beyond last-50 history.
- [ ] Keep bucket credentials (celld) secret — they grant full fleet admin access.

## Features
- [ ] Persist nick across reconnects (currently resets to anon-XXXX).
- [ ] Typing indicators / presence.
- [ ] Markdown or link rendering in messages (currently plain text).
- [ ] Mobile: auto-minimize on scroll or inactivity.

## Infra
- [ ] Move `.wrangler/` cleanup / fix root-owned permissions (workaround: deploy from /tmp).
- [ ] Add CI step to deploy `chat/cloudflare` on push.