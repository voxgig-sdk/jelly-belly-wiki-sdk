<?php
declare(strict_types=1);

// JellyBellyWiki SDK utility: result_headers

class JellyBellyWikiResultHeaders
{
    public static function call(JellyBellyWikiContext $ctx): ?JellyBellyWikiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
