<?php
declare(strict_types=1);

// Typed models for the JellyBellyWiki SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Bean entity data model. */
class Bean
{
    public ?string $backgroundColor = null;
    public ?string $beanId = null;
    public ?string $colorGroup = null;
    public ?string $description = null;
    public ?string $flavorName = null;
    public ?bool $glutenFree = null;
    public ?array $groupName = null;
    public ?string $id = null;
    public ?string $imageUrl = null;
    public ?array $ingredients = null;
    public ?bool $kosher = null;
    public ?bool $sugarFree = null;
}

/** Request payload for Bean#load. */
class BeanLoadMatch
{
    public string $id;
}

/** Request payload for Bean#list. */
class BeanListMatch
{
    public ?int $limit = null;
    public ?int $page = null;
}

/** Combination entity data model. */
class Combination
{
    public ?array $beans = null;
    public ?string $combinationId = null;
    public ?string $name = null;
    public ?array $tag = null;
}

/** Request payload for Combination#list. */
class CombinationListMatch
{
    public ?int $limit = null;
    public ?int $page = null;
}

/** Fact entity data model. */
class Fact
{
    public ?string $description = null;
    public ?string $factId = null;
    public ?string $title = null;
}

/** Request payload for Fact#list. */
class FactListMatch
{
    public ?int $limit = null;
    public ?int $page = null;
}

/** History entity data model. */
class History
{
    public ?string $description = null;
    public ?string $historyId = null;
    public ?int $year = null;
}

/** Request payload for History#list. */
class HistoryListMatch
{
    public ?string $description = null;
    public ?string $historyId = null;
    public ?int $year = null;
}

/** Recipe entity data model. */
class Recipe
{
    public ?string $cookTime = null;
    public ?string $description = null;
    public ?array $directions = null;
    public ?string $imageUrl = null;
    public ?array $ingredients = null;
    public ?string $makingAmount = null;
    public ?string $name = null;
    public ?string $prepTime = null;
    public ?string $recipeId = null;
    public ?string $totalTime = null;
}

/** Request payload for Recipe#list. */
class RecipeListMatch
{
    public ?int $limit = null;
    public ?int $page = null;
}

