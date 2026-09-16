"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RecipeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when JELLY_BELLY_WIKI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('JELLY_BELLY_WIKI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.JellyBellyWikiSDK.test();
        const ent = testsdk.Recipe();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.JELLY_BELLY_WIKI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'recipe.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "cookTime", "req": false, "short": "Cooking time", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "description", "req": false, "short": "Description of the recipe", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "directions", "req": false, "short": "Step-by-step directions", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "format": "uri", "name": "imageUrl", "req": false, "short": "URL to the recipe image", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "ingredients", "req": false, "short": "List of ingredients", "type": "`$ARRAY`", "index$": 4 }, { "active": true, "name": "makingAmount", "req": false, "short": "Amount the recipe makes", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "name", "req": false, "short": "Name of the recipe", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "prepTime", "req": false, "short": "Preparation time", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "recipeId", "req": false, "short": "Unique identifier for the recipe", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "totalTime", "req": false, "short": "Total time required", "type": "`$STRING`", "index$": 9 }], "name": "recipe", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 10, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /recipes", "json": "{\"operationId\":\"getRecipes\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"currentPage\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"items\":{\"items\":{\"properties\":{\"cookTime\":{\"description\":\"Cooking time\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the recipe\",\"type\":\"string\"},\"directions\":{\"description\":\"Step-by-step directions\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"imageUrl\":{\"description\":\"URL to the recipe image\",\"format\":\"uri\",\"type\":\"string\"},\"ingredients\":{\"description\":\"List of ingredients\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"makingAmount\":{\"description\":\"Amount the recipe makes\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the recipe\",\"type\":\"string\"},\"prepTime\":{\"description\":\"Preparation time\",\"type\":\"string\"},\"recipeId\":{\"description\":\"Unique identifier for the recipe\",\"type\":\"string\"},\"totalTime\":{\"description\":\"Total time required\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"pageSize\":{\"description\":\"Number of items per page\",\"type\":\"integer\"},\"totalCount\":{\"description\":\"Total number of recipes available\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with a list of recipes\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/recipes", "segments": [{ "lit": "recipes" }], "select": { "exist": ["limit", "page"] }, "transform": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "recipe", "name__orig": "recipe", "Name": "Recipe", "name_": "recipe", "name-": "recipe", "NAME": "RECIPE", "index$": 4 }, { "active": true, "entity": "recipe", "key$": "BasicRecipeFlow", "kind": "basic", "name": "BasicRecipeFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "recipe_ref01" } }], "index$": 0 }] }, 'Recipe');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let recipe_ref01_data = Object.values(setup.data.existing.recipe)[0];
        // LIST
        const recipe_ref01_ent = client.Recipe();
        const recipe_ref01_match = {};
        const recipe_ref01_list = (await recipe_ref01_ent.list(recipe_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/recipe/RecipeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.JellyBellyWikiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['recipe01', 'recipe02', 'recipe03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'JELLY_BELLY_WIKI_TEST_RECIPE_ENTID': idmap,
        'JELLY_BELLY_WIKI_TEST_LIVE': 'FALSE',
        'JELLY_BELLY_WIKI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['JELLY_BELLY_WIKI_TEST_RECIPE_ENTID'];
    const live = 'TRUE' === env.JELLY_BELLY_WIKI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['JELLY_BELLY_WIKI_TEST_RECIPE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.JellyBellyWikiSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.JELLY_BELLY_WIKI_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=RecipeEntity.test.js.map