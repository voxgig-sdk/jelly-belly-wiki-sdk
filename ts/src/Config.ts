
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'JellyBellyWiki',
        slug: "jelly-belly-wiki",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://jellybellywikiapi.onrender.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      bean: {
      },

      combination: {
      },

      fact: {
      },

      history: {
      },

      recipe: {
      },

    }
  }


  entity = {
    "bean": {
      "fields": [
        {
          "name": "backgroundColor",
          "short": "Hex color code for the bean's background color",
          "type": "`$STRING`"
        },
        {
          "name": "beanId",
          "short": "Unique identifier for the bean",
          "type": "`$STRING`"
        },
        {
          "name": "colorGroup",
          "short": "Color category of the bean",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Detailed description of the bean flavor",
          "type": "`$STRING`"
        },
        {
          "name": "flavorName",
          "short": "Name of the flavor",
          "type": "`$STRING`"
        },
        {
          "name": "glutenFree",
          "short": "Indicates if the bean is gluten-free",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "groupName",
          "short": "Group or category names the bean belongs to",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "imageUrl",
          "short": "URL to the bean image",
          "type": "`$STRING`"
        },
        {
          "name": "ingredients",
          "short": "List of ingredients",
          "type": "`$ARRAY`"
        },
        {
          "name": "kosher",
          "short": "Indicates if the bean is kosher certified",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "sugarFree",
          "short": "Indicates if the bean is sugar-free",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "bean",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/beans",
              "parts": [
                "beans"
              ],
              "select": {
                "exist": [
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "bean_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/beans/{beanId}",
              "parts": [
                "beans",
                "{id}"
              ],
              "rename": {
                "param": {
                  "beanId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "combination": {
      "fields": [
        {
          "name": "beans",
          "short": "List of bean flavors in the combination",
          "type": "`$ARRAY`"
        },
        {
          "name": "combinationId",
          "short": "Unique identifier for the combination",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the flavor combination",
          "type": "`$STRING`"
        },
        {
          "name": "tag",
          "short": "Tags associated with the combination",
          "type": "`$ARRAY`"
        }
      ],
      "name": "combination",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/combinations",
              "parts": [
                "combinations"
              ],
              "select": {
                "exist": [
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "fact": {
      "fields": [
        {
          "name": "description",
          "short": "Full text of the fact",
          "type": "`$STRING`"
        },
        {
          "name": "factId",
          "short": "Unique identifier for the fact",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "Title of the fact",
          "type": "`$STRING`"
        }
      ],
      "name": "fact",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/facts",
              "parts": [
                "facts"
              ],
              "select": {
                "exist": [
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "history": {
      "fields": [
        {
          "name": "description",
          "short": "Description of the historical event",
          "type": "`$STRING`"
        },
        {
          "name": "historyId",
          "short": "Unique identifier for the history entry",
          "type": "`$STRING`"
        },
        {
          "name": "year",
          "short": "Year of the historical event",
          "type": "`$INTEGER`"
        }
      ],
      "name": "history",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/history",
              "parts": [
                "history"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "recipe": {
      "fields": [
        {
          "name": "cookTime",
          "short": "Cooking time",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Description of the recipe",
          "type": "`$STRING`"
        },
        {
          "name": "directions",
          "short": "Step-by-step directions",
          "type": "`$ARRAY`"
        },
        {
          "name": "imageUrl",
          "short": "URL to the recipe image",
          "type": "`$STRING`"
        },
        {
          "name": "ingredients",
          "short": "List of ingredients",
          "type": "`$ARRAY`"
        },
        {
          "name": "makingAmount",
          "short": "Amount the recipe makes",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the recipe",
          "type": "`$STRING`"
        },
        {
          "name": "prepTime",
          "short": "Preparation time",
          "type": "`$STRING`"
        },
        {
          "name": "recipeId",
          "short": "Unique identifier for the recipe",
          "type": "`$STRING`"
        },
        {
          "name": "totalTime",
          "short": "Total time required",
          "type": "`$STRING`"
        }
      ],
      "name": "recipe",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/recipes",
              "parts": [
                "recipes"
              ],
              "select": {
                "exist": [
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

