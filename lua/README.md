# JellyBellyWiki Lua SDK



The Lua SDK for the JellyBellyWiki API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Bean()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("jelly-belly-wiki_sdk")

local client = sdk.new()
```

### 2. List bean records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local beans, err = client:Bean():list()
if err then error(err) end

for _, item in ipairs(beans) do
  print(item["backgroundColor"])
end
```

### 3. Load a bean

```lua
local bean, err = client:Bean():load({ id = "example_id" })
if err then error(err) end
print(bean)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local historys, err = client:History():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:History():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### JellyBellyWikiSDK

```lua
local sdk = require("jelly-belly-wiki_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### JellyBellyWikiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Bean` | `(data) -> BeanEntity` | Create a Bean entity instance. |
| `Combination` | `(data) -> CombinationEntity` | Create a Combination entity instance. |
| `Fact` | `(data) -> FactEntity` | Create a Fact entity instance. |
| `History` | `(data) -> HistoryEntity` | Create a History entity instance. |
| `Recipe` | `(data) -> RecipeEntity` | Create a Recipe entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local bean, err = client:Bean():load({ id = "example_id" })
    if err then error(err) end
    -- bean is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local bean = client:Bean(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backgroundColor` | `string` | Hex color code for the bean's background color |
| `beanId` | `string` | Unique identifier for the bean |
| `colorGroup` | `string` | Color category of the bean |
| `description` | `string` | Detailed description of the bean flavor |
| `flavorName` | `string` | Name of the flavor |
| `glutenFree` | `boolean` | Indicates if the bean is gluten-free |
| `groupName` | `table` | Group or category names the bean belongs to |
| `imageUrl` | `string` | URL to the bean image |
| `ingredients` | `table` | List of ingredients |
| `kosher` | `boolean` | Indicates if the bean is kosher certified |
| `sugarFree` | `boolean` | Indicates if the bean is sugar-free |

#### Example: Load

```lua
local bean, err = client:Bean():load({ id = "bean_id" })
```

#### Example: List

```lua
local beans, err = client:Bean():list()
```


### Combination

Create an instance: `local combination = client:Combination(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `beans` | `table` | List of bean flavors in the combination |
| `combinationId` | `string` | Unique identifier for the combination |
| `name` | `string` | Name of the flavor combination |
| `tag` | `table` | Tags associated with the combination |

#### Example: List

```lua
local combinations, err = client:Combination():list()
```


### Fact

Create an instance: `local fact = client:Fact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Full text of the fact |
| `factId` | `string` | Unique identifier for the fact |
| `title` | `string` | Title of the fact |

#### Example: List

```lua
local facts, err = client:Fact():list()
```


### History

Create an instance: `local history = client:History(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the historical event |
| `historyId` | `string` | Unique identifier for the history entry |
| `year` | `number` | Year of the historical event |

#### Example: List

```lua
local historys, err = client:History():list()
```


### Recipe

Create an instance: `local recipe = client:Recipe(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookTime` | `string` | Cooking time |
| `description` | `string` | Description of the recipe |
| `directions` | `table` | Step-by-step directions |
| `imageUrl` | `string` | URL to the recipe image |
| `ingredients` | `table` | List of ingredients |
| `makingAmount` | `string` | Amount the recipe makes |
| `name` | `string` | Name of the recipe |
| `prepTime` | `string` | Preparation time |
| `recipeId` | `string` | Unique identifier for the recipe |
| `totalTime` | `string` | Total time required |

#### Example: List

```lua
local recipes, err = client:Recipe():list()
```


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── jelly-belly-wiki_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`jelly-belly-wiki_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local history = client:History()
history:list()

-- history:data_get() now returns the history data from the last list
-- history:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
