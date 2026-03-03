# AI and agent guide

This project is configured so AI tools (like Cursor) can help you write and
edit posts while staying consistent with the rest of the blog.

This document explains how agents should navigate the repo and which files
to read first.

---

## Orientation order

When an agent starts working in this repo, it should:

1. Read `README.md` for a high-level overview, stack, and workflows.
2. Read `docs/architecture.md` to understand where content, templates, and
   SEO/live in the codebase.
3. Read `docs/blog-style-guide.md` to learn the expected frontmatter, structure,
   and voice for posts.

For writing help, it may also read:

- `docs/cowriter-prompts.md` for ready-made prompts to help draft or edit posts.

---

## Where content lives

- Posts: `content/blog/<slug>/index.md`
  - YAML frontmatter (title, date, categories, description, keywords).
  - Markdown body (images, code blocks, etc.).
- Images: `content/assets` (and per-post images next to `index.md` when needed).

Routing and templates are detailed in `docs/architecture.md`.

---

## Frontmatter and categories

Use `docs/blog-style-guide.md` as the single source of truth for:

- Required frontmatter fields:
  - `title`, `date`, `categories`, `description`, `keywords`.
- Date format: `date: 'YYYY-MM-DD'`.
- Categories:
  - YAML list, lowercase, 1–5 items.
  - Examples: `dev`, `life`, `story`, `career`, `travel`, `health`, `devlog`.
- Keywords:
  - YAML list, SEO/discovery oriented, specific to the post.

When editing posts, agents should:

- Normalize category casing to lowercase.
- Ensure `description` and `keywords` are present and meaningful.

---

## Cursor skills

There are two Cursor skills defined for this project:

- `.cursor/skills/create-a-post-template/SKILL.md`
  - Name: `create-a-post-template`.
  - Purpose: create a new blog post directory and `index.md` using
    `scripts/create-post.js`, then help fill in frontmatter.

- `.cursor/skills/cowriter/SKILL.md`
  - Name: `cowriter`.
  - Purpose: help write or edit blog posts in the existing voice and structure,
    using `docs/blog-style-guide.md` as authority.

Agents should:

- Use `create-a-post-template` when the user wants a new post created.
- Use `cowriter` when the user wants help drafting, expanding, or editing an
  existing or newly created post.

---

## Safe modification rules

When modifying this repo, agents should:

- Avoid changing `gatsby-config.js` analytics IDs or environment-specific values
  unless explicitly asked.
- Keep `scripts/create-post.js` frontmatter in sync with
  `docs/blog-style-guide.md`.
- Prefer updating existing docs (`README.md`, `docs/architecture.md`,
  `docs/blog-style-guide.md`, `docs/ai-agents.md`) over creating many new ones.

