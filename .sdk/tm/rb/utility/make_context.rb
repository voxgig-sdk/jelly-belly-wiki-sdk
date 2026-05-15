# JellyBellyWiki SDK utility: make_context
require_relative '../core/context'
module JellyBellyWikiUtilities
  MakeContext = ->(ctxmap, basectx) {
    JellyBellyWikiContext.new(ctxmap, basectx)
  }
end
