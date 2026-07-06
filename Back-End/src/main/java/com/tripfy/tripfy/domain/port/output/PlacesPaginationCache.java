package com.tripfy.tripfy.domain.port.output;

import com.tripfy.tripfy.domain.model.Local;
import java.util.List;
import java.util.Optional;

public interface PlacesPaginationCache {

    // Salva itens que sobraram do lote atual + token para próximo lote
    void save(String cacheKey, List<Local> remainingItems, String nextPageToken);

    // Busca itens restantes do lote atual
    Optional<List<Local>> getRemainingItems(String cacheKey);

    // Busca token para chamar próximo lote no Google
    Optional<String> getNextPageToken(String cacheKey);

    // Remove entradas antigas
    void evict(String cacheKey);
}