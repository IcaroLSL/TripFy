package com.tripfy.tripfy.health;

import com.tripfy.tripfy.health.model.HealthStatus;
import org.springframework.stereotype.Service;

@Service
public class CheckHealthUseCase {

    public HealthStatus execute() {
        return HealthStatus.UP;
    }
}
