<?php
declare(strict_types=1);

// JellyBellyWiki SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class JellyBellyWikiMakeContext
{
    public static function call(array $ctxmap, ?JellyBellyWikiContext $basectx): JellyBellyWikiContext
    {
        return new JellyBellyWikiContext($ctxmap, $basectx);
    }
}
