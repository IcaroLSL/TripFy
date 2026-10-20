package com.tripfy.tripfy.travelroute.gateway;

import com.tripfy.tripfy.travelroute.model.Itinerary;

public interface ItineraryRepository {
    Itinerary insert(Itinerary itinerary);
}