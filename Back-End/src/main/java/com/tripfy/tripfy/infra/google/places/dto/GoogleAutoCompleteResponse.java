package com.tripfy.tripfy.infra.google.places.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GoogleAutoCompleteResponse(
        List<Prediction> predictions,
        String status
) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Prediction(
            String description,
            List<MatchedSubstring> matched_substrings,
            String place_id,
            String reference,
            StructuredFormatting structured_formatting,
            List<Term> terms,
            List<String> types
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record MatchedSubstring(Integer length, Integer offset) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record StructuredFormatting(String main_text, List<MainTextMatchedSubstring> main_text_matched_substrings, String secondary_text) {}
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record MainTextMatchedSubstring(Integer length, Integer offset) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Term(Integer offset, String value) {}
}