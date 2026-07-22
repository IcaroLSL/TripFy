package com.tripfy.tripfy.places.gateway;

import com.tripfy.tripfy.places.model.Local;

import java.util.List;
import java.util.Optional;

public interface PlacesPaginationCache {
    void save(String cacheKey, List<Local> remainingItems, String nextPageToken);
    Optional<List<Local>> getRemainingItems(String cacheKey);
    Optional<String> getNextPageToken(String cacheKey);
    void evict(String cacheKey);
}
