package com.tripfy.tripfy.domain.port.output;

import com.tripfy.tripfy.domain.model.Local;
import java.util.List;
import java.util.Optional;

public interface PlacesGateway {

    // Primeira busca (sem token)
    PlacesResult searchByLocation(String location);

    // Busca com token de paginação
    PlacesResult searchByLocationWithToken(String location, String pageToken);

    record PlacesResult(
        List<Local> places,
        Optional<String> nextPageToken
    ) {}
}