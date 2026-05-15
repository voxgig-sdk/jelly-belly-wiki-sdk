package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBeanEntityFunc func(client *JellyBellyWikiSDK, entopts map[string]any) JellyBellyWikiEntity

var NewCombinationEntityFunc func(client *JellyBellyWikiSDK, entopts map[string]any) JellyBellyWikiEntity

var NewFactEntityFunc func(client *JellyBellyWikiSDK, entopts map[string]any) JellyBellyWikiEntity

var NewHistoryEntityFunc func(client *JellyBellyWikiSDK, entopts map[string]any) JellyBellyWikiEntity

var NewRecipeEntityFunc func(client *JellyBellyWikiSDK, entopts map[string]any) JellyBellyWikiEntity

