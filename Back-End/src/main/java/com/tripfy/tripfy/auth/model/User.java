package com.tripfy.tripfy.auth.model;

public record User(
        String id,
        String username,
        String password,
        String name,
        String email
) {}