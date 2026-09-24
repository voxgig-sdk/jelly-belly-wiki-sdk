"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JellyBellyWikiError = void 0;
class JellyBellyWikiError extends Error {
    isJellyBellyWikiError = true;
    sdk = 'JellyBellyWiki';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.JellyBellyWikiError = JellyBellyWikiError;
//# sourceMappingURL=JellyBellyWikiError.js.map