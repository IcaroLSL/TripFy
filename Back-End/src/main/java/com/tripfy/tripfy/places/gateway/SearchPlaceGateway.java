package com.tripfy.tripfy.places.gateway;

import com.tripfy.tripfy.places.dto.PlaceDetailResponse;

public interface SearchPlaceGateway {
    PlaceDetailResponse getById(String publicId);
}