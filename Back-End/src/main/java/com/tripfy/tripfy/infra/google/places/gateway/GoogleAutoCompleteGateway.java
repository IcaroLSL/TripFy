package com.tripfy.tripfy.infra.google.places.gateway;

import com.tripfy.tripfy.places.gateway.AutoCompleteGateway;
import com.tripfy.tripfy.places.dto.AutoCompleteResponse;
import com.tripfy.tripfy.infra.google.places.dto.GoogleAutoCompleteResponse;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URLEncoder;
import java.net.HttpURLConnection;
import java.net.URI;

import java.io.InputStream;

import java.nio.charset.StandardCharsets;

import java.util.List;

@Component
@Slf4j
public class GoogleAutoCompleteGateway implements AutoCompleteGateway {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${google.places.api-key}")
    private String apiKey;

    public GoogleAutoCompleteGateway(){
    }

    @Override
    public AutoCompleteResponse getAutoComplete(String input) {
        try {
            String url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?"
                    + "types=(cities)"
                    + "&fields=address_components,geometry,name"
                    + "&key=" + URLEncoder.encode(apiKey, StandardCharsets.UTF_8)
                    + "&input=" + URLEncoder.encode(input, StandardCharsets.UTF_8);

            HttpURLConnection connection = 
                (HttpURLConnection) URI.create(url).toURL().openConnection();

            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");

            int statusCode = connection.getResponseCode();

            if (statusCode < 200 || statusCode >= 300) {
                throw new IllegalStateException(
                        "Erro ao consultar autocomplete do Google. HTTP: " + statusCode
                );
            }

            try (InputStream inputStream = connection.getInputStream()) {

                GoogleAutoCompleteResponse googleResponse =
                        objectMapper.readValue(
                                inputStream,
                                GoogleAutoCompleteResponse.class
                        );

                if (!"OK".equals(googleResponse.status())) {
                    throw new IllegalStateException(
                            "Google Places retornou status: "
                                    + googleResponse.status()
                    );
                }

                List<String> placeNames =
                        googleResponse.predictions()
                                .stream()
                                .map(GoogleAutoCompleteResponse.Prediction::description)
                                .toList();

                return new AutoCompleteResponse(placeNames);
            }

        } catch (Exception exception) {

            log.error(
                    "Erro ao consultar Google Places Autocomplete",
                    exception
            );

            throw new IllegalStateException(
                    "Erro ao consultar autocomplete do Google",
                    exception
            );
        }
    }
}