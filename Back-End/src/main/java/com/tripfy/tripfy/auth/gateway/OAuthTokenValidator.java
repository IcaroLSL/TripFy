package com.tripfy.tripfy.auth.gateway;

import com.tripfy.tripfy.auth.model.AuthProvider;
import com.tripfy.tripfy.auth.model.OAuthUserInfo;

public interface OAuthTokenValidator {
    AuthProvider getProvider();
    OAuthUserInfo validate(String token);
}