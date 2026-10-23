package com.tripfy.tripfy.travelroute.usecase;

import com.tripfy.tripfy.common.exception.InvalidRequestException;
import com.tripfy.tripfy.travelroute.dto.CreateTravelRouteRequest;
import com.tripfy.tripfy.travelroute.dto.CreateTravelRouteResponse;
import com.tripfy.tripfy.travelroute.gateway.ItineraryRepository;
import com.tripfy.tripfy.travelroute.gateway.TravelRouteRepository;
import com.tripfy.tripfy.travelroute.model.Itinerary;
import com.tripfy.tripfy.travelroute.model.TravelRoute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateTravelRouteUseCase {

    private static final ZoneId ZONE = ZoneId.of("America/Sao_Paulo");

    private final TravelRouteRepository travelRouteRepository;
    private final ItineraryRepository   itineraryRepository;

    @Value("${tripfy.travel-route.default-cover-image}")
    private String defaultCoverImage;

    public CreateTravelRouteResponse execute(CreateTravelRouteRequest request, String userId) {

        // 1. Regra de dias
        LocalDate start = request.beginningDate().atZone(ZONE).toLocalDate();
        LocalDate end   = request.endingDate().atZone(ZONE).toLocalDate();

        if (end.isBefore(start)) {
            throw new InvalidRequestException("endingDate não pode ser anterior a beginningDate");
        }

        long days = ChronoUnit.DAYS.between(start, end) + 1;
        if (request.places().size() != days) {
            throw new InvalidRequestException(
                "places tem " + request.places().size() + " dia(s), mas o período tem " + days);
        }

        for (int i = 0; i < request.places().size(); i++) {
            validateDay(i, request.places().get(i));
        }

        // 2. Donos: o usuário do token sempre é o primeiro
        Set<String> owners = new LinkedHashSet<>();
        owners.add(userId);
        if (request.ownersId() != null) owners.addAll(request.ownersId());

        // 3. Monta o travelRoute
        List<TravelRoute.Day> places = request.places().stream()
        .map(d -> new TravelRoute.Day(
            toActivities(d.earlyMorning()), toActivities(d.morning()),
            toActivities(d.afternoon()), toActivities(d.night())))
        .toList();

        String cover = (request.coverImage() == null || request.coverImage().isBlank())
            ? defaultCoverImage
            : request.coverImage();

        Instant now = Instant.now();

        TravelRoute saved = travelRouteRepository.insert(new TravelRoute(
            null, request.name(), List.copyOf(owners), places, cover,
            request.location(), request.category(), List.of(),
            request.priceLevel(), now, now
        ));

        // 4. Monta o itinerary; se falhar, desfaz o travelRoute
        try {
            Itinerary itinerary = itineraryRepository.insert(new Itinerary(
                null, saved.id(), userId,
                request.beginningDate(), request.endingDate(), now, now
            ));
            return new CreateTravelRouteResponse(saved.id(), itinerary.id());
        } catch (RuntimeException e) {
            log.error("Falha ao criar itinerary; removendo travelRoute {}", saved.id(), e);
            travelRouteRepository.deleteById(saved.id());
            throw e;
        }
    }

    private void validateDay(int dayIndex, CreateTravelRouteRequest.Day d) {
        validatePeriod(dayIndex, "earlyMorning", 0, 5, d.earlyMorning());
        validatePeriod(dayIndex, "morning", 5, 12, d.morning());
        validatePeriod(dayIndex, "afternoon", 12, 18, d.afternoon());
        validatePeriod(dayIndex, "night", 18, 24, d.night());
    }

    private void validatePeriod(int dayIndex, String period, int fromHour, int toHour,
                                List<CreateTravelRouteRequest.Activity> activities) {
        for (CreateTravelRouteRequest.Activity a : activities) {
            LocalTime start = LocalTime.parse(a.startTime());
            LocalTime end   = LocalTime.parse(a.endTime());

            if (start.getHour() < fromHour || start.getHour() >= toHour) {
                throw new InvalidRequestException(
                    "Dia " + (dayIndex + 1) + ": a atividade " + a.placeId()
                    + " começa às " + a.startTime() + " e não pertence ao período " + period);
            }
            if (!end.isAfter(start)) {
                throw new InvalidRequestException(
                    "Dia " + (dayIndex + 1) + ": endTime da atividade " + a.placeId()
                    + " deve ser maior que startTime");
            }
        }
    }

    private List<TravelRoute.Activity> toActivities(List<CreateTravelRouteRequest.Activity> list) {
        return list.stream()
            .map(a -> new TravelRoute.Activity(a.placeId(), a.startTime(), a.endTime()))
            .toList();
    }
}
