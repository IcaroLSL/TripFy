package com.tripfy.tripfy.application.dto;

import java.util.List;

public record PlacePageResponseDTO(
    List<LocalResponseDTO> places,
    int page,
    int limit,
    boolean hasNextPage
) {}