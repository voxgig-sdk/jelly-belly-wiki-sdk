# JellyBellyWiki SDK feature factory

from feature.base_feature import JellyBellyWikiBaseFeature
from feature.test_feature import JellyBellyWikiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: JellyBellyWikiBaseFeature(),
        "test": lambda: JellyBellyWikiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
