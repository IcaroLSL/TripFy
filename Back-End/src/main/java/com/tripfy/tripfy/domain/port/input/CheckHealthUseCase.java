package com.tripfy.tripfy.domain.port.input;

import com.tripfy.tripfy.domain.model.HealthStatus;

public interface CheckHealthUseCase {
    HealthStatus execute();
}