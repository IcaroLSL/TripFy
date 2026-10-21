package com.tripfy.tripfy.infra.database.mongodb.travelroute;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Getter @Setter @NoArgsConstructor
@Document(collection = "itinerary")
public class ItineraryDocument {

    @Id
    private String id;

    private String travelRouteId;
    private String userId;
    private Instant beginningDate;
    private Instant endingDate;

    @Field("date_created")
    private Instant dateCreated;

    @Field("date_updated")
    private Instant dateUpdated;
}