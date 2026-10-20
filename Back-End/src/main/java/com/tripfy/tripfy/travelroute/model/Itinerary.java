// Itinerary.java
package com.tripfy.tripfy.travelroute.model;

import java.time.Instant;

public record Itinerary(
    String id,
    String travelRouteId,
    String userId,
    Instant beginningDate,
    Instant endingDate,
    Instant dateCreated,
    Instant dateUpdated
) {}