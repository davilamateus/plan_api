const { RadioBrowserApi } = require("radio-browser-api");

const radio = (req, res) => {
    const { country } = req.query;
    const api = new RadioBrowserApi("My Radio App");

    if (!country) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        async function stations() {
            await api
                .searchStations({
                    countryCode: country,
                    limit: 30,
                    offset: 0
                })
                .then((result) => {
                    let array = [];
                    result.map((item) => {
                        if (item.favicon !== "") {
                            array.push(item);
                        }
                    });
                    res.json(array).status(200);
                });
        }
        stations();
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { radio };
