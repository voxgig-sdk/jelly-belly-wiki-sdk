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
						"title": "Background Color",
						"type": "`$STRING`",
						"short": "Hex color code for the bean's background color",
					},
					map[string]any{
						"name": "beanId",
						"title": "Bean Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the bean",
					},
					map[string]any{
						"name": "colorGroup",
						"title": "Color Group",
						"type": "`$STRING`",
						"short": "Color category of the bean",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Detailed description of the bean flavor",
					},
					map[string]any{
						"name": "flavorName",
						"title": "Flavor Name",
						"type": "`$STRING`",
						"short": "Name of the flavor",
					},
					map[string]any{
						"name": "glutenFree",
						"title": "Gluten Free",
						"type": "`$BOOLEAN`",
						"short": "Indicates if the bean is gluten-free",
					},
					map[string]any{
						"name": "groupName",
						"title": "Group Name",
						"type": "`$ARRAY`",
						"short": "Group or category names the bean belongs to",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "imageUrl",
						"title": "Image Url",
						"type": "`$STRING`",
						"short": "URL to the bean image",
						"format": "uri",
					},
					map[string]any{
						"name": "ingredients",
						"title": "Ingredients",
						"type": "`$ARRAY`",
						"short": "List of ingredients",
					},
					map[string]any{
						"name": "kosher",
						"title": "Kosher",
						"type": "`$BOOLEAN`",
						"short": "Indicates if the bean is kosher certified",
					},
					map[string]any{
						"name": "sugarFree",
						"title": "Sugar Free",
						"type": "`$BOOLEAN`",
						"short": "Indicates if the bean is sugar-free",
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
								"kind": "http",
								"method": "GET",
								"orig": "/beans",
								"segments": []any{
									map[string]any{
										"lit": "beans",
									},
								},
								"parts": []any{
									"beans",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beans/{beanId}",
								"segments": []any{
									map[string]any{
										"lit": "beans",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"beans",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"beanId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "bean_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Beans",
						"type": "`$ARRAY`",
						"short": "List of bean flavors in the combination",
					},
					map[string]any{
						"name": "combinationId",
						"title": "Combination Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the combination",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the flavor combination",
					},
					map[string]any{
						"name": "tag",
						"title": "Tag",
						"type": "`$ARRAY`",
						"short": "Tags associated with the combination",
					},
				},
				"name": "combination",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/combinations",
								"segments": []any{
									map[string]any{
										"lit": "combinations",
									},
								},
								"parts": []any{
									"combinations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "Full text of the fact",
					},
					map[string]any{
						"name": "factId",
						"title": "Fact Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the fact",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Title of the fact",
					},
				},
				"name": "fact",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/facts",
								"segments": []any{
									map[string]any{
										"lit": "facts",
									},
								},
								"parts": []any{
									"facts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the historical event",
					},
					map[string]any{
						"name": "historyId",
						"title": "History Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the history entry",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$INTEGER`",
						"short": "Year of the historical event",
					},
				},
				"name": "history",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/history",
								"segments": []any{
									map[string]any{
										"lit": "history",
									},
								},
								"parts": []any{
									"history",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Cook Time",
						"type": "`$STRING`",
						"short": "Cooking time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the recipe",
					},
					map[string]any{
						"name": "directions",
						"title": "Directions",
						"type": "`$ARRAY`",
						"short": "Step-by-step directions",
					},
					map[string]any{
						"name": "imageUrl",
						"title": "Image Url",
						"type": "`$STRING`",
						"short": "URL to the recipe image",
						"format": "uri",
					},
					map[string]any{
						"name": "ingredients",
						"title": "Ingredients",
						"type": "`$ARRAY`",
						"short": "List of ingredients",
					},
					map[string]any{
						"name": "makingAmount",
						"title": "Making Amount",
						"type": "`$STRING`",
						"short": "Amount the recipe makes",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the recipe",
					},
					map[string]any{
						"name": "prepTime",
						"title": "Prep Time",
						"type": "`$STRING`",
						"short": "Preparation time",
					},
					map[string]any{
						"name": "recipeId",
						"title": "Recipe Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the recipe",
					},
					map[string]any{
						"name": "totalTime",
						"title": "Total Time",
						"type": "`$STRING`",
						"short": "Total time required",
					},
				},
				"name": "recipe",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/recipes",
								"segments": []any{
									map[string]any{
										"lit": "recipes",
									},
								},
								"parts": []any{
									"recipes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
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
