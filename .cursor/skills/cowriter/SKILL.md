---
name: cowriter
description: Help write or edit blog posts in the project's voice and structure. Use the blog style guide when drafting, expanding, or editing posts.
---

# Blog cowriter skill

Use this skill when the user wants help **writing or editing** a blog post (not just creating the file). The goal is to match the voice and structure of their existing blog.

## When to use

- User asks to "cowrite", "help write", "draft", or "edit" a post
- User wants a section expanded, an intro rewritten, or tone adjusted
- User pastes a draft and wants feedback or completion in their style

## Authority: style guide

**Always** use `docs/blog-style-guide.md` as the source of truth for:

- Frontmatter format and required fields
- Structure (TL;DR, sections, headings)
- Voice and tone (first person, conversational, honest)
- Formatting (images, code, links, lists)

Read the style guide when helping with a post. Do not invent new conventions.

## How to cowrite

1. **If the post file exists:** Open `content/blog/<slug>/index.md` and (if needed) read `docs/blog-style-guide.md`. Apply the checklist from the style guide when suggesting changes.
2. **If the user provides a title or topic only:** Offer to create the post with `node scripts/create-post.js "Title"`, then draft content (or an outline) that follows the style guide. Ask whether the post is **technical/tutorial** or **personal/story** so you can pick the right structure (TL;DR vs. hook, sections, etc.).
3. **When drafting or rewriting:**
   - Use first person, conversational tone; avoid corporate or generic phrasing.
   - For technical posts: include a TL;DR blockquote, clear ## and #### headings, code blocks with language tags, and links to further reading or repo.
   - For personal posts: strong opening, short paragraphs, clear chronology or theme, and a brief reflection or takeaway at the end.
   - Suggest concrete edits in the file (or in a quoted block) so the user can accept or tweak.
4. **When the user asks for "ideas" or "what to write":** Suggest 2–3 angles or outlines that fit the style guide and their existing topics (dev, life, career, travel, etc.). Let them pick before drafting.

## Quick reference

- New post: `node scripts/create-post.js "Post Title"`
- Style guide: `docs/blog-style-guide.md`
- Posts live in: `content/blog/<slug>/index.md`
