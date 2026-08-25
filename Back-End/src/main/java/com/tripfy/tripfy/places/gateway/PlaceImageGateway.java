package com.tripfy.tripfy.places.gateway;

import com.tripfy.tripfy.places.dto.PlaceImageResponse;

public interface PlaceImageGateway {
    PlaceImageResponse getImageByPlace(String photoReference);
}
