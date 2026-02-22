const fs = require('fs');
const path = require('path');

const title = process.argv[2];
if (!title) {
  console.error('Please provide a title: node scripts/create-post.js "My New Post"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, '') // Remove non-word chars
  .replace(/\s+/g, '-') // Replace spaces with -
  .replace(/-+/g, '-'); // Replace multiple - with single -

const dir = path.join(__dirname, '..', 'content', 'blog', slug);
const date = new Date().toISOString().split('T')[0];

const content = `---
title: ${title}
date: '${date}'
categories:
    - 
description: 
keywords:
    - 
---

Start writing your post here...
`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.md'), content);
  console.log(`Post created at: ${path.relative(process.cwd(), path.join(dir, 'index.md'))}`);
} else {
  console.error(`Directory already exists: ${dir}`);
  process.exit(1);
}
