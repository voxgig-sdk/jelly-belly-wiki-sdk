<?php
declare(strict_types=1);

// Bean entity test

require_once __DIR__ . '/../jellybellywiki_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BeanEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = JellyBellyWikiSDK::test(null, null);
        $ent = $testsdk->Bean(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "bean" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = JellyBellyWikiSDK::test($seed, null);
        $seen = iterator_to_array($base->Bean(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = JellyBellyWikiConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = JellyBellyWikiSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Bean(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = bean_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "bean." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set JELLY_BELLY_WIKI_TEST_BEAN_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $bean_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.bean")));
        $bean_ref01_data = null;
        if (count($bean_ref01_data_raw) > 0) {
            $bean_ref01_data = Helpers::to_map($bean_ref01_data_raw[0][1]);
        }

        // LIST
        $bean_ref01_ent = $client->Bean(null);
        $bean_ref01_match = [];

        $bean_ref01_list_result = $bean_ref01_ent->list($bean_ref01_match, null);
        $this->assertIsArray($bean_ref01_list_result);

        // LOAD
        $bean_ref01_match_dt0 = [
            "id" => $bean_ref01_data["id"],
        ];
        $bean_ref01_data_dt0_loaded = $bean_ref01_ent->load($bean_ref01_match_dt0, null);
        $bean_ref01_data_dt0_load_result = Helpers::to_map(is_object($bean_ref01_data_dt0_loaded) && method_exists($bean_ref01_data_dt0_loaded, 'data_get') ? $bean_ref01_data_dt0_loaded->data_get() : $bean_ref01_data_dt0_loaded);
        $this->assertNotNull($bean_ref01_data_dt0_load_result);
        $this->assertEquals($bean_ref01_data_dt0_load_result["id"], $bean_ref01_data["id"]);

    }
}

function bean_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/bean/BeanTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = JellyBellyWikiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["bean01", "bean02", "bean03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("JELLY_BELLY_WIKI_TEST_BEAN_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "JELLY_BELLY_WIKI_TEST_BEAN_ENTID" => $idmap,
        "JELLY_BELLY_WIKI_TEST_LIVE" => "FALSE",
        "JELLY_BELLY_WIKI_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["JELLY_BELLY_WIKI_TEST_BEAN_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["JELLY_BELLY_WIKI_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        $client = new JellyBellyWikiSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["JELLY_BELLY_WIKI_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["JELLY_BELLY_WIKI_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
