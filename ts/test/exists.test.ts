
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { JellyBellyWikiSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = JellyBellyWikiSDK.test()
    equal(testsdk instanceof JellyBellyWikiSDK, true,
      'JellyBellyWikiSDK.test() must return a client synchronously')
  })

})
