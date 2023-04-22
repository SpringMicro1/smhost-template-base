# smhost-template-base

## Standards

- Name repos `smhost-template-*`
- `src/config.ts` - see format defined below
- Blog (markdown) - disabled until blog feature is built
- Tailwind Config
- Astro SEO in `src/layouts/Layout.astro`
- Accessibility: tab navigation tab-index, https://www.w3.org/WAI/standards-guidelines/aria/
- RWD
- robots.txt

### src/config.ts format

`BASE` is required. Pages (example: `PAGE`) have `TEXT`, `LINKS`, and `IMAGES`.

```js
export const BASE = {
  META_TITLE: "title",
  META_DESCRIPTION: "description",
  OPENGRAPH_TITLE: "title",
  OPENGRAPH_IMAGE_ALT_TEXT: "alternate text",
  KEY: "value",
};

export const PAGE = {
  TEXT: {
    KEY: "value",
  },
  LINKS: {
    KEY: {
      href: "https://example.com",
      content: "text",
    },
  },
  IMAGES: {
    KEY: {
      src: "https://example.com",
      alt: "alternate text",
    },
  },
};
```

## Future

- eCommerce - eCommerce specific templates
- Contact forms - included here but not operational
- Email subscriptions
- Public ratings/testimonials
- Blog comments
- Share on social media
- Markdown/rich text editor injection on config fields, https://www.npmjs.com/package/dompurify
- Ads
- Media uploads - static file server
- Dark mode theming optional
