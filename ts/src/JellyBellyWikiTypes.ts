// Typed models for the JellyBellyWiki SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bean {
  backgroundColor?: string
  beanId?: string
  colorGroup?: string
  description?: string
  flavorName?: string
  glutenFree?: boolean
  groupName?: any[]
  id?: string
  imageUrl?: string
  ingredients?: any[]
  kosher?: boolean
  sugarFree?: boolean
}

export interface BeanLoadMatch {
  id: string
}

export interface BeanListMatch {
  limit?: number
  page?: number
}

export interface Combination {
  beans?: any[]
  combinationId?: string
  name?: string
  tag?: any[]
}

export interface CombinationListMatch {
  limit?: number
  page?: number
}

export interface Fact {
  description?: string
  factId?: string
  title?: string
}

export interface FactListMatch {
  limit?: number
  page?: number
}

export interface History {
  description?: string
  historyId?: string
  year?: number
}

export interface HistoryListMatch {
  description?: string
  historyId?: string
  year?: number
}

export interface Recipe {
  cookTime?: string
  description?: string
  directions?: any[]
  imageUrl?: string
  ingredients?: any[]
  makingAmount?: string
  name?: string
  prepTime?: string
  recipeId?: string
  totalTime?: string
}

export interface RecipeListMatch {
  limit?: number
  page?: number
}

