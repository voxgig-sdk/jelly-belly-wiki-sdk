package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "JellyBellyWiki",
			"slug": "jelly-belly-wiki",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://jellybellywikiapi.onrender.com/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"bean": map[string]any{},
				"combination": map[string]any{},
				"fact": map[string]any{},
				"history": map[string]any{},
				"recipe": map[string]any{},
			},
		},
		"entity": map[string]any{
			"bean": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "backgroundColor",
						"short": "Hex color code for the bean's background color",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "beanId",
						"short": "Unique identifier for the bean",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "colorGroup",
						"short": "Color category of the bean",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the bean flavor",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flavorName",
						"short": "Name of the flavor",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "glutenFree",
						"short": "Indicates if the bean is gluten-free",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "groupName",
						"short": "Group or category names the bean belongs to",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "imageUrl",
						"short": "URL to the bean image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ingredients",
						"short": "List of ingredients",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "kosher",
						"short": "Indicates if the bean is kosher certified",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "sugarFree",
						"short": "Indicates if the bean is sugar-free",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "bean",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/beans",
								"segments": []any{
									map[string]any{
										"lit": "beans",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"beans",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "bean_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/beans/{beanId}",
								"rename": map[string]any{
									"param": map[string]any{
										"beanId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "beans",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"beans",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"combination": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "beans",
						"short": "List of bean flavors in the combination",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "combinationId",
						"short": "Unique identifier for the combination",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the flavor combination",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tag",
						"short": "Tags associated with the combination",
						"type": "`$ARRAY`",
					},
				},
				"name": "combination",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/combinations",
								"segments": []any{
									map[string]any{
										"lit": "combinations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"combinations",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"fact": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Full text of the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "factId",
						"short": "Unique identifier for the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the fact",
						"type": "`$STRING`",
					},
				},
				"name": "fact",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/facts",
								"segments": []any{
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"facts",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"history": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the historical event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "historyId",
						"short": "Unique identifier for the history entry",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "year",
						"short": "Year of the historical event",
						"type": "`$INTEGER`",
					},
				},
				"name": "history",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/history",
								"segments": []any{
									map[string]any{
										"lit": "history",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"history",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"recipe": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cookTime",
						"short": "Cooking time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the recipe",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "directions",
						"short": "Step-by-step directions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "uri",
						"name": "imageUrl",
						"short": "URL to the recipe image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ingredients",
						"short": "List of ingredients",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "makingAmount",
						"short": "Amount the recipe makes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the recipe",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "prepTime",
						"short": "Preparation time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "recipeId",
						"short": "Unique identifier for the recipe",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "totalTime",
						"short": "Total time required",
						"type": "`$STRING`",
					},
				},
				"name": "recipe",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/recipes",
								"segments": []any{
									map[string]any{
										"lit": "recipes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"recipes",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
