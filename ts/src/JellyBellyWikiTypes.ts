// Typed models for the JellyBellyWiki SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bean {
  background_color?: string
  bean_id?: string
  color_group?: string
  description?: string
  flavor_name?: string
  gluten_free?: boolean
  group_name?: any[]
  image_url?: string
  ingredient?: any[]
  kosher?: boolean
  sugar_free?: boolean
}

export interface BeanLoadMatch {
  id: string
}

export interface BeanListMatch {
  background_color?: string
  bean_id?: string
  color_group?: string
  description?: string
  flavor_name?: string
  gluten_free?: boolean
  group_name?: any[]
  image_url?: string
  ingredient?: any[]
  kosher?: boolean
  sugar_free?: boolean
}

export interface Combination {
  bean?: any[]
  combination_id?: string
  name?: string
  tag?: any[]
}

export interface CombinationListMatch {
  bean?: any[]
  combination_id?: string
  name?: string
  tag?: any[]
}

export interface Fact {
  description?: string
  fact_id?: string
  title?: string
}

export interface FactListMatch {
  description?: string
  fact_id?: string
  title?: string
}

export interface History {
  description?: string
  history_id?: string
  year?: number
}

export interface HistoryListMatch {
  description?: string
  history_id?: string
  year?: number
}

export interface Recipe {
  cook_time?: string
  description?: string
  direction?: any[]
  image_url?: string
  ingredient?: any[]
  making_amount?: string
  name?: string
  prep_time?: string
  recipe_id?: string
  total_time?: string
}

export interface RecipeListMatch {
  cook_time?: string
  description?: string
  direction?: any[]
  image_url?: string
  ingredient?: any[]
  making_amount?: string
  name?: string
  prep_time?: string
  recipe_id?: string
  total_time?: string
}

