const modelChangePassword = require("../../../models/forgetPassword");
const modelUser = require("../../../models/users");
const bcrypt = require("bcryptjs");
const { isAValidePassword } = require("../../../functions/isAValidePassword");

const checkedCode = (req, res) => {
	const { token } = req.params;

	if (!token) {
		return res.status(400).json({ error: "Missing required parameter" });
	}
	try {
		modelChangePassword
			.findOne({
				where: {
					token,
				},
			})
			.then((data) => {
				if (data) {
					if (
						data.valid == 1 &&
						data.expiresAt >= new Date().getTime() / 1000
					) {
						res.status(200);
						res.json({ result: "Success" });
					} else {
						res
							.status(500)
							.json({ error: "Internal server error, try again later." });
					}
				} else {
					res.status(404);
					res.json({ result: "Error" });
				}
			});
	} catch {
		res.status(500).json({ error: "Internal server error, try again later." });
	}
};
const newPassword = (req, res) => {
	const { password, token } = req.body;
	console.log(password, token);

	if (!token || !isAValidePassword(password)) {
		return res.status(400).json({ error: "Missing required parameter" });
	}
	try {
		modelChangePassword
			.findOne({
				where: {
					token,
				},
			})
			.then((data) => {
				if (data) {
					if (
						data.valid == 1 &&
						data.expiresAt >= new Date().getTime() / 1000
					) {
						let salt = bcrypt.genSaltSync(10);
						let hash = bcrypt.hashSync(password, salt);
						modelUser
							.update(
								{
									password: hash,
								},
								{
									where: {
										id: data.userId,
									},
								}
							)
							.then(() => {
								modelChangePassword
									.update(
										{
											valid: false,
										},
										{
											where: {
												userId: data.userId,
											},
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
							});
					} else {
						res.status(201);
						res.json({ result: "Used" });
					}
				} else {
					res.status(404);
					res.json({ result: "Error" });
				}
			});
	} catch {
		res.status(500).json({ error: "Internal server error, try again later." });
	}
};

module.exports = { newPassword, checkedCode };
