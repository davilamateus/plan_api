
const { RadioBrowserApi } = require('radio-browser-api');


const radio = (req, res) => {
    const { country } = req.query;
    const api = new RadioBrowserApi('My Radio App')

    async function stations() {
        await api.searchStations({
            countryCode: country,
            limit: 30,
            offset: 0
        })
            .then((result) => {
                let array = []
                result.map((item) => {
                    if (item.favicon !== '') {
                        array.push(item);
                    }
                })
                res.json(array).status(200);
            })
            .catch((error) => res.json(error).status(400));

    }
    stations();
}

module.exports = { radio };