// celld chat backend — old-school IRC-style rooms, one Durable Object per room.
// Run locally:   celld dev .          (serves on http://127.0.0.1:9876)
// Deploy:        celld deploy . --bucket s3://...   then run celld against the bucket.

const HISTORY_LIMIT = 50;
const MAX_TEXT_LEN = 500;
const MIN_MSG_INTERVAL_MS = 1000;
const MAX_NICK_LEN = 16;

function sanitizeNick(raw) {
  const n = String(raw || "").trim().slice(0, MAX_NICK_LEN);
  return /^[A-Za-z0-9_\-]+$/.test(n) ? n : null;
}

function roomFromRequest(url) {
  const room = url.searchParams.get("room");
  if (!room || room.length > 128) return "lobby";
  return room;
}

export class ChatRoom {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    // Lazy table creation.
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts INTEGER NOT NULL,
        nick TEXT NOT NULL,
        text TEXT NOT NULL,
        kind TEXT NOT NULL DEFAULT 'msg'
      )
    `);
  }

  async fetch(request) {
    const upgrade = request.headers.get("Upgrade");
    if (!upgrade || upgrade.toLowerCase() !== "websocket") {
      return new Response("Expected Upgrade: websocket", { status: 426 });
    }
    if (request.method !== "GET") {
      return new Response("Expected GET", { status: 400 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    // Hibernatable accept: survives idle eviction on the same node.
    this.ctx.acceptWebSocket(server);

    const nick = "anon-" + crypto.randomUUID().slice(0, 6);
    server.serializeAttachment({ nick });

    // Send history + welcome to the new socket only.
    const history = this.ctx.storage.sql
      .exec("SELECT ts, nick, text, kind FROM messages ORDER BY id DESC LIMIT ?", HISTORY_LIMIT)
      .toArray()
      .reverse();
    server.send(JSON.stringify({ type: "history", messages: history }));
    server.send(JSON.stringify({ type: "system", text: `*** you are ${nick}. /nick <name> to rename.` }));

    this.broadcast({ type: "system", text: `*** ${nick} has joined` }, server);

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, raw) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      ws.send(JSON.stringify({ type: "error", text: "invalid json" }));
      return;
    }

    const att = ws.deserializeAttachment() || {};
    let nick = att.nick || "anon";

    if (data && data.type === "nick") {
      const next = sanitizeNick(data.nick);
      if (!next) {
        ws.send(JSON.stringify({ type: "error", text: "invalid nick" }));
        return;
      }
      const old = nick;
      nick = next;
      ws.serializeAttachment({ nick });
      this.broadcast({ type: "system", text: `*** ${old} is now ${nick}` });
      return;
    }

    if (data && data.type === "msg") {
      const now = Date.now();
      if (att.lastMsg && now - att.lastMsg < MIN_MSG_INTERVAL_MS) {
        ws.send(JSON.stringify({ type: "error", text: "slow down" }));
        return;
      }
      const text = String(data.text || "").trim().slice(0, MAX_TEXT_LEN);
      if (!text) return;
      att.lastMsg = now;
      ws.serializeAttachment({ ...att, lastMsg: now });
      // IRC-ish /me action.
      const kind = text.startsWith("/me ") ? "action" : "msg";
      const body = kind === "action" ? text.slice(4) : text;
      const ts = Date.now();
      this.ctx.storage.sql.exec(
        "INSERT INTO messages (ts, nick, text, kind) VALUES (?, ?, ?, ?)",
        ts,
        nick,
        body,
        kind
      );
      this.broadcast({ type: kind, nick, text: body, ts });
      return;
    }

    ws.send(JSON.stringify({ type: "error", text: "unknown type" }));
  }

  async webSocketClose(ws, code, reason) {
    const att = ws.deserializeAttachment() || {};
    const nick = att.nick || "anon";
    this.broadcast({ type: "system", text: `*** ${nick} has left` }, ws);
  }

  async webSocketError(ws, error) {
    try {
      ws.close(1011, "error");
    } catch {}
  }

  broadcast(payload, except) {
    const msg = JSON.stringify(payload);
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === except) continue;
      try {
        ws.send(msg);
      } catch {}
    }
  }
}

// Worker entrypoint
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS preflight for browser clients.
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("blog-chat ok", {
        status: 200,
        headers: { "content-type": "text/plain", ...corsHeaders(request) },
      });
    }

    if (url.pathname === "/ws") {
      const room = roomFromRequest(url);
      const id = env.CHAT_ROOM.idFromName(room);
      const stub = env.CHAT_ROOM.get(id);
      // Forward the original request (with Upgrade header) to the DO.
      return stub.fetch(request);
    }

    return new Response("Not found", { status: 404, headers: corsHeaders(request) });
  },
};

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}
