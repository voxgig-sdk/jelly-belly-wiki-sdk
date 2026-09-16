

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('BeanEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JELLY_BELLY_WIKI_TEST_LIVE=TRUE.
  afterEach(liveDelay('JELLY_BELLY_WIKI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JellyBellyWikiSDK.test()
    const ent = testsdk.Bean()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JELLY_BELLY_WIKI_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bean.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"backgroundColor","req":false,"short":"Hex color code for the bean's background color","type":"`$STRING`","index$":0},{"active":true,"name":"beanId","req":false,"short":"Unique identifier for the bean","type":"`$STRING`","index$":1},{"active":true,"name":"colorGroup","req":false,"short":"Color category of the bean","type":"`$STRING`","index$":2},{"active":true,"name":"description","req":false,"short":"Detailed description of the bean flavor","type":"`$STRING`","index$":3},{"active":true,"name":"flavorName","req":false,"short":"Name of the flavor","type":"`$STRING`","index$":4},{"active":true,"name":"glutenFree","req":false,"short":"Indicates if the bean is gluten-free","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"groupName","req":false,"short":"Group or category names the bean belongs to","type":"`$ARRAY`","index$":6},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":7},{"active":true,"format":"uri","name":"imageUrl","req":false,"short":"URL to the bean image","type":"`$STRING`","index$":8},{"active":true,"name":"ingredients","req":false,"short":"List of ingredients","type":"`$ARRAY`","index$":9},{"active":true,"name":"kosher","req":false,"short":"Indicates if the bean is kosher certified","type":"`$BOOLEAN`","index$":10},{"active":true,"name":"sugarFree","req":false,"short":"Indicates if the bean is sugar-free","type":"`$BOOLEAN`","index$":11}],"id":{"field":"id","name":"id"},"name":"bean","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /beans","json":"{\"operationId\":\"getBeans\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"currentPage\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"items\":{\"items\":{\"properties\":{\"backgroundColor\":{\"description\":\"Hex color code for the bean's background color\",\"type\":\"string\"},\"beanId\":{\"description\":\"Unique identifier for the bean\",\"type\":\"string\"},\"colorGroup\":{\"description\":\"Color category of the bean\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the bean flavor\",\"type\":\"string\"},\"flavorName\":{\"description\":\"Name of the flavor\",\"type\":\"string\"},\"glutenFree\":{\"description\":\"Indicates if the bean is gluten-free\",\"type\":\"boolean\"},\"groupName\":{\"description\":\"Group or category names the bean belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"imageUrl\":{\"description\":\"URL to the bean image\",\"format\":\"uri\",\"type\":\"string\"},\"ingredients\":{\"description\":\"List of ingredients\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"kosher\":{\"description\":\"Indicates if the bean is kosher certified\",\"type\":\"boolean\"},\"sugarFree\":{\"description\":\"Indicates if the bean is sugar-free\",\"type\":\"boolean\"}},\"type\":\"object\"},\"type\":\"array\"},\"pageSize\":{\"description\":\"Number of items per page\",\"type\":\"integer\"},\"totalCount\":{\"description\":\"Total number of beans available\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with a list of Jelly Belly beans\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/beans","segments":[{"lit":"beans"}],"select":{"exist":["limit","page"]},"transform":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"bean_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /beans/{beanId}","json":"{\"operationId\":\"getBeanById\",\"parameters\":[{\"description\":\"Unique identifier of the Jelly Belly bean\",\"in\":\"path\",\"name\":\"beanId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"backgroundColor\":{\"description\":\"Hex color code for the bean's background color\",\"type\":\"string\"},\"beanId\":{\"description\":\"Unique identifier for the bean\",\"type\":\"string\"},\"colorGroup\":{\"description\":\"Color category of the bean\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the bean flavor\",\"type\":\"string\"},\"flavorName\":{\"description\":\"Name of the flavor\",\"type\":\"string\"},\"glutenFree\":{\"description\":\"Indicates if the bean is gluten-free\",\"type\":\"boolean\"},\"groupName\":{\"description\":\"Group or category names the bean belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"imageUrl\":{\"description\":\"URL to the bean image\",\"format\":\"uri\",\"type\":\"string\"},\"ingredients\":{\"description\":\"List of ingredients\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"kosher\":{\"description\":\"Indicates if the bean is kosher certified\",\"type\":\"boolean\"},\"sugarFree\":{\"description\":\"Indicates if the bean is sugar-free\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response with bean details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bean not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/beans/{beanId}","rename":{"param":{"beanId":"id"}},"segments":[{"lit":"beans"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"bean","name__orig":"bean","Name":"Bean","name_":"bean","name-":"bean","NAME":"BEAN","index$":0}, {"active":true,"entity":"bean","key$":"BasicBeanFlow","kind":"basic","name":"BasicBeanFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"bean_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"bean_ref01","srcdatavar":"bean_ref01_data","suffix":"_dt0"},"match":{"id":"bean01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bean_ref01"}}],"index$":1}]}, 'Bean')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bean_ref01_data = Object.values(setup.data.existing.bean)[0] as any

    // LIST
    const bean_ref01_ent = client.Bean()
    const bean_ref01_match: any = {}

    const bean_ref01_list = (await bean_ref01_ent.list(bean_ref01_match)).map((e: any) => e.data())


    // LOAD
    const bean_ref01_match_dt0: any = {}
    bean_ref01_match_dt0.id = bean_ref01_data.id
    const bean_ref01_data_dt0 = (await bean_ref01_ent.load(bean_ref01_match_dt0)).data()
    assert(bean_ref01_data_dt0.id === bean_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bean/BeanTestData.json')

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
    ['bean01','bean02','bean03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'JELLY_BELLY_WIKI_TEST_BEAN_ENTID': idmap,
    'JELLY_BELLY_WIKI_TEST_LIVE': 'FALSE',
    'JELLY_BELLY_WIKI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JELLY_BELLY_WIKI_TEST_BEAN_ENTID']

  const live = 'TRUE' === env.JELLY_BELLY_WIKI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['JELLY_BELLY_WIKI_TEST_BEAN_ENTID']
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
  
