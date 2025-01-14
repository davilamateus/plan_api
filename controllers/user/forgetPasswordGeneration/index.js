const userModel = require("../../../models/users");
const modelChangePassword = require("../../../models/forgetPassword");
const { isEmail } = require("../../../functions/isEmail");
const { useSendEmail } = require("../../../hooks/emails/useSendEmail");

const generateToken = (length) => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let token = "";
	for (let i = 0; i < length; i++) {
		token += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return token;
};

const forgetPasswordCode = (req, res) => {
	const { email } = req.body;

	if (!isEmail(email)) {
		return res.status(400).json({ error: "Missing required parameter" });
	}
	try {
		userModel
			.findOne({
				where: {
					email,
				},
			})
			.then((data) => {
				if (data) {
					const token = generateToken(6);

					modelChangePassword
						.create({
							userId: data.id,
							token,
							valid: true,
							expiresAt: new Date().getTime() + 30 * 60 * 1000,
						})

						.then(() => {
							const subject = "The My Trip Hub - Get a new password.";
							const html = `
<table cellpadding="0" cellspacing="0" style="width:100%">
	<tbody>
		<tr>
			<td style="background-color:#f4f4f4">
			<table cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:5px; box-shadow:0px 0px 10px rgba(0,0,0,0.1); margin:20px auto; width:600px">
				<tbody>
					<tr>
						<td style="text-align:center">
						<p>&nbsp;</p>

						<p><img alt="Logo da PLAN" src="https://themytriphub.com/img/person.png" style="width:150px" /></p>

						<h1><span style="font-family:Arial,Helvetica,sans-serif"><strong>Getting a new Password</strong></span></h1>

						<p>Hello,</p>

						<p>You requested an email to generate a new password.</p>

						<p>Your verification code is:</p>
						<h2 style="font-size:24px; color:#6AD9A8;">${token}</h2>

						<p>If you have any questions or need assistance, feel free to contact our support team at contact@themytriphub.com</p>

						<p>Thank you again for choosing The My Trip Hub!</p>

						<p>Best regards,<br />
						Your The My Trip Hub Team</p>

						<p>&nbsp;</p>
						</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
	</tbody>
</table>
`;

							// useSendEmail(email, subject, html);
							res.status(200);
							res.json({ result: "Add" });
						})
						.catch(() => {
							res.status(400);
							res.json({ result: "Error" });
						});
				} else {
					res.status(404);
					res.json({ result: "Error" });
				}
			});
	} catch {
		res.status(500).json({ error: "Internal server error, try again later." });
	}
};

module.exports = { forgetPasswordCode };
