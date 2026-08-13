# frozen_string_literal: true

# Typed models for the JellyBellyWiki SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Bean entity data model.
#
# @!attribute [rw] backgroundColor
#   @return [String, nil]
#
# @!attribute [rw] beanId
#   @return [String, nil]
#
# @!attribute [rw] colorGroup
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] flavorName
#   @return [String, nil]
#
# @!attribute [rw] glutenFree
#   @return [Boolean, nil]
#
# @!attribute [rw] groupName
#   @return [Array, nil]
#
# @!attribute [rw] imageUrl
#   @return [String, nil]
#
# @!attribute [rw] ingredients
#   @return [Array, nil]
#
# @!attribute [rw] kosher
#   @return [Boolean, nil]
#
# @!attribute [rw] sugarFree
#   @return [Boolean, nil]
Bean = Struct.new(
  :backgroundColor,
  :beanId,
  :colorGroup,
  :description,
  :flavorName,
  :glutenFree,
  :groupName,
  :imageUrl,
  :ingredients,
  :kosher,
  :sugarFree,
  keyword_init: true
)

# Request payload for Bean#load.
#
# @!attribute [rw] id
#   @return [String]
BeanLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Bean#list.
#
# @!attribute [rw] backgroundColor
#   @return [String, nil]
#
# @!attribute [rw] beanId
#   @return [String, nil]
#
# @!attribute [rw] colorGroup
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] flavorName
#   @return [String, nil]
#
# @!attribute [rw] glutenFree
#   @return [Boolean, nil]
#
# @!attribute [rw] groupName
#   @return [Array, nil]
#
# @!attribute [rw] imageUrl
#   @return [String, nil]
#
# @!attribute [rw] ingredients
#   @return [Array, nil]
#
# @!attribute [rw] kosher
#   @return [Boolean, nil]
#
# @!attribute [rw] sugarFree
#   @return [Boolean, nil]
BeanListMatch = Struct.new(
  :backgroundColor,
  :beanId,
  :colorGroup,
  :description,
  :flavorName,
  :glutenFree,
  :groupName,
  :imageUrl,
  :ingredients,
  :kosher,
  :sugarFree,
  keyword_init: true
)

# Combination entity data model.
#
# @!attribute [rw] beans
#   @return [Array, nil]
#
# @!attribute [rw] combinationId
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
Combination = Struct.new(
  :beans,
  :combinationId,
  :name,
  :tag,
  keyword_init: true
)

# Request payload for Combination#list.
#
# @!attribute [rw] beans
#   @return [Array, nil]
#
# @!attribute [rw] combinationId
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
CombinationListMatch = Struct.new(
  :beans,
  :combinationId,
  :name,
  :tag,
  keyword_init: true
)

# Fact entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] factId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Fact = Struct.new(
  :description,
  :factId,
  :title,
  keyword_init: true
)

# Request payload for Fact#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] factId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
FactListMatch = Struct.new(
  :description,
  :factId,
  :title,
  keyword_init: true
)

# History entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] historyId
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
History = Struct.new(
  :description,
  :historyId,
  :year,
  keyword_init: true
)

# Request payload for History#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] historyId
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
HistoryListMatch = Struct.new(
  :description,
  :historyId,
  :year,
  keyword_init: true
)

# Recipe entity data model.
#
# @!attribute [rw] cookTime
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] directions
#   @return [Array, nil]
#
# @!attribute [rw] imageUrl
#   @return [String, nil]
#
# @!attribute [rw] ingredients
#   @return [Array, nil]
#
# @!attribute [rw] makingAmount
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] prepTime
#   @return [String, nil]
#
# @!attribute [rw] recipeId
#   @return [String, nil]
#
# @!attribute [rw] totalTime
#   @return [String, nil]
Recipe = Struct.new(
  :cookTime,
  :description,
  :directions,
  :imageUrl,
  :ingredients,
  :makingAmount,
  :name,
  :prepTime,
  :recipeId,
  :totalTime,
  keyword_init: true
)

# Request payload for Recipe#list.
#
# @!attribute [rw] cookTime
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] directions
#   @return [Array, nil]
#
# @!attribute [rw] imageUrl
#   @return [String, nil]
#
# @!attribute [rw] ingredients
#   @return [Array, nil]
#
# @!attribute [rw] makingAmount
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] prepTime
#   @return [String, nil]
#
# @!attribute [rw] recipeId
#   @return [String, nil]
#
# @!attribute [rw] totalTime
#   @return [String, nil]
RecipeListMatch = Struct.new(
  :cookTime,
  :description,
  :directions,
  :imageUrl,
  :ingredients,
  :makingAmount,
  :name,
  :prepTime,
  :recipeId,
  :totalTime,
  keyword_init: true
)

