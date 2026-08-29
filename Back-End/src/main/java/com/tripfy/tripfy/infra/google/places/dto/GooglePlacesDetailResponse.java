package com.tripfy.tripfy.infra.google.places.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GooglePlacesDetailResponse(
    PlaceDTO place
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record PlaceDTO(
        String              id,
        String              phoneNumber,
        String              formattedAddress,
        Double              rating,
        PriceLevel          priceLevel,
        DisplayName         displayName,
        CurrentOpeningHours currentOpeningHours,           
        List<Photos>        photos,
        boolean             allowsDogs ,
        PriceRange          priceRange
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record DisplayName(String text) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record CurrentOpeningHours(List<String> weekdayDescriptions) {}
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Photos(List<AuthorAttributions> authorAttributions) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record AuthorAttributions(String photoUri) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record PriceRange(Price startPrice, Price endPrice) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Price(String currencyCode, String units) {}
}

// exemplo:
// {
//     "id": "ChIJPXDyCV7xuJQR5Ml6ubz1sVI",
//     "internationalPhoneNumber": "+55 16 3311-6746",
//     "formattedAddress": "R. São Bento, 2149 - Centro, Araraquara - SP, 14801-320, Brazil",
//     "rating": 4.6,
//     "priceLevel": "PRICE_LEVEL_MODERATE",
//     "displayName": {
//         "text": "Restaurante Leitoa & Cia",
//         "languageCode": "pt"
//     },
//     "currentOpeningHours": {
//         "weekdayDescriptions": [
//             "Monday: 11:00 AM – 3:00 PM",
//             "Tuesday: 11:00 AM – 3:00 PM",
//             "Wednesday: 11:00 AM – 3:00 PM",
//             "Thursday: 11:00 AM – 3:00 PM",
//             "Friday: 11:00 AM – 3:00 PM",
//             "Saturday: 11:00 AM – 3:00 PM",
//             "Sunday: 11:00 AM – 3:00 PM"
//         ]
//     },
//     "photos": [
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjVqPlBibO7QakcYth-WXhzhjBofgh-9BGKJfgqvghtk0GRi8h3l=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjVqPlBibO7QakcYth-WXhzhjBofgh-9BGKJfgqvghtk0GRi8h3l=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjXvuBgs_Q5I-oOyHWwbwyslZaS2y2bEm1szBdkIVAjKhrOab2Ru=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjVqPlBibO7QakcYth-WXhzhjBofgh-9BGKJfgqvghtk0GRi8h3l=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjVqPlBibO7QakcYth-WXhzhjBofgh-9BGKJfgqvghtk0GRi8h3l=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjVAl_CsdqKtwkqDseJnHJOImfUrvHcT1X31I5img4AqgonTg3a2UQ=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjX0YY5jOvcWHn588bO24D60X2cJFJ_M0Ls38rdiuogJN01Y-xLz=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a/ACg8ocKfcNdKNRst1LkYBqRTaa5KgNrnyjBz_8Y6m5SYy9xSsfslIQ=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjVhJsLZxKKrbJL_p0slOYbPl3LiO8vjI9AFHqZmkgbSwMTMqvgo=s100-p-k-no-mo"
//                 }
//             ]
//         },
//         {
//             "authorAttributions": [
//                 {
//                     "photoUri": "https://lh3.googleusercontent.com/a-/ALV-UjXvuBgs_Q5I-oOyHWwbwyslZaS2y2bEm1szBdkIVAjKhrOab2Ru=s100-p-k-no-mo"
//                 }
//             ]
//         }
//     ],
//     "allowsDogs": false,
//     "priceRange": {
//         "startPrice": {
//             "currencyCode": "BRL",
//             "units": "20"
//         },
//         "endPrice": {
//             "currencyCode": "BRL",
//             "units": "40"
//         }
//     }
// }