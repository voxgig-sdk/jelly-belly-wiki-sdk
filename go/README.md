# JellyBellyWiki Golang SDK



The Golang SDK for the JellyBellyWiki API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/jelly-belly-wiki-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/jelly-belly-wiki-sdk/go=../path/to/github.com/voxgig-sdk/jelly-belly-wiki-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/jelly-belly-wiki-sdk/go"
    "github.com/voxgig-sdk/jelly-belly-wiki-sdk/go/core"
)

func main() {
    client := sdk.NewJellyBellyWikiSDK(map[string]any{
        "apikey": os.Getenv("JELLY-BELLY-WIKI_APIKEY"),
    })
```

### 2. List beans

```go
    result, err := client.Bean(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a bean

```go
    result, err = client.Bean(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewJellyBellyWikiSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
JELLY-BELLY-WIKI_TEST_LIVE=TRUE
JELLY-BELLY-WIKI_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewJellyBellyWikiSDK

```go
func NewJellyBellyWikiSDK(options map[string]any) *JellyBellyWikiSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *JellyBellyWikiSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### JellyBellyWikiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Bean` | `(data map[string]any) JellyBellyWikiEntity` | Create a Bean entity instance. |
| `Combination` | `(data map[string]any) JellyBellyWikiEntity` | Create a Combination entity instance. |
| `Fact` | `(data map[string]any) JellyBellyWikiEntity` | Create a Fact entity instance. |
| `History` | `(data map[string]any) JellyBellyWikiEntity` | Create a History entity instance. |
| `Recipe` | `(data map[string]any) JellyBellyWikiEntity` | Create a Recipe entity instance. |

### Entity interface (JellyBellyWikiEntity)

All entities implement the `JellyBellyWikiEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Bean

| Field | Description |
| --- | --- |
| `"background_color"` |  |
| `"bean_id"` |  |
| `"color_group"` |  |
| `"description"` |  |
| `"flavor_name"` |  |
| `"gluten_free"` |  |
| `"group_name"` |  |
| `"image_url"` |  |
| `"ingredient"` |  |
| `"kosher"` |  |
| `"sugar_free"` |  |

Operations: List, Load.

API path: `/beans`

#### Combination

| Field | Description |
| --- | --- |
| `"bean"` |  |
| `"combination_id"` |  |
| `"name"` |  |
| `"tag"` |  |

Operations: List.

API path: `/combinations`

#### Fact

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"fact_id"` |  |
| `"title"` |  |

Operations: List.

API path: `/facts`

#### History

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"history_id"` |  |
| `"year"` |  |

Operations: List.

API path: `/history`

#### Recipe

| Field | Description |
| --- | --- |
| `"cook_time"` |  |
| `"description"` |  |
| `"direction"` |  |
| `"image_url"` |  |
| `"ingredient"` |  |
| `"making_amount"` |  |
| `"name"` |  |
| `"prep_time"` |  |
| `"recipe_id"` |  |
| `"total_time"` |  |

Operations: List.

API path: `/recipes`



## Entities


### Bean

Create an instance: `bean := client.Bean(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Bean(nil).Load(map[string]any{"id": "bean_id"}, nil)
```

#### Example: List

```go
results, err := client.Bean(nil).List(nil, nil)
```


### Combination

Create an instance: `combination := client.Combination(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bean` | ``$ARRAY`` |  |
| `combination_id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `tag` | ``$ARRAY`` |  |

#### Example: List

```go
results, err := client.Combination(nil).List(nil, nil)
```


### Fact

Create an instance: `fact := client.Fact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `fact_id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Fact(nil).List(nil, nil)
```


### History

Create an instance: `history := client.History(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `history_id` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

#### Example: List

```go
results, err := client.History(nil).List(nil, nil)
```


### Recipe

Create an instance: `recipe := client.Recipe(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.Recipe(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/jelly-belly-wiki-sdk/go/
├── jelly-belly-wiki.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/jelly-belly-wiki-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
