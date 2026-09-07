# Context.dev for Gemini CLI

The official [Context.dev](https://context.dev) extension for [Gemini CLI](https://github.com/google-gemini/gemini-cli). Give Gemini live web and document context through search, company news, scraping, crawling, structured extraction, document parsing, brand intelligence, screenshots, website monitoring, and large batch jobs.

## Install

```bash
gemini extensions install https://github.com/context-dot-dev/gemini-cli-context --auto-update --consent
```

Start a new Gemini CLI session after installation. The first Context.dev request opens a browser for OAuth authentication; no API key needs to be copied into Gemini CLI.

If authentication does not start automatically, run this inside Gemini CLI:

```text
/mcp auth context
```

## Verify the installation

```bash
gemini extensions list
```

Inside Gemini CLI, `/mcp` should show the `context` server and its tools. `/skills list` should include the `context-dev` skill.

## Try it

```text
Use Context.dev to find Stripe's latest official product announcements and cite the source URLs.
```

```text
Use Context.dev to turn this YouTube video into a timestamped transcript and summarize its main arguments: <youtube-url>
```

```text
Use Context.dev to extract every pricing plan from https://context.dev/pricing as structured JSON.
```

```text
Use Context.dev to retrieve the brand profile for linear.app, including its logo, colors, fonts, and social profiles.
```

## Included

- The production Context.dev MCP server at `https://mcp.context.dev/mcp`
- OAuth 2.1 authentication with dynamic client registration and PKCE
- An on-demand Gemini CLI skill that routes tasks to the smallest suitable Context.dev tool
- Live web search, company news, webpage and YouTube scraping, crawling, extraction, parsing, brand, screenshot, monitor, and batch workflows

Some Context.dev operations consume account credits. Gemini CLI keeps its normal confirmation controls for tool calls, and the extension does not mark the remote server as trusted.

## Local development

```bash
git clone https://github.com/context-dot-dev/gemini-cli-context.git
cd gemini-cli-context
npm ci
npm test
npm run validate
npm run test:live
gemini extensions link . --consent
```

Restart Gemini CLI after linking the extension. Use `/mcp auth context` to authenticate, then run one of the example prompts above.

## Uninstall

```bash
gemini extensions uninstall gemini-cli-context
```

## Links

- [Context.dev documentation](https://docs.context.dev)
- [Context.dev API reference](https://docs.context.dev/llms.txt)
- [Gemini CLI extension documentation](https://github.com/google-gemini/gemini-cli/blob/main/docs/extensions/index.md)
- [Support](mailto:support@context.dev)

## License

MIT — see [LICENSE](LICENSE).
