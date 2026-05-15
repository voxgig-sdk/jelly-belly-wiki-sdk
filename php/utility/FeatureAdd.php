<?php
declare(strict_types=1);

// JellyBellyWiki SDK utility: feature_add

class JellyBellyWikiFeatureAdd
{
    public static function call(JellyBellyWikiContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
