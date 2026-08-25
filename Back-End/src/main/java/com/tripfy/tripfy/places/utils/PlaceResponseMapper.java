package com.tripfy.tripfy.places.utils;

import com.tripfy.tripfy.places.dto.PlaceResponse;
import com.tripfy.tripfy.places.model.Local;

public final class PlaceResponseMapper {

    private PlaceResponseMapper() {}

    public static PlaceResponse toResponse(Local local) {
        return new PlaceResponse(
            local.publicId(),
            local.name(),
            local.address(),
            local.types(),
            local.phoneNumber(),
            local.websiteUri(),
            local.rating(),
            local.priceLevel(),
            local.latitude(),
            local.longitude(),
            local.imageReferences()
        );
    }
}