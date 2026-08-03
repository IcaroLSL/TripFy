package com.tripfy.tripfy.auth.model;

public record OAuthUserInfo(
    AuthProvider provider,
    String providerId,
    String email,
    String name
) {}