# Typed models for the JellyBellyWiki SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Bean:
    background_color: Optional[str] = None
    bean_id: Optional[str] = None
    color_group: Optional[str] = None
    description: Optional[str] = None
    flavor_name: Optional[str] = None
    gluten_free: Optional[bool] = None
    group_name: Optional[list] = None
    image_url: Optional[str] = None
    ingredient: Optional[list] = None
    kosher: Optional[bool] = None
    sugar_free: Optional[bool] = None


@dataclass
class BeanLoadMatch:
    id: str


@dataclass
class BeanListMatch:
    background_color: Optional[str] = None
    bean_id: Optional[str] = None
    color_group: Optional[str] = None
    description: Optional[str] = None
    flavor_name: Optional[str] = None
    gluten_free: Optional[bool] = None
    group_name: Optional[list] = None
    image_url: Optional[str] = None
    ingredient: Optional[list] = None
    kosher: Optional[bool] = None
    sugar_free: Optional[bool] = None


@dataclass
class Combination:
    bean: Optional[list] = None
    combination_id: Optional[str] = None
    name: Optional[str] = None
    tag: Optional[list] = None


@dataclass
class CombinationListMatch:
    bean: Optional[list] = None
    combination_id: Optional[str] = None
    name: Optional[str] = None
    tag: Optional[list] = None


@dataclass
class Fact:
    description: Optional[str] = None
    fact_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class FactListMatch:
    description: Optional[str] = None
    fact_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class History:
    description: Optional[str] = None
    history_id: Optional[str] = None
    year: Optional[int] = None


@dataclass
class HistoryListMatch:
    description: Optional[str] = None
    history_id: Optional[str] = None
    year: Optional[int] = None


@dataclass
class Recipe:
    cook_time: Optional[str] = None
    description: Optional[str] = None
    direction: Optional[list] = None
    image_url: Optional[str] = None
    ingredient: Optional[list] = None
    making_amount: Optional[str] = None
    name: Optional[str] = None
    prep_time: Optional[str] = None
    recipe_id: Optional[str] = None
    total_time: Optional[str] = None


@dataclass
class RecipeListMatch:
    cook_time: Optional[str] = None
    description: Optional[str] = None
    direction: Optional[list] = None
    image_url: Optional[str] = None
    ingredient: Optional[list] = None
    making_amount: Optional[str] = None
    name: Optional[str] = None
    prep_time: Optional[str] = None
    recipe_id: Optional[str] = None
    total_time: Optional[str] = None

