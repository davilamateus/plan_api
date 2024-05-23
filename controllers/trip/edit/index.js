const modelTrip = require("../../../models/trip");

const editTrip = (req, res) => {
    const { currentCity, currentState, currentCountry, currentCountrySlug, currentCurrency, tripCity, tripState, tripCountry, tripCountrySlug, tripCurrency, tripLon, tripLat, when } = req.body;
    const { userId } = req.user;
    if (currentCity && currentCountry && currentCountrySlug && currentCurrency && tripCity && tripCountry && tripCountrySlug && tripCurrency && tripLon && tripLat && when) {
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
                res.status(200);
                res.json({ result: "Success" });
            })
            .catch((error) => {
                res.status(400);
                res.json({ result: error });
            });
    } else {
        res.status(400);
        res.json({ result: "Falt Informations" });
    }
};

module.exports = { editTrip };
