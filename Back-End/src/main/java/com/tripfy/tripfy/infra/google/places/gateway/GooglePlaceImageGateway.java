package com.tripfy.tripfy.infra.google.places.gateway;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.tripfy.tripfy.places.dto.PlaceImageResponse;
import com.tripfy.tripfy.places.gateway.PlaceImageGateway;

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
public class GooglePlaceImageGateway implements PlaceImageGateway {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${google.places.api-key}")
    private String apiKey;

    public GooglePlaceImageGateway() {
    }
    
    @Override
    public PlaceImageResponse getImageByPlace(String photoReference) {

        try {
            String url = "https://places.googleapis.com/v1/" 
                    + photoReference 
                    + "/media?maxHeightPx=400&maxWidthPx=400&skipHttpRedirect=true"
                    + "&key=" + URLEncoder.encode(apiKey, StandardCharsets.UTF_8);

            HttpURLConnection connection =
                    (HttpURLConnection) URI.create(url).toURL().openConnection();

            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");

            int statusCode = connection.getResponseCode();

            if (statusCode < 200 || statusCode >= 300) {
                throw new IllegalStateException(
                        "Erro ao consultar Google Geocoding Image. HTTP status: " + statusCode
                );
            }

            String response;

            try (var inputStream = connection.getInputStream()) {
                response = new String(
                        inputStream.readAllBytes(),
                        StandardCharsets.UTF_8
                );
            }

            return extractUrlImage(response);
        } catch (IOException e) {
            throw new IllegalStateException(
                    "Erro ao consultar API de geocodificação do Google",
                    e
            );
        }
    }

    private PlaceImageResponse extractUrlImage(String response) {

        try {
            JsonNode responseNode = objectMapper.readTree(response);

            JsonNode photoUriNode = responseNode.get("photoUri");

            if (photoUriNode == null || photoUriNode.isNull()) {
                throw new IllegalStateException(
                        "Nenhuma URL encontrada para a imagem"
                );
            }

            String imageUrl = photoUriNode.asText();

            return new PlaceImageResponse(imageUrl);

        } catch (Exception e) {
            throw new IllegalStateException(
                    "Erro ao processar resposta de imagem do Google Places",
                    e
            );
        }
    }
}