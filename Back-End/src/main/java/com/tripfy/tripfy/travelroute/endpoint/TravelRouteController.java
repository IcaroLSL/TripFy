package com.tripfy.tripfy.travelroute.endpoint;

import com.tripfy.tripfy.travelroute.dto.CreateTravelRouteRequest;
import com.tripfy.tripfy.travelroute.dto.CreateTravelRouteResponse;
import com.tripfy.tripfy.travelroute.usecase.CreateTravelRouteUseCase;
import com.tripfy.tripfy.common.security.AuthenticatedUser;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;





@RestController
@RequestMapping("/v1/travel-route")
@RequiredArgsConstructor
public class TravelRouteController {

    private final CreateTravelRouteUseCase createTravelRouteUseCase;
    // private final GetTravelRouteByIdUseCase getTravelRouteByIdUseCase;

    @PostMapping
    public ResponseEntity<CreateTravelRouteResponse> create(@Valid @RequestBody CreateTravelRouteRequest request, @AuthenticationPrincipal AuthenticatedUser user) {
        System.out.println("chamando endpoint de criação de roteiros");

        CreateTravelRouteResponse response = createTravelRouteUseCase.execute(request, user.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<SelectedTravelRouteResponse> getById(@PathVariable String id, Authentication authentication) {
    //     System.out.println("chamando endpoint de obtenção de roteiro");

    //     SelectedTravelRouteResponse response = getTravelRouteByIdUseCase.getById(id);

    //     return ResponseEntity.ok(response);
    // }
}