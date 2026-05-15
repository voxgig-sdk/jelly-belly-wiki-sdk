<?php
declare(strict_types=1);

// JellyBellyWiki SDK exists test

require_once __DIR__ . '/../jellybellywiki_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = JellyBellyWikiSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
