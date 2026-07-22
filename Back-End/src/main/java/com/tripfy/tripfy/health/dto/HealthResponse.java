package com.tripfy.tripfy.health.dto;

public record HealthResponse(
    String status,
    String application,
    String timestamp
) {}
