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
local bean = client:Bean(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backgroundColor` | `string` | No | Hex color code for the bean's background color |
| `beanId` | `string` | No | Unique identifier for the bean |
| `colorGroup` | `string` | No | Color category of the bean |
| `description` | `string` | No | Detailed description of the bean flavor |
| `flavorName` | `string` | No | Name of the flavor |
| `glutenFree` | `boolean` | No | Indicates if the bean is gluten-free |
| `groupName` | `table` | No | Group or category names the bean belongs to |
| `id` | `string` | No |  |
| `imageUrl` | `string` | No | URL to the bean image |
| `ingredients` | `table` | No | List of ingredients |
| `kosher` | `boolean` | No | Indicates if the bean is kosher certified |
| `sugarFree` | `boolean` | No | Indicates if the bean is sugar-free |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Bean():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Bean():load({ id = "bean_id" })
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
local combination = client:Combination(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `beans` | `table` | No | List of bean flavors in the combination |
| `combinationId` | `string` | No | Unique identifier for the combination |
| `name` | `string` | No | Name of the flavor combination |
| `tag` | `table` | No | Tags associated with the combination |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Combination():list()
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
local fact = client:Fact(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Full text of the fact |
| `factId` | `string` | No | Unique identifier for the fact |
| `title` | `string` | No | Title of the fact |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Fact():list()
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
local history = client:History(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the historical event |
| `historyId` | `string` | No | Unique identifier for the history entry |
| `year` | `number` | No | Year of the historical event |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:History():list()
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
local recipe = client:Recipe(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cookTime` | `string` | No | Cooking time |
| `description` | `string` | No | Description of the recipe |
| `directions` | `table` | No | Step-by-step directions |
| `imageUrl` | `string` | No | URL to the recipe image |
| `ingredients` | `table` | No | List of ingredients |
| `makingAmount` | `string` | No | Amount the recipe makes |
| `name` | `string` | No | Name of the recipe |
| `prepTime` | `string` | No | Preparation time |
| `recipeId` | `string` | No | Unique identifier for the recipe |
| `totalTime` | `string` | No | Total time required |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Recipe():list()
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

