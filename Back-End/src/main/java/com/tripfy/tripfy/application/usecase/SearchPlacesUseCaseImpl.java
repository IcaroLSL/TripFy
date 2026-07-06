package com.tripfy.tripfy.application.usecase;

import com.tripfy.tripfy.domain.model.Local;
import com.tripfy.tripfy.domain.port.input.SearchPlacesUseCase;
import com.tripfy.tripfy.domain.port.output.PlacesGateway;
import com.tripfy.tripfy.domain.port.output.PlacesPaginationCache;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchPlacesUseCaseImpl implements SearchPlacesUseCase {

    private final PlacesGateway          placesGateway;
    private final PlacesPaginationCache  paginationCache;

    @Override
    public List<Local> execute(String location, int page, int limit) {

        // Chave única para essa combinação de busca
        String cacheKey = location.toLowerCase().replaceAll("\\s+", "_")
                          + ":limit=" + limit;

        List<Local> buffer = new ArrayList<>();

        // Tenta reaproveitar itens que sobraram da chamada anterior
        paginationCache.getRemainingItems(cacheKey)
            .ifPresent(buffer::addAll);

        // Se o buffer já tem itens suficientes, devolve direto
        if (buffer.size() >= limit) {
            List<Local> result = buffer.subList(0, limit);
            List<Local> remaining = new ArrayList<>(buffer.subList(limit, buffer.size()));

            // Atualiza o que sobrou no cache
            paginationCache.save(
                cacheKey,
                remaining,
                paginationCache.getNextPageToken(cacheKey).orElse(null)
            );

            return result;
        }

        // Busca mais dados no Google até completar o limit
        while (buffer.size() < limit) {
            PlacesGateway.PlacesResult result;

            // Primeira página ou páginas seguintes (com token)
            if (page == 1 && buffer.isEmpty()) {
                result = placesGateway.searchByLocation(location);
            } else {
                var token = paginationCache.getNextPageToken(cacheKey);
                if (token.isEmpty()) break; // Não há mais páginas no Google
                result = placesGateway.searchByLocationWithToken(location, token.get());
            }

            buffer.addAll(result.places());

            // Guarda o token para o próximo lote
            result.nextPageToken().ifPresentOrElse(
                token -> paginationCache.save(cacheKey, List.of(), token),
                ()    -> paginationCache.evict(cacheKey) // Acabaram os resultados
            );

            // Se a API não retornou mais nada, para
            if (result.places().isEmpty()) break;
        }

        // Separa o que vai ser retornado do que fica no buffer
        int toReturn = Math.min(limit, buffer.size());
        List<Local> result = buffer.subList(0, toReturn);
        List<Local> remaining = new ArrayList<>(buffer.subList(toReturn, buffer.size()));

        // Salva o excedente para a próxima chamada
        paginationCache.save(
            cacheKey,
            remaining,
            paginationCache.getNextPageToken(cacheKey).orElse(null)
        );

        return result;
    }
}