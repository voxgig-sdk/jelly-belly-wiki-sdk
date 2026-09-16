# JellyBellyWiki Golang SDK



The Golang SDK for the JellyBellyWiki API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Bean(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/jelly-belly-wiki-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/jelly-belly-wiki-sdk/go=../jelly-belly-wiki-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/jelly-belly-wiki-sdk/go"
)

func main() {
    client := sdk.New()

    // List bean records — the value is the array of records itself.
    beans, err := client.Bean(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range beans.([]any) {
        fmt.Println(item)
    }

    // Load a single bean — the value is the loaded record.
    bean, err := client.Bean(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(bean)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
historys, err := client.History(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = historys
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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

history, err := client.History(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(history) // the returned mock data
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
JELLY_BELLY_WIKI_TEST_LIVE=TRUE
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
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    bean, err := client.Bean(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // bean is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Bean

| Field | Description |
| --- | --- |
| `"backgroundColor"` | Hex color code for the bean's background color |
| `"beanId"` | Unique identifier for the bean |
| `"colorGroup"` | Color category of the bean |
| `"description"` | Detailed description of the bean flavor |
| `"flavorName"` | Name of the flavor |
| `"glutenFree"` | Indicates if the bean is gluten-free |
| `"groupName"` | Group or category names the bean belongs to |
| `"id"` |  |
| `"imageUrl"` | URL to the bean image |
| `"ingredients"` | List of ingredients |
| `"kosher"` | Indicates if the bean is kosher certified |
| `"sugarFree"` | Indicates if the bean is sugar-free |

Operations: List, Load.

API path: `/beans`

#### Combination

| Field | Description |
| --- | --- |
| `"beans"` | List of bean flavors in the combination |
| `"combinationId"` | Unique identifier for the combination |
| `"name"` | Name of the flavor combination |
| `"tag"` | Tags associated with the combination |

Operations: List.

API path: `/combinations`

#### Fact

| Field | Description |
| --- | --- |
| `"description"` | Full text of the fact |
| `"factId"` | Unique identifier for the fact |
| `"title"` | Title of the fact |

Operations: List.

API path: `/facts`

#### History

| Field | Description |
| --- | --- |
| `"description"` | Description of the historical event |
| `"historyId"` | Unique identifier for the history entry |
| `"year"` | Year of the historical event |

Operations: List.

API path: `/history`

#### Recipe

| Field | Description |
| --- | --- |
| `"cookTime"` | Cooking time |
| `"description"` | Description of the recipe |
| `"directions"` | Step-by-step directions |
| `"imageUrl"` | URL to the recipe image |
| `"ingredients"` | List of ingredients |
| `"makingAmount"` | Amount the recipe makes |
| `"name"` | Name of the recipe |
| `"prepTime"` | Preparation time |
| `"recipeId"` | Unique identifier for the recipe |
| `"totalTime"` | Total time required |

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
| `backgroundColor` | `string` | Hex color code for the bean's background color |
| `beanId` | `string` | Unique identifier for the bean |
| `colorGroup` | `string` | Color category of the bean |
| `description` | `string` | Detailed description of the bean flavor |
| `flavorName` | `string` | Name of the flavor |
| `glutenFree` | `bool` | Indicates if the bean is gluten-free |
| `groupName` | `[]any` | Group or category names the bean belongs to |
| `id` | `string` |  |
| `imageUrl` | `string` | URL to the bean image |
| `ingredients` | `[]any` | List of ingredients |
| `kosher` | `bool` | Indicates if the bean is kosher certified |
| `sugarFree` | `bool` | Indicates if the bean is sugar-free |

#### Example: Load

```go
bean, err := client.Bean(nil).Load(map[string]any{"id": "bean_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bean) // the loaded record
```

#### Example: List

```go
beans, err := client.Bean(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(beans) // the array of records
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
| `beans` | `[]any` | List of bean flavors in the combination |
| `combinationId` | `string` | Unique identifier for the combination |
| `name` | `string` | Name of the flavor combination |
| `tag` | `[]any` | Tags associated with the combination |

#### Example: List

```go
combinations, err := client.Combination(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(combinations) // the array of records
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
| `description` | `string` | Full text of the fact |
| `factId` | `string` | Unique identifier for the fact |
| `title` | `string` | Title of the fact |

#### Example: List

```go
facts, err := client.Fact(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(facts) // the array of records
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
| `description` | `string` | Description of the historical event |
| `historyId` | `string` | Unique identifier for the history entry |
| `year` | `int` | Year of the historical event |

#### Example: List

```go
historys, err := client.History(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(historys) // the array of records
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
| `cookTime` | `string` | Cooking time |
| `description` | `string` | Description of the recipe |
| `directions` | `[]any` | Step-by-step directions |
| `imageUrl` | `string` | URL to the recipe image |
| `ingredients` | `[]any` | List of ingredients |
| `makingAmount` | `string` | Amount the recipe makes |
| `name` | `string` | Name of the recipe |
| `prepTime` | `string` | Preparation time |
| `recipeId` | `string` | Unique identifier for the recipe |
| `totalTime` | `string` | Total time required |

#### Example: List

```go
recipes, err := client.Recipe(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(recipes) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
history := client.History(nil)
history.List(nil, nil)

// history.Data() now returns the history data from the last list
// history.Match() returns the last match criteria
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
