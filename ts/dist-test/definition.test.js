"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "bean",
        "accessor": "Bean",
        "op": "list",
        "method": "GET",
        "path": "/beans",
        "args": [],
        "select": {
            "limit": 10,
            "page": 1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "page",
                "wire": "page"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "items": [
                {
                    "beanId": "x",
                    "groupName": [
                        "x"
                    ],
                    "flavorName": "x",
                    "description": "x",
                    "colorGroup": "x",
                    "backgroundColor": "x",
                    "imageUrl": "x",
                    "ingredients": [
                        "x"
                    ],
                    "glutenFree": true,
                    "sugarFree": true,
                    "kosher": true
                }
            ],
            "totalCount": 1,
            "currentPage": 1,
            "pageSize": 1
        },
        "idField": "id"
    },
    {
        "entity": "bean",
        "accessor": "Bean",
        "op": "load",
        "method": "GET",
        "path": "/beans/{beanId}",
        "args": [
            {
                "name": "id",
                "wire": "beanId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "beanId": "x",
            "groupName": [
                "x"
            ],
            "flavorName": "x",
            "description": "x",
            "colorGroup": "x",
            "backgroundColor": "x",
            "imageUrl": "x",
            "ingredients": [
                "x"
            ],
            "glutenFree": true,
            "sugarFree": true,
            "kosher": true
        },
        "idField": "id"
    },
    {
        "entity": "combination",
        "accessor": "Combination",
        "op": "list",
        "method": "GET",
        "path": "/combinations",
        "args": [],
        "select": {
            "limit": 10,
            "page": 1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "page",
                "wire": "page"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "items": [
                {
                    "combinationId": "x",
                    "name": "x",
                    "tag": [
                        "x"
                    ],
                    "beans": [
                        "x"
                    ]
                }
            ],
            "totalCount": 1,
            "currentPage": 1,
            "pageSize": 1
        },
        "idField": "id"
    },
    {
        "entity": "fact",
        "accessor": "Fact",
        "op": "list",
        "method": "GET",
        "path": "/facts",
        "args": [],
        "select": {
            "limit": 10,
            "page": 1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "page",
                "wire": "page"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "items": [
                {
                    "factId": "x",
                    "title": "x",
                    "description": "x"
                }
            ],
            "totalCount": 1,
            "currentPage": 1,
            "pageSize": 1
        },
        "idField": "id"
    },
    {
        "entity": "history",
        "accessor": "History",
        "op": "list",
        "method": "GET",
        "path": "/history",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "items": [
                {
                    "historyId": "x",
                    "year": 1,
                    "description": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "recipe",
        "accessor": "Recipe",
        "op": "list",
        "method": "GET",
        "path": "/recipes",
        "args": [],
        "select": {
            "limit": 10,
            "page": 1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "page",
                "wire": "page"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "items": [
                {
                    "recipeId": "x",
                    "name": "x",
                    "description": "x",
                    "prepTime": "x",
                    "cookTime": "x",
                    "totalTime": "x",
                    "makingAmount": "x",
                    "imageUrl": "x",
                    "ingredients": [
                        "x"
                    ],
                    "directions": [
                        "x"
                    ]
                }
            ],
            "totalCount": 1,
            "currentPage": 1,
            "pageSize": 1
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map