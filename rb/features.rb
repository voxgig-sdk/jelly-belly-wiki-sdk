# JellyBellyWiki SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module JellyBellyWikiFeatures
  def self.make_feature(name)
    case name
    when "base"
      JellyBellyWikiBaseFeature.new
    when "ratelimit"
      JellyBellyWikiRatelimitFeature.new
    when "retry"
      JellyBellyWikiRetryFeature.new
    when "test"
      JellyBellyWikiTestFeature.new
    when "timeout"
      JellyBellyWikiTimeoutFeature.new
    else
      JellyBellyWikiBaseFeature.new
    end
  end
end
