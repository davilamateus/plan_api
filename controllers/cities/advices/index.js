require("dotenv").config();
const axios = require("axios");
const apiKey = process.env.foursquare;

const citiesAdvices = async (req, res) => {
    const { lat, lon, category } = req.query;

    if (!lat || !lon || !category) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: ` ${apiKey}`
        }
    };

    try {
        const placesResponse = await axios.get(`https://api.foursquare.com/v3/places/search?ll=${lat},${lon}${category ? `&categories=${category}` : ""}`, options);
        const places = placesResponse.data.results;

        if (!places || places.length === 0) {
            return res.status(404).json({ error: "Not found." });
        }

        const placesWithImages = await Promise.all(
            places.map(async (place) => {
                try {
                    const imagesResponse = await axios.get(`https://api.foursquare.com/v3/places/${place.fsq_id}/photos`, options);
                    return { ...place, images: imagesResponse.data };
                } catch (error) {
                    return { ...place, images: [] };
                }
            })
        );

        res.status(200).json(placesWithImages);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error, try again later." });
        }
    }
};

module.exports = { citiesAdvices };
