package com.tripfy.tripfy.infrastructure.adapter.input.rest;

import com.tripfy.tripfy.application.dto.LocalResponseDTO;
import com.tripfy.tripfy.domain.port.input.SearchPlacesUseCase;
import com.tripfy.tripfy.domain.model.local;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/v1/places")
@RequiredArgsConstructor
public class PlacesController {

    private final SearchPlacesUseCase searchPlacesUseCase;

    @GetMapping
    public ResponseEntity<LocalResponseDTO> search(@RequestParam String location) {
        Local local = searchPlacesUseCase.execute(location);

        LocalResponseDTO response = new LocalResponseDTO(
            local.getName(),
            local.getAddress(),
            local.getType(),
            local.getRating()
        );

        return ResponseEntity.ok(response);
    }
}