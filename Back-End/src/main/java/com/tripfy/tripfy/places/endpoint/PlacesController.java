package com.tripfy.tripfy.places.endpoint;

import com.tripfy.tripfy.infra.jwt.auth.AuthenticatedUser;
import com.tripfy.tripfy.places.dto.PlaceResponse;
import com.tripfy.tripfy.places.dto.SearchPlacesResponse;
import com.tripfy.tripfy.places.model.Local;
import com.tripfy.tripfy.places.usecase.SearchPlacesUseCase;
import com.tripfy.tripfy.places.usecase.SearchPlacesUseCase.PlacesPageResult;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/places")
public class PlacesController {

    private final SearchPlacesUseCase searchPlacesUseCase;

    public PlacesController(SearchPlacesUseCase searchPlacesUseCase) {
        this.searchPlacesUseCase = searchPlacesUseCase;
    }

    @GetMapping
    public ResponseEntity<SearchPlacesResponse> search(
            @RequestParam String location,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) List<String> types,
            @AuthenticationPrincipal AuthenticatedUser user) {

        PlacesPageResult pageResult = searchPlacesUseCase.execute(user.id(), location, page, limit, types);

        List<PlaceResponse> places = pageResult.places().stream()
            .map(this::toPlaceResponse)
            .toList();

        return ResponseEntity.ok(new SearchPlacesResponse(places, page, limit, pageResult.hasMore()));
    }

    private PlaceResponse toPlaceResponse(Local local) {
        return new PlaceResponse(
            local.name(),
            local.address(),
            local.types(),
            local.phoneNumber(),
            local.websiteUri(),
            local.rating(),
            local.priceLevel(),
            local.latitude(),
            local.longitude()
        );
    }
}
