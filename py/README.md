# JellyBellyWiki Python SDK



The Python SDK for the JellyBellyWiki API — an entity-oriented client following Pythonic conventions.

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
    beans = client.Bean().list({})
    for bean in beans:
        print(bean)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a bean

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    bean = client.Bean().load({"id": "example_id"})
    print(bean)
except Exception as err:
    print(f"load failed: {err}")
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
    print(result["err"])     # error value
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

# Entity ops return the bare record and raise on error.
bean = client.Bean().load({"id": "test01"})
# bean contains the mock response record
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
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `bean = client.Bean()`

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

```python
bean = client.Bean().load({"id": "bean_id"})
```

#### Example: List

```python
beans = client.Bean().list({})
```


### Combination

Create an instance: `combination = client.Combination()`

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

```python
combinations = client.Combination().list({})
```


### Fact

Create an instance: `fact = client.Fact()`

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

```python
facts = client.Fact().list({})
```


### History

Create an instance: `history = client.History()`

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

```python
historys = client.History().list({})
```


### Recipe

Create an instance: `recipe = client.Recipe()`

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

```python
recipes = client.Recipe().list({})
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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
bean = client.Bean()
bean.load({"id": "example_id"})

# bean.data_get() now returns the loaded bean data
# bean.match_get() returns the last match criteria
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
