/**
 * Categorias de atividade do Tripfy (BR001 — domain.roteiro.CategoriaAtividade)
 * mapeadas para tipos reais da Google Places API (New) — Table A.
 *
 * Fonte: mapeamento-categorias-google-places.md
 * Gerado a partir da análise das 8 categorias da Etapa 2 (Criação de roteiro).
 */

import { Text } from "react-native";

export type CategoriaAtividade = {
  name: string;
  tags: string[];
  icon: string
};

export const CATEGORIAS_ATIVIDADE: CategoriaAtividade[] = [
  {
    name: 'Comida e Bebida',
    icon: '🍽',
    tags: [
      "restaurant",
      "bar",
      "cafe",
      "bakery",
      "fast_food_restaurant",
      "pizza_restaurant",
      "seafood_restaurant",
      "steak_house",
      "sushi_restaurant",
      "japanese_restaurant",
      "italian_restaurant",
      "chinese_restaurant",
      "mexican_restaurant",
      "french_restaurant",
      "indian_restaurant",
      "thai_restaurant",
      "vegetarian_restaurant",
      "vegan_restaurant",
      "brazilian_restaurant",
      "coffee_shop",
      "ice_cream_shop",
      "dessert_shop",
      "wine_bar",
      "brewery",
      "pub",
      "night_club",
      "cocktail_bar",
      "food_court",
      "buffet_restaurant",
      "breakfast_restaurant",
      "brunch_restaurant",
      "fine_dining_restaurant",
      "diner",
      "juice_shop",
      "tea_house",
      "candy_store"
    ],
  },
  {
    name: 'Hospedagem',
    icon: '🏨',
    tags: [
      "hotel",
      "motel",
      "hostel",
      "inn",
      "resort_hotel",
      "bed_and_breakfast",
      "guest_house",
      "campground",
      "cottage",
      "extended_stay_hotel",
      "lodging",
      "rv_park",
      "private_guest_room",
      "farmstay"
    ]
  },
  {
    name: 'Entretenimento e Recriação',
    icon: '🎭',
    tags: [
      "tourist_attraction",
      "amusement_park",
      "water_park",
      "zoo",
      "aquarium",
      "movie_theater",
      "casino",
      "bowling_alley",
      "karaoke",
      "amphitheatre",
      "concert_hall",
      "park",
      "botanical_garden",
      "national_park",
      "state_park",
      "hiking_area",
      "picnic_ground",
      "dog_park",
      "skateboard_park",
      "playground",
      "observation_deck",
      "ferris_wheel",
      "amusement_center",
      "video_arcade",
      "comedy_club",
      "opera_house",
      "philharmonic_hall",
      "performing_arts_theater",
      "wildlife_park",
      "wildlife_refuge",
      "event_venue",
      "wedding_venue",
      "marina",
      "visitor_center",
      "historical_landmark",
      "cultural_center",
      "community_center",
      "planetarium",
      "garden",
      "plaza"
    ]
  },
  {
    name: 'Museus e Cultura',
    icon: '🏛',
    tags: [
      "museum",
      "art_gallery",
      "historical_place",
      "monument",
      "sculpture",
      "art_museum",
      "history_museum",
      "cultural_landmark",
      "auditorium",
      "art_studio",
      "castle",
      "fountain"
    ]
  },
  {
    name: 'Atividades ao Ar Livre',
    icon: '🥾',
    tags: [
      "beach",
      "island",
      "lake",
      "river",
      "mountain_peak",
      "nature_preserve",
      "scenic_spot",
      "woods"
    ]
  },
  {
    name: 'Locais de Culto',
    icon: '⛪',
    tags: [
      "church",
      "mosque",
      "synagogue",
      "hindu_temple",
      "buddhist_temple",
      "shinto_shrine"
    ],
  },
  {
    name: 'Esportes',
    icon: '🏟',
    tags: [
      "stadium",
      "arena",
      "gym",
      "fitness_center",
      "golf_course",
      "swimming_pool",
      "tennis_court",
      "ski_resort",
      "ice_skating_rink",
      "sports_complex",
      "sports_club",
      "athletic_field",
      "race_course",
      "fishing_pier",
      "cycling_park"
    ],
  },
  {
    name: 'Transporte',
    icon: '🚉',
    tags: [
      "airport",
      "international_airport",
      "train_station",
      "subway_station",
      "bus_station",
      "ferry_terminal",
      "taxi_stand",
      "bike_sharing_station"
    ]
  },
  {
    name: 'Compras',
    icon: '🛍',
    tags: [
      "shopping_mall",
      "market",
      "farmers_market",
      "flea_market",
      "department_store",
      "gift_shop",
      "jewelry_store",
      "book_store",
      "clothing_store",
      "shoe_store",
      "supermarket",
      "convenience_store"
    ],
  }
];