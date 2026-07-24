package com.tripfy.tripfy.auth.dto;

public record LoginResponse(
    String id,
    String name,
    String accessToken,
    String refreshToken
) {}
