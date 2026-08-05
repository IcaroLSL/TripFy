package com.tripfy.tripfy.places.gateway;

import com.tripfy.tripfy.places.dto.PlaceTypeCatalogDTO;

import jakarta.annotation.PostConstruct;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class PlaceTypeCatalog {

    private static final String CATALOG_PATH = "data/place-types.json";

    private PlaceTypeCatalogDTO catalog;
    private final Map<String, String> labelByKey = new HashMap<>();
    private final Set<String> validKeys = new HashSet<>();

    @PostConstruct
    void load() {
        ObjectMapper mapper = new ObjectMapper();

        try (InputStream is = new ClassPathResource(CATALOG_PATH).getInputStream()) {
            catalog = mapper.readValue(is, PlaceTypeCatalogDTO.class);
        } catch (IOException e) {
            throw new IllegalStateException("Não foi possível carregar " + CATALOG_PATH, e);
        }

        for (PlaceTypeCatalogDTO.Category category : catalog.categories()) {
            for (PlaceTypeCatalogDTO.Item item : category.types()) {
                labelByKey.put(item.key(), item.label());
                validKeys.add(item.key());
            }
        }
    }

    public PlaceTypeCatalogDTO catalog() {
        return catalog;
    }

    public boolean isValid(String type) {
        return validKeys.contains(type);
    }

    /** Mantém só os tipos reconhecidos, descartando silenciosamente o resto. */
    public List<String> filterValid(List<String> types) {
        if (types == null) return List.of();
        return types.stream().filter(this::isValid).distinct().toList();
    }

    /** Label em pt-BR pro tipo; se não estiver catalogado, "humaniza" a chave (snake_case -> texto). */
    public String label(String type) {
        String known = labelByKey.get(type);
        if (known != null) return known;

        return type.replace('_', ' ');
    }
}