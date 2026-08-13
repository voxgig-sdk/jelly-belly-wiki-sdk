# JellyBellyWiki SDK exists test

import pytest
from jellybellywiki_sdk import JellyBellyWikiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = JellyBellyWikiSDK.test(None, None)
        assert testsdk is not None
