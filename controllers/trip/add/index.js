const modelTrip = require("../../../models/trip");

const addTrip = (req, res) => {
    const { currentCity, currentState, currentCountry, currentCountrySlug, currentCurrency, tripCity, tripState, tripCountry, tripCountrySlug, tripCurrency, tripLon, tripLat, when } = req.body;
    const { userId } = req.user;
    if (currentCity && currentCountry && currentCountrySlug && currentCurrency && tripCity && tripCountry && tripCountrySlug && tripCurrency && tripLon && tripLat && when) {
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
                            res.status(200);
                            res.json({ result: "Success" });
                        })
                        .catch((error) => {
                            res.status(400);
                            res.json({ result: error });
                        });
                }
            });
    } else {
        res.status(400);
        res.json({ result: "Falt Informations" });
    }
};

module.exports = { addTrip };
