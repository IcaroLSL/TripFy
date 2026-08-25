package com.tripfy.tripfy.places.endpoint;

import com.tripfy.tripfy.infra.jwt.auth.AuthenticatedUser;
import com.tripfy.tripfy.places.dto.PlaceResponse;
import com.tripfy.tripfy.places.dto.SearchPlacesResponse;
import com.tripfy.tripfy.places.model.Local;
import com.tripfy.tripfy.places.usecase.SearchPlacesUseCase;
import com.tripfy.tripfy.places.usecase.SearchPlacesUseCase.PlacesPageResult;
import com.tripfy.tripfy.places.utils.PlaceResponseMapper;
import com.tripfy.tripfy.places.dto.PlaceTypeCatalogDTO;
import com.tripfy.tripfy.places.gateway.PlaceTypeCatalog;
import com.tripfy.tripfy.places.dto.PositionResponse;
import com.tripfy.tripfy.places.gateway.PositionGateway;
import com.tripfy.tripfy.places.dto.PlaceImageResponse;
import com.tripfy.tripfy.places.gateway.PlaceImageGateway;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

import java.util.List;

@RestController
@RequestMapping("/v1")
public class PlacesController {

    private final SearchPlacesUseCase searchPlacesUseCase;
    private final PlaceTypeCatalog placeTypeCatalog;
    private final PositionGateway positionGateway;
    private final PlaceImageGateway placeImageGateway;

    public PlacesController(SearchPlacesUseCase searchPlacesUseCase, PlaceTypeCatalog placeTypeCatalog, PositionGateway positionGateway, PlaceImageGateway placeImageGateway) {
        this.searchPlacesUseCase = searchPlacesUseCase;
        this.placeTypeCatalog = placeTypeCatalog;
        this.positionGateway = positionGateway;
        this.placeImageGateway = placeImageGateway;
    }

    @GetMapping("/places")
    public ResponseEntity<SearchPlacesResponse> search(
            @RequestParam String location,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) List<String> types,
            @RequestParam(required = false) @DecimalMin(value = "0.0", message = "minRating deve ser maior ou igual a 0.0") @DecimalMax(value = "5.0", message = "minRating deve ser menor ou igual a 5.0") Double minRating,
            @RequestParam(required = false) List<@Min(value = 0, message = "priceLevel deve ser maior ou igual a 0") @Max(value = 4, message = "priceLevel deve ser menor ou igual a 4") Integer> priceLevels,
            @AuthenticationPrincipal AuthenticatedUser user) {
        
        System.out.println("chamando endpoint de busca de lugares");

        List<String> validTypes = placeTypeCatalog.filterValid(types);
        PlacesPageResult pageResult = searchPlacesUseCase.execute(user.id(), location, page, limit, validTypes, minRating, priceLevels);

        List<PlaceResponse> places = pageResult.places().stream().map(PlaceResponseMapper::toResponse).toList();

        return ResponseEntity.ok(new SearchPlacesResponse(places, page, limit, pageResult.hasMore()));
    }

    @GetMapping("/places/types")
    public ResponseEntity<PlaceTypeCatalogDTO> list() {
        System.out.println("chamando endpoint de listagem de tipos de lugares");

        return ResponseEntity.ok(placeTypeCatalog.catalog());
    }

    @GetMapping("/places/position")
    public ResponseEntity<PositionResponse> getCityByPosition(
            @RequestParam String latitude,
            @RequestParam String longitude,
            @AuthenticationPrincipal AuthenticatedUser user) {

        System.out.println("chamando endpoint de busca de lugar por posição");

        PositionResponse positionResponse =
                positionGateway.getPosition(latitude, longitude);

        return ResponseEntity.ok(positionResponse);
    }

    @GetMapping("/places/image")
    public ResponseEntity<PlaceImageResponse> getImageByPlace(
            @RequestParam String photoReference,
            @AuthenticationPrincipal AuthenticatedUser user) {
        
        System.out.println("chamando endpoint de busca de imagem por lugar");

        PlaceImageResponse placeImageResponse =
                placeImageGateway.getImageByPlace(photoReference);

        return ResponseEntity.ok(placeImageResponse);
    }

}
