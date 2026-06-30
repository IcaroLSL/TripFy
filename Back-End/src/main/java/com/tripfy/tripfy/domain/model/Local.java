package com.tripfy.tripfy.domain.model;

public record Local(
    String  name,
    String  address,
    String  type,
    Integer priceLevel,
    Float   rating
) {}