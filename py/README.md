# JellyBellyWiki Python SDK



The Python SDK for the JellyBellyWiki API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Bean()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from jellybellywiki_sdk import JellyBellyWikiSDK

client = JellyBellyWikiSDK()
```

### 2. List bean records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    beans = client.Bean().list()
    for bean in beans:
        print(bean)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a bean

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    bean = client.Bean().load({"id": "example_id"})
    print(bean)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    historys = client.History().list()
    print(historys)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = JellyBellyWikiSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
history = client.History().list()
# history contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = JellyBellyWikiSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### JellyBellyWikiSDK

```python
from jellybellywiki_sdk import JellyBellyWikiSDK

client = JellyBellyWikiSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = JellyBellyWikiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### JellyBellyWikiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `bean = client.Bean()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backgroundColor` | `str` | Hex color code for the bean's background color |
| `beanId` | `str` | Unique identifier for the bean |
| `colorGroup` | `str` | Color category of the bean |
| `description` | `str` | Detailed description of the bean flavor |
| `flavorName` | `str` | Name of the flavor |
| `glutenFree` | `bool` | Indicates if the bean is gluten-free |
| `groupName` | `list` | Group or category names the bean belongs to |
| `id` | `str` |  |
| `imageUrl` | `str` | URL to the bean image |
| `ingredients` | `list` | List of ingredients |
| `kosher` | `bool` | Indicates if the bean is kosher certified |
| `sugarFree` | `bool` | Indicates if the bean is sugar-free |

#### Example: Load

```python
bean = client.Bean().load({"id": "bean_id"})
```

#### Example: List

```python
beans = client.Bean().list()
```


### Combination

Create an instance: `combination = client.Combination()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `beans` | `list` | List of bean flavors in the combination |
| `combinationId` | `str` | Unique identifier for the combination |
| `name` | `str` | Name of the flavor combination |
| `tag` | `list` | Tags associated with the combination |

#### Example: List

```python
combinations = client.Combination().list()
```


### Fact

Create an instance: `fact = client.Fact()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Full text of the fact |
| `factId` | `str` | Unique identifier for the fact |
| `title` | `str` | Title of the fact |

#### Example: List

```python
facts = client.Fact().list()
```


### History

Create an instance: `history = client.History()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the historical event |
| `historyId` | `str` | Unique identifier for the history entry |
| `year` | `int` | Year of the historical event |

#### Example: List

```python
historys = client.History().list()
```


### Recipe

Create an instance: `recipe = client.Recipe()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookTime` | `str` | Cooking time |
| `description` | `str` | Description of the recipe |
| `directions` | `list` | Step-by-step directions |
| `imageUrl` | `str` | URL to the recipe image |
| `ingredients` | `list` | List of ingredients |
| `makingAmount` | `str` | Amount the recipe makes |
| `name` | `str` | Name of the recipe |
| `prepTime` | `str` | Preparation time |
| `recipeId` | `str` | Unique identifier for the recipe |
| `totalTime` | `str` | Total time required |

#### Example: List

```python
recipes = client.Recipe().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── jellybellywiki_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`jellybellywiki_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
history = client.History()
history.list()

# history.data_get() now returns the history data from the last list
# history.match_get() returns the last match criteria
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
