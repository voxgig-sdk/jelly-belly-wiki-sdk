<?php
declare(strict_types=1);

// JellyBellyWiki SDK utility: transform_request

require_once __DIR__ . '/../core/Helpers.php';

class JellyBellyWikiTransformRequest
{
    public static function call(JellyBellyWikiContext $ctx): mixed
    {
        $spec = $ctx->spec;
        $point = $ctx->point;
        if ($spec) {
            $spec->step = 'reqform';
        }
        $transform = JellyBellyWikiHelpers::to_map(\Voxgig\Struct\Struct::getprop($point, 'transform'));
        if (!$transform) {
            return $ctx->reqdata;
        }
        $reqform = \Voxgig\Struct\Struct::getprop($transform, 'req');
        if (!$reqform) {
            return $ctx->reqdata;
        }
        return \Voxgig\Struct\Struct::transform(['reqdata' => $ctx->reqdata], $reqform);
    }
}
