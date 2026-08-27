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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
								"parts": []any{
									"beans",
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
								"parts": []any{
									"beans",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"beanId": "id",
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
								"parts": []any{
									"combinations",
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
								"parts": []any{
									"facts",
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
								"parts": []any{
									"history",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
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
								"parts": []any{
									"recipes",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
