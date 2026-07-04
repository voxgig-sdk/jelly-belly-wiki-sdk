# Typed models for the JellyBellyWiki SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Bean(TypedDict, total=False):
    background_color: str
    bean_id: str
    color_group: str
    description: str
    flavor_name: str
    gluten_free: bool
    group_name: list
    image_url: str
    ingredient: list
    kosher: bool
    sugar_free: bool


class BeanLoadMatch(TypedDict):
    id: str


class BeanListMatch(TypedDict, total=False):
    background_color: str
    bean_id: str
    color_group: str
    description: str
    flavor_name: str
    gluten_free: bool
    group_name: list
    image_url: str
    ingredient: list
    kosher: bool
    sugar_free: bool


class Combination(TypedDict, total=False):
    bean: list
    combination_id: str
    name: str
    tag: list


class CombinationListMatch(TypedDict, total=False):
    bean: list
    combination_id: str
    name: str
    tag: list


class Fact(TypedDict, total=False):
    description: str
    fact_id: str
    title: str


class FactListMatch(TypedDict, total=False):
    description: str
    fact_id: str
    title: str


class History(TypedDict, total=False):
    description: str
    history_id: str
    year: int


class HistoryListMatch(TypedDict, total=False):
    description: str
    history_id: str
    year: int


class Recipe(TypedDict, total=False):
    cook_time: str
    description: str
    direction: list
    image_url: str
    ingredient: list
    making_amount: str
    name: str
    prep_time: str
    recipe_id: str
    total_time: str


class RecipeListMatch(TypedDict, total=False):
    cook_time: str
    description: str
    direction: list
    image_url: str
    ingredient: list
    making_amount: str
    name: str
    prep_time: str
    recipe_id: str
    total_time: str
