const modelTrip = require("../../../models/trip");

const editTrip = (req, res) => {
    const { currentCity, currentState, currentCountry, currentCountrySlug, currentCurrency, tripCity, tripState, tripCountry, tripCountrySlug, tripCurrency, tripLon, tripLat, when } = req.body;
    const { userId } = req.user;
    if (!currentCity || !currentCountry || !currentCountrySlug || !currentCurrency || !tripCity || !tripCountry || !tripCountrySlug || !tripCurrency || !tripLon || !tripLat || !when) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelTrip
            .update(
                {
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
                    when
                },
                {
                    where: {
                        userId
                    }
                }
            )
            .then(() => {
                res.status(200).json({ result: "Success" });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { editTrip };
