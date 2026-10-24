<?php
declare(strict_types=1);

// Bean entity test

require_once __DIR__ . '/../jellybellywiki_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BeanEntityTestFailHook extends JellyBellyWikiBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(JellyBellyWikiContext $ctx, array $options): void
    {
    }

    public function PreSpec(JellyBellyWikiContext $ctx): void
    {
        throw new \RuntimeException('bean hook failed');
    }

    public function PreUnexpected(JellyBellyWikiContext $ctx): void
    {
        $this->unexpected++;
    }
}

class BeanEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

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

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(JellyBellyWikiSDK::test($offline, null)->Bean(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(JellyBellyWikiSDK::test($offline, null)->Bean(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = JellyBellyWikiConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = JellyBellyWikiSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->Bean(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(JellyBellyWikiSDK::test(null, null)->Bean(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new BeanEntityTestFailHook();
        $client = new JellyBellyWikiSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->Bean(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->Bean(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = JellyBellyWikiConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new JellyBellyWikiSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('bean transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->Bean(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(JellyBellyWikiError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->Bean(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate_list_response(): void
    {
        $cfg = JellyBellyWikiConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $opts = ["feature" => ["validate" => ["active" => true, "request" => false, "response" => true]]];
        $listed = JellyBellyWikiSDK::test(['entity' => ['bean' => ['v1' => []]]], $opts)->Bean(null)->list(null, null);
        $this->assertSame(['v1'], array_map(fn($ent) => $ent->data_get()['id'] ?? null, $listed));
        $err = null;
        try {
            JellyBellyWikiSDK::test(['entity' => ['bean' => ['v1' => ['backgroundColor' => 1]]]], $opts)->Bean(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_validate(): void
    {
        $cfg = JellyBellyWikiConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = JellyBellyWikiSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Bean(null)->list(["limit" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
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
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            Runner::live_existing($setup, self::LIVE_STRICT, "bean",
                fn() => $client->Bean(null)->list([], null));
        }

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

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
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
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new JellyBellyWikiSDK(Helpers::to_map($merged_opts) ?? []);
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
