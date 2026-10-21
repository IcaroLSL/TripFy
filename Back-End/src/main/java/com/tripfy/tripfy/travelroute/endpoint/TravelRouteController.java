package com.tripfy.tripfy.travelroute.endpoint;

import com.tripfy.tripfy.travelroute.dto.CreateTravelRouteRequest;
import com.tripfy.tripfy.travelroute.dto.CreateTravelRouteResponse;
import com.tripfy.tripfy.travelroute.usecase.CreateTravelRouteUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/travel-route")
@RequiredArgsConstructor
public class TravelRouteController {

    private final CreateTravelRouteUseCase createTravelRouteUseCase;

    @PostMapping
    public ResponseEntity<CreateTravelRouteResponse> create(@Valid @RequestBody CreateTravelRouteRequest request, Authentication authentication) {
        System.out.println("chamando endpoint de criação de roteiros");

        CreateTravelRouteResponse response =
            createTravelRouteUseCase.execute(request, authentication.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}