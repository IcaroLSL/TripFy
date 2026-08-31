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
        "rating,photos";


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
        if (response == null) {
            return null;
        }
        System.out.println("Response: " + response);
        LocalDetail place = response != null ? new LocalDetail(
                response.id(),
                response.displayName()         != null ? response.displayName().text()                                                                          : null,
                response.formattedAddress(),                                                                                                                                               
                response.internationalPhoneNumber(),                                                                                                                                               
                response.rating(),                                                                                                                                               
                response.priceLevel()          != null ? response.priceLevel().value                                                                            : null,
                response.currentOpeningHours() != null ? response.currentOpeningHours().weekdayDescriptions()                                                   : List.of(),
                response.photos()              != null ? response.photos().stream().map(GooglePlacesDetailResponse.Photos::name).toList()                                               : List.of(),
                response.allowsDogs()          != null ? response.allowsDogs()                                                                                  : false,
                response.priceRange()          != null ? response.priceRange().startPrice().currencyCode() + " - " + response.priceRange().startPrice().units() : null,
                response.priceRange()          != null ? response.priceRange().endPrice().currencyCode()   + " - " + response.priceRange().endPrice().units()   : null
        ) : null;

        return new PlaceDetailResponse(
                place.publicId(),
                place.name(),
                place.address(),
                place.phoneNumber(),
                place.rating(),
                place.priceLevel(),
                place.hours(),
                place.imageReferences(),
                place.allowsDogs(),
                place.priceRangeStart(),
                place.priceRangeEnd()
        );
    }
}
