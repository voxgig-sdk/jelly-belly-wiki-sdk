# JellyBellyWiki PHP SDK Reference

Complete API reference for the JellyBellyWiki PHP SDK.


## JellyBellyWikiSDK

### Constructor

```php
require_once __DIR__ . '/jellybellywiki_sdk.php';

$client = new JellyBellyWikiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `JellyBellyWikiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = JellyBellyWikiSDK::test();
```


### Instance Methods

#### `Bean($data = null)`

Create a new `BeanEntity` instance. Pass `null` for no initial data.

#### `Combination($data = null)`

Create a new `CombinationEntity` instance. Pass `null` for no initial data.

#### `Fact($data = null)`

Create a new `FactEntity` instance. Pass `null` for no initial data.

#### `History($data = null)`

Create a new `HistoryEntity` instance. Pass `null` for no initial data.

#### `Recipe($data = null)`

Create a new `RecipeEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): JellyBellyWikiUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BeanEntity

```php
$bean = $client->Bean();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backgroundColor` | `string` | No | Hex color code for the bean's background color |
| `beanId` | `string` | No | Unique identifier for the bean |
| `colorGroup` | `string` | No | Color category of the bean |
| `description` | `string` | No | Detailed description of the bean flavor |
| `flavorName` | `string` | No | Name of the flavor |
| `glutenFree` | `bool` | No | Indicates if the bean is gluten-free |
| `groupName` | `array` | No | Group or category names the bean belongs to |
| `id` | `string` | No |  |
| `imageUrl` | `string` | No | URL to the bean image |
| `ingredients` | `array` | No | List of ingredients |
| `kosher` | `bool` | No | Indicates if the bean is kosher certified |
| `sugarFree` | `bool` | No | Indicates if the bean is sugar-free |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Bean()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Bean()->load(["id" => "bean_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BeanEntity`

Create a new `BeanEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CombinationEntity

```php
$combination = $client->Combination();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `beans` | `array` | No | List of bean flavors in the combination |
| `combinationId` | `string` | No | Unique identifier for the combination |
| `name` | `string` | No | Name of the flavor combination |
| `tag` | `array` | No | Tags associated with the combination |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Combination()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CombinationEntity`

Create a new `CombinationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FactEntity

```php
$fact = $client->Fact();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Full text of the fact |
| `factId` | `string` | No | Unique identifier for the fact |
| `title` | `string` | No | Title of the fact |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Fact()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FactEntity`

Create a new `FactEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HistoryEntity

```php
$history = $client->History();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the historical event |
| `historyId` | `string` | No | Unique identifier for the history entry |
| `year` | `int` | No | Year of the historical event |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->History()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HistoryEntity`

Create a new `HistoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecipeEntity

```php
$recipe = $client->Recipe();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cookTime` | `string` | No | Cooking time |
| `description` | `string` | No | Description of the recipe |
| `directions` | `array` | No | Step-by-step directions |
| `imageUrl` | `string` | No | URL to the recipe image |
| `ingredients` | `array` | No | List of ingredients |
| `makingAmount` | `string` | No | Amount the recipe makes |
| `name` | `string` | No | Name of the recipe |
| `prepTime` | `string` | No | Preparation time |
| `recipeId` | `string` | No | Unique identifier for the recipe |
| `totalTime` | `string` | No | Total time required |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Recipe()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecipeEntity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new JellyBellyWikiSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

