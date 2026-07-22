package com.tripfy.tripfy.places;

import com.tripfy.tripfy.places.gateway.PlacesGateway;
import com.tripfy.tripfy.places.gateway.PlacesPaginationCache;
import com.tripfy.tripfy.places.model.Local;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchPlacesUseCase {

    private final PlacesGateway         placesGateway;
    private final PlacesPaginationCache paginationCache;

    public List<Local> execute(String location, int page, int limit) {

        String cacheKey = location.toLowerCase().replaceAll("\\s+", "_")
                          + ":limit=" + limit;

        List<Local> buffer = new ArrayList<>();

        paginationCache.getRemainingItems(cacheKey)
            .ifPresent(buffer::addAll);

        if (buffer.size() >= limit) {
            List<Local> result    = buffer.subList(0, limit);
            List<Local> remaining = new ArrayList<>(buffer.subList(limit, buffer.size()));

            paginationCache.save(
                cacheKey,
                remaining,
                paginationCache.getNextPageToken(cacheKey).orElse(null)
            );

            return result;
        }

        while (buffer.size() < limit) {
            PlacesGateway.PlacesResult result;

            if (page == 1 && buffer.isEmpty()) {
                result = placesGateway.searchByLocation(location);
            } else {
                var token = paginationCache.getNextPageToken(cacheKey);
                if (token.isEmpty()) break;
                result = placesGateway.searchByLocationWithToken(location, token.get());
            }

            buffer.addAll(result.places());

            result.nextPageToken().ifPresentOrElse(
                token -> paginationCache.save(cacheKey, List.of(), token),
                ()    -> paginationCache.evict(cacheKey)
            );

            if (result.places().isEmpty()) break;
        }

        int        toReturn  = Math.min(limit, buffer.size());
        List<Local> result    = buffer.subList(0, toReturn);
        List<Local> remaining = new ArrayList<>(buffer.subList(toReturn, buffer.size()));

        paginationCache.save(
            cacheKey,
            remaining,
            paginationCache.getNextPageToken(cacheKey).orElse(null)
        );

        return result;
    }
}
