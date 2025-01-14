const axios = require("axios");
require("dotenv").config();

const noticies = (req, res) => {
	const { country, category, page } = req.query;
	const key1 = process.env.newsdata;
	const key2 = process.env.newsdata2;

	if (!country) {
		return res.status(400).json({ error: "Missing required parameter" });
	}
	try {
		const response = async (key) => {
			await axios
				.get(
					`https://newsdata.io/api/1/news?apikey=${key}&country=${country}&image=1&${
						category !== undefined ? "category=" + category : ""
					}${page !== undefined ? "&page=" + page : ""}`
				)

				.then((data) => {
					console.log(data);
					res.status(200).json(data.data);
				})
				.catch((error) => {
					if (error.response.status && error.response.status === 429) {
						console.log(error);
						response(key2);
					}
				});
		};
		response(key1);
	} catch {
		res.status(500).json({ error: "Internal server error, try again later." });
	}
};

module.exports = { noticies };
