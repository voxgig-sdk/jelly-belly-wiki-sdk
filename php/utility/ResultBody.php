<?php
declare(strict_types=1);

// JellyBellyWiki SDK utility: result_body

class JellyBellyWikiResultBody
{
    public static function call(JellyBellyWikiContext $ctx): ?JellyBellyWikiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
