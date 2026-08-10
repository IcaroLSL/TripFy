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
    name: 'Restaurantes e Cafés',
    icon: '🍽',
    tags: [
      // Cafés, padarias e doces
      'cafe', 'cafeteria', 'coffee_shop', 'coffee_roastery', 'coffee_stand',
      'cat_cafe', 'dog_cafe', 'bakery', 'pastry_shop', 'cake_shop',
      'chocolate_factory', 'chocolate_shop', 'candy_store', 'confectionery',
      'ice_cream_shop', 'donut_shop', 'dessert_shop', 'dessert_restaurant',
      'juice_shop', 'tea_house', 'deli', 'sandwich_shop', 'bagel_shop', 'acai_shop',
      // Restaurantes por culinária
      'afghani_restaurant', 'african_restaurant', 'american_restaurant',
      'argentinian_restaurant', 'asian_fusion_restaurant', 'asian_restaurant',
      'australian_restaurant', 'austrian_restaurant', 'bangladeshi_restaurant',
      'basque_restaurant', 'bavarian_restaurant', 'belgian_restaurant',
      'brazilian_restaurant', 'british_restaurant', 'burmese_restaurant',
      'cajun_restaurant', 'californian_restaurant', 'cambodian_restaurant',
      'cantonese_restaurant', 'caribbean_restaurant', 'chilean_restaurant',
      'chinese_noodle_restaurant', 'chinese_restaurant', 'colombian_restaurant',
      'croatian_restaurant', 'cuban_restaurant', 'czech_restaurant',
      'danish_restaurant', 'dim_sum_restaurant', 'dumpling_restaurant',
      'dutch_restaurant', 'eastern_european_restaurant', 'ethiopian_restaurant',
      'european_restaurant', 'filipino_restaurant', 'french_restaurant',
      'fusion_restaurant', 'german_restaurant', 'greek_restaurant',
      'hawaiian_restaurant', 'hungarian_restaurant', 'indian_restaurant',
      'north_indian_restaurant', 'south_indian_restaurant', 'indonesian_restaurant',
      'irish_restaurant', 'israeli_restaurant', 'italian_restaurant',
      'japanese_restaurant', 'japanese_curry_restaurant', 'japanese_izakaya_restaurant',
      'korean_restaurant', 'korean_barbecue_restaurant', 'latin_american_restaurant',
      'lebanese_restaurant', 'malaysian_restaurant', 'mediterranean_restaurant',
      'mexican_restaurant', 'middle_eastern_restaurant', 'mongolian_barbecue_restaurant',
      'moroccan_restaurant', 'pakistani_restaurant', 'persian_restaurant',
      'peruvian_restaurant', 'polish_restaurant', 'portuguese_restaurant',
      'romanian_restaurant', 'russian_restaurant', 'scandinavian_restaurant',
      'soul_food_restaurant', 'south_american_restaurant', 'southwestern_us_restaurant',
      'spanish_restaurant', 'sri_lankan_restaurant', 'swiss_restaurant',
      'taiwanese_restaurant', 'tex_mex_restaurant', 'thai_restaurant',
      'tibetan_restaurant', 'turkish_restaurant', 'ukrainian_restaurant',
      'vegan_restaurant', 'vegetarian_restaurant', 'vietnamese_restaurant',
      'western_restaurant', 'yakiniku_restaurant', 'yakitori_restaurant',
      // Formatos e ocasiões
      'restaurant', 'fine_dining_restaurant', 'family_restaurant', 'buffet_restaurant',
      'fast_food_restaurant', 'diner', 'breakfast_restaurant', 'brunch_restaurant',
      'bistro', 'food_court', 'barbecue_restaurant', 'steak_house', 'seafood_restaurant',
      'oyster_bar_restaurant', 'sushi_restaurant', 'ramen_restaurant', 'noodle_shop',
      'hamburger_restaurant', 'pizza_restaurant', 'pizza_delivery', 'taco_restaurant',
      'burrito_restaurant', 'chicken_restaurant', 'chicken_wings_restaurant',
      'hot_dog_restaurant', 'hot_dog_stand', 'hot_pot_restaurant', 'fondue_restaurant',
      'tapas_restaurant', 'gyro_restaurant', 'kebab_shop', 'shawarma_restaurant',
      'falafel_restaurant', 'halal_restaurant', 'snack_bar', 'soup_restaurant',
      'salad_shop', 'meal_delivery', 'meal_takeaway',
      // Vinícolas e degustação
      'winery', 'vineyard',
    ],
  },
  {
    name: 'Museus e Cultura',
    icon: '🏛',
    tags: [
      'museum', 'art_museum', 'history_museum', 'art_gallery',
      'art_studio', 'cultural_center', 'planetarium',
    ],
  },
  {
    name: 'Atividades ao Ar Livre',
    icon: '🥾',
    tags: [
      // Trilhas e natureza
      'hiking_area', 'scenic_spot', 'observation_deck', 'woods', 'mountain_peak',
      'lake', 'river', 'wildlife_refuge',
      // Aventura e passeio
      'adventure_sports_center', 'cycling_park', 'go_karting_venue', 'off_roading_area',
      'paintball_center', 'skateboard_park', 'marina',
      // Esportes
      'golf_course', 'ski_resort', 'ice_skating_rink', 'swimming_pool', 'tennis_court',
      'fishing_charter', 'fishing_pier', 'fishing_pond', 'arena', 'stadium', 'race_course',
    ],
  },
  {
    name: 'Praias e Ilhas',
    icon: '🏖',
    tags: ['beach', 'island'],
  },
  {
    name: 'Parques',
    icon: '🌳',
    tags: [
      'park', 'city_park', 'national_park', 'state_park', 'nature_preserve',
      'garden', 'botanical_garden', 'picnic_ground', 'barbecue_area',
    ],
  },
  {
    name: 'Vida Noturna',
    icon: '🌃',
    tags: [
      // Bares e afins
      'bar', 'bar_and_grill', 'pub', 'irish_pub', 'gastropub', 'sports_bar',
      'cocktail_bar', 'wine_bar', 'beer_garden', 'brewery', 'brewpub',
      'hookah_bar', 'lounge_bar',
      // Balada e casa noturna
      'night_club', 'dance_hall', 'casino', 'karaoke',
      // Shows
      'comedy_club', 'live_music_venue', 'concert_hall', 'philharmonic_hall',
      'opera_house', 'performing_arts_theater', 'auditorium', 'amphitheatre',
    ],
  },
  {
    name: 'Compras',
    icon: '🛍',
    tags: [
      'shopping_mall', 'market', 'flea_market', 'farmers_market', 'department_store',
      'general_store', 'warehouse_store', 'gift_shop', 'clothing_store',
      'womens_clothing_store', 'jewelry_store', 'book_store', 'thrift_store',
      'toy_store', 'cosmetics_store', 'tea_store',
    ],
  },
  {
    name: 'Lugares Históricos',
    icon: '🏺',
    tags: [
      // Monumentos e marcos
      'monument', 'historical_place', 'historical_landmark', 'cultural_landmark',
      'castle', 'sculpture', 'fountain', 'plaza',
      // Templos e locais de culto
      'church', 'mosque', 'synagogue', 'hindu_temple', 'buddhist_temple', 'shinto_shrine',
    ],
  },
];