package com.tripfy.tripfy.auth.gateway;

import com.tripfy.tripfy.auth.model.User;

public interface TokenGenerator {
    String generateAccessToken(User user);
    String generateRefreshToken(User user);
}
