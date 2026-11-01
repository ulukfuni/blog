import React, { useEffect, useRef, useState } from "react"

const WS_URL =
    (typeof process !== "undefined" && process.env.GATSBY_CHAT_WS_URL) ||
    "wss://blog-chat.thirteen-game.workers.dev/ws"

function formatTime(ts) {
    const d = new Date(ts)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function Chat({ room = "lobby" }) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [status, setStatus] = useState("connecting")
    const [nick, setNick] = useState(null)
    const [open, setOpen] = useState(true)
    const wsRef = useRef(null)
    const logRef = useRef(null)
    const reconnectTimer = useRef(null)
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            setOpen(false)
        }
    }, [])
    useEffect(() => {
        let cancelled = false
        function connect() {
            const url = `${WS_URL}?room=${encodeURIComponent(room)}`
            const ws = new WebSocket(url)
            wsRef.current = ws
            ws.onopen = () => {
                if (cancelled) return
                setStatus("connected")
            }
            ws.onmessage = (e) => {
                if (cancelled) return
                let data
                try {
                    data = JSON.parse(e.data)
                } catch (e2) {
                    return
                }
                if (data.type === "history") {
                    setMessages(data.messages || [])
                } else if (data.type === "system") {
                    setMessages((m) => [...m, { kind: "system", text: data.text, ts: Date.now() }])
                } else if (data.type === "error") {
                    setMessages((m) => [...m, { kind: "error", text: data.text, ts: Date.now() }])
                } else if (data.type === "msg" || data.type === "action") {
                    setMessages((m) => [...m, { kind: data.type, nick: data.nick, text: data.text, ts: data.ts }])
                }
                if (data.type === "system") {
                    const m = data.text.match(/you are (\S+)\./)
                    if (m) setNick(m[1])
                }
            }
            ws.onclose = () => {
                if (cancelled) return
                setStatus("disconnected")
                reconnectTimer.current = setTimeout(connect, 2000)
            }
            ws.onerror = () => {
                try {
                    ws.close()
                } catch (e3) {}
            }
        }
        connect()
        return () => {
            cancelled = true
            clearTimeout(reconnectTimer.current)
            if (wsRef.current) wsRef.current.close()
        }
    }, [room])

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight
        }
    }, [messages])

    function send(text) {
        const ws = wsRef.current
        if (!ws || ws.readyState !== WebSocket.OPEN) return
        const trimmed = text.trim()
        if (!trimmed) return
        if (trimmed.startsWith("/nick ")) {
            ws.send(JSON.stringify({ type: "nick", nick: trimmed.slice(6).trim() }))
        } else {
            ws.send(JSON.stringify({ type: "msg", text: trimmed }))
        }
        setInput("")
    }

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                style={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    zIndex: 1000,
                    background: "#0b0e14",
                    color: "#d7d7d7",
                    border: "1px solid #333",
                    borderRadius: 999,
                    padding: "8px 14px",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 13,
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
            >
                💬 #{room === "/" ? "lobby" : room.replace(/^\/+|\/+$/g, "") || "lobby"}
            </button>
        )
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 1000,
                width: 360,
                maxWidth: "calc(100vw - 32px)",
                border: "1px solid #333",
                borderRadius: 8,
                background: "#0b0e14",
                color: "#d7d7d7",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 13,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
        >
            <div
                style={{
                    padding: "6px 10px",
                    borderBottom: "1px solid #333",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#8a8a8a",
                    alignItems: "center",
                }}
            >
                <span>#{room === "/" ? "lobby" : room.replace(/^\/+|\/+$/g, "") || "lobby"}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span>{status} {nick ? `· ${nick}` : ""}</span>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#8a8a8a",
                            cursor: "pointer",
                            fontSize: 16,
                            lineHeight: 1,
                            padding: 0,
                        }}
                        aria-label="Minimize chat"
                    >
                        _
                    </button>
                </div>
            </div>
            <div
                ref={logRef}
                style={{
                    height: 220,
                    overflowY: "auto",
                    padding: "8px 10px",
                    lineHeight: 1.4,
                }}
            >
                {messages.map((m, i) => {
                    if (m.kind === "system") {
                        return (
                            <div key={i} style={{ color: "#6b7280" }}>
                                {m.text}
                            </div>
                        )
                    }
                    if (m.kind === "error") {
                        return (
                            <div key={i} style={{ color: "#f87171" }}>
                                !! {m.text}
                            </div>
                        )
                    }
                    if (m.kind === "action") {
                        return (
                            <div key={i} style={{ color: "#a78bfa" }}>
                                <span style={{ color: "#6b7280" }}>[{formatTime(m.ts)}]</span>{" "}
                                * {m.nick} {m.text}
                            </div>
                        )
                    }
                    return (
                        <div key={i}>
                            <span style={{ color: "#6b7280" }}>[{formatTime(m.ts)}]</span>{" "}
                            <span style={{ color: "#60a5fa" }}>&lt;{m.nick}&gt;</span> {m.text}
                        </div>
                    )
                })}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    send(input)
                }}
                style={{ display: "flex", borderTop: "1px solid #333" }}
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={status === "connected" ? "say something… (/nick name)" : "connecting…"}
                    disabled={status !== "connected"}
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        color: "#d7d7d7",
                        padding: "8px 10px",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        outline: "none",
                    }}
                />
                <button
                    type="submit"
                    disabled={status !== "connected"}
                    style={{
                        background: "#1f2937",
                        color: "#d7d7d7",
                        border: "none",
                        borderLeft: "1px solid #333",
                        padding: "0 12px",
                        cursor: "pointer",
                    }}
                >
                    send
                </button>
            </form>
        </div>
    )
}