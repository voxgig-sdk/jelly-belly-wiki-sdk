"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'JellyBellyWiki',
        slug: "jelly-belly-wiki",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://jellybellywikiapi.onrender.com/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            bean: {},
            combination: {},
            fact: {},
            history: {},
            recipe: {},
        }
    };
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
                    "format": "uri",
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
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "beans"
                                }
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
                            },
                            "parts": [
                                "beans"
                            ]
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
                            "rename": {
                                "param": {
                                    "beanId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "beans"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "beans",
                                "{id}"
                            ]
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
                            "segments": [
                                {
                                    "lit": "combinations"
                                }
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
                            },
                            "parts": [
                                "combinations"
                            ]
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
                            "segments": [
                                {
                                    "lit": "facts"
                                }
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
                            },
                            "parts": [
                                "facts"
                            ]
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
                            "segments": [
                                {
                                    "lit": "history"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "parts": [
                                "history"
                            ]
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
                    "format": "uri",
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
                            "segments": [
                                {
                                    "lit": "recipes"
                                }
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
                            },
                            "parts": [
                                "recipes"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map