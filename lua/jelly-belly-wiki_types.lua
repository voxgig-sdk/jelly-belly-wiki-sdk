-- Typed models for the JellyBellyWiki SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Bean
---@field backgroundColor? string
---@field beanId? string
---@field colorGroup? string
---@field description? string
---@field flavorName? string
---@field glutenFree? boolean
---@field groupName? table
---@field id? string
---@field imageUrl? string
---@field ingredients? table
---@field kosher? boolean
---@field sugarFree? boolean

---@class BeanLoadMatch
---@field id string

---@class BeanListMatch
---@field limit? number
---@field page? number

---@class Combination
---@field beans? table
---@field combinationId? string
---@field name? string
---@field tag? table

---@class CombinationListMatch
---@field limit? number
---@field page? number

---@class Fact
---@field description? string
---@field factId? string
---@field title? string

---@class FactListMatch
---@field limit? number
---@field page? number

---@class History
---@field description? string
---@field historyId? string
---@field year? number

---@class HistoryListMatch
---@field description? string
---@field historyId? string
---@field year? number

---@class Recipe
---@field cookTime? string
---@field description? string
---@field directions? table
---@field imageUrl? string
---@field ingredients? table
---@field makingAmount? string
---@field name? string
---@field prepTime? string
---@field recipeId? string
---@field totalTime? string

---@class RecipeListMatch
---@field limit? number
---@field page? number

local M = {}

return M
