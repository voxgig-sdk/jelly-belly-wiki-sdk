# JellyBellyWiki SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "JellyBellyWiki",
            "slug": "jelly-belly-wiki",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://jellybellywikiapi.onrender.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "bean": {},
                "combination": {},
                "fact": {},
                "history": {},
                "recipe": {},
            },
        },
        "entity": {
      "bean": {
        "fields": [
          {
            "name": "backgroundColor",
            "title": "Background Color",
            "type": "`$STRING`",
            "short": "Hex color code for the bean's background color",
          },
          {
            "name": "beanId",
            "title": "Bean Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the bean",
          },
          {
            "name": "colorGroup",
            "title": "Color Group",
            "type": "`$STRING`",
            "short": "Color category of the bean",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Detailed description of the bean flavor",
          },
          {
            "name": "flavorName",
            "title": "Flavor Name",
            "type": "`$STRING`",
            "short": "Name of the flavor",
          },
          {
            "name": "glutenFree",
            "title": "Gluten Free",
            "type": "`$BOOLEAN`",
            "short": "Indicates if the bean is gluten-free",
          },
          {
            "name": "groupName",
            "title": "Group Name",
            "type": "`$ARRAY`",
            "short": "Group or category names the bean belongs to",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "imageUrl",
            "title": "Image Url",
            "type": "`$STRING`",
            "short": "URL to the bean image",
            "format": "uri",
          },
          {
            "name": "ingredients",
            "title": "Ingredients",
            "type": "`$ARRAY`",
            "short": "List of ingredients",
          },
          {
            "name": "kosher",
            "title": "Kosher",
            "type": "`$BOOLEAN`",
            "short": "Indicates if the bean is kosher certified",
          },
          {
            "name": "sugarFree",
            "title": "Sugar Free",
            "type": "`$BOOLEAN`",
            "short": "Indicates if the bean is sugar-free",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "bean",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/beans",
                "segments": [
                  {
                    "lit": "beans",
                  },
                ],
                "parts": [
                  "beans",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "page",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/beans/{beanId}",
                "segments": [
                  {
                    "lit": "beans",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "beans",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "beanId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "bean_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "combination": {
        "fields": [
          {
            "name": "beans",
            "title": "Beans",
            "type": "`$ARRAY`",
            "short": "List of bean flavors in the combination",
          },
          {
            "name": "combinationId",
            "title": "Combination Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the combination",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the flavor combination",
          },
          {
            "name": "tag",
            "title": "Tag",
            "type": "`$ARRAY`",
            "short": "Tags associated with the combination",
          },
        ],
        "name": "combination",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/combinations",
                "segments": [
                  {
                    "lit": "combinations",
                  },
                ],
                "parts": [
                  "combinations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "page",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "fact": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Full text of the fact",
          },
          {
            "name": "factId",
            "title": "Fact Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the fact",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Title of the fact",
          },
        ],
        "name": "fact",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/facts",
                "segments": [
                  {
                    "lit": "facts",
                  },
                ],
                "parts": [
                  "facts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "page",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "history": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Description of the historical event",
          },
          {
            "name": "historyId",
            "title": "History Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the history entry",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$INTEGER`",
            "short": "Year of the historical event",
          },
        ],
        "name": "history",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/history",
                "segments": [
                  {
                    "lit": "history",
                  },
                ],
                "parts": [
                  "history",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "recipe": {
        "fields": [
          {
            "name": "cookTime",
            "title": "Cook Time",
            "type": "`$STRING`",
            "short": "Cooking time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Description of the recipe",
          },
          {
            "name": "directions",
            "title": "Directions",
            "type": "`$ARRAY`",
            "short": "Step-by-step directions",
          },
          {
            "name": "imageUrl",
            "title": "Image Url",
            "type": "`$STRING`",
            "short": "URL to the recipe image",
            "format": "uri",
          },
          {
            "name": "ingredients",
            "title": "Ingredients",
            "type": "`$ARRAY`",
            "short": "List of ingredients",
          },
          {
            "name": "makingAmount",
            "title": "Making Amount",
            "type": "`$STRING`",
            "short": "Amount the recipe makes",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the recipe",
          },
          {
            "name": "prepTime",
            "title": "Prep Time",
            "type": "`$STRING`",
            "short": "Preparation time",
          },
          {
            "name": "recipeId",
            "title": "Recipe Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the recipe",
          },
          {
            "name": "totalTime",
            "title": "Total Time",
            "type": "`$STRING`",
            "short": "Total time required",
          },
        ],
        "name": "recipe",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/recipes",
                "segments": [
                  {
                    "lit": "recipes",
                  },
                ],
                "parts": [
                  "recipes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "page",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
