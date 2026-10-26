package com.tripfy.tripfy.travelroute.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.Instant;
import java.util.List;

public record CreateTravelRouteRequest(
    @NotBlank String name,
    List<@NotBlank String> ownersId,
    @NotEmpty List<@Valid @NotNull Day> places,
    String coverImage,
    @NotBlank String location,
    @NotEmpty List<@NotBlank String> category,
    @NotBlank @Pattern(regexp = "^(public|private|shared)$") String visibility,
    @Min(0) Integer priceLevel,
    @NotNull Instant beginningDate,
    @NotNull Instant endingDate
) {
    public record Day(
        @NotNull List<@Valid @NotNull Activity> earlyMorning,
        @NotNull List<@Valid @NotNull Activity> morning,
        @NotNull List<@Valid @NotNull Activity> afternoon,
        @NotNull List<@Valid @NotNull Activity> night
    ) {}

    public record Activity(
        @NotBlank String placeId,
        @NotBlank @Pattern(regexp = "^([01]\\d|2[0-3]):[0-5]\\d$") String startTime,
        @NotBlank @Pattern(regexp = "^([01]\\d|2[0-3]):[0-5]\\d$") String endTime
    ) {}
}