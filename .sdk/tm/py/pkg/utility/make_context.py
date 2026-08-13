# JellyBellyWiki SDK utility: make_context

from projectname_sdk.core.context import JellyBellyWikiContext


def make_context_util(ctxmap, basectx):
    return JellyBellyWikiContext(ctxmap, basectx)
