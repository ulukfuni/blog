---
name: create-a-post-template
description: Create a new blog post folder and starter index.md using the project’s standard frontmatter and style.
---

# Create A Post Template

## Overview

Create a boilerplate for a new blog post. New posts live in their own directory
under `content/blog/<slug>/index.md` and use the standard frontmatter described
in `docs/blog-style-guide.md`.

## When to Use

Use this skill when:
- The user wants to start a new blog post.
- The user gives a title or topic and asks to “create a post”.
- You need a correctly structured `index.md` before cowriting the content.

## Instructions

1. If the user has not provided a title, **ask for a post title**.
2. Run the creation script from the project root:

   ```bash
   node scripts/create-post.js "Post Title"
   ```

3. Note the created path from the script output
   (e.g. `content/blog/my-new-post-title/index.md`).
4. Open the new `index.md` and, using `docs/blog-style-guide.md`:
   - Help the user fill in `categories`, `description`, and `keywords`.
   - Optionally draft an outline or starter paragraphs if asked.
5. Suggest using the `cowriter` skill next if the user wants help writing the
   full post content.

