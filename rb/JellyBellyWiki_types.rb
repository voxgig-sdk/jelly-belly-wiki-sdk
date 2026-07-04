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
# @!attribute [rw] background_color
#   @return [String, nil]
#
# @!attribute [rw] bean_id
#   @return [String, nil]
#
# @!attribute [rw] color_group
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] flavor_name
#   @return [String, nil]
#
# @!attribute [rw] gluten_free
#   @return [Boolean, nil]
#
# @!attribute [rw] group_name
#   @return [Array, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] ingredient
#   @return [Array, nil]
#
# @!attribute [rw] kosher
#   @return [Boolean, nil]
#
# @!attribute [rw] sugar_free
#   @return [Boolean, nil]
Bean = Struct.new(
  :background_color,
  :bean_id,
  :color_group,
  :description,
  :flavor_name,
  :gluten_free,
  :group_name,
  :image_url,
  :ingredient,
  :kosher,
  :sugar_free,
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

# Match filter for Bean#list (any subset of Bean fields).
#
# @!attribute [rw] background_color
#   @return [String, nil]
#
# @!attribute [rw] bean_id
#   @return [String, nil]
#
# @!attribute [rw] color_group
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] flavor_name
#   @return [String, nil]
#
# @!attribute [rw] gluten_free
#   @return [Boolean, nil]
#
# @!attribute [rw] group_name
#   @return [Array, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] ingredient
#   @return [Array, nil]
#
# @!attribute [rw] kosher
#   @return [Boolean, nil]
#
# @!attribute [rw] sugar_free
#   @return [Boolean, nil]
BeanListMatch = Struct.new(
  :background_color,
  :bean_id,
  :color_group,
  :description,
  :flavor_name,
  :gluten_free,
  :group_name,
  :image_url,
  :ingredient,
  :kosher,
  :sugar_free,
  keyword_init: true
)

# Combination entity data model.
#
# @!attribute [rw] bean
#   @return [Array, nil]
#
# @!attribute [rw] combination_id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
Combination = Struct.new(
  :bean,
  :combination_id,
  :name,
  :tag,
  keyword_init: true
)

# Match filter for Combination#list (any subset of Combination fields).
#
# @!attribute [rw] bean
#   @return [Array, nil]
#
# @!attribute [rw] combination_id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
CombinationListMatch = Struct.new(
  :bean,
  :combination_id,
  :name,
  :tag,
  keyword_init: true
)

# Fact entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] fact_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Fact = Struct.new(
  :description,
  :fact_id,
  :title,
  keyword_init: true
)

# Match filter for Fact#list (any subset of Fact fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] fact_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
FactListMatch = Struct.new(
  :description,
  :fact_id,
  :title,
  keyword_init: true
)

# History entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] history_id
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
History = Struct.new(
  :description,
  :history_id,
  :year,
  keyword_init: true
)

# Match filter for History#list (any subset of History fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] history_id
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
HistoryListMatch = Struct.new(
  :description,
  :history_id,
  :year,
  keyword_init: true
)

# Recipe entity data model.
#
# @!attribute [rw] cook_time
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] direction
#   @return [Array, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] ingredient
#   @return [Array, nil]
#
# @!attribute [rw] making_amount
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] prep_time
#   @return [String, nil]
#
# @!attribute [rw] recipe_id
#   @return [String, nil]
#
# @!attribute [rw] total_time
#   @return [String, nil]
Recipe = Struct.new(
  :cook_time,
  :description,
  :direction,
  :image_url,
  :ingredient,
  :making_amount,
  :name,
  :prep_time,
  :recipe_id,
  :total_time,
  keyword_init: true
)

# Match filter for Recipe#list (any subset of Recipe fields).
#
# @!attribute [rw] cook_time
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] direction
#   @return [Array, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] ingredient
#   @return [Array, nil]
#
# @!attribute [rw] making_amount
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] prep_time
#   @return [String, nil]
#
# @!attribute [rw] recipe_id
#   @return [String, nil]
#
# @!attribute [rw] total_time
#   @return [String, nil]
RecipeListMatch = Struct.new(
  :cook_time,
  :description,
  :direction,
  :image_url,
  :ingredient,
  :making_amount,
  :name,
  :prep_time,
  :recipe_id,
  :total_time,
  keyword_init: true
)

