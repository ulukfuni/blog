# Create Blog Post Skill

This skill streamlines the creation of a new blog post in the `content/blog/` directory.

## Usage

When the user wants to create a new blog post, use this skill to:
1. Generate a slug from the title (if not provided).
2. Create a new directory `content/blog/[slug]/`.
3. Create an `index.md` file with the standard frontmatter template.

## Template

The `index.md` should follow this format:

```markdown
---
title: [TITLE]
date: '[YYYY-MM-DD]'
draft: true
categories:
    - [CATEGORY]
description: [DESCRIPTION]
keywords:
    - [KEYWORD]
---

Start writing your post here...
```

## Steps

1. **Ask** the user for the title of the post (if not provided).
2. **Run** the creation script: `npm run new-post -- "[TITLE]"`
3. **Inform** the user that a draft was created and show the path.
4. **Offer** to help write the content or fill in categories/description.
   Keep `draft: true` until the user is ready to publish.
