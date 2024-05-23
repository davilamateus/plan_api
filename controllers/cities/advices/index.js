require("dotenv").config();
const axios = require("axios");
const apiKey = process.env.foursquare;

const citiesAdvices = async (req, res) => {
    const { lat, lon, category } = req.query;

    if (!lat || !lon || !category) {
        return res.status(400).json({ error: "Parâmetros lat, lon e category são obrigatórios" });
    }

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: ` ${apiKey}`
        }
    };

    try {
        // Primeira requisição para obter lugares
        const placesResponse = await axios.get(`https://api.foursquare.com/v3/places/search?ll=${lat},${lon}${category ? `&categories=${category}` : ""}`, options);
        const places = placesResponse.data.results;

        if (!places || places.length === 0) {
            return res.status(404).json({ error: "Nenhum lugar encontrado" });
        }

        // Mapeando os lugares para incluir imagens
        const placesWithImages = await Promise.all(
            places.map(async (place) => {
                try {
                    const imagesResponse = await axios.get(`https://api.foursquare.com/v3/places/${place.fsq_id}/photos`, options);
                    return { ...place, images: imagesResponse.data };
                } catch (error) {
                    console.error(`Erro ao buscar imagens para o lugar ${place.fsq_id}:`, error.message);
                    return { ...place, images: [] }; // Ou alguma outra forma de lidar com o erro de imagens
                }
            })
        );

        res.status(200).json(placesWithImages);
    } catch (error) {
        console.error("Erro ao buscar lugares:", error.message);
        if (!res.headersSent) {
            res.status(400).json({ error: "Erro ao buscar lugares" });
        }
    }
};

module.exports = { citiesAdvices };
