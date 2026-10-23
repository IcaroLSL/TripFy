package com.tripfy.tripfy.infra.database.mongodb.travelroute;

import com.tripfy.tripfy.travelroute.gateway.TravelRouteRepository;
import com.tripfy.tripfy.travelroute.model.TravelRoute;
import com.tripfy.tripfy.infra.database.mongodb.travelroute.documents.TravelRouteDocument;

import lombok.RequiredArgsConstructor;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MongoTravelRouteRepository implements TravelRouteRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public TravelRoute insert(TravelRoute r) {
        TravelRouteDocument d = new TravelRouteDocument();
        d.setId(r.id());
        d.setName(r.name());
        d.setOwnersId(r.ownersId());
        d.setPlaces(r.places().stream()
            .map(day -> new TravelRouteDocument.DayDocument(
                toDocs(day.earlyMorning()), toDocs(day.morning()),
                toDocs(day.afternoon()), toDocs(day.night())))
            .toList());
        d.setCoverImage(r.coverImage());
        d.setLocation(r.location());
        d.setCategory(r.category());
        d.setLikes(r.likes());
        d.setPriceLevel(r.priceLevel());
        d.setDateCreated(r.dateCreated());
        d.setDateUpdated(r.dateUpdated());

        TravelRouteDocument s = mongoTemplate.insert(d);

        return new TravelRoute(
            s.getId(), s.getName(), s.getOwnersId(),
            s.getPlaces().stream()
                .map(x -> new TravelRoute.Day(
                    toActivities(x.getEarlyMorning()), toActivities(x.getMorning()),
                    toActivities(x.getAfternoon()), toActivities(x.getNight())))
                .toList(),
            s.getCoverImage(), s.getLocation(), s.getCategory(), s.getLikes(),
            s.getPriceLevel(), s.getDateCreated(), s.getDateUpdated()
        );
    }

    @Override
    public void deleteById(String id) {
        mongoTemplate.remove(Query.query(Criteria.where("id").is(id)), TravelRouteDocument.class);
    }

    private List<TravelRouteDocument.ActivityDocument> toDocs(List<TravelRoute.Activity> list) {
        return list.stream()
            .map(a -> new TravelRouteDocument.ActivityDocument(a.placeId(), a.startTime(), a.endTime()))
            .toList();
    }

    private List<TravelRoute.Activity> toActivities(List<TravelRouteDocument.ActivityDocument> list) {
        return list.stream()
            .map(a -> new TravelRoute.Activity(a.getPlaceId(), a.getStartTime(), a.getEndTime()))
            .toList();
    }
}