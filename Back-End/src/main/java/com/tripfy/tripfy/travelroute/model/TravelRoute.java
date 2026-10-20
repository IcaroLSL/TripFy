package com.tripfy.tripfy.travelroute.model;

import java.time.Instant;
import java.util.List;

public record TravelRoute(
    String id,
    String name,
    List<String> ownersId,
    List<Day> places,
    String coverImage,
    String location,
    List<String> category,
    List<String> likes,
    Integer priceLevel,
    Instant dateCreated,
    Instant dateUpdated
) {
    public record Day(List<String> morning, List<String> afternoon, List<String> night) {}
}