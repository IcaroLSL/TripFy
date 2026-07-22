package com.tripfy.tripfy.infra.google.places.gateway;

import com.tripfy.tripfy.infra.google.places.dto.GoogleGeocodeResponseDTO;
import com.tripfy.tripfy.infra.google.places.dto.GooglePlacesResponseDTO;
import com.tripfy.tripfy.places.gateway.PlacesGateway;
import com.tripfy.tripfy.places.model.Local;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class GooglePlacesGateway implements PlacesGateway {

    @Value("${google.places.api-key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    private static final String FIELD_MASK =
        "places.displayName,places.formattedAddress,places.types," +
        "places.nationalPhoneNumber,places.websiteUri,places.rating," +
        "places.priceLevel,places.location";

    private GoogleGeocodeResponseDTO.Location buscarCoordenadas(String cidade) {
        GoogleGeocodeResponseDTO response = restClient.get()
            .uri("https://maps.googleapis.com/maps/api/geocode/json?address={cidade}&key={key}",
                cidade, apiKey)
            .retrieve()
            .body(GoogleGeocodeResponseDTO.class);

        if (response == null
                || !"OK".equals(response.status())
                || response.results().isEmpty()) {
            throw new RuntimeException("Não foi possível obter coordenadas para: " + cidade);
        }

        return response.results().get(0).geometry().location();
    }

    @Override
    public PlacesResult searchByLocation(String location) {
        GoogleGeocodeResponseDTO.Location coords = buscarCoordenadas(location);
        return executeSearch(buildRequestBody(coords.lat(), coords.lng(), null));
    }

    @Override
    public PlacesResult searchByLocationWithToken(String location, String pageToken) {
        GoogleGeocodeResponseDTO.Location coords = buscarCoordenadas(location);
        return executeSearch(buildRequestBody(coords.lat(), coords.lng(), pageToken));
    }

    private Map<String, Object> buildRequestBody(Double lat, Double lng, String pageToken) {
        var center            = Map.of("latitude", lat, "longitude", lng);
        var circle            = Map.of("center", center, "radius", 5000.0);
        var locationRestriction = Map.of("circle", circle);

        if (pageToken != null) {
            return Map.of(
                "includedTypes",        List.of("restaurant", "tourist_attraction", "lodging"),
                "maxResultCount",       20,
                "locationRestriction",  locationRestriction,
                "pageToken",            pageToken
            );
        }

        return Map.of(
            "includedTypes",       List.of("restaurant", "tourist_attraction", "lodging"),
            "maxResultCount",      20,
            "locationRestriction", locationRestriction
        );
    }

    private PlacesResult executeSearch(Map<String, Object> body) {
        GooglePlacesResponseDTO response = restClient.post()
            .uri("https://places.googleapis.com/v1/places:searchNearby")
            .header("X-Goog-Api-Key", apiKey)
            .header("X-Goog-FieldMask", FIELD_MASK)
            .body(body)
            .retrieve()
            .body(GooglePlacesResponseDTO.class);

        if (response == null || response.places() == null) {
            return new PlacesResult(List.of(), Optional.empty());
        }

        List<Local> places = response.places().stream()
            .map(p -> new Local(
                p.displayName()  != null ? p.displayName().text()   : null,
                p.formattedAddress(),
                p.types(),
                p.nationalPhoneNumber(),
                p.websiteUri(),
                p.rating(),
                p.priceLevel()   != null ? p.priceLevel().value     : null,
                p.location()     != null ? p.location().latitude()  : null,
                p.location()     != null ? p.location().longitude() : null
            ))
            .toList();

        return new PlacesResult(places, Optional.ofNullable(response.nextPageToken()));
    }
}