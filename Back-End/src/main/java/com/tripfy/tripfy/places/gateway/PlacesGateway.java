package com.tripfy.tripfy.places.gateway;

import com.tripfy.tripfy.places.model.Local;

import java.util.List;
import java.util.Optional;

public interface PlacesGateway {

    PlacesResult searchByLocation(String location);
    PlacesResult searchByLocationWithToken(String location, String pageToken);

    record PlacesResult(
        List<Local>      places,
        Optional<String> nextPageToken
    ) {}
}
