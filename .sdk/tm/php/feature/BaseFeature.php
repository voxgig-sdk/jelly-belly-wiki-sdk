<?php
declare(strict_types=1);

// JellyBellyWiki SDK base feature

class JellyBellyWikiBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(JellyBellyWikiContext $ctx, array $options): void {}
    public function PostConstruct(JellyBellyWikiContext $ctx): void {}
    public function PostConstructEntity(JellyBellyWikiContext $ctx): void {}
    public function SetData(JellyBellyWikiContext $ctx): void {}
    public function GetData(JellyBellyWikiContext $ctx): void {}
    public function GetMatch(JellyBellyWikiContext $ctx): void {}
    public function SetMatch(JellyBellyWikiContext $ctx): void {}
    public function PrePoint(JellyBellyWikiContext $ctx): void {}
    public function PreSpec(JellyBellyWikiContext $ctx): void {}
    public function PreRequest(JellyBellyWikiContext $ctx): void {}
    public function PreResponse(JellyBellyWikiContext $ctx): void {}
    public function PreResult(JellyBellyWikiContext $ctx): void {}
    public function PreDone(JellyBellyWikiContext $ctx): void {}
    public function PreUnexpected(JellyBellyWikiContext $ctx): void {}
}
