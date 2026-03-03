# Blog style guide

This guide was derived from existing posts in `content/blog/`. Use it to keep new posts consistent and to brief a cowriter (human or AI).

---

## Frontmatter

- **Required fields:** `title`, `date`, `categories`, `description`, `keywords`
- **Date:** Use quoted ISO date: `date: 'YYYY-MM-DD'`
- **Categories:** YAML list, 2-space indent. Use 1–5 items; mix of topic and tone (e.g. `dev`, `life`, `story`, `JavaScript`). Casing is inconsistent in the archive (both `dev` and `Dev` appear); prefer **lowercase** for new posts.
- **Keywords:** YAML list, 2-space indent. SEO- and discovery-oriented; can overlap with categories.
- **Description:** One line; used for SEO and previews. No period at end.

Example:

```yaml
---
title: Your Post Title Here
date: '2026-03-02'
categories:
    - dev
    - devlog
description: Short summary for search and social previews
keywords:
    - keyword-one
    - keyword-two
---
```

---

## Structure

- **Technical / tutorial posts:** Start with a `> TL;DR:` blockquote (one or two sentences). Then 1–2 short paragraphs of context before the first `##` section.
- **Personal / story posts:** Often start with an image, then a strong first line that hooks. No TL;DR required.
- **Sections:** Use `##` for main sections. Use `####` for subsections in technical posts (e.g. “Ease of Starting Up”, “Fun Factor”).
- **Length:** Anything from a few paragraphs to long-form is fine. Longer posts use clear headings so they’re scannable.

---

## Voice and tone

- **Person:** First person (“I”). Conversational, like explaining to a friend.
- **Context:** For technical posts, briefly explain for readers who don’t know the topic (e.g. “For those who don’t know, X is…”).
- **Humor:** Light, self-deprecating when it fits (e.g. “I lied my ass off”, “probably due to laziness”). No need to force it.
- **Honesty:** Personal posts are candid; technical posts admit when something was hard or when you’re still learning.
- **No fluff:** Get to the point. Avoid corporate or generic intros.

---

## Formatting

- **Images:** Use at the top of the post or within relevant sections. Always use descriptive alt text (e.g. `![Dwyane Wade](dwade.png)` not `![image](dwade.png)`).
- **Links:** Inline markdown. Prefer “here” or the resource name as link text when it reads naturally (e.g. “You can take a look at the rest of the code [here](url).”).
- **Code:** Fenced blocks with language tag (e.g. ` ```js `, ` ```bash `). Short comments in code are fine.
- **Asides:** Strikethrough for playful asides (e.g. `~~I had a ton of interest in making video games~~`). Blockquotes for longer asides (e.g. “> Aside: …”).
- **Lists:** Use bullets for tips, steps, or “quirks” lists. Use numbered lists only when order matters.

---

## Technical posts (dev / tutorials)

- **Flow:** TL;DR → why you’re writing this → what you built or tried → sectioned walkthrough (with code and/or screenshots) → short wrap-up and link to repo if applicable.
- **Code:** Show minimal, runnable snippets. Mention where full code lives (e.g. “The code used in this post is [here](repo).”).
- **Screenshots:** Use when they clarify UI or output; keep filenames and alt text descriptive.
- **References:** Link to official docs, tutorials, or tools you used so readers can go deeper.

---

## Personal / life / story posts

- **Hook:** First line or image should give a reason to keep reading.
- **Chronology:** Often linear (“It all started…”, “So we…”, “And then…”). Short paragraphs.
- **Reflection:** End with a takeaway or reflection (e.g. “Looking back…”, “I hope that…”).
- **Sensitivity:** Serious topics (e.g. health) are direct and honest without asking for pity; focus on what happened and what you learned.

---

## Checklist before publishing

- [ ] Frontmatter complete (title, date, categories, description, keywords)
- [ ] First paragraph or TL;DR sets expectations
- [ ] Headings make the post scannable
- [ ] Images have descriptive alt text
- [ ] Code blocks have language tags; links to full code if relevant
- [ ] Tone matches the rest of the blog (first person, conversational, honest)
