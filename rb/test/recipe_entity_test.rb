# Recipe entity test

require "minitest/autorun"
require "json"
require_relative "../JellyBellyWiki_sdk"
require_relative "runner"

class RecipeEntityTest < Minitest::Test
  def test_create_instance
    testsdk = JellyBellyWikiSDK.test(nil, nil)
    ent = testsdk.Recipe(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = recipe_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "recipe." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set JELLYBELLYWIKI_TEST_RECIPE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    recipe_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.recipe")))
    recipe_ref01_data = nil
    if recipe_ref01_data_raw.length > 0
      recipe_ref01_data = Helpers.to_map(recipe_ref01_data_raw[0][1])
    end

    # LIST
    recipe_ref01_ent = client.Recipe(nil)
    recipe_ref01_match = {}

    recipe_ref01_list_result, err = recipe_ref01_ent.list(recipe_ref01_match, nil)
    assert_nil err
    assert recipe_ref01_list_result.is_a?(Array)

  end
end

def recipe_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "recipe", "RecipeTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = JellyBellyWikiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["recipe01", "recipe02", "recipe03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["JELLYBELLYWIKI_TEST_RECIPE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "JELLYBELLYWIKI_TEST_RECIPE_ENTID" => idmap,
    "JELLYBELLYWIKI_TEST_LIVE" => "FALSE",
    "JELLYBELLYWIKI_TEST_EXPLAIN" => "FALSE",
    "JELLYBELLYWIKI_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["JELLYBELLYWIKI_TEST_RECIPE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["JELLYBELLYWIKI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["JELLYBELLYWIKI_APIKEY"],
      },
      extra || {},
    ])
    client = JellyBellyWikiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["JELLYBELLYWIKI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["JELLYBELLYWIKI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
