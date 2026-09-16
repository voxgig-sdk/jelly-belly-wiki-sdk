# JellyBellyWiki PHP SDK



The PHP SDK for the JellyBellyWiki API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Bean()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases](https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'jellybellywiki_sdk.php';

$client = new JellyBellyWikiSDK();
```

### 2. List bean records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $beans = $client->Bean()->list();
    foreach ($beans as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["backgroundColor"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a bean

```php
try {
    // load() returns the ENTITY — call data_get() for the Bean record (throws on error).
    $bean = $client->Bean()->load(["id" => "example_id"]);
    print_r($bean->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $historys = $client->History()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = JellyBellyWikiSDK::test([
    "entity" => ["bean" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$bean = $client->Bean()->list();
print_r(array_map(fn($item) => $item->data_get(), $bean));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new JellyBellyWikiSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
JELLY_BELLY_WIKI_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### JellyBellyWikiSDK

```php
require_once 'jellybellywiki_sdk.php';
$client = new JellyBellyWikiSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = JellyBellyWikiSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### JellyBellyWikiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Bean` | `($data): BeanEntity` | Create a Bean entity instance. |
| `Combination` | `($data): CombinationEntity` | Create a Combination entity instance. |
| `Fact` | `($data): FactEntity` | Create a Fact entity instance. |
| `History` | `($data): HistoryEntity` | Create a History entity instance. |
| `Recipe` | `($data): RecipeEntity` | Create a Recipe entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$bean = $client->Bean();`

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
| `glutenFree` | `bool` | Indicates if the bean is gluten-free |
| `groupName` | `array` | Group or category names the bean belongs to |
| `id` | `string` |  |
| `imageUrl` | `string` | URL to the bean image |
| `ingredients` | `array` | List of ingredients |
| `kosher` | `bool` | Indicates if the bean is kosher certified |
| `sugarFree` | `bool` | Indicates if the bean is sugar-free |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Bean record (throws on error).
$bean = $client->Bean()->load(["id" => "bean_id"]);
```

#### Example: List

```php
// list() returns an array of Bean records (throws on error).
$beans = $client->Bean()->list();
```


### Combination

Create an instance: `$combination = $client->Combination();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `beans` | `array` | List of bean flavors in the combination |
| `combinationId` | `string` | Unique identifier for the combination |
| `name` | `string` | Name of the flavor combination |
| `tag` | `array` | Tags associated with the combination |

#### Example: List

```php
// list() returns an array of Combination records (throws on error).
$combinations = $client->Combination()->list();
```


### Fact

Create an instance: `$fact = $client->Fact();`

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

```php
// list() returns an array of Fact records (throws on error).
$facts = $client->Fact()->list();
```


### History

Create an instance: `$history = $client->History();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the historical event |
| `historyId` | `string` | Unique identifier for the history entry |
| `year` | `int` | Year of the historical event |

#### Example: List

```php
// list() returns an array of History records (throws on error).
$historys = $client->History()->list();
```


### Recipe

Create an instance: `$recipe = $client->Recipe();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookTime` | `string` | Cooking time |
| `description` | `string` | Description of the recipe |
| `directions` | `array` | Step-by-step directions |
| `imageUrl` | `string` | URL to the recipe image |
| `ingredients` | `array` | List of ingredients |
| `makingAmount` | `string` | Amount the recipe makes |
| `name` | `string` | Name of the recipe |
| `prepTime` | `string` | Preparation time |
| `recipeId` | `string` | Unique identifier for the recipe |
| `totalTime` | `string` | Total time required |

#### Example: List

```php
// list() returns an array of Recipe records (throws on error).
$recipes = $client->Recipe()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── jellybellywiki_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`jellybellywiki_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$history = $client->History();
$history->list();

// $history->data_get() now returns the history data from the last list
// $history->match_get() returns the last match criteria
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
