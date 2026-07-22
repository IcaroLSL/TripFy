package com.tripfy.tripfy.infra.google.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GooglePlacesResponseDTO(
    List<PlaceDTO> places,
    String nextPageToken        // novo campo
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record PlaceDTO(
        DisplayName      displayName,
        String           formattedAddress,
        List<String>     types,
        String           nationalPhoneNumber,
        String           websiteUri,
        Double           rating,
        PriceLevel       priceLevel,
        LocationDTO      location
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record DisplayName(String text) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record LocationDTO(Double latitude, Double longitude) {}
}