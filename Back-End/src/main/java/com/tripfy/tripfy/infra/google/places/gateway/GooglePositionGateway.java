package com.tripfy.tripfy.infra.google.places.gateway;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripfy.tripfy.places.dto.PositionResponse;
import com.tripfy.tripfy.places.gateway.PositionGateway;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@Slf4j
public class GooglePositionGateway implements PositionGateway {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${google.places.api-key}")
    private String apiKey;

    public GooglePositionGateway() {
    }
    
    @Override
    public PositionResponse getPosition(String latitude, String longitude) {

        try {
            String url = "https://geocode.googleapis.com/v4/geocode/location"
                    + "?location.latitude=" + URLEncoder.encode(latitude, StandardCharsets.UTF_8)
                    + "&location.longitude=" + URLEncoder.encode(longitude, StandardCharsets.UTF_8);

            HttpURLConnection connection =
                    (HttpURLConnection) URI.create(url).toURL().openConnection();

            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("X-Goog-Api-Key", apiKey);

            int statusCode = connection.getResponseCode();

            if (statusCode < 200 || statusCode >= 300) {
                throw new IllegalStateException(
                        "Erro ao consultar Google Geocoding. HTTP status: " + statusCode
                );
            }

            String response;

            try (var inputStream = connection.getInputStream()) {
                response = new String(
                        inputStream.readAllBytes(),
                        StandardCharsets.UTF_8
                );
            }

            return extractCity(response);

        } catch (IOException e) {
            throw new IllegalStateException(
                    "Erro ao consultar API de geocodificação do Google",
                    e
            );
        }
    }

    private PositionResponse extractCity(String response) {

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode results = root.get("results");

            if (results == null || !results.isArray()) {
                throw new IllegalStateException(
                        "Nenhum resultado encontrado para a posição"
                );
            }

            for (JsonNode result : results) {

                JsonNode addressComponents =
                        result.get("addressComponents");

                if (addressComponents == null ||
                        !addressComponents.isArray()) {
                    continue;
                }

                for (JsonNode component : addressComponents) {

                    JsonNode types = component.get("types");

                    if (types == null || !types.isArray()) {
                        continue;
                    }

                    for (JsonNode type : types) {

                        if ("locality".equals(type.asText())) {

                            String city =
                                    component.get("longText").asText();

                            return new PositionResponse(city);
                        }
                    }
                }
            }

            throw new IllegalStateException(
                    "Cidade não encontrada para a posição"
            );

        } catch (Exception e) {
            throw new IllegalStateException(
                    "Erro ao processar resposta de geocodificação",
                    e
            );
        }
    }
}
