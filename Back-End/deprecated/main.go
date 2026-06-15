package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

type OverpassResponse struct {
	Elements []Element `json:"elements"`
}

type Element struct {
	Type string            `json:"type"`
	ID   int64             `json:"id"`
	Lat  float64           `json:"lat"`
	Lon  float64           `json:"lon"`
	Tags map[string]string `json:"tags"`
}

func buscarPontosTuristicos(cidade string) ([]Element, error) {
	query := fmt.Sprintf(`
	[out:json][timeout:25];
	area[name="%s"][admin_level=8]->.cidade;
	(
	  node["tourism"](area.cidade);
	  node["amenity"="restaurant"](area.cidade);
	  node["amenity"="hotel"](area.cidade);
	  node["amenity"="museum"](area.cidade);
	);
	out body;
	`, cidade)

	apiURL := "https://overpass-api.de/api/interpreter"

	resp, err := http.PostForm(apiURL, url.Values{"data": {query}})
	if err != nil {
		return nil, fmt.Errorf("erro na requisição: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
   		return nil, fmt.Errorf("erro ao ler resposta: %w", err)
	}

	// Adicione essa linha temporariamente para debugar
	// fmt.Println("Resposta da API:", string(body))

	var resultado OverpassResponse
	if err := json.Unmarshal(body, &resultado); err != nil {
		return nil, fmt.Errorf("erro ao parsear JSON: %w", err)
	}

	return resultado.Elements, nil
}

func main() {
	cidade := "Campinas"

	fmt.Printf("Buscando pontos turísticos em %s...\n\n", cidade)

	elementos, err := buscarPontosTuristicos(cidade)
	if err != nil {
		fmt.Printf("Erro: %v\n", err)
		return
	}

	if len(elementos) == 0 {
		fmt.Println("Nenhum resultado encontrado.")
		return
	}

	fmt.Printf("%-40s %-20s %-12s %-12s\n", "Nome", "Tipo", "Latitude", "Longitude")
	fmt.Println(strings.Repeat("-", 90))

	for _, el := range elementos {
		nome := el.Tags["name"]
		if nome == "" {
			nome = "Sem nome"
		}

		tipo := el.Tags["tourism"]
		if tipo == "" {
			tipo = el.Tags["amenity"]
		}

		fmt.Printf("%-40s %-20s %-12.6f %-12.6f\n", nome, tipo, el.Lat, el.Lon)
	}

	fmt.Printf("\nTotal encontrado: %d\n", len(elementos))
}
