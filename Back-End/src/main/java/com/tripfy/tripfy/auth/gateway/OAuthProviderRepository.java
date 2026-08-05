package com.tripfy.tripfy.auth.gateway;

import com.tripfy.tripfy.auth.model.AuthProvider;

import java.util.Optional;

public interface OAuthProviderRepository {
    Optional<String> findUserIdByProvider(AuthProvider provider, String providerId);
    void linkProvider(String userId, AuthProvider provider, String providerId);
}