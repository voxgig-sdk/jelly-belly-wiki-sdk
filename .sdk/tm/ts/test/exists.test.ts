
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { JellyBellyWikiSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await JellyBellyWikiSDK.test()
    equal(null !== testsdk, true)
  })

})
