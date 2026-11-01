# Blog chat (celld backend)

Old-school IRC-style chat rooms backed by [celld](https://celld.dev) (self-hosted
Durable Objects). One Durable Object per room (keyed by URL path), hibernatable
WebSockets, SQLite message history.

## Local dev

```sh
# terminal 1: backend
cd chat
celld dev . --port 9876

# terminal 2: blog
cd ..
npm run develop
```

The Gatsby widget connects to `ws://127.0.0.1:9876/ws?room=<path>` by default.

## Point at a different backend

Set `GATSBY_CHAT_WS_URL` (e.g. in `.env`) to override the WebSocket base URL:

```
GATSBY_CHAT_WS_URL=wss://chat.example.com/ws
```

## Deploy

```sh
cd chat
celld deploy . --bucket s3://my-cells-bucket
celld --bucket s3://my-cells-bucket --listen 0.0.0.0:8080 \
  --internal-listen 10.0.0.12:8081 --advertise 10.0.0.12:8081
```

Then set `GATSBY_CHAT_WS_URL=wss://chat.example.com/ws` and rebuild the blog.
## Cloudflare Workers (recommended for $0)

The same code runs on Cloudflare Workers without celld. From `chat/cloudflare`:

```sh
cd chat/cloudflare
npx wrangler deploy
```

Then set `GATSBY_CHAT_WS_URL=wss://blog-chat.<your-subdomain>.workers.dev/ws` and
rebuild the blog (Netlify). Cross-origin is handled by the worker's CORS headers,
so chat on Cloudflare + blog on Netlify works fine.
