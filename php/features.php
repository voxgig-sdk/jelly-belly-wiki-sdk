<?php
declare(strict_types=1);

// JellyBellyWiki SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class JellyBellyWikiFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new JellyBellyWikiBaseFeature();
            case "test":
                return new JellyBellyWikiTestFeature();
            default:
                return new JellyBellyWikiBaseFeature();
        }
    }
}
