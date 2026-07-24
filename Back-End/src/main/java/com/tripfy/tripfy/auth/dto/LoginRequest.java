package com.tripfy.tripfy.auth.dto;

public record LoginRequest(
    String username,
    String password
) {}
