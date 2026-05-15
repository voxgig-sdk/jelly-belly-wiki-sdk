# JellyBellyWiki TypeScript SDK

The TypeScript SDK for the JellyBellyWiki API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install jelly-belly-wiki
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { JellyBellyWikiSDK } from 'jelly-belly-wiki'

const client = new JellyBellyWikiSDK({
  apikey: process.env.JELLY-BELLY-WIKI_APIKEY,
})
```

### 2. List beans

```ts
const result = await client.Bean().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a bean

```ts
const result = await client.Bean().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
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

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new JellyBellyWikiSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
JELLY-BELLY-WIKI_TEST_LIVE=TRUE
JELLY-BELLY-WIKI_APIKEY=<your-key>
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
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): JellyBellyWikiSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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
| `background_color` |  |
| `bean_id` |  |
| `color_group` |  |
| `description` |  |
| `flavor_name` |  |
| `gluten_free` |  |
| `group_name` |  |
| `image_url` |  |
| `ingredient` |  |
| `kosher` |  |
| `sugar_free` |  |

Operations: list, load.

API path: `/beans`

#### Combination

| Field | Description |
| --- | --- |
| `bean` |  |
| `combination_id` |  |
| `name` |  |
| `tag` |  |

Operations: list.

API path: `/combinations`

#### Fact

| Field | Description |
| --- | --- |
| `description` |  |
| `fact_id` |  |
| `title` |  |

Operations: list.

API path: `/facts`

#### History

| Field | Description |
| --- | --- |
| `description` |  |
| `history_id` |  |
| `year` |  |

Operations: list.

API path: `/history`

#### Recipe

| Field | Description |
| --- | --- |
| `cook_time` |  |
| `description` |  |
| `direction` |  |
| `image_url` |  |
| `ingredient` |  |
| `making_amount` |  |
| `name` |  |
| `prep_time` |  |
| `recipe_id` |  |
| `total_time` |  |

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
| `background_color` | ``$STRING`` |  |
| `bean_id` | ``$STRING`` |  |
| `color_group` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `flavor_name` | ``$STRING`` |  |
| `gluten_free` | ``$BOOLEAN`` |  |
| `group_name` | ``$ARRAY`` |  |
| `image_url` | ``$STRING`` |  |
| `ingredient` | ``$ARRAY`` |  |
| `kosher` | ``$BOOLEAN`` |  |
| `sugar_free` | ``$BOOLEAN`` |  |

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
| `bean` | ``$ARRAY`` |  |
| `combination_id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `tag` | ``$ARRAY`` |  |

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
| `description` | ``$STRING`` |  |
| `fact_id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

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
| `description` | ``$STRING`` |  |
| `history_id` | ``$STRING`` |  |
| `year` | ``$INTEGER`` |  |

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
| `cook_time` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `direction` | ``$ARRAY`` |  |
| `image_url` | ``$STRING`` |  |
| `ingredient` | ``$ARRAY`` |  |
| `making_amount` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `prep_time` | ``$STRING`` |  |
| `recipe_id` | ``$STRING`` |  |
| `total_time` | ``$STRING`` |  |

#### Example: List

```ts
const recipes = await client.Recipe().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
import { JellyBellyWikiSDK } from 'jelly-belly-wiki'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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
