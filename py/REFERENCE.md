# JellyBellyWiki Python SDK Reference

Complete API reference for the JellyBellyWiki Python SDK.


## JellyBellyWikiSDK

### Constructor

```python
from jellybellywiki_sdk import JellyBellyWikiSDK

client = JellyBellyWikiSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `JellyBellyWikiSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = JellyBellyWikiSDK.test()
```


### Instance Methods

#### `Bean(data=None)`

Create a new `BeanEntity` instance. Pass `None` for no initial data.

#### `Combination(data=None)`

Create a new `CombinationEntity` instance. Pass `None` for no initial data.

#### `Fact(data=None)`

Create a new `FactEntity` instance. Pass `None` for no initial data.

#### `History(data=None)`

Create a new `HistoryEntity` instance. Pass `None` for no initial data.

#### `Recipe(data=None)`

Create a new `RecipeEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BeanEntity

```python
bean = client.Bean()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backgroundColor` | `str` | No | Hex color code for the bean's background color |
| `beanId` | `str` | No | Unique identifier for the bean |
| `colorGroup` | `str` | No | Color category of the bean |
| `description` | `str` | No | Detailed description of the bean flavor |
| `flavorName` | `str` | No | Name of the flavor |
| `glutenFree` | `bool` | No | Indicates if the bean is gluten-free |
| `groupName` | `list` | No | Group or category names the bean belongs to |
| `imageUrl` | `str` | No | URL to the bean image |
| `ingredients` | `list` | No | List of ingredients |
| `kosher` | `bool` | No | Indicates if the bean is kosher certified |
| `sugarFree` | `bool` | No | Indicates if the bean is sugar-free |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Bean().list()
for bean in results:
    print(bean)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Bean().load({"id": "bean_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BeanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CombinationEntity

```python
combination = client.Combination()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `beans` | `list` | No | List of bean flavors in the combination |
| `combinationId` | `str` | No | Unique identifier for the combination |
| `name` | `str` | No | Name of the flavor combination |
| `tag` | `list` | No | Tags associated with the combination |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Combination().list()
for combination in results:
    print(combination)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CombinationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FactEntity

```python
fact = client.Fact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Full text of the fact |
| `factId` | `str` | No | Unique identifier for the fact |
| `title` | `str` | No | Title of the fact |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Fact().list()
for fact in results:
    print(fact)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FactEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HistoryEntity

```python
history = client.History()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Description of the historical event |
| `historyId` | `str` | No | Unique identifier for the history entry |
| `year` | `int` | No | Year of the historical event |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.History().list()
for history in results:
    print(history)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HistoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecipeEntity

```python
recipe = client.Recipe()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cookTime` | `str` | No | Cooking time |
| `description` | `str` | No | Description of the recipe |
| `directions` | `list` | No | Step-by-step directions |
| `imageUrl` | `str` | No | URL to the recipe image |
| `ingredients` | `list` | No | List of ingredients |
| `makingAmount` | `str` | No | Amount the recipe makes |
| `name` | `str` | No | Name of the recipe |
| `prepTime` | `str` | No | Preparation time |
| `recipeId` | `str` | No | Unique identifier for the recipe |
| `totalTime` | `str` | No | Total time required |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Recipe().list()
for recipe in results:
    print(recipe)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecipeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = JellyBellyWikiSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

