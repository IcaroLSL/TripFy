package com.tripfy.tripfy.travelroute.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

public record CreateTravelRouteRequest(
    @NotBlank String name,
    List<@NotBlank String> ownersId,
    @NotEmpty List<@Valid @NotNull Day> places,
    String coverImage,
    @NotBlank String location,
    @NotEmpty List<@NotBlank String> category,
    @Min(0) Integer priceLevel,
    @NotNull Instant beginningDate,
    @NotNull Instant endingDate
) {
    public record Day(
        @NotNull List<@NotBlank String> morning,
        @NotNull List<@NotBlank String> afternoon,
        @NotNull List<@NotBlank String> night
    ) {}
}