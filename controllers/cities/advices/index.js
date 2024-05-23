require("dotenv").config();

const axios = require("axios");
const apiKey = process.env.foursquare;

const citiesAdvices = async (req, res) => {
    const { lat, lon, category } = req.query;
    if (lat && lon && category) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: ` ${apiKey}`
            }
        };

        const places = await axios
            .get(`https://api.foursquare.com/v3/places/search?local=${lat},${lon}${category ? `&categories=${category}` : ""}`, options)
            .then((data) => {
                return data.data.results;
            })
            .catch((error) => {
                console.log("adivices", error);
                res.json(error).status(400);
            });

        const placesWithImages = await Promise.all(
            places.map(async (place) => {
                return (imageResponse = await axios
                    .get(`https://api.foursquare.com/v3/places/${place.fsq_id}/photos`, options)
                    .then((images) => {
                        return { ...place, images: images.data };
                    })
                    .catch((error) => {
                        console.log("Imagens", error);

                        res.json(error).status(400);
                    }));
            })
        );
        res.status(200).json(placesWithImages);
    }
};

module.exports = { citiesAdvices };
