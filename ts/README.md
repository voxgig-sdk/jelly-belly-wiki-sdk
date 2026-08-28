# JellyBellyWiki TypeScript SDK



The TypeScript SDK for the JellyBellyWiki API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Bean()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases](https://github.com/voxgig-sdk/jelly-belly-wiki-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { JellyBellyWikiSDK } from '@voxgig-sdk/jelly-belly-wiki'

const client = new JellyBellyWikiSDK()
```

### 2. List bean records

`list()` resolves to an array of Bean ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const beans = await client.Bean().list()

for (const bean of beans) {
  console.log(bean)
}
```

### 3. Load a bean

`load()` returns the entity directly and throws on failure:

```ts
try {
  const bean = await client.Bean().load({ id: 'example_id' })
  console.log(bean)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const historys = await client.History().list()
  console.log(historys)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = JellyBellyWikiSDK.test()

const history = await client.History().list()
// history is the entity, populated with mock response data
// — call history.data() for the record itself
console.log(history)
```

You can also use the instance method:

```ts
const client = new JellyBellyWikiSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.History()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new JellyBellyWikiSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
JELLY_BELLY_WIKI_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### JellyBellyWikiSDK

#### Constructor

```ts
new JellyBellyWikiSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Bean(data?)` | `BeanEntity` | Create a Bean entity instance. |
| `Combination(data?)` | `CombinationEntity` | Create a Combination entity instance. |
| `Fact(data?)` | `FactEntity` | Create a Fact entity instance. |
| `History(data?)` | `HistoryEntity` | Create a History entity instance. |
| `Recipe(data?)` | `RecipeEntity` | Create a Recipe entity instance. |
| `tester(testopts?, sdkopts?)` | `JellyBellyWikiSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `JellyBellyWikiSDK.test(testopts?, sdkopts?)` | `JellyBellyWikiSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): JellyBellyWikiSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

API path: `/beans`

#### Combination

| Field | Description |
| --- | --- |
| `beans` | List of bean flavors in the combination |
| `combinationId` | Unique identifier for the combination |
| `name` | Name of the flavor combination |
| `tag` | Tags associated with the combination |

Operations: list.

API path: `/combinations`

#### Fact

| Field | Description |
| --- | --- |
| `description` | Full text of the fact |
| `factId` | Unique identifier for the fact |
| `title` | Title of the fact |

Operations: list.

API path: `/facts`

#### History

| Field | Description |
| --- | --- |
| `description` | Description of the historical event |
| `historyId` | Unique identifier for the history entry |
| `year` | Year of the historical event |

Operations: list.

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

Operations: list.

API path: `/recipes`



## Entities


### Bean

Create an instance: `const bean = client.Bean()`

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
| `glutenFree` | `boolean` | Indicates if the bean is gluten-free |
| `groupName` | `any[]` | Group or category names the bean belongs to |
| `id` | `string` |  |
| `imageUrl` | `string` | URL to the bean image |
| `ingredients` | `any[]` | List of ingredients |
| `kosher` | `boolean` | Indicates if the bean is kosher certified |
| `sugarFree` | `boolean` | Indicates if the bean is sugar-free |

#### Example: Load

```ts
const bean = await client.Bean().load({ id: 'bean_id' })
```

#### Example: List

```ts
const beans = await client.Bean().list()
```


### Combination

Create an instance: `const combination = client.Combination()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `beans` | `any[]` | List of bean flavors in the combination |
| `combinationId` | `string` | Unique identifier for the combination |
| `name` | `string` | Name of the flavor combination |
| `tag` | `any[]` | Tags associated with the combination |

#### Example: List

```ts
const combinations = await client.Combination().list()
```


### Fact

Create an instance: `const fact = client.Fact()`

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

```ts
const facts = await client.Fact().list()
```


### History

Create an instance: `const history = client.History()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the historical event |
| `historyId` | `string` | Unique identifier for the history entry |
| `year` | `number` | Year of the historical event |

#### Example: List

```ts
const historys = await client.History().list()
```


### Recipe

Create an instance: `const recipe = client.Recipe()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cookTime` | `string` | Cooking time |
| `description` | `string` | Description of the recipe |
| `directions` | `any[]` | Step-by-step directions |
| `imageUrl` | `string` | URL to the recipe image |
| `ingredients` | `any[]` | List of ingredients |
| `makingAmount` | `string` | Amount the recipe makes |
| `name` | `string` | Name of the recipe |
| `prepTime` | `string` | Preparation time |
| `recipeId` | `string` | Unique identifier for the recipe |
| `totalTime` | `string` | Total time required |

#### Example: List

```ts
const recipes = await client.Recipe().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
jelly-belly-wiki/
├── src/
│   ├── JellyBellyWikiSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { JellyBellyWikiSDK } from '@voxgig-sdk/jelly-belly-wiki'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const history = client.History()
await history.list()

// history.data() now returns the history data from the last `list`
// history.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
