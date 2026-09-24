

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


describe('CombinationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JELLY_BELLY_WIKI_TEST_LIVE=TRUE.
  afterEach(liveDelay('JELLY_BELLY_WIKI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JellyBellyWikiSDK.test()
    const ent = testsdk.Combination()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JELLY_BELLY_WIKI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'combination.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"beans":{"a":true,"h":"Beans","n":"beans","r":false,"sh":"List of bean flavors in the combination","t":"`$ARRAY`","key$":"beans","index$":0},"combinationId":{"a":true,"h":"Combination Id","n":"combinationId","r":false,"sh":"Unique identifier for the combination","t":"`$STRING`","key$":"combinationId","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the flavor combination","t":"`$STRING`","key$":"name","index$":2},"tag":{"a":true,"h":"Tag","n":"tag","r":false,"sh":"Tags associated with the combination","t":"`$ARRAY`","key$":"tag","index$":3}},"name":"combination","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /combinations","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/combinations","q":{"exist":["limit","page"]},"r":{},"s":[{"lit":"combinations"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"combination","name__orig":"combination","Name":"Combination","name_":"combination","name-":"combination","NAME":"COMBINATION","index$":1}, {"active":true,"entity":"combination","key$":"BasicCombinationFlow","kind":"basic","name":"BasicCombinationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"combination_ref01"}}],"index$":0}]}, 'Combination', {"GET /combinations":{"protocol":"http","operationId":"getCombinations","responses":{"200":{"description":"Successful response with a list of flavor combinations","content":{"application/json":{"schema":{"type":"object","properties":{"items":{"items":{"properties":{"beans":{"description":"List of bean flavors in the combination","items":{"type":"string"},"type":"array","key$":"beans"},"combinationId":{"description":"Unique identifier for the combination","type":"string","key$":"combinationId"},"name":{"description":"Name of the flavor combination","type":"string","key$":"name"},"tag":{"description":"Tags associated with the combination","items":{"type":"string"},"type":"array","key$":"tag"}},"type":"object","x-ref":"#/components/schemas/Combination","index$":0},"key$":"items","type":"array"},"totalCount":{"description":"Total number of combinations available","key$":"totalCount","type":"integer"},"currentPage":{"description":"Current page number","key$":"currentPage","type":"integer"},"pageSize":{"description":"Number of items per page","key$":"pageSize","type":"integer"}}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"message":{"type":"string","description":"Detailed error description"},"statusCode":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"limit","in":"query","description":"Number of items per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let combination_ref01_data = Object.values(setup.data.existing.combination)[0] as any

    // LIST
    const combination_ref01_ent = client.Combination()
    const combination_ref01_match: any = {}

    const combination_ref01_list = (await combination_ref01_ent.list(combination_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/combination/CombinationTestData.json')

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
    ['combination01','combination02','combination03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'JELLY_BELLY_WIKI_TEST_COMBINATION_ENTID': idmap,
    'JELLY_BELLY_WIKI_TEST_LIVE': 'FALSE',
    'JELLY_BELLY_WIKI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JELLY_BELLY_WIKI_TEST_COMBINATION_ENTID']

  const live = 'TRUE' === env.JELLY_BELLY_WIKI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['JELLY_BELLY_WIKI_TEST_COMBINATION_ENTID']
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
  
