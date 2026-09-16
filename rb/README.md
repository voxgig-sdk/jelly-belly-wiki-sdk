# JellyBellyWiki Ruby SDK



The Ruby SDK for the JellyBellyWiki API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Bean` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases](https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "JellyBellyWiki_sdk"

client = JellyBellyWikiSDK.new
```

### 2. List bean records

```ruby
begin
  # list returns an Array of Bean records — iterate directly.
  beans = client.Bean.list
  beans.each do |item|
    puts "#{item["id"]} #{item["backgroundColor"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a bean

```ruby
begin
  # load returns the ENTITY — call data_get for the Bean record (raises on error).
  bean = client.Bean.load({ "id" => "example_id" })
  puts bean
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  historys = client.History.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = JellyBellyWikiSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
history = client.History.list()
puts history
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = JellyBellyWikiSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
JELLY_BELLY_WIKI_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### JellyBellyWikiSDK

```ruby
require_relative "JellyBellyWiki_sdk"
client = JellyBellyWikiSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = JellyBellyWikiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### JellyBellyWikiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Bean` | `(data) -> BeanEntity` | Create a Bean entity instance. |
| `Combination` | `(data) -> CombinationEntity` | Create a Combination entity instance. |
| `Fact` | `(data) -> FactEntity` | Create a Fact entity instance. |
| `History` | `(data) -> HistoryEntity` | Create a History entity instance. |
| `Recipe` | `(data) -> RecipeEntity` | Create a Recipe entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `JellyBellyWikiError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Bean

| Field | Description |
| --- | --- |
| `backgroundColor` | Hex color code for the bean's background color |
| `beanId` | Unique identifier for the bean |
| `colorGroup` | Color category of the bean |
| `description` | Detailed description of the bean flavor |
| `flavorName` | Name of the flavor |
| `glutenFree` | Indicates if the bean is gluten-free |
| `groupName` | Group or category names the bean belongs to |
| `id` |  |
| `imageUrl` | URL to the bean image |
| `ingredients` | List of ingredients |
| `kosher` | Indicates if the bean is kosher certified |
| `sugarFree` | Indicates if the bean is sugar-free |

Operations: List, Load.

API path: `/beans`

#### Combination

| Field | Description |
| --- | --- |
| `beans` | List of bean flavors in the combination |
| `combinationId` | Unique identifier for the combination |
| `name` | Name of the flavor combination |
| `tag` | Tags associated with the combination |

Operations: List.

API path: `/combinations`

#### Fact

| Field | Description |
| --- | --- |
| `description` | Full text of the fact |
| `factId` | Unique identifier for the fact |
| `title` | Title of the fact |

Operations: List.

API path: `/facts`

#### History

| Field | Description |
| --- | --- |
| `description` | Description of the historical event |
| `historyId` | Unique identifier for the history entry |
| `year` | Year of the historical event |

Operations: List.

API path: `/history`

#### Recipe

| Field | Description |
| --- | --- |
| `cookTime` | Cooking time |
| `description` | Description of the recipe |
| `directions` | Step-by-step directions |
| `imageUrl` | URL to the recipe image |
| `ingredients` | List of ingredients |
| `makingAmount` | Amount the recipe makes |
| `name` | Name of the recipe |
| `prepTime` | Preparation time |
| `recipeId` | Unique identifier for the recipe |
| `totalTime` | Total time required |

Operations: List.

API path: `/recipes`



## Entities


### Bean

Create an instance: `bean = client.Bean`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backgroundColor` | `String` | Hex color code for the bean's background color |
| `beanId` | `String` | Unique identifier for the bean |
| `colorGroup` | `String` | Color category of the bean |
| `description` | `String` | Detailed description of the bean flavor |
| `flavorName` | `String` | Name of the flavor |
| `glutenFree` | `Boolean` | Indicates if the bean is gluten-free |
| `groupName` | `Array` | Group or category names the bean belongs to |
| `id` | `String` |  |
| `imageUrl` | `String` | URL to the bean image |
| `ingredients` | `Array` | List of ingredients |
| `kosher` | `Boolean` | Indicates if the bean is kosher certified |
| `sugarFree` | `Boolean` | Indicates if the bean is sugar-free |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Bean record (raises on error).
bean = client.Bean.load({ "id" => "bean_id" })
```

#### Example: List

```ruby
# list returns an Array of Bean records (raises on error).
beans = client.Bean.list
```


### Combination

Create an instance: `combination = client.Combination`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `beans` | `Array` | List of bean flavors in the combination |
| `combinationId` | `String` | Unique identifier for the combination |
| `name` | `String` | Name of the flavor combination |
| `tag` | `Array` | Tags associated with the combination |

#### Example: List

```ruby
# list returns an Array of Combination records (raises on error).
combinations = client.Combination.list
```


### Fact

Create an instance: `fact = client.Fact`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Full text of the fact |
| `factId` | `String` | Unique identifier for the fact |
| `title` | `String` | Title of the fact |

#### Example: List

```ruby
# list returns an Array of Fact records (raises on error).
facts = client.Fact.list
```


### History

Create an instance: `history = client.History`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Description of the historical event |
| `historyId` | `String` | Unique identifier for the history entry |
| `year` | `Integer` | Year of the historical event |

#### Example: List

```ruby
# list returns an Array of History records (raises on error).
historys = client.History.list
```


### Recipe

Create an instance: `recipe = client.Recipe`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookTime` | `String` | Cooking time |
| `description` | `String` | Description of the recipe |
| `directions` | `Array` | Step-by-step directions |
| `imageUrl` | `String` | URL to the recipe image |
| `ingredients` | `Array` | List of ingredients |
| `makingAmount` | `String` | Amount the recipe makes |
| `name` | `String` | Name of the recipe |
| `prepTime` | `String` | Preparation time |
| `recipeId` | `String` | Unique identifier for the recipe |
| `totalTime` | `String` | Total time required |

#### Example: List

```ruby
# list returns an Array of Recipe records (raises on error).
recipes = client.Recipe.list
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── JellyBellyWiki_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`JellyBellyWiki_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
history = client.History
history.list()

# history.data_get now returns the history data from the last list
# history.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
