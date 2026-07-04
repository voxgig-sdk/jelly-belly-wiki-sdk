# JellyBellyWiki Golang SDK Reference

Complete API reference for the JellyBellyWiki Golang SDK.


## JellyBellyWikiSDK

### Constructor

```go
func NewJellyBellyWikiSDK(options map[string]any) *JellyBellyWikiSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *JellyBellyWikiSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *JellyBellyWikiSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Bean(data map[string]any) JellyBellyWikiEntity`

Create a new `Bean` entity instance. Pass `nil` for no initial data.

#### `Combination(data map[string]any) JellyBellyWikiEntity`

Create a new `Combination` entity instance. Pass `nil` for no initial data.

#### `Fact(data map[string]any) JellyBellyWikiEntity`

Create a new `Fact` entity instance. Pass `nil` for no initial data.

#### `History(data map[string]any) JellyBellyWikiEntity`

Create a new `History` entity instance. Pass `nil` for no initial data.

#### `Recipe(data map[string]any) JellyBellyWikiEntity`

Create a new `Recipe` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BeanEntity

```go
bean := client.Bean(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `background_color` | ``$STRING`` | No |  |
| `bean_id` | ``$STRING`` | No |  |
| `color_group` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `flavor_name` | ``$STRING`` | No |  |
| `gluten_free` | ``$BOOLEAN`` | No |  |
| `group_name` | ``$ARRAY`` | No |  |
| `image_url` | ``$STRING`` | No |  |
| `ingredient` | ``$ARRAY`` | No |  |
| `kosher` | ``$BOOLEAN`` | No |  |
| `sugar_free` | ``$BOOLEAN`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Bean(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Bean(nil).Load(map[string]any{"id": "bean_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BeanEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CombinationEntity

```go
combination := client.Combination(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bean` | ``$ARRAY`` | No |  |
| `combination_id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `tag` | ``$ARRAY`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Combination(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CombinationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FactEntity

```go
fact := client.Fact(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `fact_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Fact(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FactEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HistoryEntity

```go
history := client.History(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `history_id` | ``$STRING`` | No |  |
| `year` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.History(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HistoryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RecipeEntity

```go
recipe := client.Recipe(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cook_time` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `direction` | ``$ARRAY`` | No |  |
| `image_url` | ``$STRING`` | No |  |
| `ingredient` | ``$ARRAY`` | No |  |
| `making_amount` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `prep_time` | ``$STRING`` | No |  |
| `recipe_id` | ``$STRING`` | No |  |
| `total_time` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Recipe(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewJellyBellyWikiSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

