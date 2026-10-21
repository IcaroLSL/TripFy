package com.tripfy.tripfy.infra.database.mongodb.travelroute;

import com.tripfy.tripfy.travelroute.gateway.ItineraryRepository;
import com.tripfy.tripfy.travelroute.model.Itinerary;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MongoItineraryRepository implements ItineraryRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Itinerary insert(Itinerary i) {
        ItineraryDocument d = new ItineraryDocument();
        d.setId(i.id());
        d.setTravelRouteId(i.travelRouteId());
        d.setUserId(i.userId());
        d.setBeginningDate(i.beginningDate());
        d.setEndingDate(i.endingDate());
        d.setDateCreated(i.dateCreated());
        d.setDateUpdated(i.dateUpdated());

        ItineraryDocument s = mongoTemplate.insert(d);

        return new Itinerary(
            s.getId(), s.getTravelRouteId(), s.getUserId(),
            s.getBeginningDate(), s.getEndingDate(),
            s.getDateCreated(), s.getDateUpdated()
        );
    }
}