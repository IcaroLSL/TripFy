package com.tripfy.tripfy.places.model;

import java.util.List;

public record Local(
    String       publicId,
    String       name,
    String       address,
    List<String> types,
    String       phoneNumber,
    String       websiteUri,
    Double       rating,
    Integer      priceLevel,
    Double       latitude,
    Double       longitude,
    List<String> imageReferences
) {}
