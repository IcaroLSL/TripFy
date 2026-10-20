package com.tripfy.tripfy.travelroute.gateway;

import com.tripfy.tripfy.travelroute.model.TravelRoute;

public interface TravelRouteRepository {
    TravelRoute insert(TravelRoute travelRoute);
    void deleteById(String id);
}
