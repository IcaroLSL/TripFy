package com.tripfy.tripfy.places.gateway;

import com.tripfy.tripfy.places.dto.AutoCompleteResponse;

public interface AutoCompleteGateway {
    AutoCompleteResponse getAutoComplete(String input);
}