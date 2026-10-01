import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "bean",
    "accessor": "Bean",
    "op": "list",
    "method": "GET",
    "path": "/beans",
    "args": [],
    "select": {
      "limit": "v1",
      "page": "v1"
    },
    "headers": [],
    "query": [
      "page",
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "backgroundColor": "x",
          "beanId": "x",
          "colorGroup": "x",
          "description": "x",
          "flavorName": "x",
          "glutenFree": true,
          "groupName": [
            "x"
          ],
          "imageUrl": "x",
          "ingredients": [
            "x"
          ],
          "kosher": true,
          "sugarFree": true
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
    "query": [],
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
      "limit": "v1",
      "page": "v1"
    },
    "headers": [],
    "query": [
      "page",
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "beans": [
            "x"
          ],
          "combinationId": "x",
          "name": "x",
          "tag": [
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
      "limit": "v1",
      "page": "v1"
    },
    "headers": [],
    "query": [
      "page",
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "description": "x",
          "factId": "x",
          "title": "x"
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
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "description": "x",
          "historyId": "x",
          "year": 1
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
      "limit": "v1",
      "page": "v1"
    },
    "headers": [],
    "query": [
      "page",
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "cookTime": "x",
          "description": "x",
          "directions": [
            "x"
          ],
          "imageUrl": "x",
          "ingredients": [
            "x"
          ],
          "makingAmount": "x",
          "name": "x",
          "prepTime": "x",
          "recipeId": "x",
          "totalTime": "x"
        }
      ],
      "totalCount": 1,
      "currentPage": 1,
      "pageSize": 1
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
