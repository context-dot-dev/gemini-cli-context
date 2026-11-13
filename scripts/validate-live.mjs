import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";

const mcpUrl = "https://mcp.context.dev/mcp";

const challengeResponse = await fetch(mcpUrl, {
  method: "POST",
  headers: {
    accept: "application/json, text/event-stream",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "gemini-cli-context-validator", version: "1.0.0" },
    },
  }),
  redirect: "manual",
});

assert.equal(challengeResponse.status, 401);
const challenge = challengeResponse.headers.get("www-authenticate") ?? "";
const resourceMetadataUrl = challenge.match(/resource_metadata="([^"]+)"/)?.[1];
assert.ok(
  resourceMetadataUrl,
  "MCP challenge did not advertise resource metadata",
);

const resourceMetadata = await getJson(resourceMetadataUrl);
assert.equal(resourceMetadata.resource, mcpUrl);
assert.deepEqual(resourceMetadata.authorization_servers, [
  "https://mcp.context.dev",
]);
assert.deepEqual(resourceMetadata.scopes_supported, ["api.read", "api.write"]);

const authorizationServerUrl = resourceMetadata.authorization_servers[0];
const authorizationMetadata = await getJson(
  `${authorizationServerUrl}/.well-known/oauth-authorization-server`,
);
assert.equal(authorizationMetadata.issuer, authorizationServerUrl);
assert.equal(
  authorizationMetadata.authorization_endpoint,
  `${authorizationServerUrl}/authorize`,
);
assert.equal(
  authorizationMetadata.token_endpoint,
  `${authorizationServerUrl}/token`,
);
assert.equal(
  authorizationMetadata.registration_endpoint,
  `${authorizationServerUrl}/register`,
);
assert.ok(
  authorizationMetadata.grant_types_supported.includes("authorization_code"),
);
assert.ok(
  authorizationMetadata.grant_types_supported.includes("refresh_token"),
);
assert.ok(
  authorizationMetadata.code_challenge_methods_supported.includes("S256"),
);
assert.ok(
  authorizationMetadata.token_endpoint_auth_methods_supported.includes("none"),
);

const callbackUrl = "http://127.0.0.1:49152/oauth/callback";
const registrationResponse = await fetch(
  authorizationMetadata.registration_endpoint,
  {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_name: "Gemini CLI",
      redirect_uris: [callbackUrl],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }),
  },
);
assert.equal(registrationResponse.status, 201);
const registration = await registrationResponse.json();
assert.match(registration.client_id, /^ctxc_/);
assert.deepEqual(registration.redirect_uris, [callbackUrl]);
assert.equal(registration.token_endpoint_auth_method, "none");

const verifier = randomBytes(48).toString("base64url");
const challengeValue = createHash("sha256")
  .update(verifier)
  .digest("base64url");
const authorizationUrl = new URL(authorizationMetadata.authorization_endpoint);
authorizationUrl.search = new URLSearchParams({
  client_id: registration.client_id,
  redirect_uri: callbackUrl,
  response_type: "code",
  code_challenge: challengeValue,
  code_challenge_method: "S256",
  scope: "api.read api.write",
  state: randomBytes(24).toString("base64url"),
}).toString();

const authorizationResponse = await fetch(authorizationUrl, {
  redirect: "manual",
});
assert.equal(authorizationResponse.status, 302);
const consentUrl = new URL(authorizationResponse.headers.get("location"));
assert.equal(consentUrl.protocol, "https:");
assert.ok(
  consentUrl.hostname === "context.dev" ||
    consentUrl.hostname === "www.context.dev",
);
assert.equal(consentUrl.pathname, "/oauth2/authorize");
assert.equal(
  consentUrl.searchParams.get("redirect_uri"),
  `${authorizationServerUrl}/oauth/callback`,
);
assert.equal(consentUrl.searchParams.get("audience"), mcpUrl);
assert.equal(consentUrl.searchParams.get("code_challenge_method"), "S256");

console.log(
  "Live Context MCP challenge, discovery, DCR, PKCE, and consent routing passed.",
);

async function getJson(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200, `${url} returned HTTP ${response.status}`);
  return response.json();
}
