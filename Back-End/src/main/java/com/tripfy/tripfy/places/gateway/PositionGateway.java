package com.tripfy.tripfy.places.gateway;

import com.tripfy.tripfy.places.dto.PositionResponse;

public interface PositionGateway {

    PositionResponse getPosition(String latitude, String longitude);

}