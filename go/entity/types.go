// Typed models for the JellyBellyWiki SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Bean is the typed data model for the bean entity.
type Bean struct {
	BackgroundColor *string `json:"background_color,omitempty"`
	BeanId *string `json:"bean_id,omitempty"`
	ColorGroup *string `json:"color_group,omitempty"`
	Description *string `json:"description,omitempty"`
	FlavorName *string `json:"flavor_name,omitempty"`
	GlutenFree *bool `json:"gluten_free,omitempty"`
	GroupName *[]any `json:"group_name,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	Ingredient *[]any `json:"ingredient,omitempty"`
	Kosher *bool `json:"kosher,omitempty"`
	SugarFree *bool `json:"sugar_free,omitempty"`
}

// BeanLoadMatch is the typed request payload for Bean.LoadTyped.
type BeanLoadMatch struct {
	Id string `json:"id"`
}

// BeanListMatch is the typed request payload for Bean.ListTyped.
type BeanListMatch struct {
	BackgroundColor *string `json:"background_color,omitempty"`
	BeanId *string `json:"bean_id,omitempty"`
	ColorGroup *string `json:"color_group,omitempty"`
	Description *string `json:"description,omitempty"`
	FlavorName *string `json:"flavor_name,omitempty"`
	GlutenFree *bool `json:"gluten_free,omitempty"`
	GroupName *[]any `json:"group_name,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	Ingredient *[]any `json:"ingredient,omitempty"`
	Kosher *bool `json:"kosher,omitempty"`
	SugarFree *bool `json:"sugar_free,omitempty"`
}

// Combination is the typed data model for the combination entity.
type Combination struct {
	Bean *[]any `json:"bean,omitempty"`
	CombinationId *string `json:"combination_id,omitempty"`
	Name *string `json:"name,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
}

// CombinationListMatch is the typed request payload for Combination.ListTyped.
type CombinationListMatch struct {
	Bean *[]any `json:"bean,omitempty"`
	CombinationId *string `json:"combination_id,omitempty"`
	Name *string `json:"name,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
}

// Fact is the typed data model for the fact entity.
type Fact struct {
	Description *string `json:"description,omitempty"`
	FactId *string `json:"fact_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// FactListMatch is the typed request payload for Fact.ListTyped.
type FactListMatch struct {
	Description *string `json:"description,omitempty"`
	FactId *string `json:"fact_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// History is the typed data model for the history entity.
type History struct {
	Description *string `json:"description,omitempty"`
	HistoryId *string `json:"history_id,omitempty"`
	Year *int `json:"year,omitempty"`
}

// HistoryListMatch is the typed request payload for History.ListTyped.
type HistoryListMatch struct {
	Description *string `json:"description,omitempty"`
	HistoryId *string `json:"history_id,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Recipe is the typed data model for the recipe entity.
type Recipe struct {
	CookTime *string `json:"cook_time,omitempty"`
	Description *string `json:"description,omitempty"`
	Direction *[]any `json:"direction,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	Ingredient *[]any `json:"ingredient,omitempty"`
	MakingAmount *string `json:"making_amount,omitempty"`
	Name *string `json:"name,omitempty"`
	PrepTime *string `json:"prep_time,omitempty"`
	RecipeId *string `json:"recipe_id,omitempty"`
	TotalTime *string `json:"total_time,omitempty"`
}

// RecipeListMatch is the typed request payload for Recipe.ListTyped.
type RecipeListMatch struct {
	CookTime *string `json:"cook_time,omitempty"`
	Description *string `json:"description,omitempty"`
	Direction *[]any `json:"direction,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	Ingredient *[]any `json:"ingredient,omitempty"`
	MakingAmount *string `json:"making_amount,omitempty"`
	Name *string `json:"name,omitempty"`
	PrepTime *string `json:"prep_time,omitempty"`
	RecipeId *string `json:"recipe_id,omitempty"`
	TotalTime *string `json:"total_time,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
