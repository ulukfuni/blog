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
const safeTitle = title.replace(/"/g, '\\"');

const content = `---
title: "${safeTitle}"
date: '${date}'
draft: true
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
  console.log(`Draft created at: ${path.relative(process.cwd(), path.join(dir, 'index.md'))}`);
  console.log(`Preview locally with npm run develop, then open /${slug}/`);
  console.log(`When you're ready to publish, set draft: false (or remove the field).`);
} else {
  console.error(`Directory already exists: ${dir}`);
  process.exit(1);
}
