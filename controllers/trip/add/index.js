const modelTrip = require("../../../models/trip");

const addTrip = (req, res) => {
    const { currentCity, currentState, currentCountry, currentCountrySlug, currentCurrency, tripCity, tripState, tripCountry, tripCountrySlug, tripCurrency, tripLon, tripLat, when } = req.body;
    const { userId } = req.user;
    if (!currentCity || !currentCountry || !currentCountrySlug || !currentCurrency || !tripCity || !tripCountry || !tripCountrySlug || !tripCurrency || !tripLon || !tripLat || !when) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelTrip
            .findOne({
                where: {
                    userId
                }
            })
            .then((data) => {
                if (data) {
                    res.status(201);
                    res.json({ result: "Used" });
                } else {
                    modelTrip
                        .create({
                            currentCity,
                            currentState,
                            currentCountry,
                            currentCountrySlug,
                            currentCurrency,
                            tripCity,
                            tripState,
                            tripCountry,
                            tripCountrySlug,
                            tripCurrency,
                            tripLon,
                            tripLat,
                            when,
                            userId
                        })
                        .then(() => {
                            res.status(200).json({ result: "Success" });
                        });
                }
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addTrip };
