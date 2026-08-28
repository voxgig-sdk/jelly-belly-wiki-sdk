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
    backgroundColor: str
    beanId: str
    colorGroup: str
    description: str
    flavorName: str
    glutenFree: bool
    groupName: list
    id: str
    imageUrl: str
    ingredients: list
    kosher: bool
    sugarFree: bool


class BeanLoadMatch(TypedDict):
    id: str


class BeanListMatch(TypedDict, total=False):
    limit: int
    page: int


class Combination(TypedDict, total=False):
    beans: list
    combinationId: str
    name: str
    tag: list


class CombinationListMatch(TypedDict, total=False):
    limit: int
    page: int


class Fact(TypedDict, total=False):
    description: str
    factId: str
    title: str


class FactListMatch(TypedDict, total=False):
    limit: int
    page: int


class History(TypedDict, total=False):
    description: str
    historyId: str
    year: int


class HistoryListMatch(TypedDict, total=False):
    description: str
    historyId: str
    year: int


class Recipe(TypedDict, total=False):
    cookTime: str
    description: str
    directions: list
    imageUrl: str
    ingredients: list
    makingAmount: str
    name: str
    prepTime: str
    recipeId: str
    totalTime: str


class RecipeListMatch(TypedDict, total=False):
    limit: int
    page: int
