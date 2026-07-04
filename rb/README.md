# JellyBellyWiki Ruby SDK



The Ruby SDK for the JellyBellyWiki API — an entity-oriented client using idiomatic Ruby conventions.

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
    puts "#{item["id"]} #{item["name"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a bean

```ruby
begin
  # load returns the bare Bean record (raises on error).
  bean = client.Bean.load({ "id" => "example_id" })
  puts bean
rescue => err
  warn "load failed: #{err}"
end
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
  warn result["err"]
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

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = JellyBellyWikiSDK.test({
  "entity" => { "bean" => { "test01" => { "id" => "test01" } } },
})

# load returns the bare mock record (raises on error).
bean = client.Bean.load({ "id" => "test01" })
puts bean
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
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
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
| `background_color` |  |
| `bean_id` |  |
| `color_group` |  |
| `description` |  |
| `flavor_name` |  |
| `gluten_free` |  |
| `group_name` |  |
| `image_url` |  |
| `ingredient` |  |
| `kosher` |  |
| `sugar_free` |  |

Operations: List, Load.

API path: `/beans`

#### Combination

| Field | Description |
| --- | --- |
| `bean` |  |
| `combination_id` |  |
| `name` |  |
| `tag` |  |

Operations: List.

API path: `/combinations`

#### Fact

| Field | Description |
| --- | --- |
| `description` |  |
| `fact_id` |  |
| `title` |  |

Operations: List.

API path: `/facts`

#### History

| Field | Description |
| --- | --- |
| `description` |  |
| `history_id` |  |
| `year` |  |

Operations: List.

API path: `/history`

#### Recipe

| Field | Description |
| --- | --- |
| `cook_time` |  |
| `description` |  |
| `direction` |  |
| `image_url` |  |
| `ingredient` |  |
| `making_amount` |  |
| `name` |  |
| `prep_time` |  |
| `recipe_id` |  |
| `total_time` |  |

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
| `background_color` | ``$STRING`` |  |
| `bean_id` | ``$STRING`` |  |
| `color_group` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `flavor_name` | ``$STRING`` |  |
| `gluten_free` | ``$BOOLEAN`` |  |
| `group_name` | ``$ARRAY`` |  |
| `image_url` | ``$STRING`` |  |
| `ingredient` | ``$ARRAY`` |  |
| `kosher` | ``$BOOLEAN`` |  |
| `sugar_free` | ``$BOOLEAN`` |  |

#### Example: Load

```ruby
# load returns the bare Bean record (raises on error).
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
| `bean` | ``$ARRAY`` |  |
| `combination_id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `tag` | ``$ARRAY`` |  |

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
| `description` | ``$STRING`` |  |
| `fact_id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

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
| `description` | ``$STRING`` |  |
| `history_id` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

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
| `cook_time` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `direction` | ``$ARRAY`` |  |
| `image_url` | ``$STRING`` |  |
| `ingredient` | ``$ARRAY`` |  |
| `making_amount` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `prep_time` | ``$STRING`` |  |
| `recipe_id` | ``$STRING`` |  |
| `total_time` | ``$STRING`` |  |

#### Example: List

```ruby
# list returns an Array of Recipe records (raises on error).
recipes = client.Recipe.list
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
bean = client.Bean
bean.load({ "id" => "example_id" })

# bean.data_get now returns the loaded bean data
# bean.match_get returns the last match criteria
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
