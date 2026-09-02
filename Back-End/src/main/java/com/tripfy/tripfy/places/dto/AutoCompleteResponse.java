package com.tripfy.tripfy.places.dto;

import java.util.List;

public record AutoCompleteResponse(
    List<String> placeNames
) {}