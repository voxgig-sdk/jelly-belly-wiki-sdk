-- JellyBellyWiki SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "JellyBellyWiki",
      slug = "jelly-belly-wiki",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://jellybellywikiapi.onrender.com/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["bean"] = {},
        ["combination"] = {},
        ["fact"] = {},
        ["history"] = {},
        ["recipe"] = {},
      },
    },
    entity = {
      ["bean"] = {
        ["fields"] = {
          {
            ["name"] = "backgroundColor",
            ["title"] = "Background Color",
            ["type"] = "`$STRING`",
            ["short"] = "Hex color code for the bean's background color",
          },
          {
            ["name"] = "beanId",
            ["title"] = "Bean Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the bean",
          },
          {
            ["name"] = "colorGroup",
            ["title"] = "Color Group",
            ["type"] = "`$STRING`",
            ["short"] = "Color category of the bean",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "Detailed description of the bean flavor",
          },
          {
            ["name"] = "flavorName",
            ["title"] = "Flavor Name",
            ["type"] = "`$STRING`",
            ["short"] = "Name of the flavor",
          },
          {
            ["name"] = "glutenFree",
            ["title"] = "Gluten Free",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Indicates if the bean is gluten-free",
          },
          {
            ["name"] = "groupName",
            ["title"] = "Group Name",
            ["type"] = "`$ARRAY`",
            ["short"] = "Group or category names the bean belongs to",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "imageUrl",
            ["title"] = "Image Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL to the bean image",
            ["format"] = "uri",
          },
          {
            ["name"] = "ingredients",
            ["title"] = "Ingredients",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of ingredients",
          },
          {
            ["name"] = "kosher",
            ["title"] = "Kosher",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Indicates if the bean is kosher certified",
          },
          {
            ["name"] = "sugarFree",
            ["title"] = "Sugar Free",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Indicates if the bean is sugar-free",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "bean",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/beans",
                ["segments"] = {
                  {
                    ["lit"] = "beans",
                  },
                },
                ["parts"] = {
                  "beans",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "page",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/beans/{beanId}",
                ["segments"] = {
                  {
                    ["lit"] = "beans",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "beans",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["beanId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "bean_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["combination"] = {
        ["fields"] = {
          {
            ["name"] = "beans",
            ["title"] = "Beans",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of bean flavors in the combination",
          },
          {
            ["name"] = "combinationId",
            ["title"] = "Combination Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the combination",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Name of the flavor combination",
          },
          {
            ["name"] = "tag",
            ["title"] = "Tag",
            ["type"] = "`$ARRAY`",
            ["short"] = "Tags associated with the combination",
          },
        },
        ["name"] = "combination",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/combinations",
                ["segments"] = {
                  {
                    ["lit"] = "combinations",
                  },
                },
                ["parts"] = {
                  "combinations",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "page",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["fact"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "Full text of the fact",
          },
          {
            ["name"] = "factId",
            ["title"] = "Fact Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the fact",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["short"] = "Title of the fact",
          },
        },
        ["name"] = "fact",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/facts",
                ["segments"] = {
                  {
                    ["lit"] = "facts",
                  },
                },
                ["parts"] = {
                  "facts",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "page",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["history"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "Description of the historical event",
          },
          {
            ["name"] = "historyId",
            ["title"] = "History Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the history entry",
          },
          {
            ["name"] = "year",
            ["title"] = "Year",
            ["type"] = "`$INTEGER`",
            ["short"] = "Year of the historical event",
          },
        },
        ["name"] = "history",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/history",
                ["segments"] = {
                  {
                    ["lit"] = "history",
                  },
                },
                ["parts"] = {
                  "history",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["recipe"] = {
        ["fields"] = {
          {
            ["name"] = "cookTime",
            ["title"] = "Cook Time",
            ["type"] = "`$STRING`",
            ["short"] = "Cooking time",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "Description of the recipe",
          },
          {
            ["name"] = "directions",
            ["title"] = "Directions",
            ["type"] = "`$ARRAY`",
            ["short"] = "Step-by-step directions",
          },
          {
            ["name"] = "imageUrl",
            ["title"] = "Image Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL to the recipe image",
            ["format"] = "uri",
          },
          {
            ["name"] = "ingredients",
            ["title"] = "Ingredients",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of ingredients",
          },
          {
            ["name"] = "makingAmount",
            ["title"] = "Making Amount",
            ["type"] = "`$STRING`",
            ["short"] = "Amount the recipe makes",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Name of the recipe",
          },
          {
            ["name"] = "prepTime",
            ["title"] = "Prep Time",
            ["type"] = "`$STRING`",
            ["short"] = "Preparation time",
          },
          {
            ["name"] = "recipeId",
            ["title"] = "Recipe Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the recipe",
          },
          {
            ["name"] = "totalTime",
            ["title"] = "Total Time",
            ["type"] = "`$STRING`",
            ["short"] = "Total time required",
          },
        },
        ["name"] = "recipe",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/recipes",
                ["segments"] = {
                  {
                    ["lit"] = "recipes",
                  },
                },
                ["parts"] = {
                  "recipes",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "page",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
