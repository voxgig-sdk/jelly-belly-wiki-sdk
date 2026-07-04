-- Typed models for the JellyBellyWiki SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Bean
---@field background_color? string
---@field bean_id? string
---@field color_group? string
---@field description? string
---@field flavor_name? string
---@field gluten_free? boolean
---@field group_name? table
---@field image_url? string
---@field ingredient? table
---@field kosher? boolean
---@field sugar_free? boolean

---@class BeanLoadMatch
---@field id string

---@class BeanListMatch

---@class Combination
---@field bean? table
---@field combination_id? string
---@field name? string
---@field tag? table

---@class CombinationListMatch

---@class Fact
---@field description? string
---@field fact_id? string
---@field title? string

---@class FactListMatch

---@class History
---@field description? string
---@field history_id? string
---@field year? number

---@class HistoryListMatch

---@class Recipe
---@field cook_time? string
---@field description? string
---@field direction? table
---@field image_url? string
---@field ingredient? table
---@field making_amount? string
---@field name? string
---@field prep_time? string
---@field recipe_id? string
---@field total_time? string

---@class RecipeListMatch

local M = {}

return M
