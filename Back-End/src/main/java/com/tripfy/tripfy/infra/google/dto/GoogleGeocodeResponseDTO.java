package com.tripfy.tripfy.infra.google.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GoogleGeocodeResponseDTO(
    List<GeocodeResult> results,
    String status
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record GeocodeResult(Geometry geometry) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Geometry(Location location) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Location(Double lat, Double lng) {}
}
