The Life I Live – Viet Nguyen's Blog
====================================

This is the source for **Viet Nguyen's personal blog**, built with Gatsby and Markdown.
Posts cover **software development**, **career**, **life updates**, **travel**, and
the occasional **basketball / devlog**.

## Stack

- Gatsby 5 (React 18)
- Markdown content in `content/blog/<slug>/index.md`
- Images in `content/assets`
- Blog templates in `src/templates`:
  - `blog-post.js` – regular posts
  - `now.js` – the `/now` page

## Local development

```bash
npm install
npm run develop
```

Site will be available at `http://localhost:8000/`.

### Build & preview

```bash
npm run build
npm run serve
```

## Writing posts

Posts live under `content/blog/<slug>/index.md`.

### Quick creation script

Use the helper script to create a new post directory and starter frontmatter:

```bash
node scripts/create-post.js "My New Post Title"
```

This will create:

```text
content/blog/my-new-post-title/index.md
```

Then open the file and fill in:

- `categories` – 1–5 categories (lowercase, like `dev`, `life`, `story`, `devlog`)
- `description` – short summary for SEO/previews
- `keywords` – a few SEO/search keywords

For full guidance on structure, tone, and frontmatter fields, see:

- `docs/blog-style-guide.md`

## AI / agent helpers

This repo is set up so AI tools (like Cursor) can help write and edit posts
in a consistent style.

- `docs/blog-style-guide.md` – canonical rules for frontmatter, structure, and tone
- `docs/cowriter-prompts.md` – prompts you can paste into an AI to help draft or edit
- `.cursor/skills/create-a-post-template` – skill for creating new posts from a template
- `.cursor/skills/cowriter` – skill for cowriting/editing posts using the style guide

Agents should start with:

1. `README.md` (this file)
2. `docs/architecture.md` (high-level layout of content and templates)
3. `docs/blog-style-guide.md`
