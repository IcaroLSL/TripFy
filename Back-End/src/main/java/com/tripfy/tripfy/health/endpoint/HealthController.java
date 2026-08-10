package com.tripfy.tripfy.health.endpoint;

import com.tripfy.tripfy.health.usecase.CheckHealthUseCase;
import com.tripfy.tripfy.health.dto.HealthResponse;
import com.tripfy.tripfy.health.model.HealthStatus;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/v1/health")
@RequiredArgsConstructor
public class HealthController {

    private final CheckHealthUseCase checkHealthUseCase;

    @GetMapping
    public ResponseEntity<HealthResponse> check() {

        System.out.println("chamando endpoint de health check");

        HealthStatus status = checkHealthUseCase.execute();

        return ResponseEntity.ok(new HealthResponse(
            status.name(),
            "tripfy-backend",
            Instant.now().toString()
        ));
    }
}
