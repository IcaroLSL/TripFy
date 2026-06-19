package com.tripfy.tripfy.application.dto;

public record HealthResponseDTO(
    String status,
    String application,
    String timestamp
) {}