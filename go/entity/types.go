// Typed models for the JellyBellyWiki SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/jelly-belly-wiki-sdk/go/core"
)

// Bean is the typed data model for the bean entity.
type Bean struct {
	BackgroundColor *string `json:"backgroundColor,omitempty"`
	BeanId *string `json:"beanId,omitempty"`
	ColorGroup *string `json:"colorGroup,omitempty"`
	Description *string `json:"description,omitempty"`
	FlavorName *string `json:"flavorName,omitempty"`
	GlutenFree *bool `json:"glutenFree,omitempty"`
	GroupName *[]any `json:"groupName,omitempty"`
	Id *string `json:"id,omitempty"`
	ImageUrl *string `json:"imageUrl,omitempty"`
	Ingredients *[]any `json:"ingredients,omitempty"`
	Kosher *bool `json:"kosher,omitempty"`
	SugarFree *bool `json:"sugarFree,omitempty"`
}

// BeanLoadMatch is the typed request payload for Bean.LoadTyped.
type BeanLoadMatch struct {
	Id string `json:"id"`
}

// BeanListMatch is the typed request payload for Bean.ListTyped.
type BeanListMatch struct {
	BackgroundColor *string `json:"backgroundColor,omitempty"`
	BeanId *string `json:"beanId,omitempty"`
	ColorGroup *string `json:"colorGroup,omitempty"`
	Description *string `json:"description,omitempty"`
	FlavorName *string `json:"flavorName,omitempty"`
	GlutenFree *bool `json:"glutenFree,omitempty"`
	GroupName *[]any `json:"groupName,omitempty"`
	Id *string `json:"id,omitempty"`
	ImageUrl *string `json:"imageUrl,omitempty"`
	Ingredients *[]any `json:"ingredients,omitempty"`
	Kosher *bool `json:"kosher,omitempty"`
	SugarFree *bool `json:"sugarFree,omitempty"`
}

// Combination is the typed data model for the combination entity.
type Combination struct {
	Beans *[]any `json:"beans,omitempty"`
	CombinationId *string `json:"combinationId,omitempty"`
	Name *string `json:"name,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
}

// CombinationListMatch is the typed request payload for Combination.ListTyped.
type CombinationListMatch struct {
	Beans *[]any `json:"beans,omitempty"`
	CombinationId *string `json:"combinationId,omitempty"`
	Name *string `json:"name,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
}

// Fact is the typed data model for the fact entity.
type Fact struct {
	Description *string `json:"description,omitempty"`
	FactId *string `json:"factId,omitempty"`
	Title *string `json:"title,omitempty"`
}

// FactListMatch is the typed request payload for Fact.ListTyped.
type FactListMatch struct {
	Description *string `json:"description,omitempty"`
	FactId *string `json:"factId,omitempty"`
	Title *string `json:"title,omitempty"`
}

// History is the typed data model for the history entity.
type History struct {
	Description *string `json:"description,omitempty"`
	HistoryId *string `json:"historyId,omitempty"`
	Year *int `json:"year,omitempty"`
}

// HistoryListMatch is the typed request payload for History.ListTyped.
type HistoryListMatch struct {
	Description *string `json:"description,omitempty"`
	HistoryId *string `json:"historyId,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Recipe is the typed data model for the recipe entity.
type Recipe struct {
	CookTime *string `json:"cookTime,omitempty"`
	Description *string `json:"description,omitempty"`
	Directions *[]any `json:"directions,omitempty"`
	ImageUrl *string `json:"imageUrl,omitempty"`
	Ingredients *[]any `json:"ingredients,omitempty"`
	MakingAmount *string `json:"makingAmount,omitempty"`
	Name *string `json:"name,omitempty"`
	PrepTime *string `json:"prepTime,omitempty"`
	RecipeId *string `json:"recipeId,omitempty"`
	TotalTime *string `json:"totalTime,omitempty"`
}

// RecipeListMatch is the typed request payload for Recipe.ListTyped.
type RecipeListMatch struct {
	CookTime *string `json:"cookTime,omitempty"`
	Description *string `json:"description,omitempty"`
	Directions *[]any `json:"directions,omitempty"`
	ImageUrl *string `json:"imageUrl,omitempty"`
	Ingredients *[]any `json:"ingredients,omitempty"`
	MakingAmount *string `json:"makingAmount,omitempty"`
	Name *string `json:"name,omitempty"`
	PrepTime *string `json:"prepTime,omitempty"`
	RecipeId *string `json:"recipeId,omitempty"`
	TotalTime *string `json:"totalTime,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
