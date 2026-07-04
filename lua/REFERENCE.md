# JellyBellyWiki Lua SDK Reference

Complete API reference for the JellyBellyWiki Lua SDK.


## JellyBellyWikiSDK

### Constructor

```lua
local sdk = require("jelly-belly-wiki_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Bean(data)`

Create a new `Bean` entity instance. Pass `nil` for no initial data.

#### `Combination(data)`

Create a new `Combination` entity instance. Pass `nil` for no initial data.

#### `Fact(data)`

Create a new `Fact` entity instance. Pass `nil` for no initial data.

#### `History(data)`

Create a new `History` entity instance. Pass `nil` for no initial data.

#### `Recipe(data)`

Create a new `Recipe` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BeanEntity

```lua
local bean = client:bean(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:bean():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:bean():load({ id = "bean_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BeanEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CombinationEntity

```lua
local combination = client:combination(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bean` | ``$ARRAY`` | No |  |
| `combination_id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `tag` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:combination():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CombinationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FactEntity

```lua
local fact = client:fact(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `fact_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:fact():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FactEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HistoryEntity

```lua
local history = client:history(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `history_id` | ``$STRING`` | No |  |
| `year` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:history():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HistoryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecipeEntity

```lua
local recipe = client:recipe(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:recipe():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

