

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { JellyBellyWikiSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('FactEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JELLY_BELLY_WIKI_TEST_LIVE=TRUE.
  afterEach(liveDelay('JELLY_BELLY_WIKI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JellyBellyWikiSDK.test()
    const ent = testsdk.Fact()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('fact hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of JellyBellyWikiSDK.test(offline).Fact().stream('list')) { }
    }, /offline/)

    for await (const _item of JellyBellyWikiSDK.test(offline).Fact()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = JellyBellyWikiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Fact().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of JellyBellyWikiSDK.test().Fact().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new JellyBellyWikiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Fact().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Fact().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = JellyBellyWikiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Fact().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JELLY_BELLY_WIKI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'fact.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Full text of the fact","t":"`$STRING`","key$":"description","index$":0},"factId":{"a":true,"h":"Fact Id","n":"factId","r":false,"sh":"Unique identifier for the fact","t":"`$STRING`","key$":"factId","index$":1},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the fact","t":"`$STRING`","key$":"title","index$":2}},"name":"fact","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/facts","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"fact","name__orig":"fact","Name":"Fact","name_":"fact","name-":"fact","NAME":"FACT","index$":2}, {"active":true,"entity":"fact","key$":"BasicFactFlow","kind":"basic","name":"BasicFactFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"fact_ref01"}}],"index$":0}]}, 'Fact', {"GET /facts":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"limit","in":"query","description":"Number of items per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let fact_ref01_data = Object.values(setup.data.existing.fact)[0] as any

    // LIST
    const fact_ref01_ent = client.Fact()
    const fact_ref01_match: any = {}

    const fact_ref01_list = (await fact_ref01_ent.list(fact_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/fact/FactTestData.json')

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
    ['fact01','fact02','fact03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'JELLY_BELLY_WIKI_TEST_FACT_ENTID': idmap,
    'JELLY_BELLY_WIKI_TEST_LIVE': 'FALSE',
    'JELLY_BELLY_WIKI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JELLY_BELLY_WIKI_TEST_FACT_ENTID']

  const live = 'TRUE' === env.JELLY_BELLY_WIKI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['JELLY_BELLY_WIKI_TEST_FACT_ENTID']
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
  
