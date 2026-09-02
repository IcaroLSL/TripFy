package com.tripfy.tripfy.places.dto;

import java.util.List;

public record PlaceDetailResponse(
    String       publicId,
    String       name,
    String       address,
    String       phoneNumber,
    Double       rating,
    Integer      priceLevel,
    List<String> hours,
    List<String> imageReferences,
    Boolean      allowsDogs,
    String       priceRangeStart,
    String       priceRangeEnd
) {}
