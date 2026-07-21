package com.tripfy.tripfy.application.dto;

public record LoginResponseDTO(
    String id,
    String nome,
    String token
) {}