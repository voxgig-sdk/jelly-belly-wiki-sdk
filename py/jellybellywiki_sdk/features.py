# JellyBellyWiki SDK feature factory

from jellybellywiki_sdk.feature.base_feature import JellyBellyWikiBaseFeature
from jellybellywiki_sdk.feature.ratelimit_feature import JellyBellyWikiRatelimitFeature
from jellybellywiki_sdk.feature.retry_feature import JellyBellyWikiRetryFeature
from jellybellywiki_sdk.feature.test_feature import JellyBellyWikiTestFeature
from jellybellywiki_sdk.feature.timeout_feature import JellyBellyWikiTimeoutFeature


_FEATURES = {
    "base": lambda: JellyBellyWikiBaseFeature(),
    "ratelimit": lambda: JellyBellyWikiRatelimitFeature(),
    "retry": lambda: JellyBellyWikiRetryFeature(),
    "test": lambda: JellyBellyWikiTestFeature(),
    "timeout": lambda: JellyBellyWikiTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
