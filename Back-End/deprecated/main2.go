package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

const apiKey = "AIzaSyBLkTY80yl7SK931yWMg48DIVvS1K8E5c0"

// ===================================================
// Defina aqui a cidade que deseja buscar.
// Pode ser só o nome ("Campinas") ou "Cidade, Estado"
// para mais precisão (recomendado quando há cidades
// com nomes parecidos em estados diferentes).
// Exemplos: "Campinas, SP" | "Rio de Janeiro, RJ"
// ===================================================
var cidade = "Araraquara, SP"

// ===================================================
// Defina quais campos deseja exibir no resultado.
// true = exibir / false = ocultar
// ===================================================
var (
	exibirNome        = true
	exibirEndereco    = true
	exibirTipo        = true
	exibirValor       = true
	exibirAvaliacao   = true
	exibirTelefone    = false
	exibirSite        = false
	exibirCoordenadas = false
)

type GeocodeResponse struct {
	Results []struct {
		Geometry struct {
			Location struct {
				Lat float64 `json:"lat"`
				Lng float64 `json:"lng"`
			} `json:"location"`
		} `json:"geometry"`
	} `json:"results"`
	Status string `json:"status"`
}

func buscarCoordenadas(cidade string) (float64, float64, error) {
	endpoint := "https://maps.googleapis.com/maps/api/geocode/json"
	params := url.Values{}
	params.Set("address", cidade)
	params.Set("key", apiKey)

	resp, err := http.Get(endpoint + "?" + params.Encode())
	if err != nil {
		return 0, 0, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var geo GeocodeResponse
	if err := json.Unmarshal(body, &geo); err != nil {
		return 0, 0, err
	}

	if geo.Status != "OK" || len(geo.Results) == 0 {
		return 0, 0, fmt.Errorf("não foi possível encontrar coordenadas para %s (status: %s)", cidade, geo.Status)
	}

	loc := geo.Results[0].Geometry.Location
	return loc.Lat, loc.Lng, nil
}

type PlaceRequest struct {
	IncludedTypes       []string `json:"includedTypes"`
	MaxResultCount      int      `json:"maxResultCount"`
	LocationRestriction struct {
		Circle struct {
			Center struct {
				Latitude  float64 `json:"latitude"`
				Longitude float64 `json:"longitude"`
			} `json:"center"`
			Radius float64 `json:"radius"`
		} `json:"circle"`
	} `json:"locationRestriction"`
}

type Place struct {
	DisplayName struct {
		Text string `json:"text"`
	} `json:"displayName"`
	FormattedAddress    string   `json:"formattedAddress"`
	Types               []string `json:"types"`
	NationalPhoneNumber string   `json:"nationalPhoneNumber"`
	WebsiteURI          string   `json:"websiteUri"`
	Rating              float64  `json:"rating"`
	PriceLevel          int      `json:"priceLevel"`
	Location            struct {
		Latitude  float64 `json:"latitude"`
		Longitude float64 `json:"longitude"`
	} `json:"location"`
}

type PlaceResponse struct {
	Places []Place `json:"places"`
}

func buscarLugares(lat, lon float64, tipo string) ([]Place, error) {
	endpoint := "https://places.googleapis.com/v1/places:searchNearby"

	reqBody := PlaceRequest{
		IncludedTypes:  []string{tipo},
		MaxResultCount: 20,
	}
	reqBody.LocationRestriction.Circle.Center.Latitude = lat
	reqBody.LocationRestriction.Circle.Center.Longitude = lon
	reqBody.LocationRestriction.Circle.Radius = 5000

	jsonData, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest("POST", endpoint, bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Goog-Api-Key", apiKey)
	// Pedimos todos os campos na API; o que é exibido é filtrado depois no código
	req.Header.Set("X-Goog-FieldMask", "places.displayName,places.formattedAddress,places.types,places.nationalPhoneNumber,places.websiteUri,places.rating,places.location,places.priceLevel")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var resultado PlaceResponse
	if err := json.Unmarshal(body, &resultado); err != nil {
		return nil, fmt.Errorf("erro ao parsear JSON: %w (resposta: %s)", err, string(body))
	}

	return resultado.Places, nil
}

func exibirPlace(p Place) {
	if exibirNome {
		fmt.Printf("Nome: %s\n", p.DisplayName.Text)
	}
	if exibirEndereco {
		fmt.Printf("Endereço: %s\n", p.FormattedAddress)
	}
	if exibirTipo {
		fmt.Printf("Tipo: %v\n", p.Types)
	}
	if exibirTelefone {
		fmt.Printf("Telefone: %s\n", p.NationalPhoneNumber)
	}
	if exibirSite {
		fmt.Printf("Site: %s\n", p.WebsiteURI)
	}
	if exibirAvaliacao {
		fmt.Printf("Avaliação: %.1f\n", p.Rating)
	}
	if exibirValor {
		fmt.Printf("Preço (nível): %d\n", p.PriceLevel)
	}
	if exibirCoordenadas {
		fmt.Printf("Coordenadas: %.6f, %.6f\n", p.Location.Latitude, p.Location.Longitude)
	}
	fmt.Println("----------------------------------------")
}

func main() {
	fmt.Printf("Buscando coordenadas de %s...\n", cidade)
	lat, lon, err := buscarCoordenadas(cidade)
	if err != nil {
		fmt.Println("Erro:", err)
		return
	}
	fmt.Printf("Coordenadas encontradas: %.6f, %.6f\n\n", lat, lon)

	tipos := []string{
		// =========================
		// AUTOMOTIVE
		// =========================
		"car_dealer",
		"car_rental",
		"car_repair",
		"car_wash",
		"ebike_charging_station",
		"electric_vehicle_charging_station",
		"gas_station",
		"parking",
		"parking_garage",
		"parking_lot",
		"rest_stop",
		"tire_shop",
		"truck_dealer",

		// =========================
		// NEGÓCIOS
		// =========================
		"business_center",
		"corporate_office",
		"coworking_space",
		"farm",
		"manufacturer",
		"ranch",
		"supplier",
		"television_studio",

		// =========================
		// CULTURA
		// =========================
		"art_gallery",
		"art_museum",
		"art_studio",
		"auditorium",
		"castle",
		"cultural_landmark",
		"fountain",
		"historical_place",
		"history_museum",
		"monument",
		"museum",
		"performing_arts_theater",
		"sculpture",

		// =========================
		// EDUCAÇÃO
		// =========================
		"academic_department",
		"educational_institution",
		"library",
		"preschool",
		"primary_school",
		"research_institute",
		"school",
		"secondary_school",
		"university",

		// =========================
		// LAZER E RECREAÇÃO
		// =========================
		"amusement_center",
		"amusement_park",
		"aquarium",
		"barbecue_area",
		"botanical_garden",
		"bowling_alley",
		"casino",
		"city_park",
		"comedy_club",
		"community_center",
		"concert_hall",
		"convention_center",
		"cultural_center",
		"dog_park",
		"event_venue",
		"garden",
		"hiking_area",
		"marina",
		"movie_theater",
		"national_park",
		"night_club",
		"park",
		"tourist_attraction",
		"water_park",
		"zoo",

		// =========================
		// FINANÇAS
		// =========================
		"atm",
		"bank",
		"accounting",

		// =========================
		// ALIMENTOS E BEBIDAS
		// =========================
		"restaurant",
		"bar",
		"cafe",
		"bakery",
		"fast_food_restaurant",
		"coffee_shop",
		"ice_cream_shop",
		"meal_takeaway",
		"pizza_restaurant",
		"sushi_restaurant",

		// =========================
		// SAÚDE E BEM-ESTAR
		// =========================
		"hospital",
		"pharmacy",
		"dental_clinic",
		"doctor",
		"spa",
		"yoga_studio",

		// =========================
		// HOSPEDAGEM
		// =========================
		"hotel",
		"motel",
		"hostel",
		"guest_house",
		"resort_hotel",
		"campground",
		"lodging",
		"extended_stay_hotel",

		// =========================
		// LOCAIS DE CULTO
		// =========================
		"church",
		"mosque",
		"synagogue",
		"hindu_temple",
		"buddhist_temple",

		// =========================
		// COMPRAS
		// =========================
		"shopping_mall",
		"supermarket",
		"store",
		"convenience_store",
		"clothing_store",
		"electronics_store",
		"pet_store",

		// =========================
		// ESPORTES
		// =========================
		"gym",
		"fitness_center",
		"stadium",
		"sports_complex",
		"swimming_pool",
		"tennis_court",

		// =========================
		// TRANSPORTE
		// =========================
		"airport",
		"bus_station",
		"train_station",
		"subway_station",
		"taxi_stand",
		"parking_lot",
	}

	for _, tipo := range tipos {
		fmt.Printf("=== Tipo: %s ===\n", tipo)
		lugares, err := buscarLugares(lat, lon, tipo)
		if err != nil {
			fmt.Println("Erro:", err)
			continue
		}
		for _, p := range lugares {
			exibirPlace(p)
		}
	}
}