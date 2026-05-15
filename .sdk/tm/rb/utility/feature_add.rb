# JellyBellyWiki SDK utility: feature_add
module JellyBellyWikiUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
