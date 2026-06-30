package com.tripfy.tripfy.domain.port.input;

import com.tripfy.tripfy.domain.model.Local;

public interface SearchPlacesUseCase {
    Local execute(String location);
}