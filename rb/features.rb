# JellyBellyWiki SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module JellyBellyWikiFeatures
  def self.make_feature(name)
    case name
    when "base"
      JellyBellyWikiBaseFeature.new
    when "test"
      JellyBellyWikiTestFeature.new
    else
      JellyBellyWikiBaseFeature.new
    end
  end
end
