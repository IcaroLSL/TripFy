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
	exibirTelefone    = false
	exibirSite        = false
	exibirAvaliacao   = false
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
	req.Header.Set("X-Goog-FieldMask", "places.displayName,places.formattedAddress,places.types,places.nationalPhoneNumber,places.websiteUri,places.rating,places.location")

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

	tipos := []string{"tourist_attraction", "restaurant", "hotel", "museum"}

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