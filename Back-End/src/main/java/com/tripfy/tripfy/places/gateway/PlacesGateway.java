package com.tripfy.tripfy.places.gateway;

import com.tripfy.tripfy.places.model.Local;

import java.util.List;
import java.util.Optional;

public interface PlacesGateway {

    PlacesResult searchByLocation(String location, List<String> types, Double minRating, List<Integer> priceLevels, String name);
    PlacesResult searchByLocationWithToken(String location, List<String> types, String pageToken, Double minRating, List<Integer> priceLevels, String name);

    record PlacesResult(
        List<Local>      places,
        Optional<String> nextPageToken
    ) {}
}
