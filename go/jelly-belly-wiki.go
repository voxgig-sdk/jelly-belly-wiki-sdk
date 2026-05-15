package voxgigjellybellywikisdk

import (
	"github.com/voxgig-sdk/jelly-belly-wiki-sdk/core"
	"github.com/voxgig-sdk/jelly-belly-wiki-sdk/entity"
	"github.com/voxgig-sdk/jelly-belly-wiki-sdk/feature"
	_ "github.com/voxgig-sdk/jelly-belly-wiki-sdk/utility"
)

// Type aliases preserve external API.
type JellyBellyWikiSDK = core.JellyBellyWikiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type JellyBellyWikiEntity = core.JellyBellyWikiEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type JellyBellyWikiError = core.JellyBellyWikiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBeanEntityFunc = func(client *core.JellyBellyWikiSDK, entopts map[string]any) core.JellyBellyWikiEntity {
		return entity.NewBeanEntity(client, entopts)
	}
	core.NewCombinationEntityFunc = func(client *core.JellyBellyWikiSDK, entopts map[string]any) core.JellyBellyWikiEntity {
		return entity.NewCombinationEntity(client, entopts)
	}
	core.NewFactEntityFunc = func(client *core.JellyBellyWikiSDK, entopts map[string]any) core.JellyBellyWikiEntity {
		return entity.NewFactEntity(client, entopts)
	}
	core.NewHistoryEntityFunc = func(client *core.JellyBellyWikiSDK, entopts map[string]any) core.JellyBellyWikiEntity {
		return entity.NewHistoryEntity(client, entopts)
	}
	core.NewRecipeEntityFunc = func(client *core.JellyBellyWikiSDK, entopts map[string]any) core.JellyBellyWikiEntity {
		return entity.NewRecipeEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewJellyBellyWikiSDK = core.NewJellyBellyWikiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
