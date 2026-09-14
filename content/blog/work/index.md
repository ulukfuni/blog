---
title: Work
description: Projects I've shipped and am still building — HoopSim, an AI resume studio, and full-stack AI-native work
keywords:
    - work
    - portfolio
    - hoopsim
    - resume
    - AI
---

I build full-stack AI-native products — the app, the backend, the model calls, the billing, the boring production stuff. This page is the work. The blog posts are how I got there.

### **HoopSim** — live, still building

Simulated fantasy basketball. You draft your team like a traditional fantasy league, then run full seasons in minutes — without the grind or real-world injury heartbreak.

I came up with this while trying to run a Yahoo league as commissioner from 13 hours ahead. Timezones, injuries, the long NBA season. What if you just… skip that. Origin story is in [HoopSim Devlog #1](/hoopsim-devlog-1/).

- Live: [hoopsim.xyz](https://hoopsim.xyz) · app: [app.hoopsim.xyz](https://app.hoopsim.xyz) — guest demo, no account required
- Stack: Bun + Turborepo, Vite + React + TanStack Router, Convex backend, TypeScript game engine, daisyUI/Shadcn/Tailwind
- Polar for billing, Resend for email (product emails from hoopsim.xyz)
- Draft against rule-based AI managers. Real-time Convex for draft rooms and sim progress
- In-product LLM is Gemini triaging in-app feedback (can file GitHub issues). League AI narratives are still on the list — not shipped
- Building it with Cursor / plan mode, which is the thing that actually made this shippable. The sim is variance-based, not a physics engine

It's playable. I'm still building it.

### **Nurse Remotely Resume Studio** — shipped, more in progress

An editorial-grade nursing resume builder for live job pages. Bring in one PDF, keep the facts honest, and return a cleaner draft that actually sounds employable. Tailor it to the job description on the page. Export an ATS-safe PDF.

Not a generic resume SaaS. It's a product feature for Nurse Remotely, sitting on the job pages.

- See it on the [Nurse Remotely job board](https://www.nurseremotely.com/jobs)
- Stack: React 19 + Vite + Tailwind, Vercel serverless (`api/` + `server/lib/`), Vercel AI SDK, OpenAI + Gemini
- Zod-validated structured output, unpdf for extract, @react-pdf/renderer for export
- Upstash Redis for rate limits and quotas, Stripe NRPro billing
- iframe postMessage embed (+ IIFE for CMS)
- Anti-hallucination rails — don't invent experience the PDF doesn't support. Billing and rate-limit gates run before inference
- Second AI surface is mock interviews, in progress on main

### **How I build**

- Full stack. UI through billing. The production stuff counts
- AI in the product, not just as a coding assistant
- Structured outputs and schemas. Don't let the model free-wheel facts
- Agent-friendly backends — Convex, Vercel functions
- Tests. The boring parts that keep it from falling over

### **Last Updated** : September 14, 2026
