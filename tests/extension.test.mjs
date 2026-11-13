import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await readFile(resolve(repositoryRoot, "gemini-extension.json"), "utf8"),
);
const skill = await readFile(
  resolve(repositoryRoot, "skills/context-dev/SKILL.md"),
  "utf8",
);

test("declares a portable Context.dev remote MCP server", () => {
  assert.equal(manifest.name, basename(repositoryRoot));
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
  assert.equal(typeof manifest.description, "string");
  assert.ok(manifest.description.length > 0);

  assert.deepEqual(manifest.mcpServers, {
    context: {
      url: "https://mcp.context.dev/mcp",
      type: "http",
      description: "Live web and document context from Context.dev",
      authProviderType: "dynamic_discovery",
    },
  });
});

test("does not embed credentials or bypass Gemini confirmations", () => {
  const serializedManifest = JSON.stringify(manifest);
  assert.doesNotMatch(serializedManifest, /api[_-]?key|token|secret/i);
  assert.equal("trust" in manifest.mcpServers.context, false);
  assert.equal("headers" in manifest.mcpServers.context, false);
  assert.equal("command" in manifest.mcpServers.context, false);
  assert.equal("httpUrl" in manifest.mcpServers.context, false);
});

test("ships focused routing for every released Context capability", () => {
  assert.match(skill, /^---\nname: context-dev\ndescription: .+\n---\n/);
  for (const capability of [
    "get-news-search",
    "web-search",
    "web-scrape-markdown",
    "web-crawl",
    "web-extract",
    "parse-document",
    "get-brand",
    "web-screenshot",
    "submit-batch",
  ]) {
    assert.match(skill, new RegExp(`\\b${capability}\\b`));
  }
  assert.doesNotMatch(skill, /`(?:web-)?answers?`|\/v1\/web\/answers/i);
});
