# JellyBellyWiki SDK utility: prepare_body
require_relative 'media'
module JellyBellyWikiUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return JellyBellyWikiUtilities.raw_body(ctx.reqdata) if JellyBellyWikiUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
