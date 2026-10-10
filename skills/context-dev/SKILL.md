---
name: context-dev
description: Use Context.dev when a task needs current public-web, company-news, website, or document data, or when the user wants to inspect their Context.dev credit usage or API request logs. Search or research the live web; read, scrape, crawl, or screenshot sites; extract structured data; parse documents; retrieve brand or people intelligence; monitor changes; or process large batches. Trigger even when Context.dev is not named. Do not trigger when supplied content already contains the answer or no web, file, or Context.dev account data is needed.
---

# Context.dev

Use the connected Context.dev tools to retrieve current public web and document data. Choose the smallest tool that directly produces the requested result.

## Choose the right tool

- Use `get-news-search` for current, verified news about one company.
- Use `web-search` for ranked live-web results. Enable `highlightsOptions` for relevant source passages or `markdownOptions` for complete page content. Use `web-answers` for a sourced answer in a requested JSON shape.
- Use `web-scrape` for one known page. Request only the needed outputs with `formats`, such as `{ markdown: true }`, `{ screenshot: true }`, or `{ json: true }` with `jsonParams.schema`.
- Use `web-map` to discover or filter a site's URLs without downloading every page body.
- Use `web-crawl` for a focused set of linked pages when the result is needed synchronously.
- Use `parse-document` for PDFs, presentations, spreadsheets, documents, images, code, data, and text files.
- Use `get-brand` for a visual brand profile. Use `brand-retrieve-unified` for raw structured brand data or alternative company identifiers.
- Use `brand-search` to find a company, `web-styleguide` for its visual system and typography, and `people-enrich` for a person profile.
- Use `get-usage` for the current credit balance, monthly usage, and next refill. Use `get-usage-history` for credits and requests over time, optionally grouped by endpoint, API key, or status code.
- Use `list-logs` to find recent Context.dev API requests and `get-log` for one request's redacted input, response, timing, credits, and error details.
- Use monitor tools for recurring change detection, webhook tools for delivery troubleshooting, and batch tools for large asynchronous jobs.
- Use `submit-feedback` to report a Context.dev bug, documentation mismatch, or agent friction when requested.

## Work effectively

1. When the exact URL is known, scrape or extract it directly instead of searching first.
2. For current facts, use live tools and include the supporting source URLs in the response.
3. For structured extraction, request only the fields the user needs and never invent missing values.
4. For large jobs, call `submit-batch`, then check `get-batch` and `get-batch-results`. Submission does not mean completion.
5. Before creating or changing a monitor, confirm the intended target, schedule, and change criteria.
6. Treat browser actions, monitor or batch mutations, webhook retries or secret rotation, and feedback submission as side-effectful. Perform them only when clearly requested.
7. If tools look stale or unavailable, ask the user to run `/mcp reload`. If authentication fails, ask them to reconnect Context.dev with `/mcp auth context`. Never fabricate results or silently substitute stale data.

## Common requests

- Find a company's latest official announcements and cite the sources.
- Turn a known page or YouTube transcript into clean Markdown.
- Extract every pricing plan into structured JSON.
- Parse a research paper, spreadsheet, or presentation.
- Retrieve a company's logo, colors, socials, and industry.
- Diagnose a failed Context.dev request from recent API logs.
- Check the account's remaining credits and recent usage history.
- Find all documentation pages about a feature.
- Monitor a page for meaningful pricing changes.
- Process hundreds or thousands of URLs asynchronously.
