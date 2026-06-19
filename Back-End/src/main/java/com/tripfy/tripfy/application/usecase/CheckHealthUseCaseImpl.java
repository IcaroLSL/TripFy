package com.tripfy.tripfy.application.usecase;

import com.tripfy.tripfy.domain.model.HealthStatus;
import com.tripfy.tripfy.domain.port.input.CheckHealthUseCase;
import org.springframework.stereotype.Service;

@Service
public class CheckHealthUseCaseImpl implements CheckHealthUseCase {

    @Override
    public HealthStatus execute() {
        return HealthStatus.UP;
    }
}