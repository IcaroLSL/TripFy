package com.tripfy.tripfy.places.usecase;

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

    public PlacesPageResult execute(String userId, String location, int page, int limit, List<String> types, Double minRating, List<Integer> priceLevels, String name) {

        String cacheKey = buildCacheKey(userId, location, limit, types, minRating, priceLevels, name);

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

            boolean hasMore = !remaining.isEmpty()
                || paginationCache.getNextPageToken(cacheKey).isPresent();

            return new PlacesPageResult(result, hasMore);
        }

        while (buffer.size() < limit) {
            PlacesGateway.PlacesResult result;

            if (page == 1 && buffer.isEmpty()) {
                result = placesGateway.searchByLocation(location, types, minRating, priceLevels, name);
            } else {
                var token = paginationCache.getNextPageToken(cacheKey);
                if (token.isEmpty()) break;
                result = placesGateway.searchByLocationWithToken(location, types, token.get(), minRating, priceLevels, name);
            }

            buffer.addAll(result.places());

            result.nextPageToken().ifPresentOrElse(
                token -> paginationCache.save(cacheKey, List.of(), token),
                ()    -> paginationCache.evict(cacheKey)
            );

            if (result.places().isEmpty()) break;
        }

        int         toReturn  = Math.min(limit, buffer.size());
        List<Local> result    = buffer.subList(0, toReturn);
        List<Local> remaining = new ArrayList<>(buffer.subList(toReturn, buffer.size()));

        paginationCache.save(
            cacheKey,
            remaining,
            paginationCache.getNextPageToken(cacheKey).orElse(null)
        );

        boolean hasMore = !remaining.isEmpty()
            || paginationCache.getNextPageToken(cacheKey).isPresent();

        return new PlacesPageResult(result, hasMore);
    }

    private String buildCacheKey(String userId, String location, int limit, List<String> types, Double minRating, List<Integer> priceLevels, String name) {
        String typesPart = (types == null || types.isEmpty()) ? "default" : types.stream().sorted().reduce((a, b) -> a + "-" + b).orElse("default");
        String ratingPart = (minRating == null) ? "none" : minRating.toString();
        String priceLevelsPart = (priceLevels == null || priceLevels.isEmpty()) ? "none" : priceLevels.stream().sorted().map(String::valueOf).reduce((a, b) -> a + "-" + b).orElse("none");
        String namePart = (name == null || name.isEmpty()) ? "none" : name.toLowerCase().replaceAll("\\s+", "_");

        return userId + ":"
            + location.toLowerCase().replaceAll("\\s+", "_")
            + ":limit=" + limit
            + ":types=" + typesPart
            + ":minRating=" + minRating
            + ":priceLevels=" + priceLevelsPart
            + ":name=" + namePart;
    }

    public record PlacesPageResult(List<Local> places, boolean hasMore) {}
}
