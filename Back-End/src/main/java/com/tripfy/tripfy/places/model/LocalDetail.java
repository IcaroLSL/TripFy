package com.tripfy.tripfy.places.model;

import java.util.List;

public record LocalDetail(
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
