

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { JellyBellyWikiSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('RecipeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JELLY_BELLY_WIKI_TEST_LIVE=TRUE.
  afterEach(liveDelay('JELLY_BELLY_WIKI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JellyBellyWikiSDK.test()
    const ent = testsdk.Recipe()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JELLY_BELLY_WIKI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'recipe.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cookTime":{"a":true,"h":"Cook Time","n":"cookTime","r":false,"sh":"Cooking time","t":"`$STRING`","key$":"cookTime","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the recipe","t":"`$STRING`","key$":"description","index$":1},"directions":{"a":true,"h":"Directions","n":"directions","r":false,"sh":"Step-by-step directions","t":"`$ARRAY`","key$":"directions","index$":2},"imageUrl":{"a":true,"fo":"uri","h":"Image Url","n":"imageUrl","r":false,"sh":"URL to the recipe image","t":"`$STRING`","key$":"imageUrl","index$":3},"ingredients":{"a":true,"h":"Ingredients","n":"ingredients","r":false,"sh":"List of ingredients","t":"`$ARRAY`","key$":"ingredients","index$":4},"makingAmount":{"a":true,"h":"Making Amount","n":"makingAmount","r":false,"sh":"Amount the recipe makes","t":"`$STRING`","key$":"makingAmount","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the recipe","t":"`$STRING`","key$":"name","index$":6},"prepTime":{"a":true,"h":"Prep Time","n":"prepTime","r":false,"sh":"Preparation time","t":"`$STRING`","key$":"prepTime","index$":7},"recipeId":{"a":true,"h":"Recipe Id","n":"recipeId","r":false,"sh":"Unique identifier for the recipe","t":"`$STRING`","key$":"recipeId","index$":8},"totalTime":{"a":true,"h":"Total Time","n":"totalTime","r":false,"sh":"Total time required","t":"`$STRING`","key$":"totalTime","index$":9}},"name":"recipe","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /recipes","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/recipes","q":{"exist":["limit","page"]},"r":{},"s":[{"lit":"recipes"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"recipe","name__orig":"recipe","Name":"Recipe","name_":"recipe","name-":"recipe","NAME":"RECIPE","index$":4}, {"active":true,"entity":"recipe","key$":"BasicRecipeFlow","kind":"basic","name":"BasicRecipeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"recipe_ref01"}}],"index$":0}]}, 'Recipe', {"GET /recipes":{"protocol":"http","operationId":"getRecipes","responses":{"200":{"description":"Successful response with a list of recipes","content":{"application/json":{"schema":{"type":"object","properties":{"items":{"items":{"properties":{"cookTime":{"description":"Cooking time","type":"string","key$":"cookTime"},"description":{"description":"Description of the recipe","type":"string","key$":"description"},"directions":{"description":"Step-by-step directions","items":{"type":"string"},"type":"array","key$":"directions"},"imageUrl":{"description":"URL to the recipe image","format":"uri","type":"string","key$":"imageUrl"},"ingredients":{"description":"List of ingredients","items":{"type":"string"},"type":"array","key$":"ingredients"},"makingAmount":{"description":"Amount the recipe makes","type":"string","key$":"makingAmount"},"name":{"description":"Name of the recipe","type":"string","key$":"name"},"prepTime":{"description":"Preparation time","type":"string","key$":"prepTime"},"recipeId":{"description":"Unique identifier for the recipe","type":"string","key$":"recipeId"},"totalTime":{"description":"Total time required","type":"string","key$":"totalTime"}},"type":"object","x-ref":"#/components/schemas/Recipe","index$":0},"key$":"items","type":"array"},"totalCount":{"description":"Total number of recipes available","key$":"totalCount","type":"integer"},"currentPage":{"description":"Current page number","key$":"currentPage","type":"integer"},"pageSize":{"description":"Number of items per page","key$":"pageSize","type":"integer"}}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"limit","in":"query","description":"Number of items per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let recipe_ref01_data = Object.values(setup.data.existing.recipe)[0] as any

    // LIST
    const recipe_ref01_ent = client.Recipe()
    const recipe_ref01_match: any = {}

    const recipe_ref01_list = (await recipe_ref01_ent.list(recipe_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/recipe/RecipeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = JellyBellyWikiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['recipe01','recipe02','recipe03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'JELLY_BELLY_WIKI_TEST_RECIPE_ENTID': idmap,
    'JELLY_BELLY_WIKI_TEST_LIVE': 'FALSE',
    'JELLY_BELLY_WIKI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JELLY_BELLY_WIKI_TEST_RECIPE_ENTID']

  const live = 'TRUE' === env.JELLY_BELLY_WIKI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['JELLY_BELLY_WIKI_TEST_RECIPE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new JellyBellyWikiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.JELLY_BELLY_WIKI_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
