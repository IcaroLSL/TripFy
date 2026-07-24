package com.tripfy.tripfy.auth.gateway;

import java.util.Optional;

public interface TokenValidator {
    Optional<TokenData> validateAccessToken(String token);

    record TokenData(String userId, String username, String name) {}
}
