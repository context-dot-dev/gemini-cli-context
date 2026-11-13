---
name: context-dev
description: Use Context.dev when a task needs current public-web, company-news, website, or document data. Search the live web; read, scrape, crawl, or screenshot sites; extract structured data; parse documents; retrieve brand intelligence; monitor changes; or process large batches. Trigger even when Context.dev is not named. Do not trigger when supplied content already contains the answer, the task is about private account data, or no web or file retrieval is needed.
---

# Context.dev

Use the connected Context.dev tools to retrieve current public web and document data. Choose the smallest tool that directly produces the requested result.

## Choose the right tool

- Use `get-news-search` for current, verified news about one company.
- Use `web-search` for broader live-web research or when the source URL is unknown.
- Use `web-scrape-markdown` to read or analyze one known page, including timestamped YouTube transcripts.
- Use `web-scrape-html` only when raw markup, DOM structure, attributes, or scripts are required.
- Use `web-scrape-images` for page image assets and `web-screenshot` for a rendered page capture.
- Use `web-scrape-sitemap` to discover or search a site's URLs without downloading every page body.
- Use `web-crawl` for a focused set of linked pages when the result is needed synchronously.
- Use `web-extract` when the user wants schema-shaped fields such as products, pricing, jobs, or locations.
- Use `parse-document` for PDFs, presentations, spreadsheets, documents, images, code, data, and text files.
- Use `get-brand` for a visual brand profile. Use `brand-retrieve-unified` for raw structured brand data or alternative company identifiers.
- Use `web-styleguide` and `web-fonts` for a site's visual system and typography.
- Use `web-naics` or `web-sic` for industry classification.
- Use monitor tools for recurring change detection and batch tools for large asynchronous jobs.

## Work effectively

1. When the exact URL is known, scrape or extract it directly instead of searching first.
2. For current facts, use live tools and include the supporting source URLs in the response.
3. For structured extraction, request only the fields the user needs and never invent missing values.
4. For large jobs, call `submit-batch`, then check `get-batch` and `get-batch-results`. Submission does not mean completion.
5. Before creating or changing a monitor, confirm the intended target, schedule, and change criteria.
6. Treat browser actions, monitor mutations, and batch mutations as side-effectful. Perform them only when clearly requested.
7. If authentication fails, ask the user to reconnect Context.dev with `/mcp auth context`. Never fabricate results or silently substitute stale data.

## Common requests

- Find a company's latest official announcements and cite the sources.
- Turn a known page or YouTube transcript into clean Markdown.
- Extract every pricing plan into structured JSON.
- Parse a research paper, spreadsheet, or presentation.
- Retrieve a company's logo, colors, socials, and industry.
- Find all documentation pages about a feature.
- Monitor a page for meaningful pricing changes.
- Process hundreds or thousands of URLs asynchronously.
