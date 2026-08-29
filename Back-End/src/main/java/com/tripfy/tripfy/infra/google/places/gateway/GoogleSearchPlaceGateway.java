package com.tripfy.tripfy.infra.google.places.gateway;

import com.tripfy.tripfy.places.gateway.SearchPlaceGateway;
import com.tripfy.tripfy.places.dto.PlaceDetailResponse;
import com.tripfy.tripfy.infra.google.places.dto.GooglePlacesDetailResponse;
import com.tripfy.tripfy.places.model.LocalDetail;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;

@Component
@Slf4j
public class GoogleSearchPlaceGateway implements SearchPlaceGateway {
    @Value("${google.places.api-key}")
    private String apiKey;

    public GoogleSearchPlaceGateway() {
    }

    private final RestClient restClient = RestClient.create();

    private static final String FIELD_MASK =
        "id,displayName,priceLevel,priceRange,allowsDogs,formattedAddress," +
        "currentOpeningHours.weekdayDescriptions,internationalPhoneNumber," +
        "rating,photos.authorAttributions.photoUri";


    @Override
    public PlaceDetailResponse getById(String publicId) {
        GooglePlacesDetailResponse response = restClient.get()
            .uri("https://places.googleapis.com/v1/places/" + publicId)
            .header("X-Goog-Api-Key", apiKey)
            .header("X-Goog-FieldMask", FIELD_MASK)
            .retrieve()
            .body(GooglePlacesDetailResponse.class);
            // curl --location 'https://places.googleapis.com/v1/places/ChIJPXDyCV7xuJQR5Ml6ubz1sVI' \
            //      --header 'Content-Type: application/json' \
            //      --header 'X-Goog-Api-Key: AIzaSyBLkTY80yl7SK931yWMg48DIVvS1K8E5c0' \
            //      --header 'X-Goog-FieldMask: id,displayName,priceLevel,priceRange,allowsDogs,currentOpeningHours.weekdayDescriptions,formattedAddress,internationalPhoneNumber,rating,photos.authorAttributions.photoUri'
       
        if (response == null || response.place() == null) {
            return null;
        }

        LocalDetail place = response.place() != null ? new LocalDetail(
                response.place().id(),
                response.place().displayName()         != null ? response.place().displayName().text()                                                                                                                                                                              : null,
                response.place().formattedAddress(),                                                                                                                                                                                                                                                   
                response.place().phoneNumber(),                                                                                                                                                                                                                                                   
                response.place().rating(),                                                                                                                                                                                                                                                   
                response.place().priceLevel()          != null ? response.place().priceLevel().value                                                                                                                                                                                : null,
                response.place().currentOpeningHours() != null ? response.place().currentOpeningHours().weekdayDescriptions()                                                                                                                                                       : List.of(),
                response.place().photos()              != null ? response.place().photos().stream().filter(photo -> photo.authorAttributions() != null).flatMap(photo -> photo.authorAttributions().stream()).map(GooglePlacesDetailResponse.AuthorAttributions::photoUri).toList() : List.of(),
                response.place().allowsDogs(),                                                                                                                                                                                                                                                  
                response.place().priceRange()          != null ? response.place().priceRange().startPrice().currencyCode() + " - " + response.place().priceRange().startPrice().units()                                                                                        : null,
                response.place().priceRange()          != null ? response.place().priceRange().endPrice().currencyCode() + " - " + response.place().priceRange().endPrice().units()                                                                                        : null
        ) : null;

        return new PlaceDetailResponse(
                place.publicId(),
                place.name(),
                place.address(),
                place.phoneNumber(),
                place.rating(),
                place.priceLevel(),
                place.hours(),
                place.imageUris(),
                place.allowsDogs(),
                place.priceRangeStart(),
                place.priceRangeEnd()
        );
    }
}
