package com.tripfy.tripfy.domain.port.input;

import com.tripfy.tripfy.domain.model.Local;
import java.util.List;

public interface SearchPlacesUseCase {
    List<Local> execute(String location, int page, int limit);
}