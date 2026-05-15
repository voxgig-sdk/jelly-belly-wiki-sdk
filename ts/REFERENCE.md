# JellyBellyWiki TypeScript SDK Reference

Complete API reference for the JellyBellyWiki TypeScript SDK.


## JellyBellyWikiSDK

### Constructor

```ts
new JellyBellyWikiSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `JellyBellyWikiSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = JellyBellyWikiSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `JellyBellyWikiSDK` instance in test mode.


### Instance Methods

#### `Bean(data?: object)`

Create a new `Bean` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BeanEntity` instance.

#### `Combination(data?: object)`

Create a new `Combination` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CombinationEntity` instance.

#### `Fact(data?: object)`

Create a new `Fact` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FactEntity` instance.

#### `History(data?: object)`

Create a new `History` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HistoryEntity` instance.

#### `Recipe(data?: object)`

Create a new `Recipe` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecipeEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `JellyBellyWikiSDK.test()`.

**Returns:** `JellyBellyWikiSDK` instance in test mode.


---

## BeanEntity

```ts
const bean = client.Bean()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Bean().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Bean().load({ id: 'bean_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BeanEntity` instance with the same client and
options.

#### `client()`

Return the parent `JellyBellyWikiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CombinationEntity

```ts
const combination = client.Combination()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bean` | ``$ARRAY`` | No |  |
| `combination_id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `tag` | ``$ARRAY`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Combination().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CombinationEntity` instance with the same client and
options.

#### `client()`

Return the parent `JellyBellyWikiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FactEntity

```ts
const fact = client.Fact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `fact_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Fact().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FactEntity` instance with the same client and
options.

#### `client()`

Return the parent `JellyBellyWikiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HistoryEntity

```ts
const history = client.History()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `history_id` | ``$STRING`` | No |  |
| `year` | ``$INTEGER`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.History().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HistoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `JellyBellyWikiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecipeEntity

```ts
const recipe = client.Recipe()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Recipe().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecipeEntity` instance with the same client and
options.

#### `client()`

Return the parent `JellyBellyWikiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new JellyBellyWikiSDK({
  feature: {
    test: { active: true },
  }
})
```

