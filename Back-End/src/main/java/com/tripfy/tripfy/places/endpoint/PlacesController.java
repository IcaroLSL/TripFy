package com.tripfy.tripfy.places.endpoint;

import com.tripfy.tripfy.places.usecase.SearchPlacesUseCase;
import com.tripfy.tripfy.places.dto.PlaceResponse;
import com.tripfy.tripfy.places.dto.SearchPlacesResponse;
import com.tripfy.tripfy.places.model.Local;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/places")
@RequiredArgsConstructor
public class PlacesController {

    private final SearchPlacesUseCase searchPlacesUseCase;

    @GetMapping
    public ResponseEntity<SearchPlacesResponse> search(
            @RequestParam                      String location,
            @RequestParam(defaultValue = "1")  int    page,
            @RequestParam(defaultValue = "15") int    limit) {

        List<Local> locals = searchPlacesUseCase.execute(location, page, limit);

        List<PlaceResponse> dtos = locals.stream()
            .map(l -> new PlaceResponse(
                l.name(),
                l.address(),
                l.types(),
                l.phoneNumber(),
                l.websiteUri(),
                l.rating(),
                l.priceLevel(),
                l.latitude(),
                l.longitude()
            ))
            .toList();

        return ResponseEntity.ok(new SearchPlacesResponse(
            dtos,
            page,
            limit,
            !locals.isEmpty()
        ));
    }
}