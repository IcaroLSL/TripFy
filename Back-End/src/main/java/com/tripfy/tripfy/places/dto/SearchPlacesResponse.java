package com.tripfy.tripfy.places.dto;

import java.util.List;

public record SearchPlacesResponse(
    List<PlaceResponse> places,
    int                 page,
    int                 limit,
    boolean             hasNextPage
) {}
