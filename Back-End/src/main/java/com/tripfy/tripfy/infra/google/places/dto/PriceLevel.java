package com.tripfy.tripfy.infra.google.places.dto;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum PriceLevel {
    PRICE_LEVEL_UNSPECIFIED(0),
    PRICE_LEVEL_FREE(0),
    PRICE_LEVEL_INEXPENSIVE(1),
    PRICE_LEVEL_MODERATE(2),
    PRICE_LEVEL_EXPENSIVE(3),
    PRICE_LEVEL_VERY_EXPENSIVE(4),

    @JsonEnumDefaultValue
    UNKNOWN(null);

    public final Integer value;

    PriceLevel(Integer value) {
        this.value = value;
    }
}