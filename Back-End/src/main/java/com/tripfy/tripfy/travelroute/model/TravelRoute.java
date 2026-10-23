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
    public record Day(
        List<Activity> earlyMorning, 
        List<Activity> morning, 
        List<Activity> afternoon, 
        List<Activity> night
    ) {}

    public record Activity(
        String placeId, 
        String startTime, 
        String endTime
    ) {}
}