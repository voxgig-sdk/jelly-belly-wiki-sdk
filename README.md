# JellyBellyWiki SDK

Look up Jelly Belly jelly beans along with recipes, flavour combinations, fun facts, and brand history

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Jelly Belly Wiki

The Jelly Belly Wiki API is a community-maintained REST API that mirrors the catalogue of Jelly Belly jelly beans together with recipes, suggested flavour combinations, trivia facts, and brand history sourced from the official Jelly Belly website. The service is hosted on Render at `https://jellybellywikiapi.onrender.com/api`.

What you can pull from the API:

- Individual beans and paginated bean lists (e.g. `GET /api/beans`, `GET /api/Beans/{id}`)
- Recipes that use Jelly Belly beans
- Suggested bean combinations (mix two or more beans to mimic another flavour)
- Short trivia facts about the brand and its products
- Notable events from the company's history

Operational notes: the API is read-only over HTTP GET and does not require authentication or an API key. CORS is reported as disabled on the public endpoints, so browser clients may need to proxy requests. The instance runs on Render's free tier, so cold-start latency and occasional 503s are expected.

## Try it

**TypeScript**
```bash
npm install jelly-belly-wiki
```

**Python**
```bash
pip install jelly-belly-wiki-sdk
```

**PHP**
```bash
composer require voxgig/jelly-belly-wiki-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/jelly-belly-wiki-sdk/go
```

**Ruby**
```bash
gem install jelly-belly-wiki-sdk
```

**Lua**
```bash
luarocks install jelly-belly-wiki-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { JellyBellyWikiSDK } from 'jelly-belly-wiki'

const client = new JellyBellyWikiSDK({})

// List all beans
const beans = await client.Bean().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o jelly-belly-wiki-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "jelly-belly-wiki": {
      "command": "/abs/path/to/jelly-belly-wiki-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Bean** | An individual Jelly Belly jelly bean flavour with its descriptive metadata; listed and fetched via `GET /api/beans` and `GET /api/Beans/{id}`. | `/beans` |
| **Combination** | A suggested mix of two or more beans that together approximate another flavour. | `/combinations` |
| **Fact** | A short trivia fact about Jelly Belly beans or the brand. | `/facts` |
| **History** | A notable event or milestone from the history of the Jelly Belly company. | `/history` |
| **Recipe** | A recipe that uses Jelly Belly beans as an ingredient. | `/recipes` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from jellybellywiki_sdk import JellyBellyWikiSDK

client = JellyBellyWikiSDK({})

# List all beans
beans, err = client.Bean(None).list(None, None)

# Load a specific bean
bean, err = client.Bean(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'jellybellywiki_sdk.php';

$client = new JellyBellyWikiSDK([]);

// List all beans
[$beans, $err] = $client->Bean(null)->list(null, null);

// Load a specific bean
[$bean, $err] = $client->Bean(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/jelly-belly-wiki-sdk/go"

client := sdk.NewJellyBellyWikiSDK(map[string]any{})

// List all beans
beans, err := client.Bean(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "JellyBellyWiki_sdk"

client = JellyBellyWikiSDK.new({})

# List all beans
beans, err = client.Bean(nil).list(nil, nil)

# Load a specific bean
bean, err = client.Bean(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("jelly-belly-wiki_sdk")

local client = sdk.new({})

-- List all beans
local beans, err = client:Bean(nil):list(nil, nil)

-- Load a specific bean
local bean, err = client:Bean(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = JellyBellyWikiSDK.test()
const result = await client.Bean().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = JellyBellyWikiSDK.test(None, None)
result, err = client.Bean(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = JellyBellyWikiSDK::test(null, null);
[$result, $err] = $client->Bean(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Bean(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = JellyBellyWikiSDK.test(nil, nil)
result, err = client.Bean(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Bean(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Jelly Belly Wiki

- Upstream: [https://jellybellywikiapi.onrender.com/api](https://jellybellywikiapi.onrender.com/api)
- API docs: [https://jelly-belly-wiki.netlify.app/](https://jelly-belly-wiki.netlify.app/)

---

Generated from the Jelly Belly Wiki OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
