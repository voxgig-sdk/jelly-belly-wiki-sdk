# JellyBellyWiki SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

JellyBellyWikiUtility.registrar = ->(u) {
  u.clean = JellyBellyWikiUtilities::Clean
  u.done = JellyBellyWikiUtilities::Done
  u.make_error = JellyBellyWikiUtilities::MakeError
  u.feature_add = JellyBellyWikiUtilities::FeatureAdd
  u.feature_hook = JellyBellyWikiUtilities::FeatureHook
  u.feature_init = JellyBellyWikiUtilities::FeatureInit
  u.fetcher = JellyBellyWikiUtilities::Fetcher
  u.make_fetch_def = JellyBellyWikiUtilities::MakeFetchDef
  u.make_context = JellyBellyWikiUtilities::MakeContext
  u.make_options = JellyBellyWikiUtilities::MakeOptions
  u.make_request = JellyBellyWikiUtilities::MakeRequest
  u.make_response = JellyBellyWikiUtilities::MakeResponse
  u.make_result = JellyBellyWikiUtilities::MakeResult
  u.make_point = JellyBellyWikiUtilities::MakePoint
  u.make_spec = JellyBellyWikiUtilities::MakeSpec
  u.make_url = JellyBellyWikiUtilities::MakeUrl
  u.param = JellyBellyWikiUtilities::Param
  u.prepare_auth = JellyBellyWikiUtilities::PrepareAuth
  u.prepare_body = JellyBellyWikiUtilities::PrepareBody
  u.prepare_headers = JellyBellyWikiUtilities::PrepareHeaders
  u.prepare_method = JellyBellyWikiUtilities::PrepareMethod
  u.prepare_params = JellyBellyWikiUtilities::PrepareParams
  u.prepare_path = JellyBellyWikiUtilities::PreparePath
  u.prepare_query = JellyBellyWikiUtilities::PrepareQuery
  u.graphql_body = JellyBellyWikiUtilities::GraphqlBody
  u.graphql_errors = JellyBellyWikiUtilities::GraphqlErrors
  u.result_basic = JellyBellyWikiUtilities::ResultBasic
  u.result_body = JellyBellyWikiUtilities::ResultBody
  u.result_headers = JellyBellyWikiUtilities::ResultHeaders
  u.transform_request = JellyBellyWikiUtilities::TransformRequest
  u.transform_response = JellyBellyWikiUtilities::TransformResponse
}
