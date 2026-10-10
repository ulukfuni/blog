# Project architecture

This document gives a high-level map of where things live in this blog and how
content flows through Gatsby to become pages. It is meant for both humans and
AI agents.

---

## Content layout

- `content/blog/<slug>/index.md`
  - Markdown files with YAML frontmatter at the top.
  - Required frontmatter fields: `title`, `date`, `categories`, `description`, `keywords`.
  - Optional `draft: true` keeps a post off public listings until publish.
  - Body is written in Markdown and can include images, code blocks, etc.
- Standalone pages (same markdown folder, not blog posts):
  - `content/blog/now/index.md` → `/now/`
  - `content/blog/work/index.md` → `/work/`
  - No `date`, `categories`, or `draft`. Excluded from home, RSS, `/posts.json`,
    category archives, and prev/next.
- `content/assets`
  - Shared images used by posts and pages.

Frontmatter and writing conventions are defined in `docs/blog-style-guide.md`.

---

## Routing and templates

- `gatsby-node.js`
  - Uses `onCreateNode` to add a `fields.slug` to each `MarkdownRemark` node.
  - Uses `createPages` to:
    - Create a page for each blog post using `src/templates/blog-post.js`.
    - Special-case the `/now/` slug to use `src/templates/now.js`.
    - Special-case the `/work/` slug to use `src/templates/work.js`.
    - Create category archives at `/category/<name>/` only when at least two
      published posts share the category. Pills for one-post categories remain
      plain text instead of linking to thin archives.
    - Skip `draft: true` posts in production builds. In `gatsby develop`,
      draft URLs still resolve so you can preview.
    - Write `public/posts.json` as a JSON index of public posts.

  - Uses `@fileByRelativePath` for `frontmatter.image` and supports an optional
    `seoTitle` field.
- `src/templates/blog-post.js`
  - Queries a single Markdown post by `slug`.
  - Renders:
    - Title, date, reading time, and category pills. Pills link only to category
      archives that are generated for at least two published posts.
    - Post HTML (`markdownRemark.html`).
    - Previous/next navigation among public posts (`/now`, `/work`, and drafts
      skipped).
    - `BlogPosting` JSON-LD with the featured image, publication date, and
      author/publisher Person data. `dateModified` is omitted because content
      frontmatter does not track a modified date.
  - Uses `seoTitle` when present; otherwise uses the frontmatter `title`. The
    `image` field is a local File relation used to generate the social card and
    structured-data image.

- `src/templates/now.js`
  - Template for the `/now` page.
  - Similar to `blog-post.js` but without previous/next links, dates, pills, or
    JSON-LD.

- `src/templates/work.js`
  - Template for the `/work` page (same standalone-markdown pattern as `/now`).
  - Same shell as `now.js`: Layout, SEO (`type="website"`), markdown HTML, Bio,
    home link. No dates, pills, prev/next, or JSON-LD.

- `src/pages/index.js`
  - Home page that lists public posts (except `/now/`, `/work/`, and drafts), showing
    title, date, reading time, category pills, and excerpt/description.
  - Category pills link only to `/category/<name>/` archives with at least two
    published posts.

---

## Layout and SEO

- `src/components/layout.js`
  - Shared page shell: header (site title link), main content, footer.
  - Used by index, post templates, and the `/now` and `/work` pages.

- `src/components/seo.js`
  - Wraps `react-helmet` to set:
    - `<title>` with a `titleTemplate` based on `siteMetadata.title`.
    - `<meta name="description">` (from prop or site default).
    - A self-referencing canonical URL from `pathname`.
    - Open Graph tags, including `og:image` when an image is provided.
    - Twitter card tags, including `twitter:image` when an image is provided.
    - Optional `<meta name="keywords">` when a `keywords` array is provided.
    - RSS autodiscovery (`rel="alternate"` to `/rss.xml`).
    - Optional JSON-LD (`jsonLd` prop) for article pages.
- `gatsby-config.js`
  - Defines `siteMetadata`:
    - `title`, `author`, `description`, `siteUrl`, `social`.
  - Registers core plugins:
    - `gatsby-source-filesystem` for `content/blog` and `content/assets`.
    - `gatsby-transformer-remark` (with remark plugins for images, iframes,
      PrismJS syntax highlighting, etc.); `gatsby-remark-images` also emits
      WebP image sources.
    - `gatsby-plugin-image`, `gatsby-plugin-sharp`, `gatsby-transformer-sharp`.
    - `gatsby-plugin-feed` for RSS.
    - `gatsby-plugin-offline`, `gatsby-plugin-react-helmet`,
      `gatsby-plugin-typography`.
    - `gatsby-plugin-google-gtag` for analytics.
    - `gatsby-plugin-manifest` for PWA metadata and favicon.

---

## Scripts

- `scripts/create-post.js`
  - CLI helper (`npm run new-post -- "Title"`) to create a new post:
    - Generates a slug from the title.
    - Creates `content/blog/<slug>/index.md`.
    - Writes starter frontmatter including `draft: true`.

      ```yaml
      ---
      title: "[TITLE]"
      date: 'YYYY-MM-DD'
      draft: true
      categories:
          -
      description:
      image: ../../assets/profile-pic.jpg
      keywords:
          -
      ---
      ```

  - After running the script, edit the new file to fill in `categories`, a
    150–160 character `description`, `image`, and `keywords`. Replace the profile
    image path with a relevant local image when the post has one. Add `seoTitle`
    to clarify a short or generic title or to shorten a long one. Set
    `draft: false` (or remove it) when the post should go live.

---

## Content flow

The following diagram shows how Markdown becomes HTML pages:

```mermaid
flowchart LR
  mdFiles[MarkdownPosts] --> remark["gatsby-transformer-remark"]
  remark --> blogTemplate[BlogPostTemplate]
  blogTemplate --> seoComponent[SEOComponent]
  seoComponent --> htmlPage[HTMLPage]
```

