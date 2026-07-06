package com.tripfy.tripfy.infrastructure.adapter.input.rest;

import com.tripfy.tripfy.application.dto.LocalResponseDTO;
import com.tripfy.tripfy.application.dto.PlacePageResponseDTO;
import com.tripfy.tripfy.domain.model.Local;
import com.tripfy.tripfy.domain.port.input.SearchPlacesUseCase;
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
    public ResponseEntity<PlacePageResponseDTO> search(
            @RequestParam String  location,
            @RequestParam(defaultValue = "1")  int page,
            @RequestParam(defaultValue = "15") int limit) {

        List<Local> locals = searchPlacesUseCase.execute(location, page, limit);

        List<LocalResponseDTO> dtos = locals.stream()
            .map(l -> new LocalResponseDTO(
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

        return ResponseEntity.ok(new PlacePageResponseDTO(
            dtos,
            page,
            limit,
            !locals.isEmpty() // hasNextPage: simplificado por enquanto
        ));
    }
}