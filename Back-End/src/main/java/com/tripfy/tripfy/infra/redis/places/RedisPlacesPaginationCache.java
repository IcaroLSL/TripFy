package com.tripfy.tripfy.infra.redis.places;

import com.tripfy.tripfy.places.gateway.PlacesPaginationCache;
import com.tripfy.tripfy.places.model.Local;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisPlacesPaginationCache implements PlacesPaginationCache {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper        objectMapper;

    private static final Duration TTL = Duration.ofMinutes(10);

    private String itemsKey(String cacheKey) { return "places:items:" + cacheKey; }
    private String tokenKey(String cacheKey) { return "places:token:" + cacheKey; }

    @Override
    public void save(String cacheKey, List<Local> remainingItems, String nextPageToken) {
        try {
            String json = objectMapper.writeValueAsString(remainingItems);
            redisTemplate.opsForValue().set(itemsKey(cacheKey), json, TTL);

            if (nextPageToken != null) {
                redisTemplate.opsForValue().set(tokenKey(cacheKey), nextPageToken, TTL);
            }
        } catch (Exception e) {
            log.error("Erro ao salvar paginação no Redis", e);
        }
    }

    @Override
    public Optional<List<Local>> getRemainingItems(String cacheKey) {
        try {
            String json = redisTemplate.opsForValue().get(itemsKey(cacheKey));
            if (json == null) return Optional.empty();

            List<Local> items = objectMapper.readValue(
                json, new TypeReference<List<Local>>() {}
            );
            return Optional.of(items);
        } catch (Exception e) {
            log.error("Erro ao ler itens restantes do Redis", e);
            return Optional.empty();
        }
    }

    @Override
    public Optional<String> getNextPageToken(String cacheKey) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(tokenKey(cacheKey)));
    }

    @Override
    public void evict(String cacheKey) {
        redisTemplate.delete(itemsKey(cacheKey));
        redisTemplate.delete(tokenKey(cacheKey));
    }
}