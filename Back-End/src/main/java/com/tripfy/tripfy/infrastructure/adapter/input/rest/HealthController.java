package com.tripfy.tripfy.infrastructure.adapter.input.rest;

import com.tripfy.tripfy.application.dto.HealthResponseDTO;
import com.tripfy.tripfy.domain.port.input.CheckHealthUseCase;
import com.tripfy.tripfy.domain.model.HealthStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1/health")
@RequiredArgsConstructor
public class HealthController {

    private final CheckHealthUseCase checkHealthUseCase;

    @GetMapping
    public ResponseEntity<HealthResponseDTO> check() {
        HealthStatus status = checkHealthUseCase.execute();

        HealthResponseDTO response = new HealthResponseDTO(
            status.name(),
            "tripfy-backend",
            Instant.now().toString()
        );

        return ResponseEntity.ok(response);
    }
}