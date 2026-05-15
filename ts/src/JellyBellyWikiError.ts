
import { Context } from './Context'


class JellyBellyWikiError extends Error {

  isJellyBellyWikiError = true

  sdk = 'JellyBellyWiki'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  JellyBellyWikiError
}

