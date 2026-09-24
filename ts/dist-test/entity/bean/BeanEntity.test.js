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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BeanEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when JELLY_BELLY_WIKI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('JELLY_BELLY_WIKI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.JellyBellyWikiSDK.test();
        const ent = testsdk.Bean();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.JELLY_BELLY_WIKI_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bean.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "backgroundColor": { "a": true, "h": "Background Color", "n": "backgroundColor", "r": false, "sh": "Hex color code for the bean's background color", "t": "`$STRING`", "key$": "backgroundColor", "index$": 0 }, "beanId": { "a": true, "h": "Bean Id", "n": "beanId", "r": false, "sh": "Unique identifier for the bean", "t": "`$STRING`", "key$": "beanId", "index$": 1 }, "colorGroup": { "a": true, "h": "Color Group", "n": "colorGroup", "r": false, "sh": "Color category of the bean", "t": "`$STRING`", "key$": "colorGroup", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Detailed description of the bean flavor", "t": "`$STRING`", "key$": "description", "index$": 3 }, "flavorName": { "a": true, "h": "Flavor Name", "n": "flavorName", "r": false, "sh": "Name of the flavor", "t": "`$STRING`", "key$": "flavorName", "index$": 4 }, "glutenFree": { "a": true, "h": "Gluten Free", "n": "glutenFree", "r": false, "sh": "Indicates if the bean is gluten-free", "t": "`$BOOLEAN`", "key$": "glutenFree", "index$": 5 }, "groupName": { "a": true, "h": "Group Name", "n": "groupName", "r": false, "sh": "Group or category names the bean belongs to", "t": "`$ARRAY`", "key$": "groupName", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 7 }, "imageUrl": { "a": true, "fo": "uri", "h": "Image Url", "n": "imageUrl", "r": false, "sh": "URL to the bean image", "t": "`$STRING`", "key$": "imageUrl", "index$": 8 }, "ingredients": { "a": true, "h": "Ingredients", "n": "ingredients", "r": false, "sh": "List of ingredients", "t": "`$ARRAY`", "key$": "ingredients", "index$": 9 }, "kosher": { "a": true, "h": "Kosher", "n": "kosher", "r": false, "sh": "Indicates if the bean is kosher certified", "t": "`$BOOLEAN`", "key$": "kosher", "index$": 10 }, "sugarFree": { "a": true, "h": "Sugar Free", "n": "sugarFree", "r": false, "sh": "Indicates if the bean is sugar-free", "t": "`$BOOLEAN`", "key$": "sugarFree", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "bean", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /beans", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/beans", "q": { "exist": ["limit", "page"] }, "r": {}, "s": [{ "lit": "beans" }], "t": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /beans/{beanId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "bean_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/beans/{beanId}", "q": { "exist": ["id"] }, "r": { "param": { "beanId": "id" } }, "s": [{ "lit": "beans" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "bean", "name__orig": "bean", "Name": "Bean", "name_": "bean", "name-": "bean", "NAME": "BEAN", "index$": 0 }, { "active": true, "entity": "bean", "key$": "BasicBeanFlow", "kind": "basic", "name": "BasicBeanFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "bean_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "bean_ref01", "srcdatavar": "bean_ref01_data", "suffix": "_dt0" }, "m": { "id": "bean01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-bean_ref01" } }], "index$": 1 }] }, 'Bean', { "GET /beans": { "protocol": "http", "operationId": "getBeans", "responses": { "200": { "description": "Successful response with a list of Jelly Belly beans", "content": { "application/json": { "schema": { "type": "object", "properties": { "items": { "items": { "properties": { "backgroundColor": { "description": "Hex color code for the bean's background color", "type": "string", "key$": "backgroundColor" }, "beanId": { "description": "Unique identifier for the bean", "type": "string", "key$": "beanId" }, "colorGroup": { "description": "Color category of the bean", "type": "string", "key$": "colorGroup" }, "description": { "description": "Detailed description of the bean flavor", "type": "string", "key$": "description" }, "flavorName": { "description": "Name of the flavor", "type": "string", "key$": "flavorName" }, "glutenFree": { "description": "Indicates if the bean is gluten-free", "type": "boolean", "key$": "glutenFree" }, "groupName": { "description": "Group or category names the bean belongs to", "items": { "type": "string" }, "type": "array", "key$": "groupName" }, "imageUrl": { "description": "URL to the bean image", "format": "uri", "type": "string", "key$": "imageUrl" }, "ingredients": { "description": "List of ingredients", "items": { "type": "string" }, "type": "array", "key$": "ingredients" }, "kosher": { "description": "Indicates if the bean is kosher certified", "type": "boolean", "key$": "kosher" }, "sugarFree": { "description": "Indicates if the bean is sugar-free", "type": "boolean", "key$": "sugarFree" } }, "type": "object", "x-ref": "#/components/schemas/Bean", "index$": 0 }, "key$": "items", "type": "array" }, "totalCount": { "description": "Total number of beans available", "key$": "totalCount", "type": "integer" }, "currentPage": { "description": "Current page number", "key$": "currentPage", "type": "integer" }, "pageSize": { "description": "Number of items per page", "key$": "pageSize", "type": "integer" } } } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 0 }, { "name": "limit", "in": "query", "description": "Number of items per page", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 10 }, "index$": 1 }], "securitySource": "unspecified" }, "GET /beans/{beanId}": { "protocol": "http", "operationId": "getBeanById", "responses": { "200": { "description": "Successful response with bean details", "content": { "application/json": { "schema": { "type": "object", "properties": { "beanId": { "description": "Unique identifier for the bean", "type": "string", "key$": "beanId" }, "groupName": { "description": "Group or category names the bean belongs to", "items": { "type": "string" }, "type": "array", "key$": "groupName" }, "flavorName": { "description": "Name of the flavor", "type": "string", "key$": "flavorName" }, "description": { "description": "Detailed description of the bean flavor", "type": "string", "key$": "description" }, "colorGroup": { "description": "Color category of the bean", "type": "string", "key$": "colorGroup" }, "backgroundColor": { "description": "Hex color code for the bean's background color", "type": "string", "key$": "backgroundColor" }, "imageUrl": { "description": "URL to the bean image", "format": "uri", "type": "string", "key$": "imageUrl" }, "ingredients": { "description": "List of ingredients", "items": { "type": "string" }, "type": "array", "key$": "ingredients" }, "glutenFree": { "description": "Indicates if the bean is gluten-free", "type": "boolean", "key$": "glutenFree" }, "sugarFree": { "description": "Indicates if the bean is sugar-free", "type": "boolean", "key$": "sugarFree" }, "kosher": { "description": "Indicates if the bean is kosher certified", "type": "boolean", "key$": "kosher" } }, "x-ref": "#/components/schemas/Bean", "index$": 0 } } } }, "404": { "description": "Bean not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "beanId", "in": "path", "description": "Unique identifier of the Jelly Belly bean", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let bean_ref01_data = Object.values(setup.data.existing.bean)[0];
        // LIST
        const bean_ref01_ent = client.Bean();
        const bean_ref01_match = {};
        const bean_ref01_list = (await bean_ref01_ent.list(bean_ref01_match)).map((e) => e.data());
        // LOAD
        const bean_ref01_match_dt0 = {};
        bean_ref01_match_dt0.id = bean_ref01_data.id;
        const bean_ref01_data_dt0 = (await bean_ref01_ent.load(bean_ref01_match_dt0)).data();
        (0, node_assert_1.default)(bean_ref01_data_dt0.id === bean_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bean/BeanTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.JellyBellyWikiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bean01', 'bean02', 'bean03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'JELLY_BELLY_WIKI_TEST_BEAN_ENTID': idmap,
        'JELLY_BELLY_WIKI_TEST_LIVE': 'FALSE',
        'JELLY_BELLY_WIKI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['JELLY_BELLY_WIKI_TEST_BEAN_ENTID'];
    const live = 'TRUE' === env.JELLY_BELLY_WIKI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['JELLY_BELLY_WIKI_TEST_BEAN_ENTID'];
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
//# sourceMappingURL=BeanEntity.test.js.map