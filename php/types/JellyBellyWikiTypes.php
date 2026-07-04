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
    public ?string $background_color = null;
    public ?string $bean_id = null;
    public ?string $color_group = null;
    public ?string $description = null;
    public ?string $flavor_name = null;
    public ?bool $gluten_free = null;
    public ?array $group_name = null;
    public ?string $image_url = null;
    public ?array $ingredient = null;
    public ?bool $kosher = null;
    public ?bool $sugar_free = null;
}

/** Request payload for Bean#load. */
class BeanLoadMatch
{
    public string $id;
}

/** Match filter for Bean#list (any subset of Bean fields). */
class BeanListMatch
{
    public ?string $background_color = null;
    public ?string $bean_id = null;
    public ?string $color_group = null;
    public ?string $description = null;
    public ?string $flavor_name = null;
    public ?bool $gluten_free = null;
    public ?array $group_name = null;
    public ?string $image_url = null;
    public ?array $ingredient = null;
    public ?bool $kosher = null;
    public ?bool $sugar_free = null;
}

/** Combination entity data model. */
class Combination
{
    public ?array $bean = null;
    public ?string $combination_id = null;
    public ?string $name = null;
    public ?array $tag = null;
}

/** Match filter for Combination#list (any subset of Combination fields). */
class CombinationListMatch
{
    public ?array $bean = null;
    public ?string $combination_id = null;
    public ?string $name = null;
    public ?array $tag = null;
}

/** Fact entity data model. */
class Fact
{
    public ?string $description = null;
    public ?string $fact_id = null;
    public ?string $title = null;
}

/** Match filter for Fact#list (any subset of Fact fields). */
class FactListMatch
{
    public ?string $description = null;
    public ?string $fact_id = null;
    public ?string $title = null;
}

/** History entity data model. */
class History
{
    public ?string $description = null;
    public ?string $history_id = null;
    public ?int $year = null;
}

/** Match filter for History#list (any subset of History fields). */
class HistoryListMatch
{
    public ?string $description = null;
    public ?string $history_id = null;
    public ?int $year = null;
}

/** Recipe entity data model. */
class Recipe
{
    public ?string $cook_time = null;
    public ?string $description = null;
    public ?array $direction = null;
    public ?string $image_url = null;
    public ?array $ingredient = null;
    public ?string $making_amount = null;
    public ?string $name = null;
    public ?string $prep_time = null;
    public ?string $recipe_id = null;
    public ?string $total_time = null;
}

/** Match filter for Recipe#list (any subset of Recipe fields). */
class RecipeListMatch
{
    public ?string $cook_time = null;
    public ?string $description = null;
    public ?array $direction = null;
    public ?string $image_url = null;
    public ?array $ingredient = null;
    public ?string $making_amount = null;
    public ?string $name = null;
    public ?string $prep_time = null;
    public ?string $recipe_id = null;
    public ?string $total_time = null;
}

