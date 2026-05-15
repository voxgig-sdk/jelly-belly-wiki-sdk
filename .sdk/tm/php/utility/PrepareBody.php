<?php
declare(strict_types=1);

// JellyBellyWiki SDK utility: prepare_body

class JellyBellyWikiPrepareBody
{
    public static function call(JellyBellyWikiContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
