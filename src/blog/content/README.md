# Blog Content Directory

This directory contains article content written in **Markdown** format.

## File Naming Convention

Each article should be named using its slug: `{slug}.md`

For example:

- `fagram-desktop.md` → accessible at `/?article=fagram-desktop`
- `my-awesome-post.md` → accessible at `/?article=my-awesome-post`

## Markdown Features

All standard Markdown features are supported:

### Headers

```markdown
# H1 Header

## H2 Header

### H3 Header
```

### Emphasis

```markdown
**bold text**
_italic text_
**_bold and italic_**
```

### Links

```markdown
[Link text](https://example.com)
```

### Images

```markdown
![Alt text](/img/image.jpg)
```

### Code Blocks

Inline code: \`code here\`

Code blocks with syntax highlighting:
\`\`\`language
your code here
\`\`\`

Supported languages: `javascript`, `typescript`, `python`, `java`, `css`, `bash`, `json`, `markdown`, and more.

### Lists

Unordered:

```markdown
- Item 1
- Item 2
  - Nested item
```

Ordered:

```markdown
1. First item
2. Second item
```

### Blockquotes

```markdown
> This is a quote
```

### Horizontal Rules

```markdown
---
```

## Adding a New Article

1. **Create Markdown file** in this directory: `{slug}.md`
2. **Add metadata** to `../posts.ts`:
   ```typescript
   {
     id: 2,
     slug: "my-article",
     title: "My Article Title",
     description: "Short description for the blog list",
     date: "2025-01-06",
     image: "/img/my-article.jpg",
     link: "/?article=my-article",
     tags: ["Tag1", "Tag2"],
   }
   ```
3. **Done!** The article will be automatically loaded and rendered.

## Features

- ✅ Automatic syntax highlighting with Prism.js
- ✅ Copy buttons on all code blocks
- ✅ GitHub Flavored Markdown support
- ✅ Responsive images
- ✅ Clean, readable typography

## Tips

- Keep paragraphs concise
- Use headers to organize content
- Add alt text to images for accessibility
- Use code blocks with language specification for proper highlighting
- Preview your Markdown before committing
