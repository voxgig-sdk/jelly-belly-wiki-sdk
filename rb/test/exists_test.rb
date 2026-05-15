# JellyBellyWiki SDK exists test

require "minitest/autorun"
require_relative "../JellyBellyWiki_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = JellyBellyWikiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
