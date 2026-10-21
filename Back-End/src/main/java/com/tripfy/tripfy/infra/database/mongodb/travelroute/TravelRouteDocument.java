package com.tripfy.tripfy.infra.database.mongodb.travelroute;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.List;

@Getter @Setter @NoArgsConstructor
@Document(collection = "travelRoute")
public class TravelRouteDocument {

    @Id
    private String id;

    private String name;
    private List<String> ownersId;
    private List<DayDocument> places;
    private String coverImage;
    private String location;
    private List<String> category;
    private List<String> likes;

    @Field(name = "priceLevel", write = Field.Write.ALWAYS)
    private Integer priceLevel;

    @Field("date_created")
    private Instant dateCreated;

    @Field("date_updated")
    private Instant dateUpdated;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public static class DayDocument {
        private List<String> morning;
        private List<String> afternoon;
        private List<String> night;
    }
}