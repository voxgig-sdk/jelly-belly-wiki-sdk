package core

type JellyBellyWikiError struct {
	IsJellyBellyWikiError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewJellyBellyWikiError(code string, msg string, ctx *Context) *JellyBellyWikiError {
	return &JellyBellyWikiError{
		IsJellyBellyWikiError: true,
		Sdk:              "JellyBellyWiki",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *JellyBellyWikiError) Error() string {
	return e.Msg
}
