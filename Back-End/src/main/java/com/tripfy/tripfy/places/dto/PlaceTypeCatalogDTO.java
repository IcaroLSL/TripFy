package com.tripfy.tripfy.places.dto;

import java.util.List;

public record PlaceTypeCatalogDTO(List<Category> categories) {

    public record Category(String key, String label, List<Item> types) {}

    public record Item(String key, String label) {}
}
