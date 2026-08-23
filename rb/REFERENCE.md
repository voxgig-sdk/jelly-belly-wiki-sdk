# JellyBellyWiki Ruby SDK Reference

Complete API reference for the JellyBellyWiki Ruby SDK.


## JellyBellyWikiSDK

### Constructor

```ruby
require_relative 'JellyBellyWiki_sdk'

client = JellyBellyWikiSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `JellyBellyWikiSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = JellyBellyWikiSDK.test
```


### Instance Methods

#### `Bean(data = nil)`

Create a new `Bean` entity instance. Pass `nil` for no initial data.

#### `Combination(data = nil)`

Create a new `Combination` entity instance. Pass `nil` for no initial data.

#### `Fact(data = nil)`

Create a new `Fact` entity instance. Pass `nil` for no initial data.

#### `History(data = nil)`

Create a new `History` entity instance. Pass `nil` for no initial data.

#### `Recipe(data = nil)`

Create a new `Recipe` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BeanEntity

```ruby
bean = client.Bean
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backgroundColor` | `String` | No | Hex color code for the bean's background color |
| `beanId` | `String` | No | Unique identifier for the bean |
| `colorGroup` | `String` | No | Color category of the bean |
| `description` | `String` | No | Detailed description of the bean flavor |
| `flavorName` | `String` | No | Name of the flavor |
| `glutenFree` | `Boolean` | No | Indicates if the bean is gluten-free |
| `groupName` | `Array` | No | Group or category names the bean belongs to |
| `imageUrl` | `String` | No | URL to the bean image |
| `ingredients` | `Array` | No | List of ingredients |
| `kosher` | `Boolean` | No | Indicates if the bean is kosher certified |
| `sugarFree` | `Boolean` | No | Indicates if the bean is sugar-free |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Bean.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Bean.load({ "id" => "bean_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BeanEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CombinationEntity

```ruby
combination = client.Combination
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `beans` | `Array` | No | List of bean flavors in the combination |
| `combinationId` | `String` | No | Unique identifier for the combination |
| `name` | `String` | No | Name of the flavor combination |
| `tag` | `Array` | No | Tags associated with the combination |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Combination.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CombinationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FactEntity

```ruby
fact = client.Fact
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Full text of the fact |
| `factId` | `String` | No | Unique identifier for the fact |
| `title` | `String` | No | Title of the fact |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Fact.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FactEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HistoryEntity

```ruby
history = client.History
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the historical event |
| `historyId` | `String` | No | Unique identifier for the history entry |
| `year` | `Integer` | No | Year of the historical event |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.History.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HistoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RecipeEntity

```ruby
recipe = client.Recipe
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cookTime` | `String` | No | Cooking time |
| `description` | `String` | No | Description of the recipe |
| `directions` | `Array` | No | Step-by-step directions |
| `imageUrl` | `String` | No | URL to the recipe image |
| `ingredients` | `Array` | No | List of ingredients |
| `makingAmount` | `String` | No | Amount the recipe makes |
| `name` | `String` | No | Name of the recipe |
| `prepTime` | `String` | No | Preparation time |
| `recipeId` | `String` | No | Unique identifier for the recipe |
| `totalTime` | `String` | No | Total time required |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Recipe.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = JellyBellyWikiSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

