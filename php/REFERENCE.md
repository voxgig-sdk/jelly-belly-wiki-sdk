# JellyBellyWiki PHP SDK Reference

Complete API reference for the JellyBellyWiki PHP SDK.


## JellyBellyWikiSDK

### Constructor

```php
require_once __DIR__ . '/jelly-belly-wiki_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$bean = $client->bean();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->bean()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->bean()->load(["id" => "bean_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BeanEntity`

Create a new `BeanEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CombinationEntity

```php
$combination = $client->combination();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bean` | ``$ARRAY`` | No |  |
| `combination_id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `tag` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->combination()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CombinationEntity`

Create a new `CombinationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FactEntity

```php
$fact = $client->fact();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `fact_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->fact()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FactEntity`

Create a new `FactEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## HistoryEntity

```php
$history = $client->history();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `history_id` | ``$STRING`` | No |  |
| `year` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->history()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HistoryEntity`

Create a new `HistoryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RecipeEntity

```php
$recipe = $client->recipe();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->recipe()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RecipeEntity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `getName(): string`

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

