package com.tripfy.tripfy.application.dto;

import java.util.List;

public record LocalResponseDTO(
    String       name,
    String       address,
    List<String> types,
    String       phoneNumber,
    String       websiteUri,
    Double       rating,
    Integer      priceLevel,
    Double       latitude,
    Double       longitude
) {}